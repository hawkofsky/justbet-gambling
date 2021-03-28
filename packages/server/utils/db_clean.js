const debug = require('debug')('justbet: db_clean.js');

const knex = require('../database/knex');
const { tables } = require('../database/info');
const { contracts } = require('../../config').default;

/*
* Search for difference in contracts, clean database is found
* */
async function contractCheck() {
    const trxProvider = knex.transactionProvider();
    const trx = await trxProvider();
    try {
        const currentContracts = await trx.raw('SELECT json_object_agg(name, address) FROM contracts_addresses').then(result => {
            return result.rows[0].json_object_agg;
        });
        if (!currentContracts || !compareContracts(contracts, currentContracts)) {
            debug('contracts was updated, cleaning database');
            await trx.raw('DELETE FROM contracts_addresses;');
            let query = 'INSERT INTO contracts_addresses (name, address) VALUES ';
            Object.keys(contracts).forEach(key => {
                query += `($$${key}$$, $$${contracts[key]}$$),`;
            });
            query = query.slice(0, -1);
            await trx.raw(query);
            await cleanDatabase();
            debug('database is cleaned, contract addresses updated');
        }
        await trx.commit();
    } catch (err) {
        debug('contractCheck err: %o', err);
        trx.rollback();
        throw err;
    }
}

/*
* Clean all statistic tables
* */
async function cleanDatabase() {
    const trxProvider = knex.transactionProvider();
    const trx = await trxProvider();
    try {
        let query = '';
        // eslint-disable-next-line no-restricted-syntax
        Object.values(tables).forEach(val => {
            query += `DELETE FROM "${val}";`;
        });
        await trx.raw(query);
        await trx.commit();
    } catch (err) {
        debug('cleanDatabase err: %o', err);
        trx.rollback();
        throw err;
    }
}

function compareContracts(config, current) {
    if (Object.keys(config).length !== Object.keys(current).length) return false;

    return Object.keys(config).reduce((valid, key) => {
        if (!current[key]) return false;
        if (config[key] !== current[key]) return false;
        return valid;
    }, true);
}

module.exports = {
    contractCheck
};

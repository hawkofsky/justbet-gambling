FROM node:10-slim
LABEL Name='justbet-server' Version=1.0

EXPOSE 3030

WORKDIR /server/

CMD yarn install --production --frozen-lockfile && NODE_ENV=production yarn migrate && yarn start-prod

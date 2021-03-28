FROM postgres:10
LABEL Name='justbet-db'
LABEL Version=1.0.0

RUN set -eux ; \
    apt-get update -qq --assume-yes --fix-missing ; \
    apt-get install -qq --assume-yes curl wget apt-utils apt-transport-https ; \
    rm -rf /var/lib/apt/lists/*

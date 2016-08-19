# http://support.ghost.org/supported-node-versions/
# https://github.com/nodejs/LTS
FROM node:4-wheezy

RUN groupadd user && useradd --create-home --home-dir /home/user -g user user

RUN apt-get update && apt-get install -y \
		ca-certificates \
		wget \
	--no-install-recommends && rm -rf /var/lib/apt/lists/*

ENV GHOST_SOURCE /usr/src/ghost
WORKDIR $GHOST_SOURCE

RUN buildDeps=' \
		gcc \
		make \
		python \
		unzip \
	'

RUN apt-get update && apt-get install -y $buildDeps --no-install-recommends && rm -rf /var/lib/apt/lists/*

COPY ./package.json  ${GHOST_SOURCE}/
RUN npm install --production
COPY . ${GHOST_SOURCE}/
RUN npm cache clean
RUN rm -rf /tmp/npm*



COPY docker-entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 2368
CMD ["npm", "start"]

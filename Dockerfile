# http://support.ghost.org/supported-node-versions/
# https://github.com/nodejs/LTS
FROM node:4-slim

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
	' \
	&& set -x \
	&& apt-get update && apt-get install -y $buildDeps --no-install-recommends && rm -rf /var/lib/apt/lists/* \
	&& cp ./package.json  ${GHOST_SOURCE}/\
	&& npm install --production \
	&& cp . ${GHOST_SOURCE}/\
	&& npm cache clean \
	&& rm -rf /tmp/npm*


COPY docker-entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 2368
CMD ["npm", "start"]

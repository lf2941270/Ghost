# http://support.ghost.org/supported-node-versions/
# https://github.com/nodejs/LTS
FROM node:4-wheezy
RUN pwd
RUN groupadd user && useradd --create-home --home-dir /home/user -g user user
RUN pwd

RUN apt-get update && apt-get install -y \
		ca-certificates \
		wget \
	--no-install-recommends && rm -rf /var/lib/apt/lists/*

RUN pwd
RUN ls
ENV GHOST_SOURCE /usr/src/ghost
RUN pwd
RUN ls

RUN buildDeps=' \
		gcc \
		make \
		python \
		unzip \
	'
RUN pwd
RUN ls

RUN apt-get update && apt-get install -y $buildDeps --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN pwd
RUN ls
RUN cd /usr/src/ghost && ls
COPY ./package.json  ${GHOST_SOURCE}/
RUN npm install --production
COPY . ${GHOST_SOURCE}/
RUN npm cache clean
RUN rm -rf /tmp/npm*

WORKDIR $GHOST_SOURCE


COPY docker-entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 2368
CMD ["npm", "start"]

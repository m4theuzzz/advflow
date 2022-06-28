FROM node:16-alpine as builder
WORKDIR /home/node/app
COPY src/advflow/package*.json ./

RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*

RUN npm install
COPY src/advflow/ .
RUN npm run build --production
CMD [ "sh", "./bin/start.sh" ]


FROM node:16-alpine
ENV ENV_SILENT=true
WORKDIR /home/node/app
COPY --from=builder /home/node/app/build .
COPY --from=builder /home/node/app/bin ./bin

RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*
RUN npm ci --production
EXPOSE 3333
CMD [ "node", "server.js" ]

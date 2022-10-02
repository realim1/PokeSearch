FROM node:18-alpine

RUN mkdir -p /home/node/pokesearch

WORKDIR /home/node/pokesearch

COPY .next ./.next

COPY package.json ./

RUN npm install

CMD ["npm", "start"]
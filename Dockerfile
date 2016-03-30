FROM node:5.8-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install --production
COPY . .

CMD ["npm", "start"]

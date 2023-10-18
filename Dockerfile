FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

RUN yarn global add serve

CMD ["serve", "-s", "dist", "-l", "3000"]

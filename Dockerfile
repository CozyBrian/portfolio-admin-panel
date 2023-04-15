FROM node:16-alpine

ARG VITE_APP_FIREBASE_KEY

WORKDIR /app

COPY . .

RUN yarn install

ENV VITE_APP_FIREBASE_KEY="${VITE_APP_FIREBASE_KEY}"

RUN yarn build

RUN yarn global add serve

CMD ["serve", "-s", "dist", "-l", "3000"]

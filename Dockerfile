FROM node:16-alpine

WORKDIR /app

COPY . .

ARG VITE_APP_FIREBASE_KEY

ENV VITE_APP_FIREBASE_KEY="${VITE_APP_FIREBASE_KEY}"

RUN yarn install

RUN yarn build

RUN yarn global add serve

CMD ["serve", "-s", "dist", "-l", "3000"]

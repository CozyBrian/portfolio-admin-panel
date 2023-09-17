FROM oven/bun

WORKDIR /app

# COPY package*.json ./

# RUN bun install

COPY . .

# RUN bunx --bun vite build

RUN bun add --global serve

CMD ["bunx", "serve", "-s", "dist", "-l", "3000"]

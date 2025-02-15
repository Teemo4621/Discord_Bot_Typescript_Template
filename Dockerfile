FROM oven/bun:slim

WORKDIR /app

RUN rm -rf node_modules package-lock.json

COPY ./package*.json ./

RUN bun install

COPY ./ ./

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]
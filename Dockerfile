FROM node:22-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
COPY yarn.lock* ./

RUN yarn install

COPY . .

RUN npx prisma generate --schema prisma/schema.prisma

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy --schema prisma/schema.prisma && yarn build && yarn start"]
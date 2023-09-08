FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

COPY . /app
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json /app/
RUN npm install --production

COPY prisma /app/prisma
RUN npx prisma generate

COPY --from=builder /app/dist /app/dist

EXPOSE 3000

CMD ["npm", "run", "start"]

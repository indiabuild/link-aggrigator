FROM node:22-alpine3.19

WORKDIR /app

# Install Pnpm
RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . . 

RUN pnpm build

EXPOSE 5555

CMD [ "pnpm", "start" ]
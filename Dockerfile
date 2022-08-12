FROM node:alpine
WORKDIR /usr/src/client
COPY package*.json .
RUN npm i --force
COPY . .
CMD ["npm", "run", "dev"]
FROM node:20

#create a app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

#Bundle app soruce

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
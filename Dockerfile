FROM node:24-alpine3.23

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV VIDLY_JWT_PRIVATE_KEY='notASecret'

EXPOSE 5000

CMD ["npm", "start"]

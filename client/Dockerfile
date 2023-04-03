FROM node:14 AS development
WORKDIR /teorema/client/src/app
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 4200
CMD ["npm", "run", "dev"]
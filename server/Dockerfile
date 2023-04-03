FROM node:16.14.2-alpine AS dev

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --frozen-lockfile
COPY . .
CMD ["npm", "run", "start:dev"]

FROM dev AS prod
ENV NODE_ENV=production
RUN npm install --frozen-lockfile --production
COPY . .
RUN npm install -g @nestjs/cli
RUN npm run build
CMD ["npm", "run", "start:prod"]
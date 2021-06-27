FROM node:current-alpine
WORKDIR /src
COPY . .
RUN npm install --production && npm run build
CMD [ "npm", "run", "start" ]
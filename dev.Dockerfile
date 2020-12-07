FROM node:11.1.0-alpine as node_base

FROM node_base as parcel_base
RUN npm install -g parcel --silent

FROM parcel_base as deps
WORKDIR /usr/src
COPY package*.json /usr/src/
RUN npm install --silent

FROM parcel_base as dev
WORKDIR /usr/src
COPY --from=deps /usr/src/node_modules /usr/src/node_modules
COPY ./app /usr/src/app
CMD [ "npm", "run", "dev" ]
FROM node:11.1.0-alpine as node_base

FROM node_base as parcel_base
RUN npm install -g parcel --silent

FROM parcel_base as deps
WORKDIR /usr/src
COPY package*.json /usr/src/
#be careful with this line
RUN npm install --silent

FROM parcel_base as build
WORKDIR /usr/src
COPY --from=deps /usr/src/node_modules /usr/src/node_modules
COPY . /usr/src
RUN npm run build

FROM scratch AS ui
COPY --from=build /usr/src/dist /usr/src
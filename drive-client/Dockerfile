FROM node AS build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ARG REACT_APP_CLIENT_ID
ARG REACT_APP_MAPBOX_TOKEN


ENV REACT_APP_CLIENT_ID=${REACT_APP_CLIENT_ID}
ENV REACT_APP_MAPBOX_TOKEN=${REACT_APP_MAPBOX_TOKEN}



RUN npm run build


FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/build /app

EXPOSE 3000 

CMD ["serve", "-s", ".", "-l", "3000"]
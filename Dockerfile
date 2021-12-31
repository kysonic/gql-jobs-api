FROM alpine:latest
RUN apk add — no-cache nodejs npm
RUN apk add - no-cache mongodb
WORKDIR /app
COPY ./build /app/
COPY package.json /app/
COPY gql-job-api.tar.gz /app/
# It's not a production ready setup
COPY .env /app/
RUN npm install
EXPOSE 3000 
RUN tar -xzf gql-job-api.tar.gz && rm gql-job-api.tar.gz
CMD [ "node", "index.js" ]

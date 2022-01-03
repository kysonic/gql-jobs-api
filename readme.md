# Introduction

This is a api server of "GQL JOBS" application. GraphQL + Apollo = ❤️

# Prerequisites 

1. Node v16 or more
2. MongoDb v5 or more
3. Mailgun account (set in .env)

# Getting started 

1. Start you MongoDB database

2. Install dependencies via 

```
npm install 
// or
yarn install
```

3. Build via 

```
npm run build 
// or
yarn build
```

4. Copy .env.tpl as .env

```
cp .env.tpl .env
```

5. Start 

```
npm run start 
// or
yarn start
```

# Docker  

The project comes with Docker setup if you need just run the server (if you are developing frontend). To do that 

1. Build the app 

```
npm run build 
// or
yarn build
```
2. Run docker compose 

```
docker-compose up
```

Be aware that database would be restored automatically, no additional efforts required.

# Development 

If you have local version of mongo db. You can restore database via 

```
./mongorestore.sh
```

Or you can run docker-compose, switch off the app server and run you local one. Connect to DB as always via localhost:27017, so how ports are forwarded

After DB is in place, you can run 

```
yarn dev
```

# Mailgun 

In case if you won't create mailgun account you can go without it, but emails won't be sent. But there is log in the console. If you using docker container - just check docker logs, link with token would be sent in console (docker logs container_id --follow). Or if you use your local machine just check console.
# Credentials

email: soooyc@yandex.ru
password: admin89Q!

# File upload through postman 

operations: {"query":"mutation UploadFile($file: Upload!) {  uploadFile(file: $file){  message file { path }  }}"}
map: {"0": ["variables.file"]}
0: <FILE>
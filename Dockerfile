FROM node:16-alpine
WORKDIR /app
# Phyton
RUN apk add --no-cache python3 make g++
# Copy
COPY build /app
COPY package.json /app
COPY .env /app
RUN npm install --force
EXPOSE 4000
# Define container specific variable, .env won't override 
ENV NODE_ENV=production
ENV MONGO_URI=mongodb://db:27017/gql-job-api?readPreference=primary&directConnection=true&ssl=false

CMD [ "node", "index.js" ]

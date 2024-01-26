FROM alpine as build

RUN apk add --update --no-cache nodejs-lts npm curl && rm -rf /var/lib/apt/lists/*
 
WORKDIR /app
 
COPY package*.json ./

RUN ["npm", "ci"] && ["npm", "cache", "clean", "--force"]
 
COPY . .
 
RUN ["npm", "run", "build"]

EXPOSE 8001

ENTRYPOINT ["node", "build/index.js"]

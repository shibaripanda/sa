FROM node 

WORKDIR /app

COPY package.json /app

COPY . .

RUN npm run npmi --force

CMD npm run app
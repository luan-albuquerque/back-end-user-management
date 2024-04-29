FROM node:18.20.0

ARG PORT

WORKDIR /usr/app

ENV TZ=America/Manaus
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY package.json yarn.lock ./

RUN yarn cache clean --mirror

RUN yarn global add @nestjs/cli

COPY . ./

RUN yarn build

EXPOSE ${PORT}

CMD ["yarn", "start:prod"]
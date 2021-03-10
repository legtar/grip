FROM node:15-alpine

ENV CI true

RUN npm install -g npm@7

RUN npm --version
RUN node --version

RUN \
  echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
  && apk --no-cache  update \
  && apk --no-cache  upgrade \
  && apk add --no-cache --virtual .build-deps \
    gifsicle pngquant optipng libjpeg-turbo-utils \
    udev ttf-opensans chromium chromium-chromedriver \
  && rm -rf /var/cache/apk/* /tmp/*

ENV CHROME_BIN /usr/bin/chromium-browser
ENV LIGHTHOUSE_CHROMIUM_PATH=/usr/bin/chromium-browser

WORKDIR /src/app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

RUN npm test

ENTRYPOINT ["/bin/sh", "-c"]

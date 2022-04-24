FROM node:17.4.0-buster-slim

RUN set -xe \
    && sed  -i "s/deb.debian.org/mirrors.tuna.tsinghua.edu.cn/g" /etc/apt/sources.list  \
    && sed  -i "s/security.debian.org/mirrors.aliyun.com/g" /etc/apt/sources.list  \
    && apt-get update \
    && apt-get install libasound2 libgconf-2-4 libatk1.0-0 libatk-bridge2.0-0 libgdk-pixbuf2.0-0 libgtk-3-0 libgbm-dev libnss3-dev libxss-dev -y --fix-missing


COPY app/ /app

WORKDIR /app

RUN yarn

USER node

CMD ["node", "app.js"]

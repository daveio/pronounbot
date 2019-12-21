FROM node:13-alpine3.11
COPY . /App
WORKDIR /App
RUN /usr/local/bin/npm ci
EXPOSE 3838
CMD ["/App/node_modules/.bin/pm2", "start", "index.js", "--name", "pronounbot", "--no-daemon"]

FROM node:10
COPY . /App
WORKDIR /App
RUN make build
EXPOSE 3838
CMD make bot-start

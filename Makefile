default:
	npm ci

prepare: default

build: default

test:
	node_modules/.bin/mocha

bot-start:
	./node_modules/.bin/pm2 start index.js --name "pronounbot" --no-daemon

bot-status:
	./node_modules/.bin/pm2 l

bot-stop:
	./node_modules/.bin/pm2 stop pronounbot

bot-kill:
	./node_modules/.bin/pm2 kill

.PHONY: build bot-start bot-status bot-stop bot-kill default prepare test

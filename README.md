# Pronoun bot

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The purpose of this bot is for people to assign themselves roles which represent pronouns. This is a nodejs application that is happy to run in node:10 or later.

## Usage and main Functionality

This bot has 3 main functions which are available in discord channels:

```
my pronouns are subject/object
list available pronouns
do pronoun setup
```

### my pronouns are subject/object

This command will set your role to the subject/object pronoun that you specify if it is available in the list of pronouns, you can find the full list of pronouns [here](./src/pronounsList.json) or by using the `list available pronouns` command. If you'd like to add some pronouns please make a pull request or message one of the contributors if you don't know how, or if you are running your own instance replace the `pronounsList.json`.

### list available pronouns

This command will DM you the full set of available pronouns for the given instance of this bot.

### do pronoun setup

You can toggle this command on/off with the following environment variable `ALLOW_PRONOUN_SETUP=yes`

This command will loop through the pronounsList and create a role for each of the subject/object pairs. Each of these roles will have the same permissions as your @everyone role.

## Discordjs

The main functionality for this project comes from [discordjs](https://discord.js.org/#/docs/main/stable/general/welcome).

## Build

This project is using `make`, you can build with

```bash
$ make
or
$ make prepare
or 
$ make build
```

or if you don't have make because you're in the windows ecosystem, you can use

```bash
$ npm ci
```

## Running the bot

We're using [pm2](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/) to run the node service for us for crash recovery and on box monitoring. 

On successful startup the bot will run a http server that can be used to check the status of the discord client, it runs on port 3838.

### starting, stopping, etc

This is all managed through makefile targets

```bash
$ make bot-start
$ make bot-stop
$ make bot-status # Prints the status of the bot in pm2, memory and other useful things
$ make bot-kill # This will stop pm2 entirely
```

### Discord developer application

We will need a discord developer account with a bot setup on it so that this application can auth, then we'll need an administrator to install the bot into the discord server. Neither should be public details and should be somewhat tightly controlled, as if a bot is taken over it's bad for everyone.

### Roles

The server should have roles that match the pronouns listed in `src/pronounsList.json`, you can either create these manually or use the `do pronoun setup` command if the bot has this enabled.

### Environment variables

The bot requires a discord token to start which you can specify using an environment variable

```bash
$ export DISCORD_API_TOKEN=123potato
```

If you'd like to enable the `do pronoun setup` command you can do so with the following environment variable

```bash
$ export ALLOW_PRONOUN_SETUP=yes
```

## Tests

Testing is with [mocha](https://mochajs.org/api/), [chai](https://www.chaijs.com/api/) and [sinon](https://sinonjs.org/).

You can run tests with `make test` or `npm test`

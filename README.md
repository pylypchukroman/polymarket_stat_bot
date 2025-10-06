# Polymarket Stats Collector

This application allows you to collect and store statistics from **binary markets** (markets with two possible outcomes: **Yes / No**) from the largest prediction market — [Polymarket](https://polymarket.com).

## Features
- 🔗 Connects to Polymarket WebSocket to receive real-time price updates.
- 📊 Monitor any selected market via configuration.
- 🗄️ Store price change history in **MongoDB**.
- 🔔 Send notifications to **Slack** (info and error).
- ⚡ Built with **Node.js** and **TypeScript**.

## Technologies
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [WebSockets](https://developer.mozilla.org/docs/Web/API/WebSockets_API)
- [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks)

## Installation

### Clone the repository
`git clone https://github.com/your-username/polymarket-stats-collector.git`

### Go to the project folder
`cd polymarket-stats-collector`

### Install dependencies
`npm install`

## Database Setup

Before running the application, prepare MongoDB:
Create a database named `statistic`.
Inside it, create a collection `prices`.
Add the connection string and Slack webhooks to .env:

`MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/statistic`

## Database Structure

Data is stored in the `prices` collection:
`{
    "_id": "68e19beefca707659e3989d3",
    "side": "No",
    "price": 0.52,
    "size": 20,
    "timestamp": "2025-10-04T22:13:01.882Z"
}`

Fields:

_id (ObjectId) — unique identifier for the record.  

side (string) — market side, "Yes" or "No".  

price (number) — price at the time of the record.  

size (number) — order size (number of contracts).  

timestamp (ISODate) — time when the data was received from Polymarket.

## Usage

Before running, specify the market and data collection interval in the `consts.ts` file:

`slug = "bitcoin-up-or-down-october-6-1am-et"; // Polymarket market slug
FLUSH_INTERVAL = 20000; // batch interval in ms for saving data to MongoDB`

## How to get the slug

You can get the slug from the browser address bar when a specific market is open on Polymarket.

For example: `https://polymarket.com/event/bitcoin-up-or-down-october-6-1am-et?tid=1759732963282`
Here, slug = `bitcoin-up-or-down-october-6-1am-et`
slug — identifier of the market on Polymarket (located after /event/ and before ? or the end of the URL).
FLUSH_INTERVAL — time in milliseconds to batch collected data before saving to MongoDB (reduces database load).

## Slack Integration

The app can send messages to Slack.

Message types:
info (SLACK_UPDATES_WEBHOOK) — updates about price changes.
error (SLACK_ERRORS_WEBHOOK) — error notifications from the bot.

How to set up:
Create a Slack channel.
Add a bot via Incoming Webhooks
Insert webhook URLs into .env (see above).
`SLACK_ERRORS_WEBHOOK=https://hooks.slack.com/services/XXX/YYY/ZZZ
SLACK_UPDATES_WEBHOOK=https://hooks.slack.com/services/AAA/BBB/CCC`

## Future Plans

Add REST API to retrieve price history.
Build trend graphs.
Support monitoring multiple markets simultaneously.
Extended integration with other prediction markets.

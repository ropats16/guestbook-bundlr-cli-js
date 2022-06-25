This is starter repo for Building and Deploying a fully decentralised web-app to Arweave permaweb using the Bundlr CLI.

## Getting Started

First, install the packages:

```bash
npm install
#or
yarn
```

## Deploying Contract

```bash
npm run deploy
#or
yarn deploy
```

## Running Dev Environment

```bash
npm run dev
#or
yarn dev
```

## Exporting App

```bash
npm run build
#or
yarn build
```

## Installing Bundlr

```bash
npm install -g @bundlr-network/client
```

## Funding Bundlr Node

```bash
bundlr fund 18000000000000000 -w <private key> -c matic -h https://node2.bundlr.network
```

## Checking Node Balance

```bash
bundlr balance <wallet address> -c matic -h https://node2.bundlr.network
```

## Uploading App

```bash
bundlr upload-dir out/ --index-file index.html -w <wallet address> -c matic -h https://node2.bundlr.network
```

Then, use the following article and repository to folloe along:

- [Article]()

- [Repository]()

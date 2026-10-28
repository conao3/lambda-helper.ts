# lambda-helper.ts

A TypeScript-based AWS Lambda helper service for generating dynamic GitHub repository header images. Built with the Serverless Framework and Express-style routing.

## Overview

This project provides a simple API for generating customizable header images for GitHub repositories. It supports both SVG and PNG output formats with configurable colors.

## Features

- Dynamic SVG and PNG header image generation
- Customizable foreground and background colors
- Express-style routing with serverless-express
- TypeScript for type safety
- Webpack bundling for optimized deployments
- Local development support via serverless-offline

## Requirements

- Node.js 24 or later
- npm or Yarn
- AWS CLI (configured with appropriate credentials)
- Serverless Framework

## Installation

```bash
# Clone the repository
git clone https://github.com/conao3/lambda-helper.ts.git
cd lambda-helper.ts

# Install dependencies
yarn install
# or
npm install
```

## Local Development

Run the service locally using serverless-offline:

```bash
npx serverless offline
```

The API will be available at `http://localhost:3000`.

## API Endpoints

### GET /

Returns a list of available API endpoints.

**Response:**
```json
{
  "apis": "/hello"
}
```

### GET /hello

A simple health check endpoint.

**Response:**
```json
{
  "message": "hello world"
}
```

### GET /header/:text.svg

Generates a header image in SVG format.

**Parameters:**
- `text` (path) - The text to display in the header
- `foreground` (query, optional) - Foreground color in hex format (default: `FFF`)
- `background` (query, optional) - Background color in hex format (default: `222`)

**Example:**
```
/header/MyProject.svg?foreground=FFFFFF&background=2D3748
```

### GET /header/:text.png

Generates a header image in PNG format with the same parameters as the SVG endpoint.

## Deployment

Deploy to AWS using the Serverless Framework:

```bash
npx serverless deploy
```

For production deployment:

```bash
npx serverless deploy --stage production
```

## Project Structure

```
lambda-helper.ts/
├── handler.ts          # Main Lambda handler with Express routes
├── serverless.yml      # Serverless Framework configuration
├── webpack.config.js   # Webpack bundling configuration
├── tsconfig.json       # TypeScript compiler options
├── package.json        # Project dependencies
└── source-map-install.js
```

## Configuration

### Serverless Configuration

The service is configured in `serverless.yml`:

- **Runtime:** Node.js 24 (`nodejs24.x`)
- **Provider:** AWS
- **Plugins:** serverless-webpack, serverless-offline, serverless-express

### TypeScript Configuration

TypeScript is configured to target ES2017 with source maps enabled for debugging.

## License

MIT

# n8n Cogfy Nodes

[![Publish Package to npm](https://github.com/amonlibanio/n8n-nodes-cogfy/actions/workflows/publish.yaml/badge.svg)](https://github.com/amonlibanio/n8n-nodes-cogfy/actions/workflows/publish.yaml)

<p align="center">
  <img src="./public/cogfy.svg" width='150px'/>
</p>

n8n community nodes for Cogfy integration.

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Development](#development)

## Installation

Install the community node package in your n8n instance:

```
@amonlibanio/n8n-nodes-cogfy
```

## Usage

1. Install the package in your n8n instance
2. Add Cogfy API credentials in n8n
3. Create workflows using the Cogfy nodes:
   - **CogfyMessenger** - For messaging operations
   - **CogfyTables** - For database operations

## Screenshots

### Credentials Setup
<p align="center">
  <img src="./public/screenshots/cogfyCredentials.png" width='600px'/>
</p>

### CogfyMessenger Node
<p align="center">
  <img src="./public/screenshots/cogfyMessenger.png" width='600px'/>
</p>

### CogfyTables Node
<p align="center">
  <img src="./public/screenshots/cogfyTables.png" width='600px'/>
</p>

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Development mode
npm run dev
```

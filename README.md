# Jobs in Tech

[![Build Status](https://dev.azure.com/iosltd/Jobs-in-Tech/_apis/build/status/Jobs-in-Tech-Site?branchName=master)](https://dev.azure.com/iosltd/Jobs-in-Tech/_build/latest?definitionId=5&branchName=master)  

This project is the front-end client for the MSCC Job Portal - Jobs in Tech -, built using vue-cli3. The job portal is specialised for open positions in the IT sector in Mauritius and operated at [https://jobs.mscc.mu/](https://jobs.mscc.mu/).

![logo](https://raw.githubusercontent.com/mscraftsman/mscc-jobs/master/src/assets/img/logo.svg)

## Prerequisites

### Node.js

You may run `node -v` to see your current node version

- Minimum : Node.js LTS (v16.13.1+)
- Recommended : Node.js Latest

### Vue 3

Upgrade to the latest version of Vue CLI globally

```sh
npm install -g @vue/cli
```

## Usage

### Development mode

#### On Windows

It is recommended to use a Node.js version management tool like, ie. nvm-windows to handle various versions of Node.js on Windows. See here [nvm-windows](https://github.com/coreybutler/nvm-windows) for reference.

Install all the required tools and configurations using Microsoft's windows-build-tools using

```sh
C:\> npm install --global --production windows-build-tools
```

from an elevated PowerShell or CMD.exe (run as Administrator). Reference: [node-gyp](https://github.com/nodejs/node-gyp).

**Note:** Node.js now includes build tools for Windows. You probably no longer need this tool. See [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools) for details.

```sh
npm install
npm run serve
```

### Production mode

```sh
npm install
npm run build
```

The above command will generate a build in the `dist` folder.
That is a single page application that you can run using any basic webserver.

### Containerized app

You may run the app in a containerized environment by building a container image as follows:

```sh
docker build -t msccjobs:1.0 .
```

Then, start the container:

```sh
docker run -it -p 8080:80 --name mscc_jobs msccjobs:1.0
```

The app should be available at [http://localhost:8080](http://localhost:8080).

## Tech Stack

- VueJS
- SCSS

Dependencies [View](https://github.com/mscraftsman/mscc-jobs/blob/master/package.json)

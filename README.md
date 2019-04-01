# mscc-jobs

This project is the front-end client for the MSCC Job Portal, built using vue-cli3.

![logo](https://raw.githubusercontent.com/mscraftsman/mscc-jobs/master/src/assets/img/logo.svg)

## Prerequisites

#### Nodejs

You may run `node -v` to see your current node version

- Minimum : Node.js 8.11.0+
- Recommended : Node.js v11.8.0

## Usage

### Development mode

```sh
$ npm install
$ npm run serve
```

### Production mode

```sh
$ npm install
$ npm run build
```

The above command will generate a build in the `dist` folder.
That is a single page application that you can run using any basic webserver.

### Containerized app

You may run the app in a containerized environment by building a container image as follows:

```sh
$ docker build -t msccjobs:1.0 .
```

Then, start the container:

```sh
$ docker run -it -p 8080:80 --name mscc_jobs msccjobs:1.0
```

The app should be available at http://localhost:8080.

## Tech Stack

- VueJS
- SCSS

Dependencies [View](https://github.com/mscraftsman/mscc-jobs/blob/master/package.json)

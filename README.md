# API Template

*Disclaimer: This api template replaces the node server boilerplate since the last one was technically unmaintainable. From now on, this will be the "node server boilerplate" but using a different DB which is Mongo and following the microservice project structure for scalability.*

*To test this project you must first create an sandbox instance in Mongo Atlas or just download Mongo in your computer.*

## Download the project using these commands

```shell
$ git clone https://github.com/juan1003/api-template.git
$ cd api-template/
$ npm install
```

## Then, proceed to create a .env file with the following environment variables running this script

```shell
$ echo "MONGO_URI=\"mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]\"" > .env
$ echo "DB_NAME=\"<database-name>\"" >> .env
$ echo "PORT=8080" >> .env
```

## Finally, to run this project run this command
```shell
$ node index.js
```

## And you are done!
## Happy Hacking!
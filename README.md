# API Template 2.0

This is a rewrite of the [API Template](https://github.com/juan1003/api-template) project using typescript and prisma.

## Download the project using these commands

```shell
$ git clone https://github.com/juan1003/api-template.git
$ cd api-template/
$ bun install
```

## Then, proceed to create a .env file with the following environment variables running this script

```shell
$ bun prisma generate
$ bun prisma migrate dev
$ bun prisma db seed
```

## Finally, to run this project run this command
```shell
$ bun start
```

## And you are done!
## Happy Hacking!

**Note: You need to have [bun](https://bun.sh/) installed to run this project.**
**Note 2: You need a .env file with DATABASE_URL variable containing a postgres connection string.**

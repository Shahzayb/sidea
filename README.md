# <span><img src="public/apple-touch-icon-120x120.png" width="60" title="Sidea logo"></span> Sidea

It's an online web project ideas sharing platform.

## Features

- [x] User can create account
- [x] User can login
- [x] Allow user to reset password through email
- [x] User can share full-stack project ideas in details
- [x] User can assign features to their own ideas
- [x] User can delete their own ideas
- [x] User can delete their own features
- [x] User can update their own ideas
- [x] User can view newly shared ideas
- [x] User can view top ideas by a specific time interval
- [x] User can like ideas
- [x] User can save ideas
- [x] User can share ideas
- [x] User can see other user's ideas, saves and likes
- [x] User can search users
- [x] User can search ideas
- [ ] User can update their own profile
- [ ] User can delete their own account
- [ ] User can change their own password

## Installing

#### clone repo & install dependencies

```
git clone https://github.com/Shahzayb/sidea.git

cd sidea

npm i
```

#### environment variables setup

Create `.env` file in the root folder of project, and provide these env variables.

```
touch .env
```

**Note: In case of missing env variables, an exception will be thrown**

`JWT_SECRET` Json Web Token Secret (long random string).

`SENDGRID_API_KEY`, Key acquired by SendGrid.

`COMPANY_EMAIL`, Type any email address. Users will recieve email from this address.

`COMPANY_NAME`, Type your company name. Will be used in email.

`CLIENT_BASE_URL`, Your next.js app's base url.

`VERCEL_URL`, is provided by Vercel. Just type `VERCEL_URL` in name section and leave value empty, and click add.

**create account in algolia and provide these values**

`ALGOLIA_APP_ID`

`ALGOLIA_ADMIN_API_KEY`

`ALGOLIA_SEARCH_ONLY_API_KEY`

`CLIENT_PAGE_QUERY_LIMIT`, is use to represent page size.

Now, Create `.env` file in the `sidea/prisma` folder of project, and provide these env variables.

```
touch .env
```

`DATABASE_URL`, URL of MySQL database server.

## Start App

After installing & adding `env` variables:

1. Run `/db/db.sql` script in MySQL database server
2. Run `npm run prisma:generate`
3. `graphql/client/**`, `graphql/server/schema.ts`, If you change any of these files, then run `npm run types:generate`
4. Run the app in development mode with, `npm run dev`

## Built with

- [Next.js](https://nextjs.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/get-started/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started/)
- [Prisma.io](https://www.prisma.io/)
- [SendGrid](https://sendgrid.com/)
- [Material-UI](https://material-ui.com/)
- [Algolia Search](https://www.algolia.com/)
- [React Quill](https://github.com/zenoamaro/react-quill)
- [Typescript](https://www.typescriptlang.org/)
- [GraphQL Code Generator](https://graphql-code-generator.com/)
- [AWS RDS MySQL Hosting](https://aws.amazon.com/rds/)
- [Vercel Hosting Platform](https://vercel.com/)
- [MySQL 8.x Server](https://dev.mysql.com/doc/refman/8.0/en/)
- [MySQL Docker (Optional)](https://hub.docker.com/_/mysql)

## Author

**Shahzaib Sarwar** - [shahzayb](https://github.com/shahzayb)

## License

[GNU General Public License v3.0](https://github.com/Shahzayb/sidea/blob/master/LICENSE)

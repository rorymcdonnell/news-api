# Northcoders News API

## Background

An API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture. The database I've used is PostgreSQL

## Hosted Version

https://nc-news-api-rm.herokuapp.com/api/

**Available endpoints**

GET /api/topics
GET /api/articles/:article_id
PATCH /api/articles/:article_id
GET /api/articles
GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments
GET /api

## Step 1 - Setting up your project

You will need to create _two_ `.env` files for your project: `.env.test` and `.env.development`. Into each, add `PGDATABASE=<database_name_here>`, with the correct database name for that environment (see `/db/setup.sql` for the database names). Double check that these `.env` files are .gitignored.

You have also been provided with a `db` folder with some data, a [setup.sql](./db/setup.sql) file, a `seeds` folder and a `utils` folder. You should also take a minute to familiarise yourself with the npm scripts you have been provided.

The job of `index.js` in each the data folders is to export out all the data from that folder, currently stored in separate files. This is so that, when you need access to the data elsewhere, you can write one convenient require statement - to the index file, rather than having to require each file individually. Think of it like a index of a book - a place to refer to! Make sure the index file exports an object with values of the data from that folder with the keys:

- `topicData`
- `articleData`
- `userData`
- `commentData`

## Step 2 - Creating tables and Seeding

You will need to create your tables and write your seed function to insert the data into your database.

In order to both create the tables and seed your data, you will need the connection to your database. You can find this in the provided `connection.js`.

### Creating Tables

You should have separate tables for `topics`, `articles`, `users` and `comments`. Make sure to consider the order in which you create your tables. You should think about whether you require any constraints on your table columns (e.g. 'NOT NULL')

### Seeding

seed.js uses the async function seed to create tables within the database and also to insert data into them. I have exported the seed function to run-seed.js to run it with dev data. NPM run seed runs this file and seeds the local database with dev data.

### Testing

For testing I have used jest. The utility functions that format the data to populate the database are tested. Also tested are the endpoints. The app uses supertest and jest-sorted in addition to jest.

To run tests use the commands:

"npm t app" to test the app or "npm t utils" for the utility function tests.

If you want to test both then run "npm t"

# Bookshelf Backend - C08

This contains the bookshelf's app backend. It is built using Express and Mongoose.

All the configurations can be found inside the `config` folder. The app will load the appropiate config according to the `NODE_ENV`  variable. `development` is the default.

To run the server you need to have a MongoDB instance running. By default it connects to `localhost:27017/bookshelf`. Change this on `config/development` if necesary.

After runing the `yarn install`, you can run the server on `port 5000` with:

  #### `npm start`


There is a test suite included that will test all the available endpoints. To use it run:  

  #### `npm run test`

By default this will run on `NODE_ENV=test` and will connect to `localhost:27017/bookshelftest` database.


## Populating the database

The API does not have any endpoint to create new books. To populate it with books data run:

  #### `npm run populate` 

That script contains a fair ammount of google books API calls so running it repeteadly may result in some error due to quotas. It will create a test user with username 'frodo' and password 'givemethatring'

## Available endpoints

- `POST /auth/register` - Register with a username and password.
- `POST /auth/login` - Login and get the JWT needed to use the books endpoints.
- `GET /books` - Get all the books. Available filters are: `location and title`. It also supports pagination through the page parameter. Ej: `GET /books?location=quito&title=harry&page=2` <== would return the second page of books in quito that have harry on their title
- `GET /books/:id` - Get a single book given certain id
- `POST /books/:id/lend` - Lends this book to you. This endpoint need a location parameter sent in the body, indicating the place where you want to lend it from.


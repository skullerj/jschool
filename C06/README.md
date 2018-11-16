# Bookshelf Backend - C06

This contains the bookshelf's app backend. It is built using Express and Mongoose.

All the configurations can be found inside the `config` folder. The app will load the appropiate config according to the `NODE_ENV`  variable. `development` is the default.

To run the server you need to have a MongoDB instance running. By default it connects to `localhost:27017/bookshelf`. Change this on `config/development` if necesary.

After runing the `yarn install`, you can run the server on `port 5000` with:

  #### `npm start`


There is a test suite included that will test all the available endpoints. To use it run:  

  #### `npm run test`

By default this will run on `NODE_ENV=test` and will connect to `localhost:27017/bookshelf` database.

Last but not least, to lint the project run:

  #### `npm run lint`

## Populating the database

The API does not have any endpoint to create new books. To populate it with books data run:

  #### `npm run populate` 

No users are created there so you can go ahead and post `/auth/register` with a username and password. You can later authenticate with those credentials at `/auth/login`.

## Available endpoints

- `POST /auth/register` - Register with a username and password.
- `POST /auth/login` - Login and get the JWT needed to use the books endpoints.
- `GET /books` - Get all the books. You can pass a location query parameter to filter by location. Ej: `GET /books?location=quito`
- `GET /books/:id` - Get a single book given certain id
- `POST /books/:id/lend` - Lends this book to you. This endpoint need a location parameter sent in the body, indicating the place where you want to lend it from.



## Some comments

I am not sure about my approach to testing. Since it's a small project, a big integration test seemed to me like the best way to go. It also helped me developing the API and making sure it complies with all the requirements. It also gets a bit hacky sometimes.

I heavily relied on Mongoose Schemas to validate the data that goes into the database. Virtuals and Methods were pretty useful. You will see some named functions there, it's just because mongoose demands it (`this` binding related).

I tried to follow [This API design recomendations](https://blog.philipphauer.de/restful-api-design-best-practices/) which seemed pretty reasonable for me.

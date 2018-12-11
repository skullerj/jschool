## C09 - Bookshelf react backend with Redux

This folder contains the backed for the bookshelf app.

## Instructions 

To be able to run the whole site you first have to make sure you have lifted the API located on the backend folder, outside of this. Instructions to lift it up are there. There is a proxy configured on this side so it will connect without any extra configuration.

To start the create-react-app server run: 

### `yanr start`

To run the tests:

### `yarn test`


## Some comments

This time I completely refactored the code to delete some missleading components. We moved to JSS replacing the former emotion implementation. I think is a better path for code readibility. I wish there were a faster way to write styles though.
Implementing Redux was fun, the Flux framewor just makes sense and I like it a lot.



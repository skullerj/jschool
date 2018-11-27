## C07 - Bookshelf react backend

This folder contains the backed for the bookshelf app.

## Instructions 

To be able to run the whole site you first have to make sure you have lifted the API located on the backend folder, outside of this. Instructions to lift it up are there.

To start the create-react-app server run: 

### `yanr start`

To run the tests:

### `yarn test`

## Some comments

I know there is a lot of ways in which someone can implement css styling with react. I just used `emotion` to get a feel of how it works. I liked the way it let's you define the styles inside the componenent file and without polluting the css environment. For smaller components it may be easier that way.

The login flow is not part of the challenge. Anyways, I implemented it so I don't have to change the backend to ignore authentication. I hard coded the username and password to match the user created with the populateDatabase script on the backend.

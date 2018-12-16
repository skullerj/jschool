## C10 - Bookshelf frontend

This folder contains the backed for the bookshelf app.

## Instructions 

To be able to run the whole site you first have to make sure you have lifted the API located on the backend folder, outside of this. Instructions to lift it up are there. There is a proxy configured on this side so it will connect without any extra configuration.

To start the create-react-app server run: 

### `yanr start`

An animation is fired on the book list everytime some user lends a book. To see that you can lend a book from a new incognito tab. You should see the animation on the regular tab.

## Some comments

I used RxJs to handle the async operations. Most of the action names were changed to better addapt to that pattern.
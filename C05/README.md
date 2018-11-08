# Bookshelf page - C05

This page shows a list of books that can be rented. So far, it displays info about the book and if it is rented or not.

It is built using webpack. 
To compile the assets again you can run: 

`npm run build`.

To compile and start watching changes on the src folder run:

`npm start`

To lint the .js and scss files run: 

`npm run lint`


## Some comments

On mobile and tablet, you can tap each book to reveal it's details. On Desktop, details are revealed on hover.

You can also tap the hamburger menu (top left) on mobile and tablet to bring up the drawer.

I know the way I implemented Media Queries is not the best, since it generates a lot of actual media queries after compilation. I used this approach because this is not a big project and it makes sass code clearer around grid rules.

I used the aribnb shims to get fetch 
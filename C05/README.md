# Bookshelf page - C05

This page shows a list of books that can be borrowed. So far, it displays info about the book and if it is borrowed or not.

It is built using webpack. 

To compile asstets and show the page using webpack-dev-server run:

`npm start`

To just build the asstets again run: 

`npm run build`

To lint the .js and scss files run: 

`npm run lint`

This project gets it's book data from a Google API. This data is collected on a books.json file inside dist. The getBooksInfo.js script allows to fetch the API. You can re-fetch this info by runing: 

`node getBooksInfo.js`


## Some comments

On mobile and tablet, you can tap each book to reveal it's details. On Desktop, details are revealed on hover.

You can also tap the hamburger menu (top left) on mobile and tablet to bring up the drawer.

I know the way I implemented Media Queries is not the best, since it generates a lot of actual media queries after compilation. I used this approach because this is not a big project and it makes sass code clearer around grid rules.

I placed index.html inside dist folder just for convinience. 

Webpack warns about the size of the bundle. It's arround 300kb now and mostly composed of the aribnb-shims. I don't know how to optimize that since some of the shims it provides are neccesary for the page (Like fetch).
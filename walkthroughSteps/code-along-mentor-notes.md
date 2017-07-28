# Pg Walkthrough Notes

## Step 1 – navigating the initial files
1. `npm init`
2. First open src/handler.js. Here we see the `/static` endpoint sends back to our server a file called `static.js`. If we open this file, we see that it contains a data object of two superheroes.
3. run `npm run start` and navigate to `http://localhost:3000/static`. Here we see our hardcoded data from `static.js`

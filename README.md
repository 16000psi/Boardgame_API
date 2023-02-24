NC Games is a database and API which is used to access and modify the data stored by an imagined board games review website.  

The project was built in JS-node using TDD and jest / supertest. It uses express to handle the server and postgresql / node-pg to handle the database. 

If you would like to try the api, it is hosted here https://nc-games-dave1.onrender.com/api.  A good place to get started would be sending a GET request to "/api" - this will tell you what endpoints are available.

If you would like to run the project on your local machine, please follow these steps -

- Clone this repository onto your machine.
- In the root directory of the repository, run npm install.
- Create two environment variable files in the root directory - .env.test (containing the line "PGDATABASE=nc_games_test") and .env.development (containing the line "PGDATABASE=nc_games").
- Run npm setup-dbs to initialise the databases on your machine.
- To run the database in development mode, run npm seed.  This will populate the database with a small dataset.  You can then run npm run start to listen on your local port, and use a service such as insomnia to make api requests.
- Alternatively, you can run npm test app to run through all the api tests created during development. This will populate the database with a smaller dataset and make several API calls to check that everything is working as intended.  Feel free to add your own tests, if you feel confident to do so.


This api was created using Node V-18.14.2 and Postgres 14.5 - run this locally with earlier versions of either Node or Postgres at your own risk. 




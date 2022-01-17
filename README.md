# stunning-engine
To deploy this application locally, you'll need the following:
- a local/cloud PostgreSQL database, with table creation privileges
for whatever user you want to use to connect to the database.
- Node.js (preferably 14.x+)

# Running this locally
- Clone this repository using `git clone https://github.com/dodumosu/stunning-engine.git` into a local directory.
- Change into the directory for your local copy from the previous step.
- Create a file named `.env` in the directory. In it, create the `DATABASE_URL` setting and set it to the connection string like you can find [here](https://stackoverflow.com/questions/3582552/what-is-the-format-for-the-postgresql-connection-string-url).
For example: `DATABASE_URL=postgresql://username:password@localhost/localdb`.
- Run a Node REPL from the repository directory. In it, run the following code:
    ```js
    const pool = require('./src/database/connection');
    const HelperClass = require('./src/database/vehiclestate');
    const helper = new HelperClass(pool);
    helper.createTable();
    ```
    This will create the database table. Quit the Node REPL.
- Back in your CLI, run the following command: `npm start`. This will start the server.
- You can then visit this URL in your browser: http://localhost:3000/api/v1/states. If everything went well, you should receive a JSON response.
- In case you aren't happy with the default port number of 3000, you can set it to a port of your choosing in `.env` by using `PORT={your-preferred-port}`. Particularly if you're using a Unix-like (Linux, Mac OS, etc) ensure that you can use the port number you've set.

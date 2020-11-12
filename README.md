
## Installation and start (backend)

Download project

In the project directory, you can run:

### `yarn install`

After installing packages

### `node ./bin/www`
or
### `nodemon ./bin/www`

You can open [http://localhost:3001](http://localhost:3001) to view it in the browser.

####For use local DB:
Create folder `/config` and copy `db.config.js` from `db_dump`  <br>
Create a local database using the `clockware.sql` from `db_dump`

####These are our routes:

`/cities GET, POST` <br>
`/cities/id GET, PUT, DELETE` <br>
`/clients GET, POST` <br>
`/clients/id GET, PUT, DELETE` <br>
`/masters GET, POST` <br>
`/masters/find GET` <br>
`/masters/id GET, PUT, DELETE` <br>
`/orders GET, POST` <br>
`/orders/id GET, DELETE` <br>



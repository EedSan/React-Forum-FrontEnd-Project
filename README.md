Client dependencies
```
cd client
npm install
```
Server dependencies
```
cd server
npm install
```
Create config dir in server
```
cd server
mkdir config
```
Create `dev.env` file in the config dir with data:
```
PORT=5000
PG_HOST=localhost
PG_PORT=5432
PG_DBNAME=forum_react_project
PG_USER=postgres
PG_PASSWORD=<YOUR_PASSWORD>
JWT_SECRET=<YOUR_SECRET>
```
Create a postgres database named 'forum_react_project'

Start server
```
cd server
npm run dev
```
Start client
```
cd client
npm start
```
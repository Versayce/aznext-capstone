# Requirements:

1. Docker Desktop
2. Node.js
   
### Additional requirements installed via "npm i"

# How To Run:
* Configure ENV with docker vars (adjust naming for your project purposes):
  
  - DB_HOST=localhost
  - DB_PORT=5432
  - DB_USER=capstone_user
  - DB_PASSWORD=capstone_pass
  - DB_NAME=capstone_db
  - DATABASE_URL="postgresql://capstone_user:capstone_pass@localhost:5432/capstone_db?schema=public"



* Run npm i in client and server folders to install dependancies.
* Start docker desktop and run "npm run dockerdb" in project root.
* cd to client folder and run "npm run dev".
* cd to server folder and run "npm run dev".

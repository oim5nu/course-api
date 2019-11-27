## Install & Usage Instructions

### Requirements: git & Node.js > 8 under Windows 7/8/10 (64bit), Mac OSX or Linux (I have not tried linux yet)

Note: MongoMemoryServer may fail if running 32bit win32 system

### Steps for Installation

1. git clone https://bitbucket.org/oim5nu/course-api.git
2. cd course-api
3. npm install
4. mv .env.example .env #this is for mac or linux, or windows, ren .env.example .env
5. edit .env, set it as
   PORT=3001
6. npm run start
7. test api using postman with http://localhost:3001/api/courses or http://localhost:3001/api/students

### Steps for testing

npm run test

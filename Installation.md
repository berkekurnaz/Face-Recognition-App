# Face Recognition App Installation Guide
- 1-) Download this repository to your machine.
```bash
git clone https://github.com/berkekurnaz/Face-Recognition-App.git
```
- 2-) Open Project Folder and Download Packages
```bash
npm install
```
- 3-) Open '.env' file and change database information
```bash
DATABASE_URL=clusterberke-cldba.mongodb.net/test?retryWrites=true&w=majority
DATABASE_NAME=yourMongoDbName
DATABASE_USER_USERNAME=yourMongoDbUserName
DATABASE_USER_PASSWORD=yourMongoDbUserPassword
```
- 4-) Start the project
```bash
npm start
```
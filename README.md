# Face Recognition App
Browser based simple face recognition application. It saves the pictures in its own database and tries to recognize them. 
It can make recognition with your device's camera or images. Can be used with IoT devices(example: Raspberry-Pi).

> **Website :** http://facerecognitionapp.berkekurnaz.com/ <br/>

> **Tutorials :** http://facerecognitionapp.berkekurnaz.com/

## How does it work ?
In fact, the face recognition system works quite simply. There is a mongodb database in the background for saving people and pictures. Then, when you come to the live recognition page, these pictures and people are uploaded to the page. Faceapi.js does everything from now on. <br/>
We love Javascript.

## Used technologies
- Node.js
- Express.js (Web Framework)
- FaceApi.js
- MongoDb
- Materialize Css

## Tutorials
- 1-) Installation Guide : [Youtube Video](https://www.google.com)
- 2-) Database Configure : [Youtube Video](https://www.google.com)
- 3-) Add Person And Image : [Youtube Video](https://www.google.com)
- 4-) Face Recognition : [Youtube Video](https://www.google.com)

## Installation
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

## Contact
> Developer: Berke Kurnaz

> Mail Address: contact@berkekurnaz.com <br/>
> Mail Address: kurnaz.berke1907@gmail.com

> Github: https://github.com/berkekurnaz

## Sample Images
[![N|Image01](https://raw.githubusercontent.com/berkekurnaz/Face-Recognition-App/master/sample_images/sampleimage01.png)]()

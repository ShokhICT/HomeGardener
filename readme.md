# About 
The project consists of basic CRUD operations with validation, project is connected to MongoDb and stores information there, home gardener posts information about the plant such as plant type, variety, planting date, location and even a photo (locally, stores in uploads folder, I wanted to connect api and store photos in cloud services but could not find a free one, and mongoDB seems does not store photos/videos). Also home gardener can update and delete posts, crud operations fully functional, pages are responsive.

# to run the project in localhost
1. npm install multer
2. npm i
3. node app.js
Note: from mongoDB I gave access to any ip adress so you can run the project locally.
In case you can not run the project locally check if mongoDB servers are on and not undergoing maintanance, you might see the message like "Sorry, we're deploying some big changes of our own and are temporarily unable to process your request. We expect to be back up and running very soon." 

# application dependencies
1. Express
2. Mongoose
3. Multer
4. Body-Parser  
5. Pug

# links 
github: https://github.com/ShokhICT/HomeGardener.git
heroku: https://homegardener-4fac3441aec2.herokuapp.com/

# project structure 
/homegardener - app root 

/controllers - the folder containing controller logic 
    /postcontroller.js - File for post-related logic

/node_modules - Directory where npm packages are installed

/routes - Directory for routes
    /postroutes.js - File for post-related routes

/uploads - Directory where locally uploaded files are stored

/views - derectory for pug templates
    /create.pug - Pug template for creating posts
    /delete.pug - Pug template for deleting posts
    /edit.pug - Pug template for editing posts
    /index.pug - Pug template for the main page showing all posts
    /post-detail.pug - Pug template for displaying post details

/.gitignore - Specifies which files and directories to ignore in Git

/app.js - Main application file

/package-lock.json - Exact versions of installed dependencies

/package.json - Project metadata and dependency management

/procfile - Specifies the commands to run on Heroku

/readme.md - Basic documentation
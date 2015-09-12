# Project Sans Pantalones

### Install and Run

    npm install
    bower update
    gulp

Browse to

    http://localhost:5000/

### Project Structure

  * **sanspantalones** - The main project folder
    * **bower_components**
    * **dist** - Distribution folder.  This folder is emptied and created by gulp
    * **node_modules**
    * **src** - Source folder.
      * **backend** - All things related to backend here.  Node modules, app, etc
        * **modules** - all modules
          global.js - all global variables and core functionalities
        * **routes**
      * **frontend** - All things related to the frontend here.  Angular files, markup, styling, etc
        * **components** - Angular modules, directives, controllers
        * **img** - all images, spite sheets, etc
        * **sass** - sass files, do we need this?

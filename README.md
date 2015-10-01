# Project Sans Pantalones

[![Join the chat at https://gitter.im/hai5nguy/sanspantalones](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/hai5nguy/sanspantalones?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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
        * **sass** - sass/scss files

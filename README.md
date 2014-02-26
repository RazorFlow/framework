# RazorFlow Dashboard Framework - JavaScript Edition

## To set up a development environment

    $ npm install

## To develop

    $ npm dev
    
Alternatively, run these in different terminals.

    $ node tools/devserver/index.js
    $ grunt watch

## Folder Structure

    - Gruntfile.js # For building and stuff
    - package.json # For npm
    - src [ Main Source Code ]
       - js
       - less
       - vendor
       - templates
     - tools
       - razordoc
       - rfImageGen
       - genprops
       - devserver
     - build [ This folder is temporary and will be ignored ]
       - js
       - css
       - fonts
       - tmp
     - tests
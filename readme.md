# RazorFlow

## Setup

* clone rf repo

* execute the init.sh file to clone all the required repos.

    $ ./init.sh

* install all npm dependencies in directory jsrf/ phprf/ and examples/internal/

    $ npm install
    
* Execute grunt tasks

    $ grunt build  # jsrf directory
    $ grunt package # phprf directory
    $ grunt build  # examples/internal directory

## Start Server
	
* goto examples/ directory and run php server with index.php as base
	
	$ php -S 0.0.0.0:8080 index.php

## Folder Structure

    - rf
    	- docs
    	- examples # all the examples needed are preset here both for development and production
    	- jsrf # RazorFlow Framework repo
    	- old # contains old js framework repo
    	- phprf # contains the phpwrapper
    	- razordoc 
    	- webrf #RazorFlow website
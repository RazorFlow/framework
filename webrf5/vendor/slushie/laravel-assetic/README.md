Laravel-Assetic
===============

Integrate Assetic(https://github.com/kriswallsmith/assetic) with Laravel 4. Using this package you can easily integrate Assetic in Laravel.


Key Features
------------

1. Assets can be easily maintained within groups
2. Instant single file compilation, concatenation, and minfication
3. Multiple filters can be applied to single group
4. Automatically updates output files when their inputs have been changed
5. Assets can be compiled using `artisan asset:warm`

Usage
-----

Basic usage is relatively straightforward. The package should be installed by adding it to your composer.json like

    "require": {
       "laravel/framework": "4.0.*",
       "slushie/laravel-assetic": "dev-master",
       "lmammino/jsmin4assetic": "1.0.0",
       "leafo/lessphp": "0.4.0"
     },


After running `composer update`, you need to add the service provider (and optionally, alias the `Asset` facade) in your `app/config/app.php` file:

    'providers' => array (
        ...
        'Slushie\LaravelAssetic\LaravelAsseticServiceProvider',
        ...
    ),
    'aliases' => array (
        ...
        'Asset'           => 'Slushie\LaravelAssetic\Facades\AssetFacade',
        ...
    ),
    
Once your app's configuration has been updated, generate the package config:

    > php artisan config:publish slushie/laravel-assetic

Now the laravel-assetic configuration file will be available at: 

    app/config/packages/slushie/laravel-assetic/config.php

Finally, edit the configuration file `app/config/packages/slushie/assetic/config.php` file to define your assets. You can define multiple groups, each with different filters and assets.


Defining Filters
----------------

Filters are defined within the package configuration file.

For example,

    'filters' => array(
      // filter with a closure constructor
      'yui_js' => function() {
        return new Assetic\Filter\Yui\JsCompressorFilter('yui-compressor.jar');
      },
      
      // filters with a simple class name
      'js_min'      => 'Assetic\Filter\JSMinFilter',
      'css_import'  => 'Assetic\Filter\CssImportFilter',
      'css_min'     => 'Assetic\Filter\CssMinFilter',
      'css_rewrit'  => 'Assetic\Filter\CssRewriteFilter',
      'emed_css'    => 'Assetic\Filter\PhpCssEmbedFilter',
      'coffe_script'=> 'Assetic\Filter\CoffeeScriptFilter',
      'less_php'    => 'Assetic\Filter\LessphpFilter',
    ),


Adding Assets to Groups
-----------------------

Each group defines `assets` and `filters` as input, plus an `output` file that should be included in your view.

For example,

    'groups' => array(

      /*
       * Input files are defined under "assets", filters are defined
       * under "filters", and the output path is defined under "output".
       * By default, relative paths (for input and output files) 
       * are assumed to be beneath the public folder. 
       *
       * Finally, link to the output of this group:
       * <script src="<?php echo Asset::url('singlejs-main'); ?>"></script>
       */

      'singlejs-main' => array(
        // these are the input files for this group
        'assets' => array(
          'assets/javascripts/coolarize/*js',
          'assets/javascripts/common/search.js',
          'assets/javascripts/next/next.js'

          // its also possible to include absolute paths here
          // eg, '/home/user/scripts/jquery-ui.js'
        ),

        // named filters are defined below
        'filters' => array(
          'js_min' // Specify the filter by name, not by class.
        ),

        // output path (relative to public)
        // NB: must be rewritable
        'output' => 'singlejs-main.js'
      ),

       // Adding css to singlecss-main group
      'singlecss-main' => array(
        // you can define multiple filters in an array
        'filters' => array(
          'css_import',
          'css_rewrite',
          'css_min'
        ),

        // input assets defined below
        'assets' => array(
          'assets/stylesheets/frontend/font-awesome/css/font-awesome.css',
          'assets/stylesheets/frontend/prettyPhoto/css/*css',
          'assets/stylesheets/frontend/bootstrap/css/bootstrap.min.css'
        ),

        // output path (relative to public)
        // NB: must be rewritable
        'output' => 'singlecss-main.css'
      ),

      
      // adding less files to singlecss-less group
      'singlecss-less' => array(
        'filters' => array(
          'less_php',
          'css_min'
        ),

        // named assets defined below
        'assets' => array(
          'assets/css/less/master.less'
        ),

        // output path (relative to public)
        // NB: must be rewritable
        'output' => 'singlecss-less.css'
      ),
    ),

Using in Views
--------------

Once defined, your groups can then be accessed from within your views using the `Asset` facade. To link to the `singlejs-main` group, you can use the `Asset::url()` method as follows:

    <script src="<?php echo Asset::url('singlejs-main'); ?>"></script>

This will output the URL to the asset group (in this example, `/singlejs-main.js`) and
simultaneously generate the file using Assetic, including joining all files and
running whatever filters you've defined.

You can also generate the asset output files via the artisan command:

    > php artisan asset:warm

Of course, this can be performed as a composer `post-install` command to generate
assets at deployment time.

More Information:
----------------

More information can be acquired by reading through the source, which is
fully documented, or you may feel free to raise issues at https://github.com/slushie/laravel-assetic/issues

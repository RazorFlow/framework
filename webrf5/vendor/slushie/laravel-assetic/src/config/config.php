<?php
/**
 * Configure laravel-assetic in this file.
 * File modified by AARYAN ADITYA
 * @package slushie/laravel-assetic
 */

return array(
  /*
   * Groups are named settings containing assets and filters,
   * plus an output file.
   */
  'groups' => array(

      /*
      * First create a group then add scripts into group.. 
      * if you want add folder then mention folderpath/*extension
      * By Default it will take public path.. you can also mention base path.
      * mention output file name  where scripts should compile...
      * finally add group name in views as
      * <script src="<?php echo Asset::url('singlejs-frontend'); ?>"></script>
      */

    //This group associated with javascripts of front-end website

     /*
     @external scrpt call in views :
     <script src="<?php echo Asset::url('singlejs-frontend'); ?>"></script>
     */ 

    'singlejs-main' => array(
      // named filters are defined below
      'filters' => array(
        'js_min' // Here you need to mention filter name
      ),

      // named assets defined below
      'assets' => array(
        'assets/javascripts/coolarize/*js',
        'assets/javascripts/common/search.js',
        'assets/javascripts/nect/next.js'
        // its also possible to include assets here directly
        // eg, public_path('jquery-ui.js')
      ),

      // output path (probably relative to public)
      // must be rewritable
      'output' => 'singlejs-main.js'
    ),

     // Adding css to singlecss-main group

    'singlecss-main' => array(
      // you define multiple filters in array
      'filters' => array(
        'css_import',
        'css_rewrit',
        'css_min'
      ),

      // named assets defined below
      'assets' => array(
        'assets/stylesheets/frontend/font-awesome/css/font-awesome.css',
        'assets/stylesheets/frontend/prettyPhoto/css/*css',
        'assets/stylesheets/frontend/bootstrap/css/bootstrap.min.css'

        // its also possible to include assets here directly
        // eg, public_path('jquery-ui.js')
      ),

      // output path (probably relative to public)
      // must be rewritable
      'output' => 'singlecss-main.css'
    ),

    
    // Adding less files to bast-public-less group

    'bast-public-less' => array(
      // named filters are defined below
      'filters' => array(
        'css_import',
        'css_rewrit',
        'less_php',
        'css_min'
      ),

      // named assets defined below
      'assets' => array(
        'assets/css/less/master.less'
      ),

      // output path (probably relative to public)
      // must be rewritable
      'output' => 'bast-public-less.css'
    ),

  ),

  'filters' => array(
    // filter with a closure constructor
    'yui_js' => function() {
      return new Assetic\Filter\Yui\JsCompressorFilter('yui-compressor.jar');
    },

    // filter with a simple class name
    'js_min'      => 'Assetic\Filter\JSMinFilter',
    'css_import'  => 'Assetic\Filter\CssImportFilter',
    'css_min'     => 'Assetic\Filter\CssMinFilter',
    'css_rewrit'  => 'Assetic\Filter\CssRewriteFilter',
    'emed_css'    => 'Assetic\Filter\PhpCssEmbedFilter',
    'coffe_script'=> 'Assetic\Filter\CoffeeScriptFilter',
    'less_php'    => 'Assetic\Filter\LessphpFilter',
  ),

  'assets' => array(
    // name => absolute path to asset file
    // 'jquery' => public_path('script/jquery.js'),
  )
);
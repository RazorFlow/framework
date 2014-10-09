<?php
/*
 * UseResponse main configuration file.
 *
 * ATTENTION:
 * Manual changes may cause errors and/or other system instabilities.
 * Please, be assured in the fact that you do.
 */

/* PRODUCTION environment */
$config = array(

    /* Errors displaying  */
    'show_errors' => true,

    /* PHP directives */
    'phpSettings' => array(
        'session.gc_maxlifetime'  => 1209600,
        'session.cookie_lifetime' => 1209600,
    ),

    /* Application resources */
    'resources' => array(

        /* Database */
        'db' => array(
            'adapter' => 'pdo_mysql',
            'params'  => array(
                'host'       => '127.0.0.1',
                'port'       => 3306,
                'dbname'     => 'useresponse',
                'username'   => 'root',
                'password'   => '',
                'prefix'     => 'ur_',
                'persistent' => false,
            )
        ),

        /* Front Controller */
        'frontController' => array(
            'baseUrl' => 'http://192.168.1.112/forum',
            'plugins' => array(
                'System_Lib_Controller_Plugin_CrashReport'
            ),
        ),

        /* Cache Manager */
        'cachemanager' => array(
            'globalCacheEnabled' => false
        ),

        /* Translate */
        'translate' => array(
            /* available values: cookies, user_settings, system_settings */
            'languageSource' => 'system_settings'
        ),

        /* Assets combining/minifying */
        'minify' => array(
            'enable' => true
        )
    ),

    /* Supercache */
    'supercache_enabled' => false
);

/* Environment overrides */
switch (APPLICATION_ENV) {

    /* DEVELOPMENT environment */
    case 'development':
        $config['show_errors']                           = true;
        $config['resources']['db']['params']['profiler'] = array(
            'enabled' => true,
            'class'   => 'Zend_Db_Profiler_Firebug'
        );
        $config['resources']['view']['debug']            = false;
        $config['resources']['minify']['enable']         = false;
        $config['perfomance_test']                       = false;
        break;
}

return $config;

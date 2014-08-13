<?php
    define('PERCH_LICENSE_KEY', '$licenseKey');

    define("PERCH_DB_USERNAME", '$db_username');
    define("PERCH_DB_PASSWORD", '$db_password');
    define("PERCH_DB_SERVER", "$db_server");
    define("PERCH_DB_DATABASE", "$db_database");
    define("PERCH_DB_PREFIX", "perch2_");
    
    define('PERCH_TZ', '$tz');

    define('PERCH_EMAIL_FROM', '$userEmail');
    define('PERCH_EMAIL_FROM_NAME', '$userGivenName $userFamilyName');

    define('PERCH_LOGINPATH', '$loginpath');
    define('PERCH_PATH', str_replace(DIRECTORY_SEPARATOR.'config', '', __DIR__));
    define('PERCH_CORE', PERCH_PATH.DIRECTORY_SEPARATOR.'core');

    define('PERCH_RESFILEPATH', PERCH_PATH . DIRECTORY_SEPARATOR . 'resources');
    define('PERCH_RESPATH', PERCH_LOGINPATH . '/resources');
    
    define('PERCH_HTML5', true);
 
?>
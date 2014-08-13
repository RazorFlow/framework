<?php
    define('PERCH_LICENSE_KEY', 'P21209-DYQ384-GJV983-WQQ101-GAF005');

    define("PERCH_DB_USERNAME", 'username');
    define("PERCH_DB_PASSWORD", '');
    define("PERCH_DB_SERVER", "localhost:3306");
    define("PERCH_DB_DATABASE", "perch");
    define("PERCH_DB_PREFIX", "perch2_");
    
    define('PERCH_TZ', 'Asia/Kolkata');

    define('PERCH_EMAIL_FROM', 'anirudh@razorflow.com');
    define('PERCH_EMAIL_FROM_NAME', 'Anirudh Sanjeev');

    define('PERCH_LOGINPATH', '/perch');
    define('PERCH_PATH', str_replace(DIRECTORY_SEPARATOR.'config', '', dirname(__FILE__)));
    define('PERCH_CORE', PERCH_PATH.DIRECTORY_SEPARATOR.'core');

    define('PERCH_RESFILEPATH', PERCH_PATH . DIRECTORY_SEPARATOR . 'resources');
    define('PERCH_RESPATH', PERCH_LOGINPATH . '/resources');
    
    define('PERCH_HTML5', true);
 
?>
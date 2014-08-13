<?php

class PerchBlog_Cache
{
    static private $instance;
    private $cache = array();

    private static $disabled = false;
        
    public static function fetch()
    {       
        if (!isset(self::$instance)) {
            $c = __CLASS__;
             self::$instance = new $c;
        }

         return self::$instance;
    }


    
    public function exists($key)
    {
        return array_key_exists($key, $this->cache);
    }
    
    public function get($key)
    {
        if (array_key_exists($key, $this->cache)) {
            return $this->cache[$key];
        }
        
        return false;
    }
    
    public function set($key, $value)
    {
        $this->cache[$key] = $value;
    }


    public static function disable()
    {
        self::$disabled = true;
    }

    public static function save_static($key, $contents)
    {
        if (PERCH_PRODUCTION_MODE < PERCH_PRODUCTION) return false;
        if (self::$disabled) return false;

        PerchUtil::debug('Caching: '.$key);
        file_put_contents(PerchUtil::file_path(PERCH_RESFILEPATH.'/perch_blog.'.$key.'.cache'), $contents);
    }

    public static function get_static($key, $minutes)
    {

        if (PERCH_PRODUCTION_MODE < PERCH_PRODUCTION) return false;
        if (self::$disabled) return false;

        PerchUtil::debug('Fetching from cache: '.$key);

        $file = PerchUtil::file_path(PERCH_RESFILEPATH.'/perch_blog.'.$key.'.cache');
        
        if (file_exists($file)) {
            $stat = stat($file);
            $mod_time = (int)$stat['mtime'];
            
            if (time()-($minutes*60)<$mod_time) {
                return file_get_contents($file);
            }
        }else{
            PerchUtil::debug('Cache file not found: '.$key);
        }
        return false;
    }
    
    public static function expire_all()
    {
        $files = glob(PerchUtil::file_path(PERCH_RESFILEPATH.'/perch_blog.*.cache'));
        if (PerchUtil::count($files)) {
            foreach ($files as $filename) {
               unlink($filename);
            }
        }
    }
}

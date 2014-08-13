<?php

class PerchBlog_Akismet
{
    public static $apiKey;
    
    private static $host = 'rest.akismet.com';
    
    public static function verify_key($key)
    {
        self::$apiKey = $key;
        PerchUtil::debug($_SERVER);
        PerchUtil::debug('Checking Akismet API key: '.$key);
        
        $siteURL = self::get_site_url();
        
        $data = array();
        $data['blog'] = $siteURL;
        $data['key'] = $key;
        
        $result = self::make_request('verify-key', $data);
        
        if ($result=='valid') {
            PerchUtil::debug('Akismet key ok.');
            return true;
        }
        PerchUtil::debug('Akismet key failed.');
        return false;
    }
    
    public static function check_message_is_spam($key, $fields, $environment)
    {
        self::$apiKey = $key;
        
        PerchUtil::debug('Checking Akismet for spam');
        
        $Perch = Perch::fetch();
        
        $data = array();
        $data['blog']                 = self::get_site_url();
        $data['user_ip']              = $environment['REMOTE_ADDR'];
        $data['user_agent']           = $environment['HTTP_USER_AGENT'];
        $data['referrer']             = $environment['HTTP_REFERER'];
        $data['permalink']            = $Perch->get_page();
        $data['comment_type']         = 'comment';
        $data['comment_author']       = (isset($fields['name'])  ? $fields['name']  : '');
        $data['comment_author_email'] = (isset($fields['email']) ? $fields['email'] : '');
        $data['comment_author_url']   = (isset($fields['url'])   ? $fields['url']   : '');
        $data['comment_content']      = (isset($fields['body'])  ? $fields['body']  : '');
        
        $data = array_merge($environment, $data);
        
        $result = self::make_request('comment-check', $data);
        
        if ($result=='true') return true;
        
        return false;
    }
    
    public static function submit_ham($key, $fields, $environment)
    {
        self::$apiKey = $key;
        
        PerchUtil::debug('Submitting ham to Akismet');
        
        $Perch = Perch::fetch();
        
        $data = array();
        $data['blog']                 = self::get_site_url();
        $data['user_ip']              = $environment['REMOTE_ADDR'];
        $data['user_agent']           = $environment['HTTP_USER_AGENT'];
        $data['referrer']             = $environment['HTTP_REFERER'];
        //$data['permalink']            = $Perch->get_page();
        $data['comment_type']         = 'comment';
        $data['comment_author']       = (isset($fields['name'])  ? $fields['name']  : '');
        $data['comment_author_email'] = (isset($fields['email']) ? $fields['email'] : '');
        $data['comment_author_url']   = (isset($fields['url'])   ? $fields['url']   : '');
        $data['comment_content']      = (isset($fields['body'])  ? $fields['body']  : '');
        
        $data = array_merge($environment, $data);
        
        $result = self::make_request('submit-ham', $data);
    }
    
    public static function submit_spam($key, $fields, $environment)
    {
        self::$apiKey = $key;
        
        PerchUtil::debug('Submitting spam to Akismet');
        
        $Perch = Perch::fetch();
        
        $data = array();
        $data['blog']                 = self::get_site_url();
        $data['user_ip']              = $environment['REMOTE_ADDR'];
        $data['user_agent']           = $environment['HTTP_USER_AGENT'];
        $data['referrer']             = $environment['HTTP_REFERER'];
        //$data['permalink']            = $Perch->get_page();
        $data['comment_type']         = 'comment';
        $data['comment_author']       = (isset($fields['name'])  ? $fields['name']  : '');
        $data['comment_author_email'] = (isset($fields['email']) ? $fields['email'] : '');
        $data['comment_author_url']   = (isset($fields['url'])   ? $fields['url']   : '');
        $data['comment_content']      = (isset($fields['body'])  ? $fields['body']  : '');
        
        $data = array_merge($environment, $data);
        
        $result = self::make_request('submit-spam', $data);
    }
    
    
    private static function make_request($type, $data)
    {
        $Perch = Perch::fetch();
        
        $request = http_build_query($data);

        $host = self::$apiKey.'.'.self::$host;
        $path = '/1.1/'.$type;
        $port = 80;
        $akismet_ua = "Perch/".$Perch->version." | perch_blog";
        $content_length = strlen($request);
        
        $http_request  = "POST $path HTTP/1.0\r\n";
        $http_request .= "Host: $host\r\n";
        $http_request .= "Content-Type: application/x-www-form-urlencoded\r\n";
        $http_request .= "Content-Length: {$content_length}\r\n";
        $http_request .= "User-Agent: {$akismet_ua}\r\n";
        $http_request .= "\r\n";
        $http_request .= $request;
        $response = '';
        if(false!=($fs = @fsockopen($host, $port, $errno, $errstr, 10))) {
            fwrite($fs, $http_request);
            while (!feof($fs)) $response .= fgets( $fs, 1160 ); // One TCP-IP packet
            fclose($fs);
            $response = explode("\r\n\r\n", $response, 2);
        }
        if (isset($response[1])) return $response[1];
        return false;
    }
    
    private static function get_site_url()
    {
        $Settings = PerchSettings::fetch();
        $siteURL = $Settings->get('siteURL')->settingValue();
        if (substr($siteURL, 0, 4)!='http') $siteURL = 'http://'.$_SERVER['HTTP_HOST'];
        
        return $siteURL;
    }
    
}

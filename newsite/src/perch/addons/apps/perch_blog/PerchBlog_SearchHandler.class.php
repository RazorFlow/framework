<?php

class PerchBlog_SearchHandler implements PerchAPI_SearchHandler
{
    
    private static $tmp_url_vars = false;
    
    public static function get_search_sql($key)
    {
        $API = new PerchAPI(1.0, 'perch_blog');
        $db = $API->get('DB');
        
        $sql = 'SELECT \''.__CLASS__.'\' AS source, MATCH(postTitle, postDescRaw, postTags) AGAINST('.$db->pdb($key).') AS score, postTitle, postSlug, postDateTime, postDescHTML, postID, sectionSlug, "", ""
	            FROM '.PERCH_DB_PREFIX.'blog_posts p, '.PERCH_DB_PREFIX.'blog_sections s
	            WHERE postStatus=\'Published\'
	                AND postDateTime<'.$db->pdb(date('Y-m-d H:i:s')).'
                    AND p.sectionID=s.sectionID
	                AND MATCH(postTitle, postDescRaw, postTags) AGAINST('.$db->pdb($key).')';
	    
	    return $sql;
    }
    
    public static function get_backup_search_sql($key)
    {
        $API = new PerchAPI(1.0, 'perch_blog');
        $db = $API->get('DB');
        
        $sql = 'SELECT \''.__CLASS__.'\' AS source, postDateTime AS score, postTitle, postSlug, postDateTime, postDescHTML, postID, sectionSlug, "", ""
	            FROM '.PERCH_DB_PREFIX.'blog_posts p, '.PERCH_DB_PREFIX.'blog_sections s
	            WHERE postStatus=\'Published\'
	                AND postDateTime<'.$db->pdb(date('Y-m-d H:i:s')).'
                    AND p.sectionID=s.sectionID 
	                AND ( 
	                    concat("  ", postTitle, "  ") REGEXP '.$db->pdb('[[:<:]]'.$key.'[[:>:]]').' 
                    OR  concat("  ", postDescRaw, "  ") REGEXP '.$db->pdb('[[:<:]]'.$key.'[[:>:]]').'    
                    OR  concat("  ", postTags, "  ") REGEXP '.$db->pdb('[[:<:]]'.$key.'[[:>:]]').'     
	                    ) ';
	    
	    return $sql;
    }
    
    public static function format_result($key, $options, $result)
    {
        $result['postTitle']    = $result['col1'];
        $result['postSlug']     = $result['col2'];
        $result['postDateTime'] = $result['col3'];
        $result['postDescHTML'] = $result['col4'];
        $result['postID']       = $result['col5'];
        $result['_id']          = $result['col5'];
        $result['sectionSlug']  = $result['col6'];
        
        $Settings   = PerchSettings::fetch();
        
        $html = PerchUtil::excerpt_char($result['postDescHTML'], $options['excerpt-chars'], true);
        // keyword highlight
        $html = preg_replace('/('.$key.')/i', '<span class="keyword">$1</span>', $html);
                        
        $match = array();
        
        $match['url']     = $Settings->get('perch_blog_post_url')->settingValue();
        self::$tmp_url_vars = $result;
        $match['url'] = preg_replace_callback('/{([A-Za-z0-9_\-]+)}/', array('self', "substitute_url_vars"), $match['url']);
        self::$tmp_url_vars = false;
        
        $match['title']   = $result['postTitle'];
        $match['excerpt'] = $html;
        $match['key']     = $key;
        return $match;
    }
    
    private static function substitute_url_vars($matches)
	{
	    $url_vars = self::$tmp_url_vars;
    	if (isset($url_vars[$matches[1]])){
    		return $url_vars[$matches[1]];
    	}
	}
    
}

<?php

class PerchBlog_Author extends PerchAPI_Base
{
	protected $table  = 'blog_authors';
    protected $pk     = 'authorID';

    public function to_array()
    {
    	$out = parent::to_array();

    	if ($out['authorDynamicFields'] != '') {
            $dynamic_fields = PerchUtil::json_safe_decode($out['authorDynamicFields'], true);
            if (PerchUtil::count($dynamic_fields)) {
                foreach($dynamic_fields as $key=>$value) {
                    $out['perch_'.$key] = $value;
                }
            }
            $out = array_merge($dynamic_fields, $out);
        }

        return $out;
    }
}


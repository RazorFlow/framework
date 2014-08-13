<?php

class PerchBlog_Section  extends PerchAPI_Base
{
    protected $table  = 'blog_sections';
    protected $pk     = 'sectionID';
    
    
    public function to_array()
    {
    	$out = parent::to_array();

    	if ($out['sectionDynamicFields'] != '') {
            $dynamic_fields = PerchUtil::json_safe_decode($out['sectionDynamicFields'], true);
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


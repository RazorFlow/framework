<?php

class PerchBlog_Category  extends PerchAPI_Base
{
    protected $table  = 'blog_categories';
    protected $pk     = 'categoryID';
    
    
    public function delete()
    {
        $this->db->delete(PERCH_DB_PREFIX.'blog_posts_to_categories', 'categoryID', $this->id());
        parent::delete();
    }

    public function to_array()
    {
    	$out = parent::to_array();

    	if ($out['categoryDynamicFields'] != '') {
            $dynamic_fields = PerchUtil::json_safe_decode($out['categoryDynamicFields'], true);
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

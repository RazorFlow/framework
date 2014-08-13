<?php

class PerchBlog_Tag  extends PerchAPI_Base
{
    protected $table  = 'blog_tags';
    protected $pk     = 'tagID';
    
    
    public function delete()
    {
        $this->db->delete(PERCH_DB_PREFIX.'blog_posts_to_tags', 'tagID', $this->id());
        parent::delete();
    }
}


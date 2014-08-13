<?php

class PerchBlog_Comment extends PerchAPI_Base
{
	protected $table  = 'blog_comments';
    protected $pk     = 'commentID';


    public function set_status($status)
    {

        $API = new PerchAPI(1.0, 'perch_blog');

        $Settings = $API->get('Settings');
        $akismet_api_key = $Settings->get('perch_blog_akismet_key')->val();

        // Are we using akismet?
        if ($akismet_api_key) {

            if ($this->commentStatus()=='SPAM' && $status=='LIVE') {
                // was marked as spam, but isn't. So tell askismet.
                
                $spam_data = PerchUtil::json_safe_decode($this->commentSpamData(), true);

                if (PerchUtil::count($spam_data)){
                    PerchBlog_Akismet::submit_ham($akismet_api_key, $spam_data['fields'], $spam_data['environment']);
                }
            }

            if ($status=='SPAM') {
                // was marked as not spam, but is spam.
                
                $spam_data = PerchUtil::json_safe_decode($this->commentSpamData(), true);

                if (PerchUtil::count($spam_data)){
                    PerchBlog_Akismet::submit_spam($akismet_api_key, $spam_data['fields'], $spam_data['environment']);
                }
            }


        }

        $data = array('commentStatus'=>$status);
        $this->update($data);

        $Posts = new PerchBlog_Posts;
        $Post = $Posts->find($this->postID());
        if (is_object($Post)) {
            $Post->update_comment_count();
        }

    }


    public function to_array($template_ids=false)
    {
        $out = parent::to_array();
               
        if (PerchUtil::count($template_ids) && in_array('postURL', $template_ids)) {
            $API = new PerchAPI(1.0, 'perch_blog');
            $Posts = new PerchBlog_Posts($API);
            $Post = $Posts->find($this->postID());
            if (is_object($Post)) {
                $out['postURL'] = $Post->postURL();
            }
        }

        if ($out['commentDynamicFields'] != '') {
            $dynamic_fields = PerchUtil::json_safe_decode($out['commentDynamicFields'], true);
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

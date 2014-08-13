<?php

    PerchSystem::register_search_handler('PerchBlog_SearchHandler');

    require('PerchBlog_Posts.class.php');
    require('PerchBlog_Post.class.php');
    require('PerchBlog_Categories.class.php');
    require('PerchBlog_Category.class.php');
    require('PerchBlog_Sections.class.php');
    require('PerchBlog_Section.class.php');
    require('PerchBlog_Comments.class.php');
    require('PerchBlog_Comment.class.php');
    require('PerchBlog_Tags.class.php');
    require('PerchBlog_Tag.class.php');
    require('PerchBlog_Authors.class.php');
    require('PerchBlog_Author.class.php');
    require('PerchBlog_Cache.class.php');
    require('PerchBlog_SearchHandler.class.php');

    perch_blog_check_preview();

    function perch_blog_form_handler($SubmittedForm)
    {
        if ($SubmittedForm->formID=='comment' && $SubmittedForm->validate()) {
            $API  = new PerchAPI(1.0, 'perch_blog');
            $Comments = new PerchBlog_Comments($API);
            $Comments->receive_new_comment($SubmittedForm);
        }
        $Perch = Perch::fetch();
        PerchUtil::debug($Perch->get_form_errors($SubmittedForm->formID));
        
    }
    
    function perch_blog_recent_posts($count=10, $return=false) 
    {
        $opts = array(
                'count'=>$count,
                'template'=>'post_in_list.html',
                'sort'=>'postDateTime',
                'sort-order'=>'DESC',
            );

        $r = perch_blog_custom($opts, $return);
    	if ($return) return $r;
    	echo $r;
    }
    
    function perch_blog_post($id_or_slug, $return=false)
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $opts = array(
            'template'=>false
            );

        if (is_numeric($id_or_slug)) {
            $opts['_id'] = intval($id_or_slug);            
        }else{
            $opts['filter'] = 'postSlug';
            $opts['match']  = 'eq';
            $opts['value']  = $id_or_slug;
        }
        
        $r = perch_blog_custom($opts, $return);
        if ($return) return $r;
        echo $r;
    }


    /**
     * Get the comments for a specific post
     * @param  string  $id_or_slug   ID or slug for the post
     * @param  array $opts=false   Options
     * @param  boolean $return=false Return or output
     */
    function perch_blog_post_comments($id_or_slug, $opts=false, $return=false)
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $API  = new PerchAPI(1.0, 'perch_blog');   

        $defaults = array();
        $defaults['template']        = 'comment.html';
        $defaults['count']           = false;
        $defaults['sort']            = 'commentDateTime';
        $defaults['sort-order']      = 'ASC';
        $defaults['paginate']        = false;
        $defaults['pagination-var']  = 'comments';

        if (is_array($opts)) {
            $opts = array_merge($defaults, $opts);
        }else{
            $opts = $defaults;
        }

        $postID = false;

        if (is_numeric($id_or_slug)) {
            $postID = intval($id_or_slug);            
        }else{
            $BlogPosts = new PerchBlog_Posts($API);
            $Post = $BlogPosts->find_by_slug($id_or_slug);
            if (is_object($Post)) {
                $postID = $Post->id();
            }
        }


        $Comments = new PerchBlog_Comments($API);

        $r = $Comments->get_custom($postID, $opts);

        if ($return) return $r;

        echo $r;
    }
    
    function perch_blog_post_comment_form($id_or_slug, $opts=false, $return=false)
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $API  = new PerchAPI(1.0, 'perch_blog'); 

        $defaults = array();
        $defaults['template']        = 'comment_form.html';

        if (is_array($opts)) {
            $opts = array_merge($defaults, $opts);
        }else{
            $opts = $defaults;
        }


        $postID = false;

        $BlogPosts = new PerchBlog_Posts($API);

        if (is_numeric($id_or_slug)) {
            $postID = intval($id_or_slug);            
        }else{
            $Post = $BlogPosts->find_by_slug($id_or_slug);
            if (is_object($Post)) {
                $postID = $Post->id();
            }
        }

        $Post = $BlogPosts->find($postID);


        $Template = $API->get('Template');
        $Template->set('blog/'.$opts['template'], 'blog');
        $html = $Template->render($Post);
        $html = $Template->apply_runtime_post_processing($html);
        
        if ($return) return $html;
        echo $html;


    }

    /**
     * 
     * Get the content of a specific field
     * @param mixed $id_or_slug the id or slug of the post
     * @param string $field the name of the field you want to return
     * @param bool $return
     */
    function perch_blog_post_field($id_or_slug, $field, $return=false)
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $API  = new PerchAPI(1.0, 'perch_blog');
        $BlogPosts = new PerchBlog_Posts($API);
        
        $r = false;
        
        if (is_numeric($id_or_slug)) {
            $postID = intval($id_or_slug);
            $Post = $BlogPosts->find($postID);
        }else{
            $Post = $BlogPosts->find_by_slug($id_or_slug);
        }
        
        $encode = true;
        if ($field=='postDescHTML') $encode = false;

        if (is_object($Post)) {
            $field = $Post->$field();
            if (is_array($field)) {
                if (isset($field['processed'])) {
                    $r = $field['processed'];
                    $encode = false;
                }elseif (isset($field['_default'])) {
                    $r = $field['_default'];
                }else{
                    $r = $field;
                }
            }else{
                $r = $field;
            }
        }
        
        if ($return) return $r;
        
        if ($encode) {
            $HTML = $API->get('HTML');
            echo $HTML->encode($r);
        }else{
            echo $r;
        }
        
    }
	
    /**
     * 
     * Gets the categories used for a post to display 
     * @param string $id_or_slug id or slug of the current post
     * @param string $template template to render the categories
     * @param bool $return if set to true returns the output rather than echoing it
     */
    function perch_blog_post_categories($id_or_slug, $opts='post_category_link.html', $return=false)
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $default_opts = array(
            'template'             => 'post_category_link.html',
            'skip-template'        => false,
            'cache'                => true,
        );

        if (!is_array($opts)) {
            $opts = array('template'=>$opts);
        }

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template']) {
            $return = true;
        }

        $cache = false;
        $template = $opts['template'];

        if ($opts['cache']) {
            $cache_key = 'perch_blog_post_categories'.md5($id_or_slug.serialize($opts));
            $cache = PerchBlog_Cache::get_static($cache_key, 10);

            if ($opts['skip-template']) {
                $cache = unserialize($cache);
            }
        }

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }


        $API  = new PerchAPI(1.0, 'perch_blog');
        $BlogPosts = new PerchBlog_Posts($API);
        
        $postID = false;
        
        if (is_numeric($id_or_slug)) {
            $postID = intval($id_or_slug); 
        }else{
            $Post = $BlogPosts->find_by_slug($id_or_slug);
            if (is_object($Post)) {
                $postID = $Post->id();
            }
        }
        
        if ($postID!==false) {
            $Categories = new PerchBlog_Categories();
            $cats   = $Categories->get_for_post($postID);
            
            if ($opts['skip-template']) {

                $out = array();
                foreach($cats as $Cat) {
                    $out[] = $Cat->to_array();
                }

                if ($opts['cache']) {
                    PerchBlog_Cache::save_static($cache_key, serialize($out)); 
                }

                return $out;

            }

            $Template = $API->get('Template');
            $Template->set('blog/'.$template, 'blog');

            $r = $Template->render_group($cats, true);

            if ($r!='') PerchBlog_Cache::save_static($cache_key, $r);            
            
            if ($return) return $r;
            echo $r;
        }
        
        return false;
    }
	
    /**
     * 
     * Gets the tags used for a post to display 
     * @param string $id_or_slug id or slug of the current post
     * @param string $template template to render the tags
     * @param bool $return if set to true returns the output rather than echoing it
     */
    function perch_blog_post_tags($id_or_slug, $opts='post_tag_link.html', $return=false)
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $default_opts = array(
            'template'             => 'post_tag_link.html',
            'skip-template'        => false,
            'cache'                => true,
        );

        if (!is_array($opts)) {
            $opts = array('template'=>$opts);
        }

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template']) {
            $return = true;
        }

        $cache = false;
        $template = $opts['template'];

        if ($opts['cache']) {
            $cache_key = 'perch_blog_post_tags'.md5($id_or_slug.serialize($opts));
            $cache = PerchBlog_Cache::get_static($cache_key, 10);

            if ($opts['skip-template']) {
                $cache = unserialize($cache);
            }
        }

        

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }

        $API  = new PerchAPI(1.0, 'perch_blog');
        $BlogPosts = new PerchBlog_Posts($API);
        
        $postID = false;
        
        if (is_numeric($id_or_slug)) {
            $postID = intval($id_or_slug); 
        }else{
            $Post = $BlogPosts->find_by_slug($id_or_slug);
            if (is_object($Post)) {
                $postID = $Post->id();
            }
        }
        
        if ($postID!==false) {
            $Tags = new PerchBlog_Tags();
            $tags   = $Tags->get_for_post($postID);

            if ($opts['skip-template']) {

                $out = array();
                foreach($tags as $Tag) {
                    $out[] = $Tag->to_array();
                }

                if ($opts['cache']) {
                    PerchBlog_Cache::save_static($cache_key, serialize($out)); 
                }

                return $out;

            }
            
            $Template = $API->get('Template');
            $Template->set('blog/'.$template, 'blog');

            $r = $Template->render_group($tags, true);
            
            if ($r!='') PerchBlog_Cache::save_static($cache_key, $r);  

            if ($return) return $r;
            echo $r;
        }
        
        return false;
    }
    
    function perch_blog_custom($opts=false, $return=false)
    {        
        if (isset($opts['skip-template']) && $opts['skip-template']==true) $return = true; 
        
        $API  = new PerchAPI(1.0, 'perch_blog');
        
        $BlogPosts = new PerchBlog_Posts($API);

        // tidy
        if (isset($opts['category']) && !is_array($opts['category'])) $opts['category'] = rtrim($opts['category'], '/');
        if (isset($opts['tag']) && !is_array($opts['tag'])) $opts['tag'] = rtrim($opts['tag'], '/');
        if (isset($opts['pagination_var'])) $opts['pagination-var'] = $opts['pagination_var']; 
        
        $r = $BlogPosts->get_custom($opts);
        
    	if ($return) return $r;
    	
    	echo $r;
    }
    
    /**
     * 
     * Builds an archive listing of categories. Echoes out the resulting mark-up and content
     * @param string $template
     * @param bool $return if set to true returns the output rather than echoing it
     */
    function perch_blog_categories($opts='category_link.html', $return=false)
    {
        $default_opts = array(
            'template'             => 'category_link.html',
            'skip-template'        => false,
            'cache'                => true,
            'include-empty'        => false,
            'filter'               => false,
            'section'              => false,
        );

        if (!is_array($opts)) {
            $opts = array('template'=>$opts);
        }

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template']) $return = true;

        if (isset($opts['pagination_var'])) $opts['pagination-var'] = $opts['pagination_var']; 

        $cache = false;

        if ($opts['cache']) {
            $cache_key  = 'perch_blog_categories'.md5(serialize($opts));
            $cache      = PerchBlog_Cache::get_static($cache_key, 10);
        }

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }

        $API  = new PerchAPI(1.0, 'perch_blog');
        $BlogPosts = new PerchBlog_Posts($API);
        
        $Categories = new PerchBlog_Categories();
        $r      = $Categories->get_custom($opts);

        if ($r!='' && $opts['cache']) PerchBlog_Cache::save_static($cache_key, $r);
        
        if ($return) return $r;
        echo $r;
        
        return false;
    }
    
    /**
     * Gets the title of a category from its slug
     *
     * @param string $categorySlug 
     * @param string $return 
     * @return void
     * @author Drew McLellan
     */
    function perch_blog_category($categorySlug, $return=false)
    {
        $categorySlug = rtrim($categorySlug, '/');
        
        $cache_key = 'perch_blog_category'.md5($categorySlug);
        $cache = PerchBlog_Cache::get_static($cache_key, 10);

        if ($cache) {
            if ($return) return $cache;
            echo PerchUtil::html($cache);  return '';
        }

        $API  = new PerchAPI(1.0, 'perch_blog');
        $Categories = new PerchBlog_Categories($API);
        
        $Category = $Categories->find_by_slug($categorySlug);
        
        if (is_object($Category)){
            $r = $Category->categoryTitle();

            if ($r!='') PerchBlog_Cache::save_static($cache_key, $r);

            if ($return) return $r;
            echo PerchUtil::html($r);
        }
        
        return false;
    }
    
    /**
     * 
     * Builds an archive listing of tags. Echoes out the resulting mark-up and content
     * @param string $template
     * @param bool $return if set to true returns the output rather than echoing it
     */
    function perch_blog_tags($opts='tag_link.html', $return=false)
    {
        $default_opts = array(
            'template'             => 'tag_link.html',
            'skip-template'        => false,
            'cache'                => true,
            'include-empty'        => false,
            'filter'               => false,
            'section'              => false,
        );

        if (!is_array($opts)) {
            $opts = array('template'=>$opts);
        }

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template']) $return = true;

        if (isset($opts['pagination_var'])) $opts['pagination-var'] = $opts['pagination_var']; 

        $cache = false;

        if ($opts['cache']) {
            $cache_key  = 'perch_blog_tags'.md5(serialize($opts));
            $cache      = PerchBlog_Cache::get_static($cache_key, 10);
        }

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }

        $API  = new PerchAPI(1.0, 'perch_blog');
        $BlogPosts = new PerchBlog_Posts($API);
    
        $Tags = new PerchBlog_Tags();
        $tags = $Tags->all_in_use($opts);
        
        $Template = $API->get('Template');
        $Template->set('blog/'.$opts['template'], 'blog');

        $r = $Template->render_group($tags, true);

        if ($opts['cache']) {
            if ($r!='') PerchBlog_Cache::save_static($cache_key, $r);
        }
        
        if ($return) return $r;
        echo $r;
        
        return false;
    }

    /**
     * Get a tag title from its slug
     * @param  [type]  $tagSlug [description]
     * @param  boolean $return  [description]
     * @return [type]           [description]
     */
    function perch_blog_tag($tagSlug, $return=false)
    {
        $tagSlug = rtrim($tagSlug, '/');
        
        $cache_key = 'perch_blog_tag'.md5($tagSlug);
        $cache = PerchBlog_Cache::get_static($cache_key, 10);

        if ($cache) {
            if ($return) return $cache;
            echo PerchUtil::html($cache);  return '';
        }

        $API  = new PerchAPI(1.0, 'perch_blog');
        $Tags = new PerchBlog_Tags($API);
        
        $Tag = $Tags->find_by_slug($tagSlug);
        
        if (is_object($Tag)){
            $r = $Tag->tagTitle();

            if ($r!='') PerchBlog_Cache::save_static($cache_key, $r);

            if ($return) return $r;
            echo PerchUtil::html($r);
        }
        
        return false;
    }
    
    /**
     * 
     * Builds an archive listing looping through years. Echoes out the resulting mark-up and content
     * @param string $template
     * @param bool $return if set to true returns the output rather than echoing it
     */
    function perch_blog_date_archive_years($opts='year_link.html', $return=false)
    {
        $default_opts = array(
            'template'             => 'year_link.html',
            'skip-template'        => false,
            'cache'                => true,
            'section'              => false,
        );

        if (!is_array($opts)) {
            $opts = array('template'=>$opts);
        }

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template']) {
            $return = true;
        }

        $cache = false;
        $template = $opts['template'];

        if ($opts['cache']) {
            $cache_key = 'perch_blog_date_archive_years'.md5(serialize($opts));
            $cache = PerchBlog_Cache::get_static($cache_key, 10);

            if ($opts['skip-template']) $cache = unserialize($cache);
        }
        

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }

    	$API  = new PerchAPI(1.0, 'perch_blog');
        $BlogPosts = new PerchBlog_Posts($API);
        
        if ($opts['section']) {
            $Sections = new PerchBlog_Sections($API);
            $Section = $Sections->find_by_given($opts['section']);
            if (is_object($Section)) {
                $years = $BlogPosts->get_years($Section->id());    
            }else{
                $years = $BlogPosts->get_years();        
            }
        }else{
            $years = $BlogPosts->get_years();    
        }

        

        if ($opts['skip-template']) {
            if ($opts['cache']) PerchBlog_Cache::save_static($cache_key, serialize($years));
            return $years;
        }
        
        $Template = $API->get('Template');
        $Template->set('blog/'.$template, 'blog');

        $r = $Template->render_group($years, true);

        if ($r!='') PerchBlog_Cache::save_static($cache_key, $r);
        
        if ($return) return $r;
        echo $r;
        
        return false;
    }
    
    /**
     * 
     * Builds an archive listing looping through years then months in years. Echoes out the resulting mark-up and content
     * @param string $template_year - the template for the year loop
     * @param string $template_months - template for months loop
     * @param bool $return if set to true returns the output rather than echoing it
     */
    function perch_blog_date_archive_months($template_year='months_year_link.html', $template_months='months_month_link.html', $return=false)
    {
        $cache_key = 'perch_blog_date_archive_months'.md5($template_year.$template_months);
        $cache = PerchBlog_Cache::get_static($cache_key, 10);

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }

    	$API  = new PerchAPI(1.0, 'perch_blog');
        $BlogPosts = new PerchBlog_Posts($API);
        
        $Template = $API->get('Template');
        
        $years = $BlogPosts->get_years();
        /* loop through the years */
        for($i=0; $i<sizeOf($years);$i++) {
        	$months = $BlogPosts->get_months_for_year($years[$i]['year']);
        	$Template->set('blog/'.$template_months, 'blog');
        	/* render the months into the months template*/
        	$m = $Template->render_group($months, true);
        	/* add this rendered mark-up to the $years array */
        	$years[$i]['months'] = $m;
        }
        
        
        $Template->set('blog/'.$template_year, 'blog');
		/* render the $years array into the years template*/
        $r = $Template->render_group($years, true);
        
        if ($r!='') PerchBlog_Cache::save_static($cache_key, $r);

        if ($return) return $r;
        echo $r;
        
        return false;
    }

    function perch_blog_check_preview()
    {
        if (!defined('PERCH_PREVIEW_ARG')) define('PERCH_PREVIEW_ARG', 'preview');
        
        if (isset($_GET[PERCH_PREVIEW_ARG])) {

            $Users          = new PerchUsers;
            $CurrentUser    = $Users->get_current_user();
            
            if (is_object($CurrentUser) && $CurrentUser->logged_in()) {
                   
                PerchUtil::debug('Entering preview mode');             
                PerchBlog_posts::$preview_mode = true;

            }
        }
    }

    function perch_blog_authors($opts=array(), $return=false)
    {
        $default_opts = array(
            'template'             => 'author_list.html',
            'skip-template'        => false,
            'cache'                => true,
            'include-empty'        => false,
            'filter'               => false,
        );

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template']) $return = true;

        if (isset($opts['pagination_var'])) $opts['pagination-var'] = $opts['pagination_var']; 

        $cache = false;

        if ($opts['cache']) {
            $cache_key  = 'perch_blog_authors'.md5(serialize($opts));
            $cache      = PerchBlog_Cache::get_static($cache_key, 10);
        }

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }


        $API  = new PerchAPI(1.0, 'perch_blog');
        $Authors = new PerchBlog_Authors($API);
        $r      = $Authors->get_custom($opts);
  
        if ($r!='' && $opts['cache']) PerchBlog_Cache::save_static($cache_key, $r);
        
        if ($return) return $r;
        echo $r;
        
        return false;
    }

    function perch_blog_author($id_or_slug, $opts=array(), $return=false)
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $default_opts = array(
            'template'             => 'author.html',
            'skip-template'        => false,
            'cache'                => true,
        );

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template']) $return = true;

        $cache = false;

        if ($opts['cache']) {
            $cache_key  = 'perch_blog_author'.md5($id_or_slug.serialize($opts));
            $cache      = PerchBlog_Cache::get_static($cache_key, 10);
        }

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }

        $API  = new PerchAPI(1.0, 'perch_blog');
        $Authors = new PerchBlog_Authors;

        if (is_numeric($id_or_slug)) {
            $Author = $Authors->find($id_or_slug);
        }else{
            $Author = $Authors->find_by_slug($id_or_slug);
        }

        if (is_object($Author)) {

            if ($opts['skip-template']) {
                return $Author->to_array();
            }

            $Template = $API->get('Template');
            $Template->set('blog/'.$opts['template'], 'blog');

            $r = $Template->render($Author);

            if ($r!='') PerchBlog_Cache::save_static($cache_key, $r);
            
            if ($return) return $r;
            echo $r;
        }
    

        return false;
    }

    function perch_blog_author_for_post($id_or_slug, $opts=array(), $return=false) 
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $default_opts = array(
            'template'             => 'author.html',
            'skip-template'        => false,
            'cache'                => true,
        );

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template']) $return = true;

        $cache = false;

        if ($opts['cache']) {
            $cache_key  = 'perch_blog_author_for_post'.md5($id_or_slug.serialize($opts));
            $cache      = PerchBlog_Cache::get_static($cache_key, 10);
        }

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }

        $API  = new PerchAPI(1.0, 'perch_blog');
        $BlogPosts = new PerchBlog_Posts($API);

        if (is_numeric($id_or_slug)) {
            $Post = $BlogPosts->find($id_or_slug);
        }else{
            $Post = $BlogPosts->find_by_slug($id_or_slug);
        }

        if (is_object($Post)) {
            $Authors = new PerchBlog_Authors;
            $Author = $Authors->find($Post->authorID());

            if (is_object($Author)) {

                if ($opts['skip-template']) {
                    return $Author->to_array();
                }

                $Template = $API->get('Template');
                $Template->set('blog/'.$opts['template'], 'blog');

                $r = $Template->render($Author);

                if ($r!='') PerchBlog_Cache::save_static($cache_key, $r);
                
                if ($return) return $r;
                echo $r;
            }
        }

        return false;
    }

    function perch_blog_delete_old_spam($days)
    {
        $API  = new PerchAPI(1.0, 'perch_blog');   
        $Comments = new PerchBlog_Comments($API);
        return $Comments->delete_old_spam($days);
    }

    function perch_blog_sections($opts=array(), $return=false)
    {
        $default_opts = array(
            'template'             => 'section_list.html',
            'skip-template'        => false,
            'cache'                => true,
            'include-empty'        => false,
            'filter'               => false,
        );

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template']) $return = true;

        if (isset($opts['pagination_var'])) $opts['pagination-var'] = $opts['pagination_var']; 

        $cache = false;

        if ($opts['cache']) {
            $cache_key  = 'perch_blog_sections'.md5(serialize($opts));
            $cache      = PerchBlog_Cache::get_static($cache_key, 10);
        }

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }


        $API  = new PerchAPI(1.0, 'perch_blog');
        $Sections = new PerchBlog_Sections($API);
        $r      = $Sections->get_custom($opts);
  
        if ($r!='' && $opts['cache']) PerchBlog_Cache::save_static($cache_key, $r);
        
        if ($return) return $r;
        echo $r;
        
        return false;
    }

    function perch_blog_section($id_or_slug, $opts=array(), $return=false)
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $default_opts = array(
            'template'             => 'section.html',
            'skip-template'        => false,
            'cache'                => true,
        );

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template']) $return = true;

        $cache = false;

        if ($opts['cache']) {
            $cache_key  = 'perch_blog_section'.md5($id_or_slug.serialize($opts));
            $cache      = PerchBlog_Cache::get_static($cache_key, 10);
        }

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }

        $API  = new PerchAPI(1.0, 'perch_blog');
        $Sections = new PerchBlog_Sections;

        if (is_numeric($id_or_slug)) {
            $Section = $Sections->find($id_or_slug);
        }else{
            $Section = $Sections->find_by_slug($id_or_slug);
        }

        if (is_object($Section)) {

            if ($opts['skip-template']) {
                return $Section->to_array();
            }

            $Template = $API->get('Template');
            $Template->set('blog/'.$opts['template'], 'blog');

            $r = $Template->render($Section);

            if ($r!='') PerchBlog_Cache::save_static($cache_key, $r);
            
            if ($return) return $r;
            echo $r;
        }
    

        return false;
    }


<?php
    # Side panel
    echo $HTML->side_panel_start();

    echo $HTML->para('You can edit your post here. Set the status to Published to make the post visible on the website.');
    echo $HTML->para('If a post has a date in the future, it will not appear on the site until that date and time.');
    
    if (PerchUtil::count($post_templates)) {
        echo $HTML->heading3('Post types');
        echo $HTML->para('Different posts types can contain different content fields.');
        echo $HTML->para('Switching a post to a different type can result in content being lost if the same fields aren\'t present in both types.');
    }


    echo $HTML->side_panel_end();
    
    
    # Main panel
    echo $HTML->main_panel_start(); 
    
    include('_subnav.php');
		
        if (is_object($Post)) {
            echo $HTML->heading1('Editing Post ‘%s’', $Post->postTitle());
        }else{
            echo $HTML->heading1('Creating a New Post');
        }
    
    

        if ($message) echo $message;    
        
        $template_help_html = $Template->find_help();
        if ($template_help_html) {
            echo $HTML->heading2('Help');
            echo '<div id="template-help">' . $template_help_html . '</div>';
        }
    
        if ($template =='post.html') {
            echo $HTML->heading2('Post');    
        }else{
            echo $HTML->heading2(PerchUtil::filename($template, false));
        }
    
            echo $Form->form_start('blog-edit', 'magnetic-save-bar');
    
            $modified_details = $details;

            if (isset($modified_details['postDescRaw'])) {
                $modified_details['postDescHTML'] = $modified_details['postDescRaw'];    
            }
            echo $Form->fields_from_template($Template, $modified_details);
                       

            $values = array();
            $opts   = array();
            if(is_array($categories)) {
                foreach($categories as $Category) {
                    $opts[] = array('label'=>$Category->categoryTitle(),'value'=>$Category->id());
                }

                $multicol = false;
                if (PerchUtil::count($categories) > 4) $multicol = 'multi-col';

                echo $Form->checkbox_set('cat_ids', 'Categories', $opts, isset($details['cat_ids'])?$details['cat_ids']:array(), '', false, $multicol);
            }
            

            echo $Form->hint('Separate with commas');
            echo $Form->text_field('postTags', 'Tags', isset($details['postTags'])?$details['postTags']:false);

            if ($CurrentUser->has_priv('perch_blog.comments.enable')) {
                echo $Form->checkbox_field('postAllowComments', 'Allow comments', '1', isset($details['postAllowComments'])?$details['postAllowComments']:'1');
            }
            
            

            if (PerchUtil::count($post_templates)) {
                $opts = array();
                $opts[] = array('label'=>'Default', 'value'=>'post.html');

                foreach($post_templates as $template) {
                    $opts[] = array('label'=>PerchUtil::filename($template, false), 'value'=>'posts/'.$template);
                }
                echo $Form->hint('See sidebar note about post types');
                echo $Form->select_field('postTemplate', 'Post type', $opts, isset($details['postTemplate'])?$details['postTemplate']:'post.html');

            }else{
                echo $Form->hidden('postTemplate', isset($details['postTemplate'])?$details['postTemplate']:'post.html');
            }


            $authors = $Authors->all();
            if (PerchUtil::count($authors)) {
                $opts = array();
                foreach($authors as $author) {
                    $opts[] = array('label'=>$author->authorGivenName().' '.$author->authorFamilyName(), 'value'=>$author->id());        
                }  
                echo $Form->select_field('authorID', 'Author', $opts, isset($details['authorID'])?$details['authorID']:$Author->id());  
            }
            
            if (PerchUtil::count($sections)>1) {
                $opts = array();
                foreach($sections as $section) {
                    $opts[] = array('label'=>$section->sectionTitle(), 'value'=>$section->id());        
                }  
                echo $Form->select_field('sectionID', 'Section', $opts, isset($details['sectionID'])?$details['sectionID']:1);  
            }
                

            
            $opts = array();
            $opts[] = array('label'=>'Draft', 'value'=>'Draft');
            if ($CurrentUser->has_priv('perch_blog.post.publish')) $opts[] = array('label'=>'Published', 'value'=>'Published');
            echo $Form->select_field('postStatus', 'Status', $opts, isset($details['postStatus'])?$details['postStatus']:'Published');




            echo $Form->hidden('postID', isset($details['postID'])?$details['postID']:false);

            echo $Form->submit_field('btnSubmit', 'Save', $API->app_path());


            echo $Form->form_end();
        
    echo $HTML->main_panel_end();

    
?>
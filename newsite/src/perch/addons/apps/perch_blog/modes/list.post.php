<?php
    # Side panel
    echo $HTML->side_panel_start();

    echo $HTML->para('This page lists your blog posts. You can filter them by category or status.');

    if ($CurrentUser->has_priv('perch_blog.import')) {
        echo $HTML->heading3('Import');
        echo $HTML->para('If moving from a different blog system, you may be able to %simport your posts%s', '<a href="'.$API->app_path().'/import/">', '.</a>');
    }

    echo $HTML->side_panel_end();
    
    
    # Main panel
    echo $HTML->main_panel_start();
	
	include('_subnav.php');


    if ($CurrentUser->has_priv('perch_blog.post.create')) echo '<a class="add button" href="'.$HTML->encode($API->app_path().'/edit/').'">'.$Lang->get('Add Post').'</a>';

	# Title panel
    echo $HTML->heading1('Listing Posts');
    
    if (isset($message)) echo $message;


    /* ----------------------------------------- SMART BAR ----------------------------------------- */
    if (PerchUtil::count($posts)) {
    ?>


    <ul class="smartbar">
        <li class="<?php echo ($filter=='all'?'selected':''); ?>"><a href="<?php echo PerchUtil::html($API->app_path()); ?>"><?php echo $Lang->get('All'); ?></a></li>
        <li class="new <?php echo ($filter=='status'&&$status=='draft'?'selected':''); ?>"><a href="<?php echo PerchUtil::html($API->app_path().'?status=draft'); ?>"><?php echo $Lang->get('Drafts'); ?></a></li>
        <?php

            if ($filter == 'status' && $status == 'draft') {
                $Alert->set('filter', PerchLang::get('You are viewing all draft posts.'). ' <a href="'.$API->app_path().'" class="action">'.$Lang->get('Clear Filter').'</a>');
            }

            if (PerchUtil::count($categories)) {
                $items = array();
                foreach($categories as $Category) {
                    $items[] = array(
                            'arg'=>'category',
                            'val'=>$Category->categorySlug(),
                            'label'=>$Category->categoryTitle(),
                            'path'=>$API->app_path()
                        );
                }

                echo PerchUtil::smartbar_filter('cf', 'By Category', 'Filtered by ‘%s’', $items, 'folder', $Alert, "You are viewing posts in ‘%s’", $API->app_path());
            }
           

            if (PerchUtil::count($sections) > 1) {
                $items = array();
                foreach($sections as $Section) {
                    $items[] = array(
                            'arg'=>'section',
                            'val'=>$Section->sectionSlug(),
                            'label'=>$Section->sectionTitle(),
                            'path'=>$API->app_path()
                        );
                }

                echo PerchUtil::smartbar_filter('sf', 'By Section', 'Filtered by ‘%s’', $items, 'folder', $Alert, "You are viewing posts in ‘%s’", $API->app_path());
            }
            
        
        ?>
    </ul>

    <?php
        }else{
            $Alert->set('notice', $Lang->get('There are no posts yet.'));
        }
    
    echo $Alert->output(); 

    /* ----------------------------------------- /SMART BAR ----------------------------------------- */


    if (PerchUtil::count($posts)) {
?>
    <table class="d">
        <thead>
            <tr>
                <th class="first"><?php echo $Lang->get('Post'); ?></th>
                <th><?php echo $Lang->get('Status'); ?></th>
                <th><?php echo $Lang->get('Date'); ?></th>
                <?php if ($CurrentUser->has_priv('perch_blog.post.delete')) { ?>
                <th class="action last"></th>
                <?php } // if delete ?>
            </tr>
        </thead>
        <tbody>
<?php
    foreach($posts as $Post) {
?>
            <tr>
                <td class="primary">
                    <a href="<?php echo $HTML->encode($API->app_path()); ?>/edit/?id=<?php echo $HTML->encode(urlencode($Post->id())); ?>">
                    <?php echo $HTML->encode($Post->postTitle()); ?></a>
                </td>
                <td>
                <?php 
                    if (strtotime($Post->postDateTime()) > time() && $Post->postStatus()=='Published') {
                        echo $Lang->get('Will publish on date');
                    }else{
                        if ($Post->postStatus()=='Draft') {
                            echo '<span class="special">'.$HTML->encode($Post->postStatus()).'</span>';
                        }else{
                            echo $HTML->encode($Post->postStatus()); 
                        }
                        
                    }
                ?>
                </td>
                <td><?php echo $HTML->encode(strftime(PERCH_DATE_LONG.', '.PERCH_TIME_SHORT, strtotime($Post->postDateTime()))); ?></td>
                <?php if ($CurrentUser->has_priv('perch_blog.post.delete')) { ?>
                <td><a href="<?php echo $HTML->encode($API->app_path()); ?>/delete/?id=<?php echo $HTML->encode(urlencode($Post->id())); ?>" class="delete inline-delete" data-msg="<?php echo $Lang->get('Delete this post?'); ?>"><?php echo $Lang->get('Delete'); ?></a></td>
                <?php } // if delete ?>
            </tr>

<?php   
    }
?>
        </tbody>
    </table>
<?php    
        if ($Paging->enabled()) {
            echo $HTML->paging($Paging);
        }
    

    } // if pages
    
    echo $HTML->main_panel_end();
?>
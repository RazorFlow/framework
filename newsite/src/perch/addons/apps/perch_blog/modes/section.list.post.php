<?php
   
    # Side panel
    echo $HTML->side_panel_start();
 
    echo $HTML->para('This page lists the sections you can place posts into.');
    
    echo $HTML->side_panel_end();
    
    
    # Main panel
    echo $HTML->main_panel_start();

	include ('_subnav.php');


    echo '<a class="add button" href="'.$HTML->encode($API->app_path().'/sections/edit/').'">'.$Lang->get('Add Section').'</a>';


	# Title panel
    echo $HTML->heading1('Listing Sections');
    

    
    if (PerchUtil::count($sections)) {
?>
    <table class="d">
        <thead>
            <tr>
                <th class="first"><?php echo $Lang->get('Section'); ?></th>
                <th><?php echo $Lang->get('Slug'); ?></th>
                <th><?php echo $Lang->get('Posts'); ?></th>
                <th class="action last"></th>
            </tr>
        </thead>
        <tbody>
<?php
    foreach($sections as $Section) {
?>
            <tr>
                <td class="primary"><a href="<?php echo $HTML->encode($API->app_path()); ?>/sections/edit/?id=<?php echo $HTML->encode(urlencode($Section->id())); ?>"><?php echo $HTML->encode($Section->sectionTitle())?></a></td>
                <td><?php echo $HTML->encode($Section->sectionSlug())?></td>  
                <td><?php echo $HTML->encode($Section->sectionPostCount())?></td>  
                <td><a href="<?php echo $HTML->encode($API->app_path()); ?>/sections/delete/?id=<?php echo $HTML->encode(urlencode($Section->id())); ?>" class="delete inline-delete" data-msg="<?php echo $Lang->get('Delete this section?'); ?>"><?php echo $Lang->get('Delete'); ?></a></td>
            </tr>
<?php   
    }
?>
        </tbody>
    </table>


    
<?php    
    } // if pages
    
     
    echo $HTML->main_panel_end();


?>
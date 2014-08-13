<?php
   
    # Side panel
    echo $HTML->side_panel_start();
 
    echo $HTML->para('This page lists the categories you can place posts into.');
    
    echo $HTML->side_panel_end();
    
    
    # Main panel
    echo $HTML->main_panel_start();

	include ('_subnav.php');


    echo '<a class="add button" href="'.$HTML->encode($API->app_path().'/categories/edit/').'">'.$Lang->get('Add Category').'</a>';


	# Title panel
    echo $HTML->heading1('Listing Categories');
    

    
    if (PerchUtil::count($categories)) {
?>
    <table class="d">
        <thead>
            <tr>
                <th class="first"><?php echo $Lang->get('Category'); ?></th>
                <th><?php echo $Lang->get('Slug'); ?></th>
                <th><?php echo $Lang->get('Posts'); ?></th>
                <th class="action last"></th>
            </tr>
        </thead>
        <tbody>
<?php
    foreach($categories as $Category) {
?>
            <tr>
                <td class="primary"><a href="<?php echo $HTML->encode($API->app_path()); ?>/categories/edit/?id=<?php echo $HTML->encode(urlencode($Category->id())); ?>"><?php echo $HTML->encode($Category->categoryTitle())?></a></td>
                <td><?php echo $HTML->encode($Category->categorySlug())?></td>  
                <td><?php echo $HTML->encode($Category->categoryPostCount())?></td>  
                <td><a href="<?php echo $HTML->encode($API->app_path()); ?>/categories/delete/?id=<?php echo $HTML->encode(urlencode($Category->id())); ?>" class="delete inline-delete" data-msg="<?php echo $Lang->get('Delete this category?'); ?>"><?php echo $Lang->get('Delete'); ?></a></td>
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
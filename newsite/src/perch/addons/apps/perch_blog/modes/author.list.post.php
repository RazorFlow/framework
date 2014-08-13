<?php
   
    # Side panel
    echo $HTML->side_panel_start();
 
    echo $HTML->para('This page lists blog post authors.');
    echo $HTML->para('There is no need to create a new author. Create a regular user account as normal, and a blog author entry will be created the first time they post.');
    
    echo $HTML->side_panel_end();
    
    
    # Main panel
    echo $HTML->main_panel_start();

	include ('_subnav.php');


    //echo '<a class="add button" href="'.$HTML->encode($API->app_path().'/authors/new/').'">'.$Lang->get('Add Author').'</a>';


	# Title panel
    echo $HTML->heading1('Listing Authors');
    

    
    if (PerchUtil::count($authors)) {
?>
    <table class="users">
        <thead>
            <tr>
                <th class="first"><?php echo $Lang->get('Name'); ?></th>
                <th><?php echo $Lang->get('Email address'); ?></th>
                <th><?php echo $Lang->get('Posts'); ?></th>
                <th class="action last"></th>
            </tr>
        </thead>
        <tbody>
<?php
    foreach($authors as $Author) {
?>
            <tr>
                <td class="primary icon user"><a href="<?php echo $HTML->encode($API->app_path()); ?>/authors/edit/?id=<?php echo $HTML->encode(urlencode($Author->id())); ?>"><?php echo $HTML->encode($Author->authorGivenName().' '.$Author->authorFamilyName())?></a></td>
                <td><?php echo $HTML->encode($Author->authorEmail())?></td>  
                <td><?php echo $HTML->encode($Author->authorPostCount())?></td>  
                <td><a href="<?php echo $HTML->encode($API->app_path()); ?>/authors/delete/?id=<?php echo $HTML->encode(urlencode($Author->id())); ?>" class="delete"><?php echo $Lang->get('Delete'); ?></a></td>
                
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
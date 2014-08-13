    <h1>Installing...</h1>
    
<?php
    if (defined('PERCH_DB_PREFIX')) {

        echo '<ul class="importables">';

        if (isset($_GET['auto'])) {
            echo '<li class="success icon">Your config file was written automatically - nothing to copy and paste today.</li>';
        }

        

        $db = PerchDB::fetch();

        $Perch = Perch::fetch();
    
        $sql = file_get_contents('database.sql');
        $sql = str_replace('__PREFIX__', PERCH_DB_PREFIX, $sql);
        $sql = str_replace('__PERCH_LOGINPATH__', PERCH_LOGINPATH, $sql);
        $sql = str_replace('__PERCH_VERSION__', $Perch->version, $sql);
        $queries = explode(';', $sql);
        if (PerchUtil::count($queries) > 0) {
            foreach($queries as $query) {
                $query = trim($query);
                if ($query != '') {
                    $db->execute($query);
                }
            }
        
            // test that it worked
            $tables = $db->get_rows('SHOW TABLES');
            $db_fail = true;
            if (PerchUtil::count($tables)) {
                foreach($tables as $key=>$val) {
                    foreach($val as $key2=>$val2) {
                        if ($val2 == PERCH_DB_PREFIX.'users') {
                            $db_fail = false;
                        }
                    }
                }
            }
            if ($db_fail) {
                echo '<li class="failure icon">Creating database tables&hellip; <strong>Unable to create database tables.</strong></li>';
                echo '</ul>';

                
                echo '<p>The most likely cause is that your database access details aren\'t quite right. Please double check them. Note that some hosting control panel software (like cPanel) will prefix the database name with your account name. So if you created a new database called <code>'.PERCH_DB_DATABASE.'</code> the full name could be something like <code>accountname_'.PERCH_DB_DATABASE.'</code>.</p>';              
                
                echo '<p>If you\'re still have trouble, it\'s possible that the MySQL user hasn\'t got enough access rights to create tables. Change this, if you can, <a href="index.php?install=1">then reload this page</a>.</p>';
            
                echo '<p>Still no success? <a href="http://support.grabaperch.com/">Drop us a line</a> and we\'ll see if we can help.</p>';
            }else{
                echo '<li class="success icon">Creating database tables&hellip; done.</li>';
                
                $Users = new PerchUsers;
        
                $data = PerchSession::get('user');
                $data['userMasterAdmin'] = '1';
                $data['roleID'] = '2';
                $data['userCreated'] = date('Y-m-d H:i:s');

                if ($Users->no_master_admin_exists()) {
                    $Users->create($data, false);    
                    echo '<li class="success icon">Setting up initial user account&hellip; done.</li>';
                }else{
                    echo '<li class="success icon">Setting up initial user account&hellip; user already exists.</li>';
                }
                
        
                
            
?>
                <li class="success icon"><strong>Setup complete.</strong></li>
            </ul>
    
                <h2>Next steps</h2>
    
                <p>There's just three things left for you to do:</p>
    
                <ol class="importables">
                    <li>Make the folder <code><?php echo PERCH_LOGINPATH; ?>/resources</code> writable for file uploads</li>
                    <li>Delete the <code><?php echo PERCH_LOGINPATH; ?>/setup</code> folder from your server</li>
                    <li>Log into your <a href="http://grabaperch.com/account">grabaperch.com account</a> and set <code><?php echo $_SERVER['SERVER_NAME']; ?></code> as one of the domains for this license.</li>
                </ol>
    
                <p><a href="<?php echo PERCH_LOGINPATH; ?>" class="button">You should now be able to log in &raquo;</a></p>
    
<?php            
            }




        }

    }else{
        echo '<p>No configuration values can be found. Please check you added the settings to <code>perch/config/config.php</code>. <a href="index.php?install=1">Then reload this page</a></p>';
    }

?>
    <p>Welcome to Perch. In order to get set up, there's a few short questions to answer below. If you don't know any of the answers (or the defaults look wrong) your ISP or hosting company should have the information available for you.</p>
    
    <form method="post" action="index.php">
        <fieldset>
            <legend>Your license</legend>
            <div>
                <?php
                    $defaults = array();
                    if (defined('PERCH_LICENSE_KEY')) {
                        $defaults['licenseKey'] = PERCH_LICENSE_KEY;
                    }
                
                ?>
                <?php echo $Form->label('licenseKey', 'License Key', '', false, false); ?>
                <?php echo $Form->text('licenseKey', $Form->get($defaults, 'licenseKey'), 'wide'); ?>
            </div>
        </fieldset>
        
        <fieldset>
            <legend>Main administrator account</legend>
            <div>
                <?php echo $Form->label('userGivenName', 'First name', '', false, false); ?>
                <?php echo $Form->text('userGivenName', $Form->get(false, 'userGivenName')); ?>
            </div>
            <div>
                <?php echo $Form->label('userFamilyName', 'Last name', '', false, false); ?>
                <?php echo $Form->text('userFamilyName', $Form->get(false, 'userFamilyName')); ?>
            </div>
            <div>
                <?php echo $Form->label('userEmail', 'Email address', '', false, false); ?>
                <?php echo $Form->text('userEmail', $Form->get(false, 'userEmail')); ?>
            </div>
            <div>
                <?php echo $Form->label('userUsername', 'Username', '', false, false); ?>
                <?php echo $Form->text('userUsername', $Form->get(false, 'userUsername')); ?>
                <?php echo $Form->hint('Choose a username for your own account'); ?>
            </div>
            <div>
                <?php echo $Form->label('userPassword', 'Password', '', false, false); ?>
                <?php echo $Form->password('userPassword', $Form->get(false, 'userPassword')); ?>
                <?php echo $Form->hint('Choose a password'); ?>
            </div>            
            <div>
                <?php echo $Form->label('userPassword2', 'Repeat', '', false, false); ?>
                <?php echo $Form->password('userPassword2'); ?>
            </div>
        </fieldset>
        
        <fieldset>
            <legend>Install location</legend>
            
            <div>
                <?php echo $Form->label('loginpath', 'Perch folder', '', false, false); ?>
                <?php 
                    $url = str_replace('/setup/index.php', '', $_SERVER['PHP_SELF']);
                    echo $Form->text('loginpath', $Form->get(false, 'loginpath', $url)); ?>
                <?php echo $Form->hint('The path including the Perch folder from the top of the site'); ?>
            </div>

            <div>
                <?php echo $Form->label('tz', 'Time zone', '', false, false); ?>
                <?php 
                    $list = DateTimeZone::listIdentifiers();

                    $options = array();
                    foreach ($list as $tz) {
                        $options[] = array('value'=>$tz, 'label'=>$tz);
                    }

                    echo $Form->select('tz', $options, $Form->get($defaults, 'tz', date_default_timezone_get())); 
                ?>
            </div>
        </fieldset>

        <fieldset>
            <legend>Database settings</legend>
            <?php
                $defaults = array();
                if (defined('PERCH_DB_SERVER')) {
                    $defaults['db_server'] = PERCH_DB_SERVER;
                }
                if (defined('PERCH_DB_DATABASE')) {
                    $defaults['db_database'] = PERCH_DB_DATABASE;
                }
                if (defined('PERCH_DB_USERNAME')) {
                    $defaults['db_username'] = PERCH_DB_USERNAME;
                }
                if (defined('PERCH_DB_PASSWORD')) {
                    $defaults['db_password'] = PERCH_DB_PASSWORD;
                }
            
            ?>
            <div>
                <?php echo $Form->label('db_server', 'Server', '', false, false); ?>
                <?php echo $Form->text('db_server', $Form->get($defaults, 'db_server', 'localhost')); ?>
                <?php echo $Form->hint('Usually \'localhost\''); ?>
            </div>
            <div>
                <?php echo $Form->label('db_database', 'Database name', '', false, false); ?>
                <?php echo $Form->text('db_database', $Form->get($defaults, 'db_database')); ?>
            </div>
            <div>
                <?php echo $Form->label('db_username', 'Database username', '', false, false); ?>
                <?php echo $Form->text('db_username', $Form->get($defaults, 'db_username')); ?>
            </div>
            <div>
                <?php echo $Form->label('db_password', 'Database password', '', false, false); ?>
                <?php echo $Form->password('db_password', $Form->get($defaults, 'db_password')); ?>
            </div>

        </fieldset>
        
        <p class="submit">
            <?php echo $Form->submit('btnSubmit', 'Next step', 'button', false); ?>
        </p>
        
        
    </form>
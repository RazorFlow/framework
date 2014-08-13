<?php include('../perch/runtime.php'); ?>
<?php 
    $domain = 'http://'.$_SERVER['HTTP_HOST'];
    PerchSystem::set_var('domain', $domain);

    header('Content-Type: application/rss+xml');

    echo '<'.'?xml version="1.0"?'.'>'; 
?>

<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Perch Blog Example</title>
        <link><?php echo PerchUtil::html($domain); ?>/blog/</link>
        <description>My awesome website.</description>
        <atom:link href="<?php echo PerchUtil::html($domain); ?>/blog/rss.php" rel="self" type="application/rss+xml" />
        <?php
            perch_blog_custom(array(
                'template'=>'rss_post.html',
                'count'=>10,
                'sort'=>'postDateTime',
                'sort-order'=>'DESC'
                ));
        ?>
    </channel>
</rss>
<?php

  require "blog_head.php";

  $query = perch_get('q');  // 'q' query string argument e.g. search.php?q=apples
  perch_content_search($query);

  require "blog_foot.php";

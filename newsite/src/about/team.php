<?php

function extra_scripts () {
  return array(
    // "vendor/fancybox/jquery.fancybox.pack.js",
    // 'vendor/jquery.validate.min.js',
    "js/rfHomepage.js",
    "js/rfTeamPage.js"
  );
}

function rf_topbar () {
  return array (
    'title' => "See what you've been missing",
    "url" => "/about/team.php"
  );
}

function extra_styles () {
  return array(
    // "vendor/fancybox/jquery.fancybox.css"
  );
}

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "Team",
            'opts' => array (
            )
        );
    }
}

$team = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/about/team.json');
$team = json_decode($team, true);
$team = $team['team'];

require "../layout/header.php";
?>

<!-- Marker & Company front icons container -->
<div class="row container col-xs-12 hidden-xs">
  <div class="col-xs-3 col-xs-offset-1"></div>
  <div class="col-xs-1 col-xs-offset-1"></div>
  <div class="col-xs-1  marker-wrapper">
    <div class="aboutMarker"></div>
  </div>
</div>
<div class="container col-xs-12 hidden-xs">
  <div class="col-xs-3 col-xs-offset-1"></div>
  <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
  <a href="/about/company.php" class="pull-right rf-icon rf_company_inactive icon-lg rf-icon-inactive"></a>
  </div>
  <div class="col-xs-1"></div>
  <div class="col-xs-1">
  <a href="/about/team.php" class="pull-right rf-icon rf_team icon-lg"></a>
  </div>
  <div class="col-xs-3 col-xs-offset-1"></div>
</div>

<div class="container content-start">
  <br>
  <div class="company-front-icons"></div>
  <div class="row team-container container content-start col-md-12">

    <?php foreach($team as $member): ?>

    <div class="col-xs-6 col-sm-6 col-md-4 col-sm-6 col-xs-12">
      <div class="team-avatar">
        <div class="avatar-wrapper">
        <img src="<?= $member['avatar'] ?>">
        </div>
        <div class="info">
        <p><?= $member['info'] ?></p>
          <hr>
          <ul class="team-icons">
            <?php foreach($member['links'] as $key => $value): ?>
            <li class="icon-wrapper"><div><a href="<?= $value ?>"><i class="rf-icon rf_team_<?= $key ?> colored"></i></a></div></li>
            <?php endforeach ?>
          </ul>
        </div>
      </div>
      <div>
      <div class="meta-info">
        <h6><?= $member['name'] ?></h6>
        <p><?= $member['designation'] ?></p>
      </div>
      </div>
    </div>

    <?php endforeach ?>

  </div>
</div>
</div>

<div class="container team-link">
  <h6><a href="/about/company.php" class="left-icon"><i class="rf-icon rf_arrow_left"></i> <span>Comapny Info</span></a></h6>
</div>

<?php

require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";

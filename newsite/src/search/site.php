<?php 
function custom_title () {
	return "Search Results";
}

// function rf_topbar () {
// 	return array (
// 		'url' => '/',
// 		'title' => 'RazorFlow Search'
// 	);
// }

function extra_scripts () {
  return array(
  );
}

function extra_styles () {
  return array(
  );
}

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "Search",
            'opts' => array (
            )
        );
    }
}
$results = array();
$total = 0;
if(isset($_GET['q']) && isset($_GET['start'])) {
  require $_SERVER['DOCUMENT_ROOT']."/../vendor/autoload.php";
    $queryString = urlencode($_GET['q']);
    $start = urlencode($_GET['start']);
    $url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU&cx=000976528052802304723:2-yadovo1ga&q=$queryString&start=$start";

    $client = new GuzzleHttp\Client();

    try {
        $response = $client->get($url);
        $body = $response->getBody();
        $results = json_decode($body, true);
        $total = $results['queries']['request'][0]['totalResults'];
    }
    catch (Exception $e){
        print_r($e);

    }
}

require $_SERVER['DOCUMENT_ROOT']."/layout/header.php";
?>
<div class="col-md-12 rfDocHeader">
  <div class="container">
    <div class="col-xs-12 col-sm-8 topBarTitle"><h2>RazorFlow Search</h2></div>
    <div class="form-group col-xs-12 col-sm-4">
          <form id="docs_search" action="/search/site.php" method="get">
            <div class="input-group search-box">
                <span class="input-group-addon"><span class="glyphicon glyphicon glyphicon-search"></span></span>
                <input type="hidden" name="start" value="1">
                <input id="form1_q" name="q" class="form-control" type="search" placeholder="SEARCH DOCUMENTATION">
            </div>
        </form> 
    </div>
  </div>
</div>
<div class="container rfSearch">
  <div class="hidden-xs hidden-sm">
    <h2 class="search-text">&lsquo;<?php echo $queryString; ?>&rsquo;</h2>
  </div>
    <div class="row">
      <hr class="docDivider hidden-sm hidden-xs">
        <div class="col-md-12 rfSearchContent">
          <!-- <h5>Documentation</h5> -->

          <div class="search-results container">
            <ul>
                <?php if($total > 0): ?>
                <?php foreach($results['items'] as $item): ?>
                     <li>
                        <a href="<?php echo $item['link']; ?>">
                          <h6><?php echo $item['htmlTitle']; ?></h6>
                          <span><?php echo $item['htmlFormattedUrl']; ?></span>
                           <p><?php echo $item['snippet']; ?></p>
                        </a>
                      </li>
                <?php endforeach ?>
                <?php else:  ?>
                    <h4 class="result-title">No Results found</h4>
                <?php endif ?>
            </ul>

          </div>
            <?php $totalPages = ceil($results['queries']['request'][0]['totalResults'] / 10);  ?>
            <?php $pageStart = floor($_GET['start'] / 10) ?>
            <ul class="rfPagination pull-right">
            <?php if(isset($results['queries']['previousPage']) && !isset($results['queries']['nextPage'])): ?>
            <li class="active"><a href="/search/site.php?q=<?php echo $results['queries']['previousPage'][0]['searchTerms'] ?>&start=<?php echo $results['queries']['previousPage'][0]['startIndex'] ?>">Previous</a></li>
            <?php else: ?>
            <?php if(isset($results['queries']['previousPage'])): ?>
            <li><a href="/search/site.php?q=<?php echo $results['queries']['previousPage'][0]['searchTerms'] ?>&start=<?php echo $results['queries']['previousPage'][0]['startIndex'] ?>"><?php echo $pageStart ?></a></li>
            <?php endif ?>
            <?php endif ?>
            <?php $count=$pageStart+1; $flag=0; ?>
            <?php for($i=$pageStart; $i<$totalPages;  $i++): ?>
            <?php $linkText = ($i*10+1) ?>
            <li class="<?php echo ($_GET['start'] == ($linkText) ? "active" : "") ?>"><a href="/search/site.php?q=<?php echo $results['queries']['request'][0]['searchTerms'] ?>&start=<?php echo $linkText; ?>"><?php echo $count ?></a></li>
            <?php $count++; $flag++; ?>
            <?php if($flag>3): ?>
            <?php break ?>
            <?php endif ?>
            <?php endfor ?>

            <?php if($totalPages > $count): ?>
            <li class="active next"><a href="/search/site.php?q=<?php echo $results['queries']['nextPage'][0]['searchTerms'] ?>&start=<?php echo ($count-1)*10+1 ?>">Next</a></li>
            <?php endif ?>
            </ul>

            <div></div>
        </div>
    </div>
</div>

<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";

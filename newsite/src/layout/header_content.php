<div class="rfDesktopMenu hidden-xs hidden-sm">
	<div class="container rfHeaderContainer">
		<div class="row">
			<a href="/">
				<div class="col-md-2 logo">
				</div>
			</a>
			<div class="col-md-10 rfLinks">
				<div class="pull-right">
				<div class="rfMenuItemWrapper rfMainMenuItems">
					<div class="rfMenuItem <?php if($activeState == "tour") echo "active"; ?>">
						<a href="/tour/">Tour</a>
					</div>
					<div class="rfMenuItem <?php if($activeState == "features") echo "active"; ?>">
						<a href="/features/">Features</a>
					</div>
					<div class="rfMenuItem <?php if($activeState == "docs") echo "active"; ?>">
						<a href="/docs/"><span class="web hidden-md">Documentation</span><span class="mob hidden-lg">Docs</span></a>
					</div>
					<div class="rfMenuItem <?php if($activeState == "pricing") echo "active"; ?>">
						<a href="/dashboard/buy/">Pricing</a>
					</div>
				</div>
				<div class="rfMenuItemWrapper rfPillItem rfMenuContactItem">
					<i class="rf-icon rf_email"></i><a class="supportLink" href="/contact/support.php">Support</a> | <a class="salesLink" href="/contact/sales.php">Sales</a>
				</div>
				<a href="/download" class="rfMenuItemWrapper rfMenuDownloadItem rfPillItem">
					Get RazorFlow
				</a>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="rfMobileMenu hidden-md hidden-lg">
	<div class="container rfHeaderContainer">
		<div class="row">
		<a href="/">
			<div class="col-xs-8 col-sm-8 logo">
			</div>
		</a>
		<div class="col-xs-3 col-sm-3 pull-right">
			<div class="pull-right">
				<div class="rfMobileMenuButton" id="menuButton">
					<span class="hidden-xs">MENU</span>
					<i class="rf-icon rf_hamburger"></i>
				</div>
			</div>
		</div>
		</div>
		<div class="row">
			<div class="container">
				<div class="col-sm-6 rfMenuList col-sm-offset-3" id="menuList">
					<div class="rfMenuItem <?php if($activeState == "tour") echo "active"; ?>">
						<a href="/tour/">Tour</a>
					</div>
					<div class="rfMenuItem <?php if($activeState == "features") echo "active"; ?>">
						<a href="/features/">Features</a>
					</div>
					<div class="rfMenuItem <?php if($activeState == "docs") echo "active"; ?>">
						<a href="/docs/">Documentation</a>
					</div>
					<div class="rfMenuItem <?php if($activeState == "pricing") echo "active"; ?>">
						<a href="/dashboard/buy/">Pricing</a>
					</div>
					<div class="rfMenuItem lastMenuItem <?php if($activeState == "sales") echo "active"; ?>">
						<a href="/contact/sales.php">Contact Sales</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="headerHeight"></div>
<?php if ($topbarFlag) { ?>
<div class="rfheader">
    <div class="container">
        <a href="<?php echo $topBarLink; ?>"><h2><?php echo $topBarTitle; ?></h2></a>
    </div>
</div>
<?php } ?>
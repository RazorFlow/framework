<?php
$this->Html->script('razorflow.wrapper.min', array('inline' => false));
$this->Html->css('razorflow.min', null, array('inline' => false));
?>
<h2>Embedded Dashboard</h2>

<?php $db->renderEmbedded(); ?>
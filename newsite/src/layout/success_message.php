<?php

if(isset($_SESSION['message'])) {
  echo "<div class='alert alert-success'>" . $_SESSION['message'] . "</div>";
  unset($_SESSION['message']);
}
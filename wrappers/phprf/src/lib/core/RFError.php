<?php

class RFError {
    public static function error ($error_number, $error_string, $error_file, $error_line) {
      header('HTTP/1.1 500 Internal Server Error', true, 500);
      $trace = debug_backtrace();
      $backtrace = '';
      for($i=0; $i<count($trace); $i++) {
        if(isset($trace[$i]['file']) && isset($trace[$i]['line']))
        {
            $backtrace .= $trace[$i]['file'].':'.$trace[$i]['line']."\n";
        }
      }
      $error = array(
        'message' => "Fatal Error",
        'error' => $error_string
      );

      echo json_encode(array(
        'errors' => $error,
        'backtrace' => $backtrace
      ));

      exit();
    }
} 
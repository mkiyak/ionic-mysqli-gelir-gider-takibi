<?php

define('DB_NAME', 'oinic-api');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_HOST', 'localhost');


$mysqli = new mysqli (DB_HOST, DB_USER, DB_PASS, DB_NAME);

date_default_timezone_set('Europe/Istanbul');
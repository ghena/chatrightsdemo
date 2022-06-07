<?php

require 'vendor/autoload.php';

use Steampixel\Route;
use App\Controllers\ControllerActions;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

Route::add('/textract', function() {
    return ControllerActions::Textract();
  }, 'get');

Route::add('/getpdf', function() {
    return ControllerActions::getPdf();
}, 'POST');


Route::add('/download', function() {
    return ControllerActions::Download();
}, 'GET');

Route::add('/', function() {
    return 'forbidden';
}, 'GET');

Route::add('/', function() {
    return 'forbidden';
}, 'POST');


Route::run('/');
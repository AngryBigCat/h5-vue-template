<?php


$config = require './config.php';
require_once "jssdk.php";

session_start();

$appId = $config['appId'];
$appSecret = $config['appSecret'];
$jssdk = new JSSDK($appId, $appSecret);
$signPackage = $jssdk->GetSignPackage($_REQUEST['url']);
$signPackage['unionid'] = $_SESSION['user']['unionid'];
echo json_encode($signPackage);
exit();

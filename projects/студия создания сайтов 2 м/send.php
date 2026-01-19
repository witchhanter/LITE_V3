<?php
$name = $_POST['name'];
$email = $_POST['email'];
$msg = $_POST['msg']

$name = trim(urldecode(htmlspecialchars($name)));
$email = trim(urldecode(htmlspecialchars($email)));
$msg = trim(urldecode(htmlspecialchars($msg)));

if(mail("witchhanter999@gmail.com",
    "Новый запрос",
    "<h1>На сайте оставлена заявка<h1>
    <br>от:<b>".$name."</b>
    <br>email:<b>".$email."</b>
    <br>комментарий:<b>".$msg."
    <br>Поздравляю с новой заявкой!",
    "From: 1c-webdevelopment.ru\r\n". "Content-type: text/html\r\n")
{
    echo "{'status': 'ok'}";
}else{
    echo "{'status': 'error'}";
}

?>

<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "facebook";
// Create connection
$conn = new mysqli($servername, $username, $password , $dbname);


$name = $_POST['comment_owner'];
$content = $_POST['comment'];
$liked = $_POST['liked'];
$post_id = $_POST['post_id'];

if($name !="" || $content !="" ||$liked !="" )
{
$insert = "INSERT INTO `comment` ( `comment_owner`, `comment`, `liked` , `post_id`) VALUES ( '$name', '$content', '$liked','$post_id');";

mysqli_query ($conn,$insert);

$select = "SELECT * from comment ORDER BY id ASC";

$record = mysqli_query ($conn , $select);

while ($row = mysqli_fetch_assoc($record))
{
    $items[] = $row;
}

}
echo json_encode($items);
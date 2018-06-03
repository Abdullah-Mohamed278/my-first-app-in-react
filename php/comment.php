<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "facebook";
// Create connection
$conn = new mysqli($servername, $username, $password , $dbname);




$select = "SELECT * from comment ORDER BY id ASC";

$record = mysqli_query ($conn , $select);

$num = mysqli_num_rows($record);


    while ($row = mysqli_fetch_assoc($record))
    {
        $items[] = $row;
    }
    
    echo json_encode($items);


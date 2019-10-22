<?php
$arrMarcadores=array(
    array( "latitude"=> 40.416875, "longitude"=> -3.703308, "city"=> "Madrid", "description"=> "Puerta del Sol"),
    array( "latitude"=> 40.417438, "longitude"=> -3.693363, "city"=> "Madrid", "description"=> "Paseo del Prado"),
    array( "latitude"=> 40.407015, "longitude"=> -3.691163, "city"=> "Madrid", "description"=> "Estacion de Atocha")
    );



echo json_encode($arrMarcadores);


?>
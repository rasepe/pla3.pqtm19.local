<?php
/* Establim connexió amb el servidor de BD(host,usuari,contrasenya*/
$conn = mysqli_connect('localhost', 'root', '','test');
//$conn = mysqli_connect('localhost', '', '','test');
if (!$conn) {exit("Connection Failed: " . $conn);
}

/* Identifiquem la base de dades que volem utilitzar */
mysqli_select_db($conn,'test');

/* especifiquem el mapa de caracters de la connexío */
$charset = mysqli_query($conn,"SET NAMES 'utf8'");

/* Establim la comanda SQL que volem executar consultem els noms de les comunitats */
$sql = "SELECT * FROM tbl_centros";
$rs = mysqli_query($conn, $sql );
$arrCentros=array();
while ($arr_result = mysqli_fetch_array($rs, 1)) {
    $arrCentros[]= $arr_result;
}
mysqli_close($conn);
echo json_encode($arrCentros);
?>
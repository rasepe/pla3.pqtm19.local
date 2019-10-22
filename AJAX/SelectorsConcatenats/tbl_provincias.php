<?php 
 /* Establim connexió amb el servidor de BD(host,usuari,contrasenya*/
$conn = mysqli_connect('localhost', 'root', '','test');
	if (!$conn) {exit("Connection Failed: " . $conn);
}

/* Identifiquem la base de dades que volem utilitzar */
mysqli_select_db($conn,'test' );

/* especifiquem el mapa de caracters de la connexío */
$charset = mysqli_query($conn,"SET NAMES 'utf8'");

$id_comunidades= (isset($_REQUEST['id_comunidades']))? $_REQUEST['id_comunidades'] : 0 ;

/* Establim la comanda SQL que volem executar consultem els noms de les comunitats */
$sql = "SELECT * FROM tbl_provincias";
if($id_comunidades!=0){
	$sql .= " WHERE id_comunidades=".$id_comunidades;
}

$rs = mysqli_query($conn,$sql );
$arrProvincias=array();
while ($arr_result = mysqli_fetch_array($rs, 1)) {
	$arrProvincias[]= $arr_result;
}
mysqli_close($conn);
echo json_encode($arrProvincias);
?>
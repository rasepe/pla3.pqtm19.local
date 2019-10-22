<?php 
 /* Establim connexió amb el servidor de BD(host,usuari,contrasenya*/
$conn = mysqli_connect('localhost', 'root', '','test');
if (!$conn) {exit("Connection Failed: " . $conn);
}

/* Identifiquem la base de dades que volem utilitzar */
mysqli_select_db( $conn,'test');

/* especifiquem el mapa de caracters de la connexío */
$charset = mysqli_query($conn, "SET NAMES 'utf8'");

$id_provincias= (isset($_REQUEST['id_provincias']))? $_REQUEST['id_provincias'] : 0 ;

/* Establim la comanda SQL que volem executar consultem els noms de les comunitats */
$sql = "SELECT * FROM tbl_municipios";
if($id_provincias!=0){
	$sql .= " WHERE id_provincias=".$id_provincias;
}
$rs = mysqli_query($conn,$sql );
$arrMunicipios=array();
while ($arr_result = mysqli_fetch_array($rs, 1)) {
	$arrMunicipios[]= $arr_result;
}
mysqli_close($conn);
echo json_encode($arrMunicipios);
?>
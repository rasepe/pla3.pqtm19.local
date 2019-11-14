var email 		= 'admin@cifo.cat';
var password 	= '12345';
var cadena		= "Basic "+ btoa(email+":"+password);
window.sessionStorage.setItem("Authorization",cadena);


if (window.XMLHttpRequest) { // Mozilla, Safari, ...
	xhr = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

window.onload=function(){
	tabla=$('#dataTableComunidades').DataTable({
		"language": {
	        url: 'es_ES.json'
	    },
	    "pageLength"	: 5 ,
	    "lengthMenu"	: [ 5, 10, 25, 50, 75, 100 ],
	    "stateSave" 	: true,
	    "columnDefs" 	: [
	    	{"data":"id"		, "targets":0, "searchable": true,  "orderable": true },
	    	{"data":"nombre"	, "targets":1, "searchable": true,  "orderable": true },
	    	{"data":"active"	, "targets":2, "searchable": true,  "orderable": true },
	    	{"data":"edit"		, "targets":3, "searchable": false, "orderable": false , "className": "text-center"},
	    	{"data":"remove"	, "targets":4, "searchable": false, "orderable": false , "className": "text-center"}
	    ]
	});
	$("#modalAjax").modal("show");
	getComunidades();
}

/* ---------------------------------------- getComunidades ------------------------------------------------*/
function getComunidades(){
	tabla.clear().draw(false);

	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 &&  xhr.status == 200 ) {
			var objResponse=JSON.parse(xhr.responseText);
		    if(objResponse.status==true){
		    	for(i in objResponse.records){
		    		if(objResponse.records[i].active=="1"){
		    			var circle='<span class="text-success"><i class="fas fa-check-circle"></i></span>';
		    		}else{
		    			var circle='<span class="text-danger"><i class="fas fa-times-circle"></i></span>';
		    		}
		    		
		    		
		    		tabla.row.add(  {
		    		"id" 		: objResponse.records[i].id,
		    		"nombre" 	: objResponse.records[i].nombre,
		    		"active" 	: circle,
		    		"edit" 		: '<a class="text-info" href="#" onclick="editComunidad('+objResponse.records[i].id+')" aria-label="Editar"><i class="fa fa-edit"></i></a>',
		    		"remove" 	:'<a class="text-danger" href="#" onclick="removeComunidad('+objResponse.records[i].id+')" aria-label="Eliminar"><i class="fa fa-trash"></i></a>',
		    		});
		    	}
		    	tabla.draw(false);
		    }else{
		    	alert(objResponse.msg);
		    }
		    $("#modalAjax").modal("hide");
		    var endTime= new Date();
		    document.querySelector("#cardComunidades div.card-footer span").innerHTML= endTime-initTime;
		    
		}else if(xhr.readyState == 4 &&  xhr.status == 401){
			var objResponse=JSON.parse(xhr.responseText);
		    if(objResponse.status==false){
		    	alert(objResponse.msg);
		    	location.href="/login.html";
		    }
		}
	}
	xhr.open('GET','http://app.cifo.local/api/private/cifo/comunidades/',true);
	xhr.setRequestHeader("authorization", window.sessionStorage.getItem("Authorization"));
	xhr.send(null);
}

/* ----------------------------------- editComunidad --------------------------------------------*/
function editComunidad(id){
	
	$("#modalAjax").modal("show");
	
	document.querySelectorAll("#editModal form input[type=text]").forEach(function(item){
		item.value=''
	});
	document.querySelectorAll("#editModal form input[type=radio]").forEach(function(item){
		item.checked=false;
	});
	
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 &&  xhr.status == 200 ) {
			// tot va bé, s'ha rebut la resposta
			var objResponse=JSON.parse(xhr.responseText);
		    if(objResponse.status==true){
		    	var objForm= document.querySelector("#editModal form");
		    	for (key in objResponse.record ){
		    		if (typeof objForm[key] !== 'undefined') {
		    			objForm[key].value=objResponse.record[key];
		    		}
		    	}
		    	// ---- Netejar classes 'is-invalid' i 'is-valid' ----
		    	objForm.querySelectorAll("*").forEach(function(item){
		    		item.className=item.className.replace(/(is-valid|is-invalid)/g,'');
		    	});
		    	$("#editModal").modal("show");
		    }
		    $("#modalAjax").modal("hide");
		}
	}
	xhr.open('GET','http://app.cifo.local/api/private/cifo/comunidades/'+id+'/',true);
	xhr.setRequestHeader("authorization", window.sessionStorage.getItem("Authorization"));
	xhr.send(null);
}
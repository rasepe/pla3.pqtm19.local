var email 		= 'admin@cifo.cat';
var password 	= '12345';
var cadena		= "Basic "+ btoa(email+":"+password);
window.sessionStorage.setItem("Authorization",cadena);

var xhr;

if (window.XMLHttpRequest) { // Mozilla, Safari, ...
	xhr = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}


/* -------------------------------------submit ---------------------------------*/
document.getElementById("btnSave").onclick=function(evt){

	evt.preventDefault();

	// var totOk control de enviament
	var totOk=true;
	
	// ---- Netejar classes 'is-invalid' i 'is-valid' ----
	this.form.querySelectorAll("*").forEach(function(item){
		item.className=item.className.replace(/(is-valid|is-invalid)/g,'');
	});
	
	// ------------------------ nombre --------------------
	this.form.nombre.value= this.form.nombre.value.trim();
	var pattern = /\d/;
	if( pattern.test(this.form.nombre.value) || this.form.nombre.value==""){
		this.form.nombre.className+=' is-invalid';
		totOk=false;
	}
	
	// --------------------------- active -----------------------------------
	  if(this.form.active.value==""){
		  this.form.querySelectorAll('input[name=active]').forEach(function(item){
			  item.className+= " is-invalid ";
			  
		  });
		  totOk=false;
	  };
	  
	
	if(totOk){
		$("#modalAjax").modal("show");
		xhr.onreadystatechange =function(){
	        if (xhr.readyState == 4 && xhr.status == 200) {
	          $("#modalAjax").modal("hide");
	          var response=JSON.parse(xhr.responseText);
	          if( response.status){
	        	  document.getElementById("btnReset").click();
	        	  $("#saveModal").modal("show");
	          }else{
	        	  alert(response.msg);
	          }
	        }
		}
		var formData = new FormData(this.form);
      	var object = {};
      	formData.forEach(function(value, key){
      			object[key] = value;  	
      	});
      	
      	xhr.open('POST','http://app.cifo.local/api/private/cifo/comunidades/',true);
      	xhr.setRequestHeader("authorization", window.sessionStorage.getItem("Authorization"));
        xhr.send(JSON.stringify(object));
	}
}
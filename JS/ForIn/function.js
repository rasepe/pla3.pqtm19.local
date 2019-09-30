/**
 * 
 */
		function publishUL(objArray, id) {
			var objUL = document.getElementById(id);
			for (i in objArray) {
				console.log(objArray[i]);
			objUL.innerHTML += "<li>" + objArray[i] + "</li>";
				debugger;
			}
			
			function publishUL2(objArray) {
				var cadena="";
				for (var i=0; i<objArray.length; i++) {
					console.log("Dins de la funció");
					cadena+="<li>"+objArray[i]+"</li>";
					debugger;
				}
				return cadena;
			}

		}

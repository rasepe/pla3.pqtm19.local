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

		}

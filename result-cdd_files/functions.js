function asignar(id, valor) {
	elem = document.getElementById(id);
	elem.value = valor;
}

function asignarYActivar(idGenerador, idReceptor, valorActiva) {
	gen = document.getElementById(idGenerador);
	rec = document.getElementById(idReceptor);

	if (gen.value == valorActiva) {
		rec.disabled = false;
	} else {
		rec.disabled = true;
		rec.value = '';
	}
}

function enviar(idForm){
	document.getElementById(idForm).submit();
}

var ajax;

function getAJAX() {
	ajax;

	if (window.XMLHttpRequest)
		ajax = new XMLHttpRequest(); // No Internet Explorer
	else
		ajax = new ActiveXObject("Microsoft.XMLHTTP"); // Internet Explorer

	return ajax;
}

function llamadaAjax(llamada, destino) {
	getAJAX();
	capa = document.getElementById(destino);

	ajax.onreadystatechange = function() {
		if (ajax.readyState == 1) {
			capa.innerHTML = "Cargando.......";
		} else if (ajax.readyState == 4) {
			if (ajax.status == 200) {
				capa.innerHTML = ajax.responseText;
			} else if (ajax.status == 404) {
				capa.innerHTML = "La direccion no existe";
			} else {
				capa.innerHTML = "Error: ".ajax.status;
			}
		}
	}

	ajax.open("POST", llamada, true);
	ajax.send("");
}

function mostrarCapa(id){
	capa = document.getElementById(id);
	capa.style.display='block';
	if(id=='capaLicencia'){
		var objDiv = document.getElementById("body");
		objDiv.scrollTop = objDiv.scrollHeight;
	}
	
}

function $(id){
	var e=document.getElementById(id);
	if(!e)e=document.getElementsByName(id);
	if(e&&e.length==1)e=e[0];
	return e;
}
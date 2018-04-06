const QUOTA_BYTES_PER_ITEM = 8192;
const DIAS_ANYO = 365;

setInterval(sincroniza,60000);
sincroniza();

function sincroniza() {
	chrome.storage.sync.get("dataStored", function (obj) {
	    if (obj.dataStored) {
	    	localStorage["gmailPressed"] = JSON.stringify(obj.dataStored);
	    }
	});
}

chrome.runtime.onMessage.addListener(
    function(request, sender) {
        if (request.cuentaTexto)
        {
        	var d = new Date();

        	var dateString = d.getFullYear() + '-' + ('0' + parseInt(d.getMonth()+1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
			var dataStored = new Object;
			if (localStorage["gmailPressed"]) {
				dataStored = JSON.parse(localStorage["gmailPressed"]);
			}
			if (dataStored && dataStored[dateString])
			{
				dataStored[dateString]++;
			}
			else
			{
				dataStored[dateString] = 1;
			}

			//Comprobar que el objeto no excede la capacidad sino da error al sincronizar
			if (JSON.stringify(dataStored).length >= QUOTA_BYTES_PER_ITEM) {
				borraPropiedadesObjeto(dataStored, DIAS_ANYO);
			}

			localStorage["gmailPressed"] = JSON.stringify(dataStored);
			try {
				chrome.storage.sync.set({'dataStored': dataStored}, function(a,b) {
					console.log(a);
					console.log(b);
				});
			} catch(e) {
				console.log(e);
			}
        }
    }
);

function borraPropiedadesObjeto(objeto, numeroItems) {
	var ind = 0;

	for (prop in objeto) {
		if (ind === numeroItems) {
			break;
		}
		delete objeto[prop];
		ind++;
	}
}

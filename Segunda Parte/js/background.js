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
			localStorage["gmailPressed"] = JSON.stringify(dataStored);
			chrome.storage.sync.set({'dataStored': dataStored});
        }
    }
);

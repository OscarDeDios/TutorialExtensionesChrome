(function(){
    var interval;
  $(document).ready(function() {
        $('body').on('keypress','.editable',cuentaTexto);
        $('body').on('click','.T-I,.yW',function(){
            interval = setInterval (programa, 1000);
        });
    });

    function programa()
    {
        $('.editable').off();
        $('.editable').on('keypress',cuentaTexto);
    }

    function cuentaTexto()
    {
        if (interval) clearInterval(interval);
        $nodeTemp = $(this).clone();
        $nodeTemp.find('.gmail_quote').remove();
        $('.contadorExt').remove();
        var numChar = $nodeTemp.text().length+1;
        var html = '<div class="contadorExt">' + numChar + '</div>';
        $('.aWQ').append(html);
        chrome.extension.sendMessage({cuentaTexto: numChar});
    }
}());


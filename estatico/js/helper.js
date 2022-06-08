function Confirmar(cajaId, overlayId, metodo){

    var _self = this;
    _self.principal = document.getElementById(cajaId);
    _self.overlay = document.getElementById(overlayId);
    _self.aceptar = _self.principal.getElementsByClassName("aceptar")[0];
    _self.cancelar = _self.principal.getElementsByClassName("cancelar")[0];

    _self.aceptar.addEventListener("click", function(){
        metodo();
        _self.cerrar();
    });

    _self.cancelar.addEventListener("click", function(){
        _self.cerrar();
    });

    this.mostrar = function(){
        _self.overlay.className = _self.overlay.className + " activo";
        _self.principal.className = _self.principal.className + " activo";
    }

    this.cerrar = function(){
        _self.overlay.className = _self.overlay.className.replace(" activo", "");
        _self.principal.className = _self.principal.className.replace(" activo", "");
    }

}

function obtenerParametroDelQueryString(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function regresarAMenu(){
    window.location = "../";
}

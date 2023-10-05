var buttom_tipobarrio = document.getElementById('symbolTipoBarrio')
var buttom_comuna = document.getElementById('symbolComuna')
var buttom_ano = document.getElementById('symbolAno')

var colores_comunas = {
    1: "brown",
    2: "red",
    3: "orange",
    4: "yellow",
    5: "lime",
    6: "green",
    7: "lightgreen",
    8: "cyan",
    9: "teal",
    10: "blue",
    11: "navy",
    12: "purple",
    13: "lavender",
    14: "magenta",
    15: "pink",
}

function symbolByComuna(featureLayer){
    featureLayer.eachLayer(function (layer) {  
        layer.setStyle({color : 'grey'})
        for (var i = 0; i < Object.keys(colores_comunas).length; i++) {
            let key_value = Object.keys(colores_comunas)[i]
            if(layer.feature.properties.Comuna == key_value) {layer.setStyle({color : colores_comunas[key_value]})} 
        }
    });
}

buttom_tipobarrio.onclick = function(){
    symbologyType = 'TipoBarrio'
    CABA_br.resetStyle()
    CABA_br_zones.resetStyle()
    mymap.removeControl(legend)
    legend.onAdd = function(mymap) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<h4>Tipo de Asentamiento</h4>";
        for (var i = 0; i < poly_type.length; i++) {
            div.innerHTML += '<i style="background: '+poly_colors[i]+'"></i><span>'+poly_type[i]+'</span><br>';
        }
        return div;
    };
    legend.addTo(mymap);
}

buttom_comuna.onclick = function() {
    symbologyType = 'Comunas'
    symbolByComuna(CABA_br)
    symbolByComuna(CABA_br_zones)
    mymap.removeControl(legend)
    legend.onAdd = function(mymap) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<h4>Comunas</h4>";
        for (var i = 0; i < Object.keys(colores_comunas).length; i++) {
            let key_value = Object.keys(colores_comunas)[i]
            div.innerHTML += '<i style="background: '+colores_comunas[key_value]+'"></i><span> Comuna '+key_value+' </span><br>';
        }
        return div;
    };
    legend.addTo(mymap);
}

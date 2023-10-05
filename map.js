var div_map = document.getElementById('map')
var div_info = document.getElementById('info')
var div_cerrar = document.getElementById('cerrar')
var poly_type = ['Villas',  'Asentamientos precarios', 'Nùcleos Habitacionales Transitorios',  'Conjunto Habitacional', 'Barrio Urbanizado',  'Barrios municipales']
/* var poly_colors = ["#F67565",  "#F0BA76", "#F7F7B4",  "#C59DF5", "#30C4C7",  "#6CB0F7"] */
var poly_colors = ["#F55C7A",  "#F0BA76", "#f5e36c",  "#C59DF5", "#30C4C7",  "#6CB0F7"]
var id_poly_selected;
var map_reduce = "60%"
var symbologyType = 'TipoBarrio'

var mymap = L.map('map').setView([-34.6165205,-58.4344456], 13); 

var ESRIImageMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 17,
	    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }),
StreetMap = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {	
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}),
Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}),
Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
}),
IGN = L.tileLayer('https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png', {
    attribution: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | <a href="http://www.ign.gob.ar/AreaServicios/Argenmap/IntroduccionV2" target="_blank">Instituto Geográfico Nacional</a> + <a href="http://www.osm.org/copyright" target="_blank">OpenStreetMap</a>',
    minZoom: 3,
    maxZoom: 18
}),
IGN_gris = L.tileLayer('https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_gris@EPSG%3A3857@png/{z}/{x}/{-y}.png', {
    attribution: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | <a href="http://www.ign.gob.ar/AreaServicios/Argenmap/IntroduccionV2" target="_blank">Instituto Geográfico Nacional</a> + <a href="http://www.osm.org/copyright" target="_blank">OpenStreetMap</a>',
    minZoom: 3,
    maxZoom: 18
}).addTo(mymap),
Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    maxZoom: 20,
    ext: 'png'
}),
Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 18,
    ext: 'png'
}),
Stamen_Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

var baseMaps = {
    "IGN": IGN,
    "IGN gris": IGN_gris,
    "<letras>OpenStreetMap</letras>": StreetMap, // "<span style='color: red'>StreetMap</span>": StreetMap,
    "<letras>ESRI - Image Map </letras>": ESRIImageMap,
    "<letras>ESRI - Topo Map </letras>": Esri_WorldTopoMap,
    "<letras>ESRI - Gray Canvas </letras>": Esri_WorldGrayCanvas,
    /* "<letras>Stamen Toner Lite</letras>": Stamen_TonerLite,
    "<letras>Stamen Terrain<letras>": Stamen_Terrain,
    "<letras>Stamen Toner</letras>": Stamen_Toner */
    };   


var CABA_br = L.geoJSON(CABA_br_data, {
    style: function (feature) {
        switch (feature.properties.TIPO_ASENT) {
            case 'Villas': return {color: poly_colors[0], fillOpacity: 0.5, weight: 2};
            case 'Asentamientos precarios':   return {color: poly_colors[1], fillOpacity: 0.5, weight: 2};
            case 'Nùcleos Habitacionales Transitorios': return {color: poly_colors[2], fillOpacity: 0.5, weight: 2};
            case 'Conjunto Habitacional':   return {color: poly_colors[3], fillOpacity: 0.5, weight: 2};
            case 'Barrio Urbanizado': return {color: poly_colors[4], fillOpacity: 0.5, weight: 2};
            case 'Barrios municipales':   return {color: poly_colors[5], fillOpacity: 0.5, weight: 2};     
        }
    }
}).bindPopup(function (layer) {
    return "<b>" + layer.feature.properties.NOM_MAP + " - Mz. "+ layer.feature.properties.MANZANA + "</b><br>" + layer.feature.properties.TIPO_ASENT + "<br><b>Obs.:</b> " + layer.feature.properties.OBSERV;
});


var CABA_br_zones = L.geoJSON(CABA_br_zone_data, {
    style: function (feature) {
        switch (feature.properties.TIPO_ASENT) {
            case 'Villas': return {color: poly_colors[0], fillOpacity: 0.5, weight: 2};
            case 'Asentamientos precarios':   return {color: poly_colors[1], fillOpacity: 0.5, weight: 2};
            case 'Nùcleos Habitacionales Transitorios': return {color: poly_colors[2], fillOpacity: 0.5, weight: 2};
            case 'Conjunto Habitacional':   return {color: poly_colors[3], fillOpacity: 0.5, weight: 2};
            case 'Barrio Urbanizado': return {color: poly_colors[4], fillOpacity: 0.5, weight: 2};
            case 'Barrios municipales':   return {color: poly_colors[5], fillOpacity: 0.5, weight: 2};     
        }
    }
}).bindPopup(function (layer) {
    return "<b>" + layer.feature.properties.NOM_MAP + "</b><br>" + layer.feature.properties.TIPO_ASENT;
}).addTo(mymap);

var CABA_renavap = L.geoJSON(CABA_renavap_data, {
    style: function (feature) {
        return {
                color: "#E96C5A",  /* "#009BB0", */
                fillColor: "#F7C7A7", /* "#83EFF1", */
                fillOpacity: 0.5,
                weight: 2
        };
    }
}).bindPopup(function (layer) {
    return "<b>" + layer.feature.properties.Descripci_ + "</b><br>" + layer.feature.properties.localidad +" ("+ layer.feature.properties.departamen+ ")" ;
});

/* Control */
var layers = {
    "CABA Barrios": CABA_br,
    "Barrios Renavap": CABA_renavap
};
L.control.layers(baseMaps, layers, {position: 'topleft'}).addTo(mymap); 


/* Legend */
var legend = L.control({ position: "bottomleft" });
legend.onAdd = function(mymap) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Tipo de Asentamiento</h4>";

    for (var i = 0; i < poly_type.length; i++) {
        div.innerHTML += '<i style="background: '+poly_colors[i]+'"></i><span>'+poly_type[i]+'</span><br>';
    }
    return div;
};
legend.addTo(mymap);


/* Change style on click (selected) */
function onBarrioClick(e) {
    if (id_poly_selected != e.sourceTarget.feature.properties.Id){

        resetSymbology()
        
        id_poly_selected = e.sourceTarget.feature.properties.Id
        CABA_br.eachLayer(function (layer) {  
            if(layer.feature.properties.Id == id_poly_selected) {    
            layer.setStyle({color : 'yellow'}) 
            }         
        });
        CABA_br_zones.eachLayer(function (layer) {  
            if(layer.feature.properties.Id == id_poly_selected) {    
            layer.setStyle({color : 'yellow'}) 
            }         
        });
        sidevar_data_update(e.sourceTarget.feature.properties.NOM_MAP)
        div_info.style.display = "block";
        /* div_map.style.width = map_reduce; */
    } else {
        id_poly_selected = -1
        resetSymbology()
        div_info.style.display = "none";
        /* div_map.style.width = "100%"; */
    }
}
CABA_br.on('click', onBarrioClick);
CABA_br_zones.on('click', onBarrioClick);





var activeLayer = 'zones'
function onMapZoom(e) {
    let zoomLevel = mymap.getZoom();

    if (zoomLevel <= 15 && activeLayer != 'zones'){
        activeLayer = 'zones'
        CABA_br_zones.addTo(mymap)
        mymap.removeLayer(CABA_br)
    } else if (zoomLevel > 15 && activeLayer != 'barrios'){
        activeLayer = 'barrios'
        CABA_br.addTo(mymap)
        mymap.removeLayer(CABA_br_zones)
    }
}
mymap.on('zoom', onMapZoom);
 
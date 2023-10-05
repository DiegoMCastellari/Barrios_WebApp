var div_dropdown = document.getElementById('dropdown')

var lista_barrios = Object.keys(datos_barrios)
div_dropdown.innerHTML = ""
div_dropdown.innerHTML += "<option>Ninguna - Seleccionar Barrio</option>"
for (var i = 0; i < lista_barrios.length; i++){
    div_dropdown.innerHTML += "<option>"+lista_barrios[i]+"</option>"
}

function styleDropdown(featureLayer, selectedValue){
    featureLayer.eachLayer(function (layer) {  
        layer.setStyle({color : 'grey'})
        if(layer.feature.properties.NOM_MAP == selectedValue) {    
            layer.setStyle({color : 'yellow'})    
        }         
    })
}


function selectOption() {
    // get the index of the selected option
    let selectedIndex = div_dropdown.selectedIndex;
    // get a selected option and text value using the text property
    let selectedValue = div_dropdown.options[selectedIndex].text;

    let north = -34.5474261;
    let east = -58.35041293;
    let west = -58.52739985;
    let sud = -34.69163551;
    let corner1 = L.latLng(sud, west);
    let corner2 = L.latLng(north, east);
    let bounds = L.latLngBounds(corner1, corner2);

    if (selectedValue != "Ninguna - Seleccionar Barrio"){
        sidevar_data_update(selectedValue)
        div_info.style.display = "block";
        /* div_map.style.width = map_reduce; */
        div_map.style.display = "block";   

        CABA_br.resetStyle()
        CABA_br_zones.resetStyle()
        styleDropdown(CABA_br, selectedValue)
        styleDropdown(CABA_br_zones, selectedValue)
        
        
        CABA_br.eachLayer(function (layer) {  
            layer.setStyle({color : 'grey'})
            if(layer.feature.properties.NOM_MAP == selectedValue) {    
                layer.setStyle({color : 'yellow'})    
                
                let boundary = layer.getBounds()
                let bound_north = boundary._northEast.lat
                let bound_east = boundary._northEast.lng 
                let bound_sud = boundary._southWest.lat
                let bound_west = boundary._southWest.lng

                if (bound_north < north ){north = bound_north}
                if (bound_east < east ){east = bound_east}
                if (bound_sud > sud ){sud = bound_sud}
                if (bound_west > west ){west = bound_west}
            }         
        })
        east = east-((east-west)/2)
        corner1 = L.latLng(sud, west);
        corner2 = L.latLng(north, east);
        bounds = L.latLngBounds(corner1, corner2);
    } else {
        if (symbologyType == 'TipoBarrio'){
            CABA_br.resetStyle()
            CABA_br_zones.resetStyle()
        } else if (symbologyType == 'Comunas'){
            symbolByComuna(CABA_br)
            symbolByComuna(CABA_br_zones)
        }
    }
    mymap.flyToBounds(bounds);
 }


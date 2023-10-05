var div_info = document.getElementById('info')

function sidevar_data_update(nombre_barrio){
    var datos_sidebar = datos_barrios[nombre_barrio]
    if (datos_sidebar) {
        /* title */
        div_info.innerHTML = '<div id="head"> <button id="cerrar" onclick="reset_info()">X</button><div id="nombreBarrio" >'+ datos_sidebar.nombre + '</div></div>';
        /* sections*/
        var text_content = "";
        for (var i = 0; i < datos_sidebar.contenido.length; i++) {
            text_content += '<div id="tituloSeccion"> ' + datos_sidebar.contenido[i].titulo + '</div>';
            
            for (var d = 0; d < datos_sidebar.contenido[i].datos.length; d++) {
                text_content += '<div id="contenidoSeccion">'+datos_sidebar.contenido[i].datos[d]+'</div>';
            }
        }
        div_info.innerHTML += "<div id='sidecontent'>"+ text_content +"</div>"

    } else {
        div_info.innerHTML = '<div id="head"> <button id="cerrar" onclick="reset_info()">X</button><div id="nombreBarrio" > SIN DATOS </div></div>';
        div_info.innerHTML += '<div id="sidecontent"><div id="tituloSeccion"> No se encontraron datos sobre este barrio. Seleccione otro barrio.</div></div>';
    }
}

function reset_info() {
    id_poly_selected = -1
    div_info.style.display = "none";
    resetSymbology()
    /* div_map.style.width = "100%"; */
}
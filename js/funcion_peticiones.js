function consultar( ) 
{
    $.ajax( 
       {
            url: 'https://g42eedbcfd37839-bdgastos.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/gastos/gastos',
            //  data : { id : 123 },
            type: 'GET',
            dataType: 'json',

           
            complete: function (xhr, status) {
                alert('Petición realizada, ' + xhr.status);
            },
            success: function (json) {
                $("#resultado").empty();
                tabla = "<center><table border='1'><tr><th>ID<th>NOMBRE<th>PRECIO<th>DESCRIPCION"
                total = 0;
                filas = ""
                for (i = 0; i < json.items.length; i++) {
                    filas += "<tr>"
                    filas += "<td>" + json.items[i].id
                    filas += "<td>" + json.items[i].nombre
                    filas += "<td>$" + json.items[i].valor
                    filas += "<td>" + json.items[i].descripcion
                    total += json.items[i].valor
                }
                $("#resultado").append(tabla + filas + "<tr><th colspan='2'>TOTAL:<td>$" + total + "</center>")
                console.log(json)
            }
        }
    );
}

/**
 * FUNCION PARA CONSULTAR POR ID
 */

function consultarPorId(campoId){
    if(campoId.val() == ""){
        alert("Hommmbeeee, debes ingresar el ID del gasto")
    }
    else{
        var id = campoId.val()
        $.ajax(
            {
                url: 'https://g42eedbcfd37839-bdgastos.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/gastos/gastos'+id,
                type: 'GET',
                dataType: 'json',
                success: function (json) {
                    $("#resultado").empty();
                    if(json.items.length == 0){
                        alert("Eddaaaa, te equivocaste")
                        campoId.val("")
                        
                    }
                    else{
                        tabla = "<center><table border='1'><tr><th>ID<th>NOMBRE<th>PRECIO<th>DESCRIPCION"
                        total = 0;
                        filas = ""
                        for (i = 0; i < json.items.length; i++) {
                            filas += "<tr>"
                            filas += "<td>" + json.items[i].id
                            filas += "<td>" + json.items[i].nombre
                            filas += "<td>$" + json.items[i].valor
                            filas += "<td>" + json.items[i].descripcion
                            total += json.items[i].valor
                        }
                        $("#resultado").append(tabla + filas + "<tr><th colspan='2'>TOTAL:<td>$" + total + "</center>")
                        console.log(json)
                    }
                   
                },
                complete: function (xhr, status) {
                    alert('Petición realizada, ' + xhr.status);
                },
                error: function (xhr, status) {
                    alert('ha sucedido un problema, ' + xhr.status);
                }

            }

        )
    }
}

/**
 * Esta funcion limpia el formulario
 */
function limpiarFormulario(){
    if(confirm("¿SEGURO QUE DESEA LIMPIAR LA PAGINA?")){
        var campo =  document.getElementById("codigo")
        var resultado =  document.getElementById("resultado")
        campo.value = "";
        resultado.innerHTML = ""
    }
}

function limpiarFormularioJq(){
    if(confirm("¿SEGURO QUE DESEA LIMPIAR LA PAGINA?")){
        var campo =  $("#codigo")
        var resultado =   $("#resultado")
        campo.val("") ;
        resultado.html("")
    }
}
/**
 * FUNCION QUE SOLICITA AL API REST ORACLE QUE GUARDE UN GASTO
 */

function guardarUsuario(){
    if(validarFormulario()){
        if(confirm("¿Seguro que deseas Guardar este gasto?")){
                $.ajax(
                    {
                        url: 'https://g42eedbcfd37839-bdgastos.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/gastos/gastos',
                        type: 'POST',
                        dataType: 'json',
                        data : {
                                nombre : $("#nombre").val(),
                                precio:  $("#precio").val(),
                                fecha : "04/11/2021",
                                descripcion : $("#desc").val(),
                                usuario : $("#user").val()
                        },
                        success: function (json) {
                           
                           
                        },
                        complete: function (xhr, status) {
                            alert('Petición realizada, ' + xhr.status);
                        },
                        error: function (xhr, status) {
                            alert('ha sucedido un problema, ' + xhr.status);
                        },
                    }
                )
        }
    }
}


function validarFormulario(){
    if($("#nombre").val() == ""){
        alert("El NOMBRE es necesario")
        return false
    }
    if($("#precio").val() == ""){
        alert("El PRECIO es necesario")
        return false
    }
    if($("#user").val() == ""){
        alert("El USUARIO es necesario")
        return false
    }
    if($("#desc").val() == ""){
        alert("La DESCRIPCION es necesaria")
        return false
    }
    return true
}

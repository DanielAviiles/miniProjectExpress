function obtenerInfo() {
  if ($("select[name=userPedido]").val()) {
    $.ajax({
      url: "/lista/pedidos/infoUsuario",
      method: "POST",
      data: {
        id_usuario: $("select[name=userPedido]").val()
      },
      dataType: "json"
    }).done(msg => {
      $("#cedulaPedido").val(msg.resp[0].identificacion);
      $("#celularPedido").val(msg.resp[0].celular);
    })
  }
}

$(document).ready(function () {
  $("select[name=userPedido]").change(() => obtenerInfo());
});
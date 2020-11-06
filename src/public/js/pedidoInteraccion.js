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

function accionAddPedido(cantidadProductos) {
  let body = {
    user_id: $("select[name=userPedido]").val(),
    data: [],
    vTotalP: $("input[name=vTotalPedido]").val()
  }
  for (let i = 0; i < cantidadProductos; i++) {
    body.data.push({
      producto_id: $(`select[name=pedidoSeleccion${i + 1}]`).val(),
      cantidadP: $(`input[name=cantidadPedido${i + 1}]`).val(),
    })
  }
  
  $.ajax({
    url: "/lista/pedidos",
    method: "POST",
    data: JSON.stringify(body),
    dataType: "string"
  }).done(
    setTimeout(function () { location.reload(); }, 2000)
  );
}

function obtenerInfoProducto(cantidadIteracion) {
  for (let j = 0; j < cantidadIteracion; j++) {
    if ($(`select[name=pedidoSeleccion${j+1}]`).val()) {
      $.ajax({
        url: "/lista/pedidos/pedidoEspecifico",
        method: "POST",
        data: {
          id_product: $(`select[name=pedidoSeleccion${j+1}]`).val()
        },
        dataType: "json"
      }).done(msg => {
        $(`input[name=valorUnitarioPedido${j+1}`).attr('value',msg.resp[0].valor);
        $(`input[name=valorTotalPedido${j+1}`).attr('value',0);
        // $(`input[name=valorTotalPedido${j+1}`).attr('value',msg.resp[0].valor);
      })
    }
  }
}

function addPedidoProducto(cantidadIteracion) {
  $.ajax({
    url: "/lista/pedidos/listaproductos",
    method: "GET",
    dataType: "json"
  }).done(msg => {
    for (let i = 0; i < cantidadIteracion; i++) {
      if ($(`select[name=pedidoSeleccion${i + 1}`)) {
        msg.dataProductos.forEach(element => {
          infoProduct = `<option value="${element.id}">${element.nombre}</option>`
          $(`select[name=pedidoSeleccion${i+1}]`).append(infoProduct);
        });
      }
    }
  });
}

let iterador = 0;
function addCompra() {
  $("#rowSinRegistro1").remove();
  iterador++;
  fila = `<tr>
            <td>
              <div class="row">
                <div class="col-lg-12">
                  <select class="col-form-control" name="pedidoSeleccion${iterador}">
                    <option selected disabled>Choose</option>
                  </select>
                </div>
              </div>
            </td>
            <td>
              <div class="input-group">
                <div class="input-group-prepend col-lg-2">
                  <span class="input-group-text" id="basic-addon1">$</span>
                </div>
                <input type="number" class="col-lg-10 col-form-control" name="valorUnitarioPedido${iterador}" value="0" disabled>
              </div>
            </td>
            <td>
              <input type="number" class="col-lg-12 col-form-control" min="1" name="cantidadPedido${iterador}" value="1">
            </td>
            <td>
              <div class="input-group">
                <div class="input-group-prepend col-lg-2">
                  <span class="input-group-text" id="basic-addon1">$</span>
                </div>
                <input type="number" class="col-lg-10 col-form-control" name="valorTotalPedido${iterador}" value="0" disabled>
              </div>
            </td>
          </tr>`;
  $("#tableAddProductoPedido").append(fila);
  addPedidoProducto(iterador);
}

let iterador1 = 0; let valorT = 0;
$(document).ready(function () {
  $("select[name=userPedido]").change(() => obtenerInfo());

  filaSinRegistro = `<tr id="rowSinRegistro1">
                      <th scope="row" colspan="4" class="text-center">No hay registros</th>
                    </tr>`;
  $("#tableAddProductoPedido").append(filaSinRegistro);

  $("#btnAddCompra").click(function () {
    iterador1++;
    $(`select[name=pedidoSeleccion${iterador1}]`).change(() => obtenerInfoProducto(iterador1));
  });

  let iteradorChck = 0; let operacion = 0;
  $("input[name=chckPedido]:checkbox").change(function () {
    iteradorChck++;
    if (iteradorChck % 2) {
      for (let j = 0; j < iterador1; j++) {
        operacion = parseFloat($(`input[name=cantidadPedido${j + 1}]`).val()) * parseFloat($(`input[name=valorUnitarioPedido${j + 1}]`).attr('value'));
        $(`input[name=valorTotalPedido${j + 1}]`).attr('value', operacion);
        operacion = 0;
      }
      for (let i = 0; i < iterador1; i++) {
        valorT = valorT + parseFloat($(`input[name=valorTotalPedido${i + 1}]`).attr('value'));
      }
      $(`input[name=vTotalPedido]`).attr('value', valorT);
    } else {
      valorT = 0;
      $(`input[name=vTotalPedido]`).attr('value', valorT);
      for (let i = 0; i < iterador1; i++) {
        $(`input[name=valorTotalPedido${i + 1}]`).attr('value', 0);
      }
    }
  });

  $("#guardarPedido").click(function () {
    accionAddPedido(iterador1);
  });

});
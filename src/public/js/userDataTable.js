
$(document).ready(function () {
  $("#userTable").DataTable({
    "responsive": true, "lengthChange": true, "autoWidth": false,
    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
    // "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
    "buttons": ["copy", "excel", "pdf", "print"],
    "language": {
      "zeroRecords": "No hay datos disponibles en la tabla",
      "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
      "infoEmpty": "No hay registros disponibles",
      "lengthMenu": "Mostrar _MENU_ entradas",
      "search": "Buscar: ",
      "paginate": {
        "next": "Siguiente",
        "previous": "Anterior"
      }
    }
  }).buttons().container().appendTo('#userTable_wrapper .col-md-6:eq(0)');

  $("#productTable").DataTable({
    "responsive": true, "lengthChange": true, "autoWidth": false,
    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
    // "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
    "buttons": ["copy", "excel", "pdf", "print"],
    "language": {
      "zeroRecords": "No hay datos disponibles en la tabla",
      "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
      "infoEmpty": "No hay registros disponibles",
      "lengthMenu": "Mostrar _MENU_ entradas",
      "search": "Buscar: ",
      "paginate": {
        "next": "Siguiente",
        "previous": "Anterior"
      }
    }
  }).buttons().container().appendTo('#userTable_wrapper .col-md-6:eq(0)');

  const menuActive = $(".nav a");
  menuActive.click(function () {
    menuActive.removeClass("active");
    $(this).addClass("active");
  });
});
document.getElementById("tipoPago").addEventListener("change", function() {
  const tipoPago = this.value;
  document.getElementById("datosTarjeta").style.display = tipoPago === "tarjeta" ? "block" : "none";
  document.getElementById("datosCripto").style.display = tipoPago === "criptomoneda" ? "block" : "none";
});
  
  function procesarPago() {
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const tipoPago = document.getElementById("tipoPago").value;
    const monto = parseFloat(document.getElementById("monto").value);
    const idTransferencia = document.getElementById("idTransferencia").value;
    const numeroFactura = Math.floor(Math.random() * 10000) + 1;

    const factura = {
      numeroFactura,
      fecha: new Date().toLocaleString(),
      nombre,
      email,
      tipoPago,
      monto,
      idTransferencia
    };
  
    // Cargar facturas existentes desde localStorage
    let facturas = JSON.parse(localStorage.getItem("facturas")) || [];
  
    // Agregar nueva factura al array
    facturas.push(factura);
  
    // Guardar el array actualizado en localStorage
    localStorage.setItem("facturas", JSON.stringify(facturas));
  
    // Mostrar factura
    mostrarFactura(factura);
  
    // Actualizar el historial de facturas DESPUÉS de guardar en localStorage
    mostrarHistorialFacturas(); 
  }
  
  
  function mostrarFactura(factura) {
    const facturaDiv = document.getElementById("factura");
    facturaDiv.innerHTML = `
      <h2>Factura</h2>
      <p>Fecha: ${factura.fecha}</p>
      <p>Nombre: ${factura.nombre}</p>
      <p>Email: ${factura.email}</p>
      <p>Tipo de Pago: ${factura.tipoPago}</p>
      <p>Monto: $${factura.monto.toFixed(2)}</p>
      ${factura.idTransferencia ? `<p>ID de Transferencia: ${factura.idTransferencia}</p>` : ''}
      <button onclick="imprimirFactura()">Imprimir</button>
    `;
    facturaDiv.style.display = "block";
  }
  
  function imprimirFactura() {
    const facturaDiv = document.getElementById("factura");
    const ventanaImpresion = window.open('', '', 'width=600,height=400');
    ventanaImpresion.document.write(facturaDiv.innerHTML);
    ventanaImpresion.document.close();
    ventanaImpresion.focus();
    ventanaImpresion.print();
    ventanaImpresion.close();
  }
  function agregarFacturaAlHistorial(factura) {
    const historialDiv = document.getElementById("historialFacturas");
    const facturaHTML = `
      <div class="factura-historial mb-3">
        <h3 class="numeroFactura">Factura #${factura.numeroFactura}</h3>
        <p>Fecha: ${factura.fecha}</p>
        <p>Nombre: ${factura.nombre}</p>
        <p>Email: ${factura.email}</p>
        <p>Tipo de Pago: ${factura.tipoPago}</p>
        <p>Monto: $${factura.monto.toFixed(2)}</p>
        ${factura.idTransferencia ? `<p>ID de Transferencia: ${factura.idTransferencia}</p>` : ''} 
        <hr>
      </div>
    `;
    historialDiv.innerHTML += facturaHTML;
  }
  
 // Cargar/Actualizar historial al iniciar la página y después de cada pago
function mostrarHistorialFacturas() {
  const facturas = JSON.parse(localStorage.getItem("facturas")) || [];
  const historialDiv = document.getElementById("historialFacturas");
  historialDiv.innerHTML = ""; 

  if (facturas.length === 0) {
    historialDiv.innerHTML = "<p>No hay facturas en el historial.</p>";
    return;
  }

  facturas.forEach(agregarFacturaAlHistorial);
}

// Llamada inicial para cargar el historial al cargar la página
mostrarHistorialFacturas();
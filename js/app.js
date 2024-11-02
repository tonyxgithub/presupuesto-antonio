import Ingreso from "./Ingreso.js";
import Egreso from "./Egreso.js";

const ingresos =[new Ingreso('Salario', 2100.00), 
                 new Ingreso('Venta coche', 1500.00)];

const egresos = [new Egreso('Renta departamento', 900.00),
                 new Egreso('Ropa', 400.00)];

const totalIngreso = () => {
    let totalIngreso = 0;
    for(const ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
};

const totalEgreso = () => {
    let totalEgreso = 0;
    for(const egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString("es-MX", {
        style:"currency",
        currency: 'MXN',
        minimumFractionDigits:2
    });
};

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-MX', {
        style: 'percent',
        minimumFractionDigits:2
    });
};

const cargarCabecero = () => {
    const presupuesto = totalIngreso() - totalEgreso();
    const porcentajeEgreso = (totalEgreso()/totalIngreso());
    const porcentjeIngreso = ( (totalIngreso()-totalEgreso())/totalIngreso());

    document.getElementById("presupuesto").innerHTML=formatoMoneda(presupuesto);
    console.log(`Presupuesto: ${formatoMoneda(presupuesto)}`);

    document.getElementById("porcentaje").innerHTML=formatoPorcentaje(porcentajeEgreso);
    console.log(`Porcentaje de Egreso: ${porcentajeEgreso.toFixed(2)} %`);

    document.getElementById("porcentajeI").innerHTML=formatoPorcentaje(porcentjeIngreso)
    console.log(`Porcenajate Ingreso ${porcentjeIngreso.toFixed(2)} %`)

    document.getElementById("ingresos").innerHTML=formatoMoneda(totalIngreso());
    console.log(`El total de los Ingresos es de ${formatoMoneda(totalIngreso())}`);

    document.getElementById("egresos").innerHTML=formatoMoneda(totalEgreso());
    console.log(`El total de los Egresos es de ${formatoMoneda(totalEgreso())}`);
};

const cargarIngreso = () =>{
    let ingresosHTML='';
    for(const ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
};

const cargarEgreso = () =>{
    let egresosHTML='';
    for(const egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
};

const crearIngresoHTML = (ingreso) => {
    return `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion} </div>
            <div class="derecha limpiarEstilos">
                  <div class="elemento_valor"> + ${formatoMoneda(ingreso.valor)}</div>
                  <div class="elemento_eliminar">
                        <button class="elemento_eliminar_btn mdi--close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"></button>
                  </div>
            </div>
        </div>
    `;
};

const crearEgresoHTML = (egreso) => {
    return `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion} </div>
            <div class="derecha limpiarEstilos">
                  <div class="elemento_valor"> - ${formatoMoneda(egreso.valor)}</div>
                  <div class="elemento_eliminar">
                        <button class="elemento_eliminar_btn mdi--close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></button>
                  </div>
            </div>
        </div>
    `;
};

const eliminarIngreso = (id) => {
    const ingreso = ingresos.findIndex(ingreso => ingreso.id === id);
    if(ingreso !== -1){
        ingresos.splice(ingreso, 1);
        cargarIngreso();
        cargarCabecero();
    }
};

const eliminarEgreso = (id) => {
    const egreso = egresos.findIndex(egreso => egreso.id === id);
    if(egreso !== -1){
        egresos.splice(egreso, 1);
        cargarEgreso();
        cargarCabecero();
    }
};

const agregarDato = () => {
    const tipo = document.getElementById('tipo').value;
    const descripcion = document.getElementById('descripcion').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if(descripcion !== "" && !isNaN(valor) && valor > 0){
        if(tipo === "Ingreso"){
            ingresos.push(new Ingreso(descripcion, valor));
            cargarIngreso();
        } else if(tipo === "Egreso"){
            egresos.push(new Egreso(descripcion, valor));
            cargarEgreso();
        }

        cargarCabecero();
        document.getElementById('descripcion').value ='';
        document.getElementById('valor').value='';
    }
};

window.eliminarIngreso = eliminarIngreso;
window.eliminarEgreso = eliminarEgreso;
window.agregarDato = agregarDato;

const cargarApp = () => {
    cargarCabecero();
    cargarIngreso();
    cargarEgreso();
};

export {cargarApp};
const obtenerTiposDeCambio = async () => {
    try {
        const response = await fetch('https://mindicador.cl/api');
        if (!response.ok) {
            throw new Error('No se pudo obtener los tipos de cambio');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error al obtener los tipos de cambio');
    }
};

const realizarConversion = async () => {
    try {
        const tiposDeCambio = await obtenerTiposDeCambio();
        
        const pesos = parseFloat(document.getElementById('pesos').value);
        const moneda = document.getElementById('moneda').value;

        if (isNaN(pesos)) {
            throw new Error('Ingresa un valor numérico para los pesos');
        }

        const cambio = pesos * tiposDeCambio[moneda].valor;
        const resultadoElement = document.getElementById('resultado');
        resultadoElement.textContent = `Resultado: ${cambio.toFixed(2)} ${moneda.toUpperCase()}`;
    } catch (error) {
        const resultadoElement = document.getElementById('resultado');
        resultadoElement.textContent = `Error: ${error.message}`;
    }
};

document.getElementById('convertirBtn').addEventListener('click', realizarConversion);

//no me esta tomando ni el obtener cambio y la conversion
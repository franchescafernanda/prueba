const obtenerCambio = async () => {
    try {
        const response = await fetch('https://mindicador.cl/api');
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error al obtener los tipos de cambio');
    }
};

// Llamada a la función
obtenerCambio().then(data => {
    console.log(data); // Aquí puedes trabajar con los tipos de cambio
}).catch(error => {
    console.error(error.message);
});


const realizarConversion = async () => {
    try {
        // Obtener tipos de cambio
        const tiposDeCambio = await obtenerCambio();

        // Obtener valores del DOM
        const pesos = parseFloat(document.getElementById('pesos').value);
        const moneda = document.getElementById('moneda').value;

        // Calcular cambio
        const cambio = pesos / tiposDeCambio[moneda].valor;

        // Mostrar resultado en el DOM
        document.getElementById('valor').textContent = `Resultado: ${cambio.toFixed(2)} ${moneda.toUpperCase()}`;
    } catch (error) {
        // Mostrar error en el DOM
        document.getElementById('valor').textContent = `Error: ${error.message}`;
    }
};



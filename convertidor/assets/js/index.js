async function obtenerTiposDeCambio() {
    try {
        const response = await fetch('https://mindicador.cl/api');
        const data = await response.json();

        if (data && data.dolar) {
            return data;
        } else {
            throw new Error('Error en la respuesta de la API');
        }
    } catch (error) {
        mostrarError('Error al obtener los tipos de cambio: ' + error.message);
    }
}

function realizarConversion() {
    var cantidad = parseFloat(document.getElementById('pesos').value);
    var moneda = document.getElementById('moneda').value;
    var resultadoElement = document.getElementById('valor');

    obtenerTiposDeCambio()
        .then(data => {
            var tasaCambio = (moneda === 'CLP') ? 1 : data[moneda].valor;
            var resultado = cantidad / tasaCambio;

            // Mostrar el resultado en el DOM
            resultadoElement.innerText = cantidad + ' pesos chilenos equivalen a ' + resultado.toFixed(2) + ' ' + moneda;

            // Llamar a la función para dibujar el gráfico
            dibujarGrafico(data);
        });
}

function mostrarError(mensaje) {
    var resultadoElement = document.getElementById('valor');
    resultadoElement.innerText = 'Error: ' + mensaje;
}

function dibujarGrafico(data) {
    var ctx = document.getElementById('grafico').getContext('2d');

    // Supongamos que solo queremos graficar el dólar y el euro
    var labels = ['Dólar (USD)', 'Euro (EUR)'];
    var valores = [data.usd.valor, data.eur.valor];

    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tasa de Cambio',
                data: valores,
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
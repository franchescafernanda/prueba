/*aqui me toma los datos*/

    function tomarDatos() {
        let pesos = parseFloat(document.getElementById("pesos").value);
        let moneda = document.getElementById("moneda").value;
    
        if (isNaN(pesos) || pesos <= 0) {
            document.getElementById("mensajeDeError").innerText = "Ingresa otro valor";
            document.getElementById("valor").innerText = "Resultado: ";
            return;
        }
    
        document.getElementById("mensajeDeError").innerText = "";
    
        /*conversión*/
        let resultado;
        switch (moneda) {
            case "usd":
                resultado = pesos * 0.0013;
                break;
            case "ars":
                    resultado = pesos * 1.12272;
            case "eur":
                resultado = pesos * 0.0011;
            case "gbp":
                resultado = pesos * 0.0009;
                break;
            default:
                resultado = "Error de calculo";
        }
    
        /*no me esta tomando el mensaje de error*/
        document.getElementById("valor").innerText = "Resultado: " + resultado.toFixed(2) + " " + moneda.toUpperCase();
    }
    

/*observacion... lograr realizar el grafico con el div canvas*/

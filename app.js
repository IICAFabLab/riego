// Token de la API Blynk
const blynkToken = '3gO4NB3Cj7xA3V35tTvwauapvX0N4D76';
const apiUrl = `https://ny3.blynk.cloud/external/api/get?token=${blynkToken}`;

// Función para obtener el horario actual desde Blynk


function getSchedule() {
    fetch(apiUrl + '&v0&v1&v2&v4&v5&v6&v7&v8&v9&v10&v11&v12')
        .then(response => response.json())
        .then(data => {
            let scheduleHtml = '';
            let pairCount = 1;
            let tiempoRiego = 0;

            if (data.v0 > 0) {
                tiempoRiego = tiempoRiego+data.v1;
                scheduleHtml += `
                    <p>Riego Número ${pairCount} - ${((7+tiempoRiego/60)%13)+(7+tiempoRiego/60)/12}:${tiempoRiego%60}: minutos</p>
                    <p>Tiempo de riego ${pairCount}: ${data.v0} minutos</p>
                `;
                pairCount++;
            }
            if (data.v2 > 0) {
                tiempoRiego = tiempoRiego+data.v4;
                scheduleHtml += `
                    <p>Riego Número ${pairCount} - ${((7+tiempoRiego/60)%13)+(7+tiempoRiego/60)/12}:${tiempoRiego%60}: minutos</p>
                    <p>Tiempo de riego ${pairCount}: ${data.v2} minutos</p>
                `;
                pairCount++;
            }
            if (data.v5 > 0) {
                tiempoRiego = tiempoRiego+data.v6;
                scheduleHtml += `
                    <p>Riego Número ${pairCount} - ${((7+tiempoRiego/60)%13)+(7+tiempoRiego/60)/12}:${tiempoRiego%60}: minutos</p>
                    <p>Tiempo de riego ${pairCount}: ${data.v5} minutos</p>
                `;
                pairCount++;
            }
            if (data.v7 > 0) {
                tiempoRiego = tiempoRiego+data.v8;
                scheduleHtml += `
                    <p>Riego Número ${pairCount} - ${((7+tiempoRiego/60)%13)+(7+tiempoRiego/60)/12}:${tiempoRiego%60}: minutos</p>
                    <p>Tiempo de riego ${pairCount}: ${data.v7} minutos</p>
                `;
                pairCount++;
            }
            if (data.v9 > 0) {
                tiempoRiego = tiempoRiego+data.v10;
                scheduleHtml += `
                    <p>Riego Número ${pairCount} - ${((7+tiempoRiego/60)%13)+(7+tiempoRiego/60)/12}:${tiempoRiego%60}: minutos</p>
                    <p>Tiempo de riego ${pairCount}: ${data.v9} minutos</p>
                `;
                pairCount++;
            }
            if (data.v11 > 0) {
                tiempoRiego = tiempoRiego+data.v12;
                scheduleHtml += `
                    <p>Riego Número ${pairCount} - ${((7+tiempoRiego/60)%13)+(7+tiempoRiego/60)/12}:${tiempoRiego%60}: minutos</p>
                    <p>Tiempo de riego ${pairCount}: ${data.v11} minutos</p>
                `;
                pairCount++;
            }

            document.getElementById('schedule').innerHTML = scheduleHtml || '<p>No hay tiempos de riego configurados.</p>';
        })
        .catch(error => console.error('Error al obtener el horario:', error));
}


// Función para actualizar el horario en Blynk
function updateSchedule(event) {
    event.preventDefault();

    // Obtener los nuevos valores desde el formulario
    const wait1 = document.getElementById('wait-1').value;
    const water1 = document.getElementById('water-1').value;

    // URL para actualizar los valores en Blynk
    const updateUrl = `https://ny3.blynk.cloud/external/api/update?token=${blynkToken}`;

    // Actualizar los valores en Blynk
    fetch(`${updateUrl}&v0=${wait1}&v1=${water1}`)
        .then(response => {
            if (response.ok) {
                document.getElementById('response').textContent = 'Horario actualizado con éxito';
                getSchedule(); // Actualizar la vista del horario
            } else {
                document.getElementById('response').textContent = 'Error al actualizar el horario';
            }
        })
        .catch(error => console.error('Error al actualizar el horario:', error));
}

// Ejecutar cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    getSchedule(); // Mostrar el horario al cargar la página

    // Manejar la actualización del formulario
    document.getElementById('schedule-form').addEventListener('submit', updateSchedule);
});

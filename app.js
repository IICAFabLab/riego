// Token de la API Blynk
const blynkToken = '3gO4NB3Cj7xA3V35tTvwauapvX0N4D76';
const apiUrl = `https://ny3.blynk.cloud/external/api/get?token=${blynkToken}`;

// Función para obtener el horario actual desde Blynk


function getSchedule() {
    fetch(apiUrl + '&v0&v1&v2&v4&v5&v6&v7&v8&v9&v10&v11&v12')
        .then(response => response.json())
        .then(data => {
            let scheduleHtml = '<table>';
            let pairCount = 1;
            let tiempoRiego = 0;

            if (data.v0 > 0) {
                tiempoRiego = data.v1;
                scheduleHtml += `
                    <tr class="watering-card-compact">
                        <td><strong>Riego ${pairCount}</strong></td>                        
                        <td><strong>Hora de inicio:</strong> ${((7 + Math.floor(tiempoRiego / 60)) % 13) + Math.floor((7 + Math.floor(tiempoRiego / 60)) / 13)}:${tiempoRiego % 60}</td>
                        <td><strong>Duración:</strong> ${data.v0} minutos</td>
                        
                    <tr>
                `;

                pairCount++;
            }
            if (data.v2 > 0) {
                tiempoRiego = data.v0+data.v1+data.v4;
                scheduleHtml += `
                    <tr class="watering-card-compact">
                        <td><strong>Riego ${pairCount}</strong></td>
                        <td><strong>Hora de inicio:</strong> ${((7 + Math.floor(tiempoRiego / 60)) % 13) + Math.floor((7 + Math.floor(tiempoRiego / 60)) / 13)}:${tiempoRiego % 60}</td>
                        <td><strong>Duración:</strong> ${data.v2} minutos</td>
                       
                    </tr>
                `;
                pairCount++;
            }
            if (data.v5 > 0) {
                tiempoRiego = data.v0+data.v1+data.v4+data.v2+data.v6;
                scheduleHtml += `
                    <tr class="watering-card-compact">
                        <td><strong>Riego ${pairCount}</strong></td>
                        <td><strong>Hora de inicio:</strong> ${((7 + Math.floor(tiempoRiego / 60)) % 13) + Math.floor((7 + Math.floor(tiempoRiego / 60)) / 13)}:${tiempoRiego % 60}</td>
                        <td><strong>Duración:</strong> ${data.v5} minutos</td>
                    </tr>
                `;
                pairCount++;
            }
            if (data.v7 > 0) {
                tiempoRiego = data.v0+data.v1+data.v2+data.v4+data.v5+data.v6+data.v8;
                scheduleHtml += `
                    <tr class="watering-card-compact">
                        <td><strong>Riego ${pairCount}</strong></td>
                        <td><strong>Hora de inicio:</strong> ${((7 + Math.floor(tiempoRiego / 60)) % 13) + Math.floor((7 + Math.floor(tiempoRiego / 60)) / 13)}:${tiempoRiego % 60}</td>
                        <td><strong>Duración:</strong> ${data.v7} minutos</td>
                    </tr>
                `;
                pairCount++;
            }
            if (data.v9 > 0) {
                tiempoRiego = data.v0+data.v1+data.v2+data.v4+data.v5+data.v6+data.v7+data.v8+data.v10;
                scheduleHtml += `
                    <tr class="watering-card-compact">
                        <td><strong>Riego ${pairCount}</strong></td>
                        <td><strong>Hora de inicio:</strong> ${((7 + Math.floor(tiempoRiego / 60)) % 13) + Math.floor((7 + Math.floor(tiempoRiego / 60)) / 13)}:${tiempoRiego % 60}</td>
                        <td><strong>Duración:</strong> ${data.v9} minutos</td>
                    </tr>
                `;
                pairCount++;
            }
            if (data.v11 > 0) {
                tiempoRiego = data.v0+data.v1+data.v2+data.v4+data.v5+data.v6+data.v7+data.v8+data.v9+data.v10+data.v12;
                scheduleHtml += `
                    <tr class="watering-card-compact">
                        <td><strong>Riego ${pairCount}</strong></td>
                        <td><strong>Hora de inicio:</strong> ${((7 + Math.floor(tiempoRiego / 60)) % 13) + Math.floor((7 + Math.floor(tiempoRiego / 60)) / 13)}:${tiempoRiego % 60}</td>
                        <td><strong>Duración:</strong> ${data.v11} minutos</td>
                    </tr>
                `;
                pairCount++;
            }
            scheduleHtml += '</table>';
            if (pairCount > 1) {
                document.getElementById('schedule').innerHTML = scheduleHtml ;
            }else{
                document.getElementById('schedule').innerHTML = '<p>No hay tiempos de riego configurados.</p>';                
            }
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

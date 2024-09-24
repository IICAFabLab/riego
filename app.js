// Token de la API Blynk
const blynkToken = '3gO4NB3Cj7xA3V35tTvwauapvX0N4D76';
const apiUrl = `https://ny3.blynk.cloud/external/api/get?token=${blynkToken}`;

// Función para obtener el horario actual desde Blynk
function getSchedule() {
    fetch(apiUrl + '&v0&v1&v2&v3')
        .then(response => response.json())
        .then(data => {
            // Actualiza la interfaz con los valores actuales
            document.getElementById('schedule').innerHTML = `
                <p>Tiempo de espera 1: ${data.v0} minutos</p>
                <p>Tiempo de riego 1: ${data.v1} minutos</p>
                <p>Tiempo de espera 2: ${data.v2} minutos</p>
                <p>Tiempo de riego 2: ${data.v3} minutos</p>
            `;
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

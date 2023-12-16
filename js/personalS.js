// Obtener los datos de profesores desde el archivo JSON local
fetch('../personal.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    return response.json(); // Convertir la respuesta a JSON
  })
  .then(data => {
    console.log('Datos del personal de la escuela N°001 Escuela del Sol:', data);

    const personalInfo = document.getElementById('personal-info');

    data.forEach(persona => {
      const info = document.createElement('div');
      info.classList.add('col-md-6'); 

      // Verificar si el campo grado existe antes de mostrarlo
      const grado = persona.grado ? persona.grado : ''; // Si no existe, asigna una cadena vacía

      info.innerHTML = `
        <h3>ID: ${persona.id}</h3>
        <p>Nombre: ${persona.nombre}</p>
        <p>Cargo: ${persona.cargo}</p>
        <p>Grado: ${grado}</p>
      `;
      personalInfo.appendChild(info);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });



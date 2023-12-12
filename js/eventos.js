document.addEventListener('DOMContentLoaded', function () {
    const agregarAlumnoButton = document.querySelector('.custom-btn-primary');
    agregarAlumnoButton.addEventListener('click', agregarAlumno);
  
    const calcularButton = document.querySelector('.custom-btn-primary');
    calcularButton.addEventListener('click', calcularPromediosAsistencias);
  });
  
  
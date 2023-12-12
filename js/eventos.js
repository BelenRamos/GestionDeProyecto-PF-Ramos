document.addEventListener('DOMContentLoaded', function () {
  const agregarAlumnoButton = document.querySelector('.custom-btn-agregar');
  agregarAlumnoButton.addEventListener('click', agregarAlumno);

  const calcularButton = document.querySelector('.custom-btn-calcular');
  calcularButton.addEventListener('click', calcularPromediosAsistencias);
});

  
  
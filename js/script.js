window.onload = function() {
  cargarAlumnosDesdeStorage();
}

document.addEventListener('DOMContentLoaded', function () {
  const agregarAlumnoButton = document.querySelector('.custom-btn-primary.agregar-alumno');
  if (agregarAlumnoButton) {
      agregarAlumnoButton.addEventListener('click', agregarAlumno);
  }

  const calcularButton = document.querySelector('.custom-btn-primary.calcular');
  if (calcularButton) {
      calcularButton.addEventListener('click', calcularPromediosAsistencias);
  }
});




let alumnos = []; 


/////////Funciones para calculculo de la asistencia

function containsOnlyLetters(palabra) {
  let lettersOnlyRegex = /^[a-zA-Z]+$/;
  return lettersOnlyRegex.test(palabra);
}

function calcularInasistenciasTotales(inasF, inasM) {
  return inasF + inasM;
}

function calcularTotalAlumnos(cantAlF, cantAlM) {
  return cantAlF + cantAlM;
}

function calcularAsistenciaFemenina(diasHabiles, cantAlF, inasF) {
  return diasHabiles * cantAlF - inasF;
}

function calcularAsistenciaMasculina(diasHabiles, cantAlM, inasM) {
  return diasHabiles * cantAlM - inasM;
}

function calcularAsistenciaTotal(asisF, asisM) {
  return asisF + asisM;
}

function calcularAsistenciaFMedia(asisF, diasHabiles) {
  return asisF / diasHabiles;
}

function calcularAsistenciaMMedia(asisM, diasHabiles) {
  return asisM / diasHabiles;
}

function calcularAsistenciaMediaTotal(asisF, asisM, diasHabiles) {
  return (asisF + asisM) / (2 * diasHabiles);
}

function calcularAsistenciaPerfecta(totalAlumnos, diasHabiles) {
  return totalAlumnos * diasHabiles;
}

function calcularPorcentajeAsistencia(asisTotal, asistenciaPerfecta) {
  return (asisTotal / asistenciaPerfecta) * 100;
}

function calcularAsistenciaPromedioTotal() {
  if (alumnos.length === 0) {
    return "No hay alumnos registrados.";
  }

  let totalPorcentaje = 0;
  for (let i = 0; i < alumnos.length; i++) {
    const porcentaje = parseFloat(calcularAsistenciaAlumno(alumnos[i].nombre));
    totalPorcentaje += porcentaje;
  }

  const promedio = totalPorcentaje / alumnos.length;
  return promedio.toFixed(2) + "%";
}

function validarDatos() {
  const diasHabiles = parseInt(document.getElementById('diasHabiles').value);
  const cantAlF = parseInt(document.getElementById('cantAlF').value);
  const inasF = parseInt(document.getElementById('inasF').value);
  const cantAlM = parseInt(document.getElementById('cantAlM').value);
  const inasM = parseInt(document.getElementById('inasM').value);

  if (
    isNaN(diasHabiles) || isNaN(cantAlF) || isNaN(inasF) || isNaN(cantAlM) || isNaN(inasM) ||
    diasHabiles <= 0 || cantAlF < 0 || inasF < 0 || cantAlM < 0 || inasM < 0 ||
    cantAlF + cantAlM <= 0 
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Los valores ingresados son inválidos. Verifica que sean números válidos y cumplan con los criterios requeridos.',
    });
    return { validado: false };
  }

  return {
    validado: true,
    diasHabiles: diasHabiles,
    cantAlF: cantAlF,
    inasF: inasF,
    cantAlM: cantAlM,
    inasM: inasM
  };
}

function calcularPromediosAsistencias() {
  const datosValidados = validarDatos();
  if (!datosValidados.validado) {
    return;
  }

  const { diasHabiles, cantAlF, inasF, cantAlM, inasM } = datosValidados;

  const inasistenciasTotales = calcularInasistenciasTotales(inasF, inasM);
  const totalAlumnos = calcularTotalAlumnos(cantAlF, cantAlM);
  const asisF = calcularAsistenciaFemenina(diasHabiles, cantAlF, inasF);
  const asisM = calcularAsistenciaMasculina(diasHabiles, cantAlM, inasM);
  const asistenciaTotal = calcularAsistenciaTotal(asisF, asisM);
  const asisFMedia = calcularAsistenciaFMedia(asisF, diasHabiles);
  const asisMMedia = calcularAsistenciaMMedia(asisM, diasHabiles);
  const asisMediaTotal = calcularAsistenciaMediaTotal(asisF, asisM, diasHabiles);
  const asistenciaPerfecta = calcularAsistenciaPerfecta(totalAlumnos, diasHabiles);
  const porcentajeAsistencia = calcularPorcentajeAsistencia(asistenciaTotal, asistenciaPerfecta);

  const resultadoCalculadora = document.getElementById('resultadoCalculadora');
  resultadoCalculadora.innerHTML = `
    <p>Inasistencias Totales: ${inasistenciasTotales}</p>
    <p>Asistencia Femenina: ${asisF}</p>
    <p>Asistencia Masculina: ${asisM}</p>
    <p>Asistencia Total: ${asistenciaTotal}</p>
    <p>Asistencia Femenina Media: ${asisFMedia}</p>
    <p>Asistencia Masculina Media: ${asisMMedia}</p>
    <p>Asistencia Media Total: ${asisMediaTotal}</p>
    <p>Asistencia Perfecta: ${asistenciaPerfecta}</p>
    <p>Porcentaje de Asistencia: ${porcentajeAsistencia.toFixed(2)}%</p>`;
}

////////////////////////Funciones para gestion de alumnos


function Alumno(nombre, apellido, edad, genero) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.edad = edad;
  this.genero = genero;
  this.asistencia = [0];
}

function agregarAlumno() {
  Swal.fire({
    title: 'Ingrese los datos del alumno',
    html:
      '<input id="nombre" class="swal2-input" placeholder="Nombre">' +
      '<input id="apellido" class="swal2-input" placeholder="Apellido">' +
      '<input id="genero" class="swal2-input" placeholder="Género (F/M)">' +
      '<input id="edad" type="number" class="swal2-input" placeholder="Edad">',
    focusConfirm: false,
    preConfirm: () => {
      const nombre = Swal.getPopup().querySelector('#nombre').value;
      const apellido = Swal.getPopup().querySelector('#apellido').value;
      const genero = Swal.getPopup().querySelector('#genero').value;
      const edad = Swal.getPopup().querySelector('#edad').value;

      // Validaciones
      if (!containsOnlyLetters(nombre) || !containsOnlyLetters(apellido)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El nombre y el apellido deben contener solo letras.',
        });
        return false;
      }

      if (!(genero.toLowerCase() === 'f' || genero.toLowerCase() === 'm')) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El género debe ser "F" o "M".',
        });
        return false;
      }

      if (isNaN(parseInt(edad)) || parseInt(edad) < 6 || parseInt(edad) > 19 || parseInt(edad) < 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La edad debe ser un número entre 6 y 19 años.',
        });
        return false;
      }

      let generoAlumno = genero.toUpperCase() === 'F' ? 'Femenino' : 'Masculino';

      return {
        nombre: nombre,
        apellido: apellido,
        genero: generoAlumno,
        edad: parseInt(edad),
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { nombre, apellido, genero, edad } = result.value;
      const alumnoExistente = alumnos.find(
        (Alumno) => Alumno.nombre === nombre && Alumno.apellido === apellido
      );

      if (!alumnoExistente) {
        const nuevoAlumno = new Alumno(nombre, apellido, edad, genero);
        alumnos.push(nuevoAlumno);

        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: '¡Alumno agregado exitosamente!',
        });
        guardarAlumnosEnStorage();
        mostrarListaAlumnos();
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: '¡El alumno ya existe!',
        });
      }
    }
  });
}

function eliminarAlumno(nombre, apellido) {
  Swal.fire({
    title: `¿Estás seguro de eliminar al alumno ${nombre} ${apellido}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      alumnos = alumnos.filter((Alumno) => Alumno.nombre !== nombre || Alumno.apellido !== apellido);
      guardarAlumnosEnStorage();
      mostrarListaAlumnos();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: `Alumno ${nombre} ${apellido} eliminado con éxito.`,
      });
    }
  });
}

function actualizarAlumno(nombre, apellido) {
  Swal.fire({
    title: 'Ingrese el nuevo nombre:',
    input: 'text',
    inputValue: nombre,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
    inputValidator: (value) => {
      if (!value || !containsOnlyLetters(value)) {
        return 'El nombre debe contener solo letras';
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const nuevoNombre = result.value;

      Swal.fire({
        title: 'Ingrese el nuevo apellido:',
        input: 'text',
        inputValue: apellido,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          if (!value || !containsOnlyLetters(value)) {
            return 'El apellido debe contener solo letras';
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const nuevoApellido = result.value;

          Swal.fire({
            title: 'Ingrese el género del alumno: (F/M)',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
              if (!value || (value.toLowerCase() !== 'f' && value.toLowerCase() !== 'm')) {
                return 'El género debe ser "F" o "M"';
              }
            }
          }).then((result) => {
            if (result.isConfirmed) {
              let genero = result.value.toUpperCase(); // Convertir a mayúscula
              genero = genero === 'F' ? 'Femenino' : 'Masculino';
              console.log(`El género es: ${genero}`);

              Swal.fire({
                title: 'Ingrese la edad del alumno:',
                input: 'number',
                inputAttributes: {
                  min: 1
                },
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
                inputValidator: (value) => {
                  if (!value || isNaN(value) || parseInt(value) < 6 || parseInt(value) > 19) {
                    return 'La edad debe ser un número entre 6 y 19 años.';
                  }
                }
              }).then((result) => {
                if (result.isConfirmed) {
                  const edad = parseInt(result.value);

                  const alumnoActualizado = {
                    nombre: nuevoNombre,
                    apellido: nuevoApellido,
                    edad: edad,
                    genero: genero,
                    asistencia: alumnos.find(Alumno => Alumno.nombre === nombre && Alumno.apellido === apellido)?.asistencia ?? [0]
                  };

                  const index = alumnos.findIndex(Alumno => Alumno.nombre === nombre && Alumno.apellido === apellido);
                  if (index !== -1) {
                    // Actualizar los datos del alumno utilizando spread operator
                    alumnos = [
                      ...alumnos.slice(0, index),
                      alumnoActualizado,
                      ...alumnos.slice(index + 1)
                    ];
                    guardarAlumnosEnStorage();
                    mostrarListaAlumnos();
                    Swal.fire({
                      icon: 'success',
                      title: 'Éxito',
                      text: `Alumno ${nombre} ${apellido} actualizado con éxito.`,
                    });
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: `No se encontró al alumno ${nombre} ${apellido}.`,
                    });
                  }
                }
              });
            }
          });
        }
      });
    }
  });
}

function cargarAsistencia(nombre, apellido, presente) {
  let esPalabra = containsOnlyLetters(nombre) && containsOnlyLetters(apellido);
  if (!esPalabra) {
    console.log("Error: El nombre y el apellido deben contener solo letras");
    return;
  }

  const index = alumnos.findIndex(Alumno => Alumno.nombre === nombre && Alumno.apellido === apellido);
  if (index !== -1) {
    const fechaActual = new Date().toISOString().split('T')[0]; // para tener la fecha actual en formato 'YYYY-MM-DD'

    // Registrar la asistencia para el alumno
    alumnos[index].asistencia.push({ fecha: fechaActual, presente: presente });
    console.log(`Asistencia registrada para el alumno ${nombre} ${apellido}. Fecha: ${fechaActual}. Estado: ${presente ? 'Presente' : 'Ausente'}.`);
    guardarAlumnosEnStorage();
    // se muestra la lista actualizada de alumnos después de registrar la asistencia
    mostrarListaAlumnos();
  } else {
    console.log(`Error: No se encontró al alumno ${nombre} ${apellido}.`);
  }
}

function calcularAsistenciaAlumno(nombre, apellido) {
  let esPalabra = containsOnlyLetters(nombre) && containsOnlyLetters(apellido);
  if (!esPalabra) {
    console.log("Error: El nombre y el apellido deben contener solo letras");
    return;
  }

  const alumno = alumnos.find(Alumno => Alumno.nombre === nombre && Alumno.apellido === apellido);
  if (alumno) {
    const totalDias = alumno?.asistencia?.length ?? 0;
    const diasPresente = alumno?.asistencia?.filter(dia => dia.presente)?.length ?? 0;
    const porcentajeAsistencia = (diasPresente / totalDias) * 100;
    return porcentajeAsistencia.toFixed(2) + "%";
  } else {
    return "El alumno no existe.";
  }
}

function mostrarListaAlumnos() {
  const listaAlumnos = document.getElementById('alumnosLista');
  listaAlumnos.innerHTML = ''; // Limpia la lista 

  alumnos.forEach(Alumno => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    
    const nombreAlumno = document.createElement('span');
    nombreAlumno.textContent = Alumno.nombre;

    const apellidoAlumno = document.createElement('span');
    apellidoAlumno.textContent = Alumno.apellido;

    const generoAlumno = document.createElement('span');
    generoAlumno.textContent = Alumno.genero;

    const edadAlumno = document.createElement('span');
    edadAlumno.textContent = Alumno.edad;

    const btnPresente = document.createElement('button');
    btnPresente.classList.add('btn', 'btn-custom-Presente', 'me-2');
    btnPresente.textContent = 'Presente';
    btnPresente.onclick = function() {
      cargarAsistencia(Alumno.nombre, Alumno.apellido, true); 
    };

    const btnAusente = document.createElement('button');
    btnAusente.classList.add('btn', 'btn-custom-Ausente');
    btnAusente.textContent = 'Ausente';
    btnAusente.onclick = function() {
      cargarAsistencia(Alumno.nombre, Alumno.apellido, false); 
    };
    
    const btnCalcularAsistencia = document.createElement('button');
    btnCalcularAsistencia.classList.add('btn', 'btn-custom-CA');
    btnCalcularAsistencia.textContent = 'Calcular Asistencia';
    btnCalcularAsistencia.onclick = function() {
      mostrarAsistenciaAlumno(Alumno.nombre, Alumno.apellido);
    };

    const btnEliminarAlumno = document.createElement('button');
    btnEliminarAlumno.classList.add('btn', 'btn-danger', 'me-2');
    btnEliminarAlumno.textContent = 'Eliminar';
    btnEliminarAlumno.onclick = function() {
      eliminarAlumno(Alumno.nombre, Alumno.apellido);
    };

    const btnActualizarAlumno = document.createElement('button');
    btnActualizarAlumno.classList.add('btn', 'btn-custom-Actualizar');
    btnActualizarAlumno.textContent = 'Actualizar';
    btnActualizarAlumno.onclick = function() {
      actualizarAlumno(Alumno.nombre, Alumno.apellido);
    };

    listItem.appendChild(nombreAlumno);
    listItem.appendChild(apellidoAlumno);
    listItem.appendChild(generoAlumno);
    listItem.appendChild(edadAlumno);
    listItem.appendChild(btnPresente);
    listItem.appendChild(btnAusente);
    listItem.appendChild(btnCalcularAsistencia);
    listItem.appendChild(btnActualizarAlumno);
    listItem.appendChild(btnEliminarAlumno);
    listaAlumnos.appendChild(listItem);
  });
}

function mostrarAsistenciaAlumno(nombre, apellido) {
  const index = alumnos.findIndex(Alumno => Alumno.nombre === nombre && Alumno.apellido === apellido);
  if (index !== -1) {
    const asistencia = alumnos[index].asistencia;
    const totalDias = asistencia.length;
    const diasPresente = asistencia.filter(dia => dia.presente).length;
    const porcentajeAsistencia = (diasPresente / totalDias) * 100;
    
    // Mostrar el resultado en la interfaz
    const output = document.getElementById('output');
    output.innerHTML = `Asistencia de ${nombre} ${apellido}: ${porcentajeAsistencia.toFixed(2)}%`;
  } else {
    const output = document.getElementById('output');
    output.innerHTML = `No se encontró al alumno ${nombre} ${apellido}.`;
  }
}


//////////// JSON
function guardarAlumnosEnStorage() {
  localStorage.setItem('alumnosData', JSON.stringify(alumnos));
}

function cargarAlumnosDesdeStorage() {
  const data = localStorage.getItem('alumnosData');
  if (data) {
    alumnos = JSON.parse(data);
    mostrarListaAlumnos();
  }
}

// Llamada para cargar alumnos al cargar la página
cargarAlumnosDesdeStorage();
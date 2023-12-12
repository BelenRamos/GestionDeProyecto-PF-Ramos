let alumnos = []; 

window.onload = function() {
  cargarAlumnosDesdeStorage();
}

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
    cantAlF + cantAlM <= 0 // Ejemplo de validación adicional: asegurar que haya al menos un alumno
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
  let nombre = prompt("Ingrese el NOMBRE del alumno (Sin espacios ni símbolos):");
  let esNombre = containsOnlyLetters(nombre);
  
  if (!esNombre) {
    console.log("Error: El nombre debe contener solo letras");
    return;
  }

  let apellido = prompt("Ingrese el APELLIDO del alumno (Sin espacios ni símbolos):");
  let esApellido = containsOnlyLetters(apellido);
  
  if (!esApellido) {
    console.log("Error: El apellido debe contener solo letras");
    return;
  }

  let genero = prompt("Ingrese el género del alumno: (F/M)");
  if (genero.toLowerCase() === 'f' || genero.toLowerCase() === 'm') {
    genero = genero.toUpperCase(); // Convertir a mayúscula
    genero = genero === 'F' ? 'Femenino' : 'Masculino';
    console.log(`El género es: ${genero}`);
  } else {
    console.log("Error: El género debe ser 'F' o 'M'.");
    return;
  }

  let edad = parseInt(prompt("Ingrese la edad del alumno:"));
  if (typeof edad !== 'number' || isNaN(edad)) {
    console.log("Error: La edad debe ser un número.");
    return;
  }

  const alumnoExistente = alumnos.find(Alumno => Alumno.nombre === nombre && Alumno.apellido === apellido);
  if (!alumnoExistente) {
    const nuevoAlumno = new Alumno(nombre, apellido, edad, genero);

    alumnos.push(nuevoAlumno);
    console.log("¡Alumno agregado exitosamente!");
    guardarAlumnosEnStorage();
    mostrarListaAlumnos();
  } else {
    console.log("¡El alumno ya existe!");
  }
}

function eliminarAlumno(nombre, apellido) {
  const confirmar = confirm(`¿Estás seguro de eliminar al alumno ${nombre} ${apellido}?`);
  if (confirmar) {
    alumnos = alumnos.filter(Alumno => Alumno.nombre !== nombre || Alumno.apellido !== apellido);
    guardarAlumnosEnStorage();
    mostrarListaAlumnos(); // Mostrar la lista actualizada después de eliminar
    console.log(`Alumno ${nombre} ${apellido} eliminado con éxito.`);
  }
}

function actualizarAlumno(nombre, apellido) {
  let esPalabra = containsOnlyLetters(nombre) && containsOnlyLetters(apellido);
  if (!esPalabra) {
    console.log("Error: El nombre y el apellido deben contener solo letras");
    return;
  }

  let genero = prompt("Ingrese el género del alumno: (F/M)");
  if (genero.toLowerCase() === 'f' || genero.toLowerCase() === 'm') {
    genero = genero.toUpperCase(); // Convertir a mayúscula
    genero = genero === 'F' ? 'Femenino' : 'Masculino';
    console.log(`El género es: ${genero}`);
  } else {
    console.log("Error: El género debe ser 'F' o 'M'.");
    return;
  }

  let edad = parseInt(prompt("Ingrese la edad del alumno:"));
  if (typeof edad !== 'number' || isNaN(edad)) {
    console.log("Error: La edad debe ser un número.");
    return;
  }

  const alumnoActualizado = {
    nombre: nombre,
    apellido: apellido,
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
    console.log(`Alumno ${nombre} ${apellido} actualizado con éxito.`);
  } else {
    console.log(`Error: No se encontró al alumno ${nombre} ${apellido}.`);
  }
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
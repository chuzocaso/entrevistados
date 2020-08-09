/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.todoBorrado = new Evento(this);
  this.votoAgregado = new Evento(this);

  this.cargarLocalStorage();

};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var idMasAlto = -1;
    for (let i = 0; i < this.preguntas.length; i++) {
      if (this.preguntas.length>0) {
        this.preguntas[i].id>idMasAlto ? idMasAlto = this.preguntas[i].id : idMasAlto=idMasAlto
      }
    }
    return idMasAlto;
  },

  buscarId: function (idBuscado) {
    for (let i = 0; i < this.preguntas.length; i++) {
      const idActual = this.preguntas[i].id;
      if (idActual==idBuscado){
        return i;
      }
    }
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function (id) {
    var idAEliminar = this.buscarId(id);
    this.preguntas.splice(idAEliminar,1);
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  editarPregunta: function (id) {
    var idAEditar = this.buscarId(id);
    this.preguntas[idAEditar].textoPregunta = prompt("Nuevo texto de Pregunta seleccionada");
    this.guardar();
    this.preguntaEditada.notificar();
  },

  borrarTodo: function () {
    this.preguntas = [];
    this.todoBorrado.notificar();
    this.guardar();
  },

  agregarVoto: function (idPregunta,respuestaElegida) {
    var idAEditar = this.buscarId(idPregunta);
    var pregunta = this.preguntas[idAEditar];
    for (let i = 0; i < pregunta.cantidadPorRespuesta.length; i++) {
      if (respuestaElegida==pregunta.cantidadPorRespuesta[i].textoRespuesta) {
        var indiceRespuesta = i;
      };
    }
    pregunta.cantidadPorRespuesta[indiceRespuesta].cantidad += 1;
    this.guardar();
    this.votoAgregado.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas',JSON.stringify(this.preguntas));
  },

  cargarLocalStorage: function () {
    if (localStorage.getItem('preguntas') !== null) {
      this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
    }
  }
};

/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);  
  },
  borrarPregunta: function (id) {
    if (!isNaN(id)){
      this.modelo.borrarPregunta(id);
    }
  },
  editarPregunta: function (id) {
    if (!isNaN(id)){
      this.modelo.editarPregunta(id);
    }
  },
  borrarTodo: function () {
    this.modelo.borrarTodo();
  },
  agregarVoto: function (id, respuestaSeleccionada) {
    if (respuestaSeleccionada != undefined){
      this.modelo.agregarVoto(id,respuestaSeleccionada);    
    }
  }
};

class TicketManager {
  #precioBaseGanancia = 0.15
  static ultimoId = 0 
  eventos;
  constructor () {
    this.eventos
  }
  getEventos = () => {
    return this.eventos;
  }
  agregarEvento = (nombre, lugar, precio, capacidad = 50, fecha = new Date()) =>{
    TicketManager.ultimoId++;
    const evento = {
      campoId: TicketManager.ultimoId ,
      nombre, 
      lugar, 
      precio: precio* this.#precioBaseGanancia,
      capacidad,
      fecha

    }
    this.eventos.push(evento)
  }
  agregarUsuario = () =>{

  }
}

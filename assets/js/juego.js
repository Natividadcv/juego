//Patron modulo

//Funcion anonima, autoinvocadas

const miModulo = (() => {
  'use strict';//Investigar
  
let deck          = [];
const tipos       = ['C','D','H','S'],
      especiales  = ['A','J','Q','K'];


// let puntosJugador = 0,
//     puntosComputadora = 0;

let puntosJugadores = [];

//Referencias del HTML
const btnPedir   = document.querySelector("#btnPedir"),
      btnDetener = document.querySelector("#btnDetener"),
      btnNuevo   = document.querySelector("#btnNuevo");

const puntosHTML = document.querySelectorAll("small"),
      divCartasJugadores = document.querySelectorAll(".divCartas");

      
//Esta funciib inicia el juego      
const inicializarJuego = (numJugadores = 2) =>{
  deck = crearDeck();
  puntosJugadores = [];
  for (let i = 0; i < numJugadores; i++) {
    puntosJugadores.push(0);
  }
   puntosHTML.forEach(elem => elem.innerText = 0);
   divCartasJugadores.forEach(elem => elem.innerHTML = "");
   btnPedir.disabled = false;
   btnDetener.disabled = false; 
}

//Esta funcion crear una nueva baraja
const crearDeck = () =>{
  deck = [];
  for (let i = 2; i <= 10; i++) {
    for(let tipo of tipos){
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos){
  for (let esp of especiales) {
    deck.push(esp + tipo)
  }
}

return _.shuffle(deck);;

}

//Esta función me permite tomar una carta

const pedirCarta = () =>{
  if (deck.length === 0) {
    throw "No hay carta en el deck";
  }
  return  deck.pop();
}


const valorCarta = (carta) =>{
  const valor = carta.substring(0, carta.length - 1);
  //isNaN Evalua lo que esta entre parentesis a ver si es un numero

    return (isNaN(valor)) ? 
          (valor === "A") ? 11 : 10
          :valor * 1;

  // if (isNaN(valor)) {
    
  //   puntos = (valor === "A") ? 11 : 10;

  // }else{
  //   console.log("Es un número");
  //   puntos = valor * 1;
  // }

  // console.log(puntos);
}


//Turno = 0 Primer Jugador y el ultimo sera la computadora
const acumuladorPuntos = (carta, turno) =>{
  puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
  puntosHTML[turno].innerText =  puntosJugadores[turno];
  return puntosJugadores[turno];
}

const crearCarta = (carta, turno) =>{
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugadores[turno].append(imgCarta);
}

const determinarGanador = () =>{
  const [puntosMinimos, puntosComputadora] = puntosJugadores;
setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert("Nadie gano!");
      } else if (puntosMinimos > 21) {
        alert("Computadora Gano!");
      }else if (puntosComputadora > 21) {
        alert("Jugador Gana!");
      }else{
        alert("Computadora Gana");
      }
}, 150 );
};


//Turno de la computador
const turnoComputadora = (puntosMinimos) =>{

  let puntosComputadora = 0;
   
  do {

  const carta = pedirCarta();
  puntosComputadora = acumuladorPuntos(carta, puntosJugadores.length - 1);
  crearCarta(carta, puntosJugadores.length - 1);
    
   } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <=21) );

determinarGanador();

}

//Eventos
//Callback, es una funcion que se esta mandado como argumento
btnPedir.addEventListener("click",  () => { 
  const carta = pedirCarta();
  const puntosJugador = acumuladorPuntos(carta, 0);

  crearCarta(carta,0)

  if (puntosJugador > 21) {
     console.warn("Lo siento mucho perdiste");
     btnPedir.disabled = true;
     btnDetener.disabled = true;
   
    turnoComputadora(puntosJugador);
  }else if (puntosJugador === 21){
    console.warn("21, Genial!");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }


} );

btnDetener.addEventListener("click", () =>{
   btnPedir.disabled = true;
   btnDetener.disabled = true;
   turnoComputadora(puntosJugadores[0]);
});



btnNuevo.addEventListener("click", () => {
  inicializarJuego();
});


return{
  nuevoJueego: inicializarJuego
};

})();









// (() =>{

// })();


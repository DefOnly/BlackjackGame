(() => {
    "use strict"

    let deck = [];
    const tipos = ["C", "D", "H", "S"], //Tipos de Cartas
          especiales = ["A", "J", "Q", "K"]; 

    // let puntosJugador = 0,
    //     puntosPC = 0;     
    let puntosJugadores = [];

    //Referencias del HTML
    const pedir = document.querySelector("#pedir"),
        detener = document.querySelector("#detener"),
          nuevo = document.querySelector("#nuevo");

        const cartasJugadores = document.querySelectorAll(".divCartas"),
              puntos = document.querySelectorAll("small");
    //Inicio del Juego
    const inicioJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }
        puntos.forEach(elem => elem.innerText = 0);
        cartasJugadores.forEach(elem => elem.innerText = "");

        pedir.disabled = false;
        detener.disabled = false;
    }

    const crearDeck = () => {

        deck = [];
        for(let i = 2; i <= 10; i++){
            for(let tipo of tipos){
                deck.push(i + tipo);
            }
        }

        for(let tipo of tipos){
            for(let esp of especiales){
                deck.push(esp + tipo);
            }
        }
        // console.log(deck);
        // console.log(deck);
        return _.shuffle(deck);
    }

    //Función que permite tomar carta
    const pedirCarta = () => {

        if(deck.length === 0){
            throw "NO HAY CARTAS EN LA BARAJA!"
        }
        // console.log(deck);
        // console.log(carta);
        return deck.pop(); //remueve último elmento del arreglo y lo regresa
    }

    // for(let i = 0; i <= 100; i++){
    //     pedirCarta();
    // }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
                (valor === "A") ? 11 : 10
                : valor * 1; 
        //let puntos = 0;
        // console.log(valor);
    //     if(isNaN(valor)){
    //         puntos = (valor === "A") ? 11 : 10; 
    //     }else{
    //         puntos = valor * 1;
    //         }

    //     console.log(puntos);
    }
    // const valor = valorCarta(pedirCarta());
    // console.log({valor});

    //Turno: 0 = Primer Jugador y último: PC
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntos[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        cartasJugadores[turno].append(imgCarta);
    }

    const detGanador = () => {

        const [puntosMinimos, puntosPC] = puntosJugadores;
        
        setTimeout(() => {
            if(puntosPC === puntosMinimos){
                alert("EMPATE!");
            } else if(puntosMinimos > 21){
                alert("PERDISTE!");
            } else if(puntosPC > 21){
                alert("GANASTE!");
            } else{
                alert("PERDISTE!");
            }

        }, 500);
    }

    //Turno de la PC
    const turnoPC = (puntosMinimos) => {

        let puntosPC = 0;

        do{
            const carta = pedirCarta();
            puntosPC = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
            // const imgCarta = document.createElement("img");
            // imgCarta.src = `assets/cartas/${carta}.png`;
            // imgCarta.classList.add("carta"); 
            // cartasPC.append(imgCarta);

        }while((puntosPC < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
            
            if(puntosMinimos === 21){
                alert("GANASTE!");
            } else {
                detGanador();
            }
        }, 500);
    }
        
    // EVENTOS
    pedir.addEventListener("click", () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);
        // puntosJugador = puntosJugador + valorCarta(carta);
        // puntos[0].innerText = puntosJugador;

        // const imgCarta = document.createElement("img");
        // imgCarta.src = `assets/cartas/${carta}.png`;
        // imgCarta.classList.add("carta"); 
        // cartasJugador.append(imgCarta);

        if(puntosJugador > 21){
            console.warn("perdiste");
            pedir.disabled = true;
            detener.disabled = true;
            turnoPC(puntosJugador);
        } else if(puntosJugador === 21){
            console.warn("ganaste");
            pedir.disabled = true;
            detener.disabled = true;    
        }
    });

    detener.addEventListener("click", () => {
        pedir.disabled = true;
        detener.disabled = true;
        turnoPC(puntosJugadores[0]);
    });


    nuevo.addEventListener("click", () => {
        console.clear();
        inicioJuego();
    });

    // TODO: Borrar
    // turnoPC(12);

})();










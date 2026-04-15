let aplicaciones = new Array(), ventanas = new Array(), cerrandoVentana = false;
let contenedorApps = document.getElementById('contenedorApps'), isVisible = false;
let botonInicio = document.getElementById('botonInicio');
let dock = document.getElementById('taskbar');

function hideWithAnimation() {
    if (!contenedorApps.classList.contains('animate-out')) {
        contenedorApps.classList.remove('animate-in');
        void contenedorApps.offsetWidth; // Forzar reflow
        contenedorApps.classList.add('animate-out');
        isVisible = !isVisible
        
        contenedorApps.addEventListener('animationend', function onAnimationEnd(e) {
            if (e.target === contenedorApps && e.animationName === 'scaleOut') {
                contenedorApps.style.display = 'none'; // Ocultar después de animación
                contenedorApps.classList.remove('animate-out');
                contenedorApps.removeEventListener('animationend', onAnimationEnd);
            }
        });
    }
}

function showWithAnimation() {
	contenedorApps.style.display = 'flex';
	contenedorApps.classList.remove('animate-in', 'animate-out');
	void contenedorApps.offsetWidth;
	contenedorApps.classList.add('animate-in');

	contenedorApps.addEventListener('animationend', function onAnimationEnd(e) {
		if (e.target === contenedorApps && e.animationName === 'scaleIn') {
			contenedorApps.classList.remove('animate-out');
			contenedorApps.removeEventListener('animationend', onAnimationEnd);
		}
	});
}

function precargarApp (opciones, agregar) {
	aplicaciones.push({
		titulo: opciones.titulo,
		rutaArchivo: opciones.rutaArchivo,
		anchura: opciones.dimensiones.anchura,
		altura: opciones.dimensiones.altura,
		x: opciones.coordenadas.x,
		y: opciones.coordenadas.y
	});

}

function abrirApp(objOpciones) {
	const ventana = new WinBox({
        title: objOpciones.titulo,
        background: '',
        url: objOpciones.rutaArchivo + 'index.html',
        root: desktop,
        width: objOpciones.anchura || 500,
        height: objOpciones.altura || 400,
        maxwidth: window.innerWidth,
        maxheight: window.innerHeight,
        minwidth: 300,
        minheight: 300,
        icon: objOpciones.rutaArchivo + 'icon.png',
        x: ventanas.length * 25,
        y: ventanas.length * 25,
    });

    ventanas.push(ventana);
    agregarAlDock(ventana);
}

function agregarEventosAlBotonDock(ventana) {
	let boton = document.createElement("button");

	ventana.onclose = function() {
        boton.classList.add("quitarCerrar");
        cerrandoVentana = true; // Importante para las animaciones de minimizar
        
        setTimeout(() => {
            boton.style.display = 'none';
        }, 500);
    };

    ventana.onfocus = function() {
        for (var i = 0; i < ventanas.length; i++) {
            if (ventanas[i].hidden === true) {
                cerrandoVentana = false;
                break;
            } 
        }

        if (cerrandoVentana) {
            setTimeout(() => {
                boton.classList.remove("difuminado");
                boton.classList.remove("minimizado");

                cerrandoVentana = !cerrandoVentana
            }, 110);

        } else {
            boton.classList.remove("difuminado");
            boton.classList.remove("minimizado");
        }
    };

    ventana.onblur = function() {
        boton.classList.add("difuminado");
        boton.classList.remove("minimizado");
    };

    ventana.onminimize = function() {
        boton.classList.remove("difuminado");
        boton.classList.add("minimizado");
    };

    boton.addEventListener("click", () => {
        if (ventana.min) {
            ventana.show();
        } else {
            if (ventana.focused) {
                ventana.hide();
            } else {
                ventana.focus();
            }
        }
    });

    return boton;
}

function agregarAlDock(ventana) {
	let icono = ventana.g.querySelector(".wb-icon");
    let bgImage = icono.style.backgroundImage, src;

    if (bgImage && bgImage !== 'none') {
        src = bgImage.replace(/url\(["']?/, '').replace(/["']?\)/, '');
    }

    let boton = agregarEventosAlBotonDock(ventana);
    boton.innerHTML = `<img src=' ${ src } '>`

    dock.appendChild(boton);
}

function agregarAlContenedorApps () {
	for (let i = 0; i < aplicaciones.length; i++) {
		let rutaIcono = aplicaciones[i].rutaArchivo + 'icon.png';
		let boton = document.createElement('button');
		boton.className = '  ';

		boton.addEventListener('click', () => {
			abrirApp(aplicaciones[i]);
			hideWithAnimation();
		});

		boton.innerHTML = `
			<img src=' ${ rutaIcono } '>
		`;

		contenedorApps.appendChild(boton);
	}	
}

function cargarApp() {
	precargarApp({
		titulo: 'Isla de los Campeones',
		rutaArchivo: 'apps/isladeloscampeones/',
		dimensiones: {
			anchura: 600,
			altura: 400,
		},
		coordenadas: {
			x: 200,
			y: 200
		}
	});

	precargarApp({
		titulo: 'Pilas Engine',
		rutaArchivo: 'apps/pilasEngine/',
		dimensiones: {
			anchura: 600,
			altura: 400,
		},
		coordenadas: {
			x: 200,
			y: 200
		}
	});

	precargarApp({
		titulo: 'Sonic CD',
		rutaArchivo: 'apps/soniccd/',
		dimensiones: {
			anchura: 600,
			altura: 400,
		},
		coordenadas: {
			x: 200,
			y: 200
		}
	});

	precargarApp({
		titulo: 'Pac man',
		rutaArchivo: 'apps/pacman/',
		dimensiones: {
			anchura: 600,
			altura: 400,
		},
		coordenadas: {
			x: 200,
			y: 200
		}
	});

	precargarApp({
		titulo: 'tombOfTheMask',
		rutaArchivo: 'apps/tombOfTheMask/',
		dimensiones: {
			anchura: 300,
			altura: 500,
		},
		coordenadas: {
			x: 200,
			y: 200
		}
	});

	precargarApp({
		titulo: 'Code Editor',
		rutaArchivo: 'apps/codeEditor/',
		dimensiones: {
			anchura: 600,
			altura: 500,
		},
		coordenadas: {
			x: 200,
			y: 200
		}
	});

	precargarApp({
		titulo: 'Lawson',
		rutaArchivo: 'apps/lawson/',
		dimensiones: {
			anchura: 600,
			altura: 500,
		},
		coordenadas: {
			x: 200,
			y: 200
		}
	});
}

function cargarEventos() {
	botonInicio.addEventListener('click', () => {
		if (isVisible) {
			hideWithAnimation();
			isVisible = false;
		} else {
			showWithAnimation();
			isVisible = true;
		}
	});
}

function cargarRecursos() {
	cargarApp();
	agregarAlContenedorApps();
	cargarEventos();
}

window.addEventListener('load', cargarRecursos);

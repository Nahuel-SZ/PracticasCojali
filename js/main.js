/*Modo Claro*/
const btn = document.getElementById("modo-color");
const body = document.body;
const logosRedes = document.querySelectorAll("footer ul:last-child img");
const temaGuardado = localStorage.getItem("tema-preferido");

if (temaGuardado === "claro") {
    body.classList.add("modo-claro");
    actualizarInterfaz(true);
}

btn.addEventListener("click", () => {
    body.classList.toggle("modo-claro");

    const esModoClaro = body.classList.contains("modo-claro");

    localStorage.setItem("tema-preferido", esModoClaro ? "claro" : "oscuro");

    btn.textContent = esModoClaro ? "Modo Oscuro" : "Modo Claro";

    logosRedes.forEach(img => {
        let rutaActual = img.getAttribute("src");

        if (esModoClaro) {
            img.setAttribute("src", rutaActual.replace("-c.png", "-n.png"));
        } else {
            img.setAttribute("src", rutaActual.replace("-n.png", "-c.png"));
        }
    });
});

/*Persistencia*/
function actualizarInterfaz(esClaro) {
    btn.textContent = esClaro ? "Modo Oscuro" : "Modo Claro";

    logosRedes.forEach(img => {
        let rutaActual = img.getAttribute("src");
        if (esClaro) {
            // Cambia los logos a la versión negra (_n)
            img.setAttribute("src", rutaActual.replace("-c.png", "-n.png"));
        } else {
            // Cambia los logos a la versión color/clara (_c)
            img.setAttribute("src", rutaActual.replace("-n.png", "-c.png"));
        }
    });
}
/*Carga Estudios*/

const misEstudios = [{
        titulo: "GRADO SUPERIOR EN DESARROLLO DE APLICACIONES MULTIPLATAFORMA",
        centro: "IES Juan Bosco | Alcázar de San Juan | En progreso",
        descripcion: "Curso actualmente el primer año del Grado Superior en Desarrollo de Aplicaciones Multiplataforma. Ciclo especializado en el diseño, desarrollo y mantenimiento de aplicaciones para distintos entornos y dispositivos."
    },
    {
        titulo: "GRADO MEDIO SISTEMAS MICROINFORMÁTICOS Y REDES",
        centro: "IES Valdehierro | Madridejos | Finalizado en 2025",
        descripcion: "Formación orientada a la instalación, configuración y mantenimiento de sistemas informáticos, equipos y redes locales. Soporte técnico y gestión de sistemas operativos."
    },
    {
        titulo: "INGLÉS - NIVEL INTERMEDIO - B1",
        centro: "EOI la Equidad | Alcázar de San Juan | Finalizado en 2023",
        descripcion: "Competencias comunicativas en lengua inglesa, incluyendo comprensión y expresión oral y escrita para contextos profesionales y cotidianos."
    },
    {
        titulo: "TÍTULO DE EDUCACIÓN SECUNDARIA",
        centro: "IES Valdehierro | Madridejos | Finalizado en 2023",
        descripcion: "Educación Secundaria Obligatoria finalizada con éxito."
    }
];

function cargarEstudios() {
    const contenedor = document.getElementById("contenedor-estudios");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    misEstudios.forEach(estudio => {
        const articulo = document.createElement("article");
        articulo.classList.add("tarjeta");
        articulo.innerHTML = `
            <h2>${estudio.titulo}</h2>
            <h3>${estudio.centro}</h3>
            <p>${estudio.descripcion}</p>
        `;
        contenedor.appendChild(articulo);
    });
}

const formulario = document.getElementById("formulario-estudios");
if (formulario) {
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const nuevoEstudio = {
            titulo: document.getElementById("nuevo-titulo").value,
            centro: document.getElementById("nuevo-centro").value,
            descripcion: document.getElementById("nueva-desc").value
        };

        misEstudios.unshift(nuevoEstudio);

        cargarEstudios();

        formulario.reset();
    });
}

cargarEstudios();
/*Cargar Mi Girhub*/
async function cargarDatosGithub() {
    const contenedorPerfil = document.getElementById("perfil-github");
    const contenedorRepos = document.getElementById("repos-github");
    if (!contenedorPerfil || !contenedorRepos) return;

    const usuario = "Nahuel-SZ";

    try {
        const [resUser, resRepos] = await Promise.all([
            fetch(`https://api.github.com/users/${usuario}`),
            fetch(`https://api.github.com/users/${usuario}/repos?sort=created&per_page=4`)
        ]);

        const datosUser = await resUser.json();
        const repos = await resRepos.json();

        contenedorPerfil.innerHTML = `
            <h1>Mi Perfil De Github</h1>
            <article class="tarjeta" style="display: flex; align-items: center; gap: 20px;">
                <img src="${datosUser.avatar_url}" alt="Foto de GitHub" style="width: 100px; border-radius: 50%;">
                <div>
                    <h2>${datosUser.name || datosUser.login}</h2>
                    <p>${datosUser.bio || "Bio Vacía"}</p>
                </div>
            </article>
            <h2 style="margin: 1em 0 0.5em 1em;">Mis Repositorios Recientes:</h2>
        `;

        repos.forEach(repo => {
            const articulo = document.createElement("article");
            articulo.classList.add("tarjeta");
            articulo.innerHTML = `
                <h3>${repo.name.toUpperCase()}</h3>
                <p><strong>Lenguaje:</strong> ${repo.language || "N/A"}</p>
                <a href="${repo.html_url}" target="_blank" style="color: var(--color-enlaces-contacto); text-decoration: none; font-weight: bold;">
                    Ver repositorio ->
                </a>
            `;
            contenedorRepos.appendChild(articulo);
        });

    } catch (error) {
        console.error("Error al cargar datos de GitHub", error);
    }
}

cargarDatosGithub();
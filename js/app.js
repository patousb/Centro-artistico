// ========== ESTRUCTURA DE CARPETAS PARA GITHUB ==========
// Para subir el proyecto a GitHub, organiza las imágenes así:
//
//   /                  (raíz del repositorio)
//   ├── index.html
//   ├── css/
//   │   └── styles.css
//   ├── js/
//   │   └── app.js
//   └── assets/
//       └── img/
//           ├── logo.jpg          ← logo del colegio
//           ├── carrusel/         ← imágenes del carrusel de inicio
//           │   ├── slide1.jpg
//           │   └── slide2.jpg
//           ├── muestras/         ← imágenes de muestras artísticas
//           │   ├── danza/
//           │   ├── teatro/
//           │   ├── arte/
//           │   └── musica/
//           ├── cultura-deporte/  ← imágenes de cultura y deporte
//           │   ├── cultura/
//           │   └── deporte/
//           └── actividades/      ← imágenes de actividades
//
// Para referenciar imágenes locales en el código:
//   'assets/img/logo.jpg'          (desde index.html)
//   '../assets/img/logo.jpg'       (desde js/ o css/)
//
// NOTA: En producción (GitHub Pages) las rutas son relativas a index.html.
//       Mientras usas URLs externas (Unsplash, etc.) funciona sin estructura.
// =========================================================

// ========== FUNCIONES DE UTILIDAD ==========
function comprimirImagen(file, maxSizeMB = 1, callback) {
    if (!file.type.startsWith('image/')) {
        callback(null);
        return;
    }
    
    // Si el archivo es pequeño, no comprimir
    if (file.size <= maxSizeMB * 1024 * 1024) {
        const reader = new FileReader();
        reader.onload = (e) => callback(e.target.result);
        reader.onerror = () => callback(null);
        reader.readAsDataURL(file);
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            let width = img.width;
            let height = img.height;
            
            // Calcular nuevas dimensiones (máx 1024px)
            const maxSize = 1024;
            if (width > maxSize || height > maxSize) {
                if (width > height) {
                    height = (height * maxSize) / width;
                    width = maxSize;
                } else {
                    width = (width * maxSize) / height;
                    height = maxSize;
                }
            }
            
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            // Calidad al 70%
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
            callback(compressedDataUrl);
        };
        img.src = e.target.result;
    };
    reader.onerror = () => callback(null);
    reader.readAsDataURL(file);
}

function mostrarAdvertenciaStorage() {
    let totalSize = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        totalSize += (key.length + value.length) * 2;
    }
    
    const maxSizeMB = 5; // Aprox 5MB
    const usedMB = totalSize / (1024 * 1024);
    
    if (usedMB > maxSizeMB * 0.8) {
        console.warn(`⚠️ Almacenamiento local al ${Math.round(usedMB / maxSizeMB * 100)}% de capacidad`);
        if (usedMB > maxSizeMB * 0.95) {
            setTimeout(() => {
                alert("⚠️ El almacenamiento está casi lleno. Para seguir subiendo imágenes, elimina algunas existentes o usa URLs en lugar de imágenes locales.");
            }, 500);
        }
    }
}

function verificarStorageAntesDeGuardar(nuevoItem, tipo = "imagen") {
    let espacioNecesario = nuevoItem.length * 2;
    let espacioDisponible = 5 * 1024 * 1024;
    let usado = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        usado += (key.length + value.length) * 2;
    }
    
    if (usado + espacioNecesario > espacioDisponible) {
        alert(`⚠️ No hay suficiente espacio para guardar ${tipo === "imagen" ? "esta imagen" : "este dato"}. El almacenamiento está lleno.\n\nTe recomendamos:\n- Eliminar imágenes existentes\n- Usar URLs en lugar de imágenes locales\n- Hacer limpieza de datos antiguos`);
        return false;
    }
    return true;
}

// ========== INICIALIZACIÓN DE DATOS ==========
function inicializarDatos() {
    // Usuarios de prueba
    if (!localStorage.getItem('usuarios')) {
        const usuarios = [
            { id: 1, email: 'admin@colegio.edu', password: 'admin123', nombre: 'Admin', rol: 'admin', estado: 'activo' },
            { id: 2, email: 'profesor@colegio.edu', password: 'profe123', nombre: 'Profesor Pérez', rol: 'profesor', cursos: ['primero', 'segundo'], estado: 'activo' },
            { id: 3, email: 'estudiante@colegio.edu', password: 'estu123', nombre: 'Ana García', rol: 'estudiante', grado: 'primero', id_estudiante: 1, estado: 'activo' },
            { id: 4, email: 'estudiante2@colegio.edu', password: 'estu123', nombre: 'Carlos López', rol: 'estudiante', grado: 'segundo', id_estudiante: 2, estado: 'activo' }
        ];
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    // Estudiantes
    if (!localStorage.getItem('estudiantes')) {
        const estudiantes = [
            { id: 1, nombre: 'Ana', apellido: 'García', grado: 'primero' },
            { id: 2, nombre: 'Carlos', apellido: 'López', grado: 'segundo' },
            { id: 3, nombre: 'María', apellido: 'Martínez', grado: 'primero' }
        ];
        localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
    }

    // Actividades
    if (!localStorage.getItem('actividades')) {
        const actividades = [
            { 
                id: '1', 
                titulo: 'Feria de Ciencias', 
                descripcion: 'Presentación de proyectos científicos de todos los cursos. Habrá experimentos, stands y competencias.',
                fecha: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Dentro de 2 días
                hora: '09:00',
                hora_fin: '13:00',
                tipo: 'evento', 
                curso: 'todos',
                lugar: 'Patio Central',
                organizador: 'Departamento de Ciencias',
                requiere_inscripcion: false,
                materiales: 'Cada grupo debe traer su proyecto',
                imagen: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800'
            },
            { 
                id: '2', 
                titulo: 'Examen de Matemáticas', 
                descripcion: 'Evaluación trimestral de matemáticas. Temas: álgebra, geometría y fracciones.',
                fecha: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Dentro de 5 días
                hora: '08:00',
                hora_fin: '10:00',
                tipo: 'examen', 
                curso: 'primero',
                lugar: 'Aula 101',
                organizador: 'Prof. Pérez',
                requiere_inscripcion: false,
                materiales: 'Calculadora, lápiz, regla'
            },
            {
                id: '3',
                titulo: 'Reunión de Padres',
                descripcion: 'Reunión informativa sobre el progreso académico del primer trimestre.',
                fecha: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Dentro de 10 días
                hora: '18:00',
                hora_fin: '20:00',
                tipo: 'reunion',
                curso: 'todos',
                lugar: 'Salón de Actos',
                organizador: 'Dirección',
                requiere_inscripcion: false,
                materiales: 'No requiere'
            }
        ];
        localStorage.setItem('actividades', JSON.stringify(actividades));
    }

    // Horarios
    if (!localStorage.getItem('horarios')) {
        const horarios = {
            primero: [
                { hora: '07:00 - 07:45', lunes: 'Matemáticas', martes: 'Lengua', miercoles: 'Ciencias', jueves: 'Historia', viernes: 'Ed. Física' },
                { hora: '07:45 - 08:30', lunes: 'Lengua', martes: 'Matemáticas', miercoles: 'Historia', jueves: 'Ciencias', viernes: 'Arte' },
                { hora: '08:30 - 09:15', lunes: 'Ciencias', martes: 'Historia', miercoles: 'Matemáticas', jueves: 'Lengua', viernes: 'Música' },
                { hora: '09:15 - 10:00', lunes: 'Historia', martes: 'Ciencias', miercoles: 'Lengua', jueves: 'Matemáticas', viernes: 'Tecnología' },
                { hora: '10:00 - 10:30', lunes: 'RECREO', martes: 'RECREO', miercoles: 'RECREO', jueves: 'RECREO', viernes: 'RECREO' },
                { hora: '10:30 - 11:15', lunes: 'Inglés', martes: 'Ed. Física', miercoles: 'Inglés', jueves: 'Arte', viernes: 'Matemáticas' },
                { hora: '11:15 - 12:00', lunes: 'Ética', martes: 'Inglés', miercoles: 'Música', jueves: 'Tecnología', viernes: 'Lengua' },
                { hora: '12:00 - 12:45', lunes: 'Tecnología', martes: 'Música', miercoles: 'Ed. Física', jueves: 'Inglés', viernes: 'Ciencias' }
            ],
            segundo: [
                { hora: '07:00 - 07:45', lunes: 'Lengua', martes: 'Matemáticas', miercoles: 'Historia', jueves: 'Ciencias', viernes: 'Ed. Física' },
                { hora: '07:45 - 08:30', lunes: 'Matemáticas', martes: 'Lengua', miercoles: 'Ciencias', jueves: 'Historia', viernes: 'Arte' },
                { hora: '08:30 - 09:15', lunes: 'Historia', martes: 'Ciencias', miercoles: 'Lengua', jueves: 'Matemáticas', viernes: 'Música' },
                { hora: '09:15 - 10:00', lunes: 'Ciencias', martes: 'Historia', miercoles: 'Matemáticas', jueves: 'Lengua', viernes: 'Tecnología' },
                { hora: '10:00 - 10:30', lunes: 'RECREO', martes: 'RECREO', miercoles: 'RECREO', jueves: 'RECREO', viernes: 'RECREO' },
                { hora: '10:30 - 11:15', lunes: 'Inglés', martes: 'Música', miercoles: 'Inglés', jueves: 'Ed. Física', viernes: 'Matemáticas' },
                { hora: '11:15 - 12:00', lunes: 'Música', martes: 'Inglés', miercoles: 'Ed. Física', jueves: 'Ética', viernes: 'Lengua' },
                { hora: '12:00 - 12:45', lunes: 'Ed. Física', martes: 'Tecnología', miercoles: 'Ética', jueves: 'Música', viernes: 'Ciencias' }
            ],
            septimo: [
                { hora: '07:00 - 07:45', lunes: 'Matemáticas', martes: 'Lengua', miercoles: 'Física', jueves: 'Historia', viernes: 'Ed. Física' },
                { hora: '07:45 - 08:30', lunes: 'Lengua', martes: 'Matemáticas', miercoles: 'Química', jueves: 'Ciencias', viernes: 'Arte' },
                { hora: '08:30 - 09:15', lunes: 'Física', martes: 'Historia', miercoles: 'Matemáticas', jueves: 'Lengua', viernes: 'Música' },
                { hora: '09:15 - 10:00', lunes: 'Química', martes: 'Ciencias', miercoles: 'Historia', jueves: 'Matemáticas', viernes: 'Tecnología' },
                { hora: '10:00 - 10:30', lunes: 'RECREO', martes: 'RECREO', miercoles: 'RECREO', jueves: 'RECREO', viernes: 'RECREO' },
                { hora: '10:30 - 11:15', lunes: 'Inglés', martes: 'Física', miercoles: 'Inglés', jueves: 'Química', viernes: 'Matemáticas' },
                { hora: '11:15 - 12:00', lunes: 'Historia', martes: 'Inglés', miercoles: 'Química', jueves: 'Física', viernes: 'Lengua' },
                { hora: '12:00 - 12:45', lunes: 'Ética', martes: 'Química', miercoles: 'Física', jueves: 'Inglés', viernes: 'Ciencias' },
                { hora: '12:45 - 13:30', lunes: 'Tecnología', martes: 'Música', miercoles: 'Arte', jueves: 'Ed. Física', viernes: 'Taller' },
                { hora: '13:30 - 14:15', lunes: 'Taller', martes: 'Tecnología', miercoles: 'Música', jueves: 'Arte', viernes: 'Club' },
                { hora: '14:15 - 15:00', lunes: 'Club', martes: 'Taller', miercoles: 'Tecnología', jueves: 'Música', viernes: 'Orientación' }
            ]
        };
        const gradosRestantes = ['tercero', 'cuarto', 'quinto', 'sexto', 'octavo', 'noveno', 'decimo', 'once'];
        gradosRestantes.forEach(g => {
            horarios[g] = JSON.parse(JSON.stringify(horarios.primero));
        });
        
        localStorage.setItem('horarios', JSON.stringify(horarios));
    }

    // Foro
    if (!localStorage.getItem('foroMensajes')) {
        const mensajes = [
            { id: 1, id_usuario: 3, autor: 'Ana García', titulo: 'Bienvenidos al foro', contenido: 'Este es un espacio para compartir ideas.', fecha: new Date().toISOString(), comentarios: [] }
        ];
        localStorage.setItem('foroMensajes', JSON.stringify(mensajes));
    }

    // Solicitudes
    if (!localStorage.getItem('solicitudesAprobacion')) {
        localStorage.setItem('solicitudesAprobacion', JSON.stringify([]));
    }

    // Carrusel
    if (!localStorage.getItem('carrusel')) {
        const carrusel = [
            { id: 1, imagen: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200', titulo: 'Bienvenidos', descripcion: 'Ciclo lectivo 2025' },
            { id: 2, imagen: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200', titulo: 'Excelencia Académica', descripcion: 'Comprometidos con tu educación' },
            { id: 3, imagen: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200', titulo: 'Valores', descripcion: 'Formación integral' }
        ];
        localStorage.setItem('carrusel', JSON.stringify(carrusel));
    }

    // Textos inicio
    if (!localStorage.getItem('inicioTextos')) {
        const inicioTextos = {
            colegioNombre: 'Colegio CEI',
            colegioLema: 'Educación con valores',
            eventos: '<p>📅 10/04 - Feria de Ciencias</p><p>📅 15/04 - Examen de Matemáticas</p><p>📅 20/04 - Reunión de padres</p>',
            avisos: '<li>📢 Reunión de padres: 15 de abril</li><li>📢 Inscripciones abiertas para 2026</li><li>📢 Talleres extracurriculares</li>',
            calendarioResumen: '<p>Próximo feriado: 24 de marzo</p><p>Vacaciones de invierno: 15-26 julio</p>'
        };
        localStorage.setItem('inicioTextos', JSON.stringify(inicioTextos));
    }

    // Sobre Nosotros
    if (!localStorage.getItem('sobreNosotros')) {
        const sn = {
            historia: 'Fundado en 1985, el Colegio CEI ha formado a miles de estudiantes con excelencia académica y valores cristianos.',
            mision: 'Formar líderes íntegros con pensamiento crítico y compromiso social.',
            vision: 'Ser reconocidos como la mejor institución educativa de la región para 2030.',
            valores: 'Respeto, Responsabilidad, Honestidad, Solidaridad.',
            video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        };
        localStorage.setItem('sobreNosotros', JSON.stringify(sn));
    }

    // Contacto
    if (!localStorage.getItem('contacto')) {
        const contacto = {
            telefono: '📞 (011) 1234-5678',
            email: '📧 info@colegio.edu',
            direccion: '📍 Av. Siempre Viva 123'
        };
        localStorage.setItem('contacto', JSON.stringify(contacto));
    }

    // CULTURA Y DEPORTE
    if (!localStorage.getItem('culturaDeporte')) {
        const culturaDeporte = {
            cultura: {
                titulo: 'Cultura',
                descripcion: 'Explora nuestras actividades culturales',
                color: '#4361ee',
                icono: 'palette',
                imagen: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
                subcategorias: {
                    danza: {
                        titulo: '💃 Danza Folclórica',
                        informacion: 'Grupo de danza folclórica. Ensayos: martes y jueves 4-6pm.',
                        imagen: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
                        galeria: [
                            { url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', descripcion: 'Presentación de danza folclórica' },
                            { url: 'https://images.unsplash.com/photo-1516672713107-6d21eb9efa9f?w=800', descripcion: 'Ensayos semanales' },
                            { url: 'https://images.unsplash.com/photo-1533281011690-ecf9e1b7ea26?w=800', descripcion: 'Festival de danza' }
                        ]
                    },
                    teatro: {
                        titulo: '🎭 Teatro',
                        informacion: 'Taller de teatro escolar. Presentaciones trimestrales.',
                        imagen: 'https://images.unsplash.com/photo-1498038432885-0e209dc829c1?w=800',
                        galeria: [
                            { url: 'https://images.unsplash.com/photo-1498038432885-0e209dc829c1?w=800', descripcion: 'Presentación teatral' },
                            { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', descripcion: 'Ensayos' },
                            { url: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800', descripcion: 'Monólogos' }
                        ]
                    }
                }
            },
            deporte: {
                titulo: 'Deporte',
                descripcion: 'Vive la pasión del deporte',
                color: '#f72585',
                icono: 'futbol',
                imagen: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
                subcategorias: {
                    futbol: {
                        titulo: '⚽ Fútbol Masculino',
                        informacion: 'Equipo de fútbol. Entrenamientos: lunes, miércoles y viernes 4-6pm.',
                        imagen: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
                        galeria: [
                            { url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800', descripcion: 'Equipo en entrenamientos' },
                            { url: 'https://images.unsplash.com/photo-1574661852884-20a85a4a86d3?w=800', descripcion: 'Partido' },
                            { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800', descripcion: 'Celebración' }
                        ]
                    }
                }
            }
        };
        localStorage.setItem('culturaDeporte', JSON.stringify(culturaDeporte));
    }

    // MUESTRAS ARTÍSTICAS (NUEVA SECCIÓN)
    if (!localStorage.getItem('muestrasArtisticas')) {
        const muestras = {
            danza: {
                titulo: "💃 Danza",
                imagen: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
                descripcion: "Expresión artística a través del movimiento corporal",
                galeria: [
                    { url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400", descripcion: "Presentación de danza folclórica tradicional" },
                    { url: "https://images.unsplash.com/photo-1516672713107-6d21eb9efa9f?w=400", descripcion: "Ensayo grupal de danza contemporánea" },
                    { url: "https://images.unsplash.com/photo-1533281011690-ecf9e1b7ea26?w=400", descripcion: "Danza urbana en el patio del colegio" },
                    { url: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400", descripcion: "Festival de danza estudiantil" }
                ]
            },
            teatro: {
                titulo: "🎭 Teatro",
                imagen: "https://images.unsplash.com/photo-1498038432885-0e209dc829c1?w=400",
                descripcion: "Arte dramático y expresión escénica",
                galeria: [
                    { url: "https://images.unsplash.com/photo-1498038432885-0e209dc829c1?w=400", descripcion: "Escena de la obra 'Romeo y Julieta'" },
                    { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", descripcion: "Ensayo técnico de iluminación" },
                    { url: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400", descripcion: "Presentación de monólogos estudiantiles" },
                    { url: "https://images.unsplash.com/photo-1507924532220-6d7bae7f9b1b?w=400", descripcion: "Taller de improvisación teatral" }
                ]
            },
            arte: {
                titulo: "🎨 Muestras de Arte",
                imagen: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400",
                descripcion: "Expresiones plásticas y visuales",
                galeria: [
                    { url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400", descripcion: "Exposición de pintura al óleo" },
                    { url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400", descripcion: "Escultura en arcilla del alumnado" },
                    { url: "https://images.unsplash.com/photo-1518644730709-0835105d9daa?w=400", descripcion: "Dibujo técnico en perspectiva" },
                    { url: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=400", descripcion: "Arte digital y diseño gráfico" }
                ]
            },
            musica: {
                titulo: "🎵 Música",
                imagen: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400",
                descripcion: "Melodías y armonías estudiantiles",
                galeria: [
                    { url: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400", descripcion: "Concierto de la orquesta estudiantil" },
                    { url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400", descripcion: "Ensayo del coro polifónico" },
                    { url: "https://images.unsplash.com/photo-1461784121038-f088ca1e7714?w=400", descripcion: "Clase de guitarra eléctrica" },
                    { url: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400", descripcion: "Festival de música tradicional" }
                ]
            }
        };
        localStorage.setItem('muestrasArtisticas', JSON.stringify(muestras));
    }
}
inicializarDatos();

// ========== VARIABLES GLOBALES ==========
let usuarioActual = null;
let indiceCarrusel = 0;
let intervaloCarrusel;
let calendarioMes = new Date().getMonth();
let calendarioAnio = new Date().getFullYear();
let indiceCulturaCarrusel = {};
let intervalosCulturaCarrusel = {};

// ========== CLASES ==========

// Clase GestorHorarios
class GestorHorarios {
    constructor() {
        this.horarios = this.cargarHorarios();
        this.bloquesPorNivel = {
            primaria: [
                '07:00 - 07:45', '07:45 - 08:30', '08:30 - 09:15', '09:15 - 10:00',
                '10:00 - 10:30', '10:30 - 11:15', '11:15 - 12:00', '12:00 - 12:45'
            ],
            secundaria: [
                '07:00 - 07:45', '07:45 - 08:30', '08:30 - 09:15', '09:15 - 10:00',
                '10:00 - 10:30', '10:30 - 11:15', '11:15 - 12:00', '12:00 - 12:45',
                '12:45 - 13:30', '13:30 - 14:15', '14:15 - 15:00'
            ]
        };
    }
    
    getNivelFromGrado(grado) {
        const primaria = ['primero', 'segundo', 'tercero', 'cuarto', 'quinto', 'sexto'];
        return primaria.includes(grado) ? 'primaria' : 'secundaria';
    }
    
    getHorarioGrado(grado) {
        if (!grado) return [];
        if (!this.horarios[grado]) {
            this.horarios[grado] = this.crearHorarioPorDefecto(grado);
            this.guardarHorarios();
        }
        return this.horarios[grado];
    }
    
    crearHorarioPorDefecto(grado) {
        const nivel = this.getNivelFromGrado(grado);
        const bloques = this.bloquesPorNivel[nivel];
        return bloques.map(hora => ({
            hora: hora,
            lunes: '',
            martes: '',
            miercoles: '',
            jueves: '',
            viernes: ''
        }));
    }
    
    agregarBloqueHorario(grado, nuevoBloque) {
        if (!this.horarios[grado]) {
            this.horarios[grado] = [];
        }
        this.horarios[grado].push(nuevoBloque);
        this.horarios[grado].sort((a, b) => this.compararHoras(a.hora, b.hora));
        this.guardarHorarios();
    }
    
    compararHoras(horaA, horaB) {
        const horaInicioA = horaA.split(' - ')[0];
        const horaInicioB = horaB.split(' - ')[0];
        return horaInicioA.localeCompare(horaInicioB);
    }
    
    guardarHorarios() {
        localStorage.setItem('horarios', JSON.stringify(this.horarios));
    }
    
    cargarHorarios() {
        return JSON.parse(localStorage.getItem('horarios')) || {};
    }
    
    renderizarHorario(grado, containerId) {
        const horario = this.getHorarioGrado(grado);
        const container = document.getElementById(containerId);
        if (!container) return;
        
        let html = `
            <table class="horarios-table">
                <thead>
                    <tr>
                        <th>Hora</th>
                        <th>Lunes</th>
                        <th>Martes</th>
                        <th>Miércoles</th>
                        <th>Jueves</th>
                        <th>Viernes</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        horario.forEach(bloque => {
            const esRecreo = bloque.lunes === 'RECREO' || bloque.martes === 'RECREO' || 
                            bloque.miercoles === 'RECREO' || bloque.jueves === 'RECREO' || 
                            bloque.viernes === 'RECREO';
            
            html += `
                <tr class="${esRecreo ? 'recreo-fila' : ''}">
                    <td class="hora-columna">${bloque.hora}</td>
                    <td class="${bloque.lunes === 'RECREO' ? 'recreo' : ''}">${bloque.lunes || '-'}</td>
                    <td class="${bloque.martes === 'RECREO' ? 'recreo' : ''}">${bloque.martes || '-'}</td>
                    <td class="${bloque.miercoles === 'RECREO' ? 'recreo' : ''}">${bloque.miercoles || '-'}</td>
                    <td class="${bloque.jueves === 'RECREO' ? 'recreo' : ''}">${bloque.jueves || '-'}</td>
                    <td class="${bloque.viernes === 'RECREO' ? 'recreo' : ''}">${bloque.viernes || '-'}</td>
                </tr>
            `;
        });
        
        html += '</tbody></table>';
        container.innerHTML = html;
    }
    
    renderizarHorarioEdicion(grado, containerId) {
        const horario = this.getHorarioGrado(grado);
        const container = document.getElementById(containerId);
        if (!container) return;
        
        let html = `
            <table class="horarios-table">
                <thead>
                    <tr>
                        <th>Hora</th>
                        <th>Lunes</th>
                        <th>Martes</th>
                        <th>Miércoles</th>
                        <th>Jueves</th>
                        <th>Viernes</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        horario.forEach((bloque, index) => {
            html += `
                <tr data-bloque-index="${index}">
                    <td><input type="text" class="edit-hora" value="${bloque.hora.replace(/"/g, '&quot;')}" placeholder="HH:MM - HH:MM"></td>
                    <td><input type="text" class="edit-lunes" value="${(bloque.lunes || '').replace(/"/g, '&quot;')}" placeholder="Materia"></td>
                    <td><input type="text" class="edit-martes" value="${(bloque.martes || '').replace(/"/g, '&quot;')}" placeholder="Materia"></td>
                    <td><input type="text" class="edit-miercoles" value="${(bloque.miercoles || '').replace(/"/g, '&quot;')}" placeholder="Materia"></td>
                    <td><input type="text" class="edit-jueves" value="${(bloque.jueves || '').replace(/"/g, '&quot;')}" placeholder="Materia"></td>
                    <td><input type="text" class="edit-viernes" value="${(bloque.viernes || '').replace(/"/g, '&quot;')}" placeholder="Materia"></td>
                    <td>
                        <button class="btn-danger btn-small" onclick="gestorHorarios.eliminarBloque('${grado}', ${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        html += '</tbody></table>';
        container.innerHTML = html;
    }
    
    eliminarBloque(grado, index) {
        if (confirm('¿Eliminar este bloque horario?')) {
            this.horarios[grado].splice(index, 1);
            this.guardarHorarios();
            this.renderizarHorarioEdicion(grado, 'horario-edicion');
        }
    }
    
    guardarEdicion(grado) {
        const filas = document.querySelectorAll('#horario-edicion tbody tr');
        const nuevoHorario = [];
        
        filas.forEach(fila => {
            nuevoHorario.push({
                hora: fila.querySelector('.edit-hora').value,
                lunes: fila.querySelector('.edit-lunes').value,
                martes: fila.querySelector('.edit-martes').value,
                miercoles: fila.querySelector('.edit-miercoles').value,
                jueves: fila.querySelector('.edit-jueves').value,
                viernes: fila.querySelector('.edit-viernes').value
            });
        });
        
        this.horarios[grado] = nuevoHorario;
        this.guardarHorarios();
        alert('Horario guardado exitosamente');
        this.renderizarHorario(grado, 'horarios-tabla-container');
    }
}

// Clase CalendarioManager
class CalendarioManager {
    constructor() {
        this.actividades = this.cargarActividades();
        this.mesActual = new Date().getMonth();
        this.anioActual = new Date().getFullYear();
        this.meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                     'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    }
    
    cargarActividades() {
        return JSON.parse(localStorage.getItem('actividades')) || [];
    }
    
    guardarActividades() {
        localStorage.setItem('actividades', JSON.stringify(this.actividades));
    }
    
    getActividadesPorFecha(fecha) {
        return this.actividades.filter(a => a.fecha === fecha);
    }
    
    renderizarCalendario(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const primerDia = new Date(this.anioActual, this.mesActual, 1).getDay();
        const diasEnMes = new Date(this.anioActual, this.mesActual + 1, 0).getDate();
        const primerDiaAjustado = primerDia === 0 ? 6 : primerDia - 1;
        
        let html = `
            <div class="calendario-header">
                <button id="mesAnterior" class="btn-nav"><i class="fas fa-chevron-left"></i></button>
                <h3>${this.meses[this.mesActual]} ${this.anioActual}</h3>
                <button id="mesSiguiente" class="btn-nav"><i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="calendario-dias-semana">
                <div>Lun</div><div>Mar</div><div>Mié</div><div>Jue</div><div>Vie</div><div>Sáb</div><div>Dom</div>
            </div>
            <div class="calendario-grid">
        `;
        
        for (let i = 0; i < primerDiaAjustado; i++) {
            html += '<div class="calendario-dia vacio"></div>';
        }
        
        for (let dia = 1; dia <= diasEnMes; dia++) {
            const fechaStr = `${this.anioActual}-${(this.mesActual+1).toString().padStart(2,'0')}-${dia.toString().padStart(2,'0')}`;
            const actividadesDia = this.getActividadesPorFecha(fechaStr);
            
            let clase = 'calendario-dia';
            if (actividadesDia.length > 0) clase += ' tiene-eventos';
            
            html += `
                <div class="${clase}" data-fecha="${fechaStr}" onclick="calendarioManager.mostrarDetalleFecha('${fechaStr}')">
                    <span class="numero-dia">${dia}</span>
                    <div class="eventos-miniatura">
            `;
            
            actividadesDia.slice(0, 3).forEach(act => {
                html += `<span class="evento-titulo" title="${act.titulo.replace(/"/g, '&quot;')}">${act.titulo.substring(0, 15)}${act.titulo.length > 15 ? '...' : ''}</span>`;
            });
            
            if (actividadesDia.length > 3) {
                html += `<span class="evento-mas">+${actividadesDia.length - 3} más</span>`;
            }
            
            html += `
                    </div>
                </div>
            `;
        }
        
        html += '</div>';
        container.innerHTML = html;
        
        document.getElementById('mesAnterior')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.mesActual--;
            if (this.mesActual < 0) {
                this.mesActual = 11;
                this.anioActual--;
            }
            this.renderizarCalendario(containerId);
        });
        
        document.getElementById('mesSiguiente')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.mesActual++;
            if (this.mesActual > 11) {
                this.mesActual = 0;
                this.anioActual++;
            }
            this.renderizarCalendario(containerId);
        });
    }
    
    mostrarDetalleFecha(fecha) {
        const actividades = this.getActividadesPorFecha(fecha);
        if (actividades.length === 0) return;
        
        const modal = document.getElementById('modalDetalleActividad');
        const contenido = document.getElementById('detalle-actividad-contenido');
        
        const fechaObj = new Date(fecha + 'T12:00:00');
        const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        let html = `
            <div class="detalle-fecha-header">
                <h3>${fechaFormateada}</h3>
                <p>${actividades.length} actividad(es) programada(s)</p>
            </div>
            <div class="actividades-lista-detalle">
        `;
        
        actividades.sort((a, b) => (a.hora || '00:00').localeCompare(b.hora || '00:00')).forEach(act => {
            const horaTexto = act.hora ? `${act.hora}${act.hora_fin ? ` - ${act.hora_fin}` : ''}` : 'Horario por definir';
            
            html += `
                <div class="actividad-detalle-card tipo-${act.tipo}">
                    <div class="actividad-detalle-header">
                        <span class="actividad-tipo-badge">${this.getIconoTipo(act.tipo)} ${act.tipo}</span>
                        <span class="actividad-hora">${horaTexto}</span>
                    </div>
                    <h4>${act.titulo}</h4>
                    <p>${act.descripcion}</p>
                    
                    <div class="actividad-detalle-info">
                        ${act.lugar ? `<p><i class="fas fa-map-marker-alt"></i> ${act.lugar}</p>` : ''}
                        ${act.organizador ? `<p><i class="fas fa-user"></i> ${act.organizador}</p>` : ''}
                        ${act.curso ? `<p><i class="fas fa-users"></i> ${act.curso === 'todos' ? 'Todos los cursos' : act.curso}</p>` : ''}
                        ${act.materiales ? `<p><i class="fas fa-tools"></i> Materiales: ${act.materiales}</p>` : ''}
                        ${act.requiere_inscripcion ? '<p><i class="fas fa-clipboard-list"></i> Requiere inscripción previa</p>' : ''}
                    </div>
                    
                    ${act.imagen ? `<img src="${act.imagen}" alt="${act.titulo}" class="actividad-imagen">` : ''}
                    
                    ${usuarioActual && (usuarioActual.rol === 'admin' || usuarioActual.rol === 'profesor') ? `
                        <div class="actividad-acciones">
                            <button class="btn-warning btn-small" onclick="calendarioManager.editarActividad('${act.id}')">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button class="btn-danger btn-small" onclick="calendarioManager.eliminarActividad('${act.id}')">
                                <i class="fas fa-trash"></i> Eliminar
                            </button>
                        </div>
                    ` : ''}
                </div>
            `;
        });
        
        html += '</div>';
        contenido.innerHTML = html;
        modal.style.display = 'flex';
    }
    
    getIconoTipo(tipo) {
        const iconos = {
            'evento': '🎉',
            'examen': '📝',
            'reunion': '👥',
            'tarea': '📚',
            'feriado': '🎊',
            'otro': '📌'
        };
        return iconos[tipo] || '📅';
    }
    
    abrirModalActividad(actividadId = null, fechaPorDefecto = null) {
        if (!usuarioActual || (usuarioActual.rol !== 'admin' && usuarioActual.rol !== 'profesor')) {
            alert('No tienes permisos para esta acción');
            return;
        }
        
        const modal = document.getElementById('modalActividad');
        const form = document.getElementById('formActividad');
        const tituloModal = document.getElementById('tituloModalActividad');
        
        if (actividadId) {
            const actividad = this.actividades.find(a => String(a.id) === String(actividadId));
            if (actividad) {
                document.getElementById('actividad-id').value = actividad.id;
                document.getElementById('actividad-titulo').value = actividad.titulo;
                document.getElementById('actividad-descripcion').value = actividad.descripcion;
                document.getElementById('actividad-fecha').value = actividad.fecha;
                document.getElementById('actividad-hora').value = actividad.hora || '';
                document.getElementById('actividad-hora-fin').value = actividad.hora_fin || '';
                document.getElementById('actividad-tipo').value = actividad.tipo;
                document.getElementById('actividad-curso').value = actividad.curso || 'todos';
                document.getElementById('actividad-lugar').value = actividad.lugar || '';
                document.getElementById('actividad-organizador').value = actividad.organizador || '';
                document.getElementById('actividad-materiales').value = actividad.materiales || '';
                document.getElementById('actividad-requiere-inscripcion').checked = actividad.requiere_inscripcion || false;
                
                // Manejar imagen
                if (actividad.imagen) {
                    if (actividad.imagen.startsWith('data:')) {
                        document.getElementById('actividad-imagen-url').value = '';
                        document.getElementById('actividad-imagen-file').value = '';
                    } else {
                        document.getElementById('actividad-imagen-url').value = actividad.imagen;
                        document.getElementById('actividad-imagen-file').value = '';
                    }
                } else {
                    document.getElementById('actividad-imagen-url').value = '';
                    document.getElementById('actividad-imagen-file').value = '';
                }
                
                tituloModal.textContent = 'Editar Actividad';
            }
        } else {
            form.reset();
            document.getElementById('actividad-id').value = '';
            if (fechaPorDefecto) {
                document.getElementById('actividad-fecha').value = fechaPorDefecto;
            }
            tituloModal.textContent = 'Crear Nueva Actividad';
        }
        
        modal.style.display = 'flex';
    }
    
    guardarActividad(event) {
        event.preventDefault();
        
        const procesarImagen = (callback) => {
            const urlInput = document.getElementById('actividad-imagen-url');
            const fileInput = document.getElementById('actividad-imagen-file');
            
            if (fileInput.files && fileInput.files[0]) {
                const file = fileInput.files[0];
                comprimirImagen(file, 1, (imagenComprimida) => {
                    callback(imagenComprimida || null);
                });
            } else {
                callback(urlInput.value || null);
            }
        };
        
        procesarImagen((imagen) => {
            const id = document.getElementById('actividad-id').value;
            const actividad = {
                id: id || crypto.randomUUID(),
                titulo: document.getElementById('actividad-titulo').value,
                descripcion: document.getElementById('actividad-descripcion').value,
                fecha: document.getElementById('actividad-fecha').value,
                hora: document.getElementById('actividad-hora').value || null,
                hora_fin: document.getElementById('actividad-hora-fin').value || null,
                tipo: document.getElementById('actividad-tipo').value,
                curso: document.getElementById('actividad-curso').value,
                lugar: document.getElementById('actividad-lugar').value || null,
                organizador: document.getElementById('actividad-organizador').value || null,
                materiales: document.getElementById('actividad-materiales').value || null,
                requiere_inscripcion: document.getElementById('actividad-requiere-inscripcion').checked,
                imagen: imagen
            };
            
            if (id) {
                const index = this.actividades.findIndex(a => a.id === id);
                if (index !== -1) this.actividades[index] = actividad;
            } else {
                this.actividades.push(actividad);
            }
            
            this.guardarActividades();
            document.getElementById('modalActividad').style.display = 'none';
            this.renderizarCalendario('calendario-actividades');
            this.renderizarListaActividades();
            this.actualizarEventosDestacados();
            document.getElementById('modalDetalleActividad').style.display = 'none';

            // Ya no se agrega notificación a la campana
            mostrarToast(id ? 'Actividad actualizada correctamente.' : 'Actividad creada correctamente.', 'success');
        });
    }
    
    eliminarActividad(id) {
        if (!confirm('¿Estás seguro de eliminar esta actividad?')) return;
        
        // Normalizar id a string para comparación segura
        const idStr = String(id);
        this.actividades = this.actividades.filter(a => String(a.id) !== idStr);
        this.guardarActividades();
        
        const modalDetalle = document.getElementById('modalDetalleActividad');
        if (modalDetalle) modalDetalle.style.display = 'none';
        this.renderizarCalendario('calendario-actividades');
        this.renderizarListaActividades();
        this.actualizarEventosDestacados();
        mostrarToast('Actividad eliminada correctamente.', 'success');
    }
    
    renderizarListaActividades() {
        const tbody = document.getElementById('actividades-body');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        this.actividades.sort((a, b) => a.fecha.localeCompare(b.fecha)).forEach(act => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${act.fecha}</td>
                <td>${act.titulo}</td>
                <td><span class="tipo-badge tipo-${act.tipo}">${this.getIconoTipo(act.tipo)} ${act.tipo}</span></td>
                <td>${act.curso === 'todos' ? 'Todos' : act.curso}</td>
                <td>
                    ${usuarioActual && (usuarioActual.rol === 'admin' || usuarioActual.rol === 'profesor') ? 
                        `<button class="btn-warning btn-small" onclick="calendarioManager.abrirModalActividad('${act.id}')"><i class="fas fa-edit"></i></button>
                         <button class="btn-danger btn-small" onclick="calendarioManager.eliminarActividad('${act.id}')"><i class="fas fa-trash"></i></button>` : ''}
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
    
    actualizarEventosDestacados() {
        const hoy = new Date().toISOString().split('T')[0];
        const proximos = this.actividades
            .filter(a => a.fecha >= hoy)
            .sort((a, b) => a.fecha.localeCompare(b.fecha))
            .slice(0, 5);
        
        const container = document.getElementById('eventos-destacados');
        if (container) {
            container.innerHTML = proximos.map(a => `
                <div class="evento-destacado" onclick="calendarioManager.mostrarDetalleFecha('${a.fecha}')">
                    <span class="evento-fecha">${new Date(a.fecha).toLocaleDateString()}</span>
                    <span class="evento-titulo-destacado">${a.titulo}</span>
                    <span class="evento-tipo-badge pequeño tipo-${a.tipo}">${this.getIconoTipo(a.tipo)}</span>
                </div>
            `).join('') || '<p class="text-center">No hay eventos próximos</p>';
        }
    }
    
    editarActividad(id) {
        this.abrirModalActividad(id);
    }
}

// ========== INSTANCIAS GLOBALES ==========
const gestorHorarios = new GestorHorarios();
const calendarioManager = new CalendarioManager();

// ========== ELEMENTOS DOM ==========
const menuPrincipal = document.getElementById('menu-principal');
const secciones = document.querySelectorAll('section');
const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
const userNameSpan = document.getElementById('userName');
const modalLogin = document.getElementById('modalLogin');
const cerrarModal = document.getElementById('cerrarModal');
const tabLoginBtn = document.getElementById('tabLoginBtn');
const tabRegisterBtn = document.getElementById('tabRegisterBtn');
const panelLogin = document.getElementById('panelLogin');
const panelRegister = document.getElementById('panelRegister');
const formLogin = document.getElementById('formLogin');
const formRegister = document.getElementById('formRegister');
const btnAgregarActividad = document.getElementById('btnAgregarActividad');
const btnEditarHorario = document.getElementById('btnEditarHorario');
const formContacto = document.getElementById('formContacto');
const formMensaje = document.getElementById('formMensaje');
const menuToggle = document.getElementById('menuToggle');

// ===== TOAST SYSTEM (Feedback visual sin alert()) =====
function mostrarToast(mensaje, tipo = 'success', duracion = 3500) {
    let contenedor = document.getElementById('toast-contenedor');
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'toast-contenedor';
        contenedor.style.cssText = `
            position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
            display: flex; flex-direction: column; gap: 0.75rem;
            pointer-events: none;
        `;
        document.body.appendChild(contenedor);
    }

    const iconos = { success: 'check-circle', error: 'exclamation-circle', info: 'info-circle', warning: 'exclamation-triangle' };
    const colores = {
        success: 'linear-gradient(135deg,#06d6a0,#05b585)',
        error:   'linear-gradient(135deg,#ef476f,#d93a5e)',
        info:    'linear-gradient(135deg,#4361ee,#3a56d4)',
        warning: 'linear-gradient(135deg,#ffd166,#f4a261)'
    };

    const toast = document.createElement('div');
    toast.style.cssText = `
        background: ${colores[tipo] || colores.info};
        color: white; padding: 0.9rem 1.4rem;
        border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        display: flex; align-items: center; gap: 0.75rem;
        font-weight: 500; font-size: 0.92rem;
        transform: translateX(120%); transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
        pointer-events: auto; min-width: 240px; max-width: 340px;
        font-family: var(--font-primary, 'Poppins', sans-serif);
    `;
    toast.innerHTML = `<i class="fas fa-${iconos[tipo] || 'info-circle'}" style="font-size:1.1rem;flex-shrink:0;"></i><span>${mensaje}</span>`;
    contenedor.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => { toast.style.transform = 'translateX(0)'; });
    });

    setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => toast.remove(), 350);
    }, duracion);
}

// ===== NUEVA FUNCIÓN: MOSTRAR BANNER DE NOTIFICACIONES =====
function mostrarBannerNotificaciones() {
    if (!usuarioActual) return;
    
    const bannerContainer = document.getElementById('bannerNotificaciones');
    if (!bannerContainer) return;
    
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const actividadesProximas = calendarioManager.actividades.filter(act => {
        const fechaAct = new Date(act.fecha);
        fechaAct.setHours(0, 0, 0, 0);
        const diffDays = Math.ceil((fechaAct - hoy) / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 7;
    }).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    
    if (actividadesProximas.length === 0) {
        bannerContainer.style.display = 'none';
        return;
    }
    
    const actividadPrincipal = actividadesProximas[0];
    const fechaFormateada = new Date(actividadPrincipal.fecha).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' });
    
    bannerContainer.innerHTML = `
        <div class="banner-notificaciones">
            <div class="banner-contenido">
                <div class="banner-icono">
                    <i class="fas fa-calendar-check"></i>
                </div>
                <div class="banner-texto">
                    <h4>📢 ¡Próxima actividad!</h4>
                    <p><strong>${actividadPrincipal.titulo}</strong> — ${fechaFormateada}${actividadPrincipal.hora ? ` a las ${actividadPrincipal.hora}` : ''}</p>
                    ${actividadesProximas.length > 1 ? `<small>+ ${actividadesProximas.length - 1} actividad(es) más en los próximos días.</small>` : ''}
                </div>
                <button class="banner-accion" onclick="calendarioManager.mostrarDetalleFecha('${actividadPrincipal.fecha}')">
                    Ver detalles <i class="fas fa-arrow-right"></i>
                </button>
            </div>
            <button class="banner-cerrar" onclick="cerrarBannerNotificaciones()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    bannerContainer.style.display = 'block';
}

function cerrarBannerNotificaciones() {
    const banner = document.getElementById('bannerNotificaciones');
    if (banner) {
        banner.style.display = 'none';
    }
}

// ===== NAVEGACIÓN POR TECLADO EN MODAL IMAGEN =====
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('modalImagen');
    if (!modal || modal.style.display === 'none') return;
    if (e.key === 'ArrowLeft')  navegarImagen(-1);
    if (e.key === 'ArrowRight') navegarImagen(1);
    if (e.key === 'Escape') cerrarModalImagen();
});

// ===== RESTAURAR SESIÓN AL RECARGAR =====
(function restaurarSesion() {
    const sesionGuardada = sessionStorage.getItem('usuarioActual');
    if (sesionGuardada) {
        try {
            usuarioActual = JSON.parse(sesionGuardada);
        } catch(e) { usuarioActual = null; }
    }
})();

// ===== FUNCIONES DE UTILIDAD =====
function generarMenu() {
    const rol = usuarioActual ? usuarioActual.rol : 'invitado';
    const items = [];

    if (rol === 'invitado') {
        items.push({ id: 'inicio', nombre: 'Inicio', icono: 'home' });
        items.push({ id: 'muestras-artisticas', nombre: 'Muestras Artísticas', icono: 'palette' });
        items.push({ id: 'cultura-deporte', nombre: 'Cultura y Deporte', icono: 'futbol' });
        items.push({ id: 'sobre-nosotros', nombre: 'Sobre Nosotros', icono: 'school' });
        items.push({ id: 'contacto', nombre: 'Contacto', icono: 'envelope' });
    } else if (rol === 'estudiante') {
        items.push({ id: 'inicio', nombre: 'Inicio', icono: 'home' });
        items.push({ id: 'muestras-artisticas', nombre: 'Muestras Artísticas', icono: 'palette' });
        items.push({ id: 'cultura-deporte', nombre: 'Cultura y Deporte', icono: 'futbol' });
        items.push({ id: 'actividades', nombre: 'Agenda Escolar', icono: 'calendar-alt' });
        items.push({ id: 'foro', nombre: 'Foro', icono: 'comments' });
        items.push({ id: 'sobre-nosotros', nombre: 'Sobre Nosotros', icono: 'school' });
        items.push({ id: 'contacto', nombre: 'Contacto', icono: 'envelope' });
    } else if (rol === 'profesor') {
        items.push({ id: 'inicio', nombre: 'Inicio', icono: 'home' });
        items.push({ id: 'muestras-artisticas', nombre: 'Muestras Artísticas', icono: 'palette' });
        items.push({ id: 'cultura-deporte', nombre: 'Cultura y Deporte', icono: 'futbol' });
        items.push({ id: 'actividades', nombre: 'Agenda Escolar', icono: 'calendar-alt' });
        items.push({ id: 'foro', nombre: 'Foro', icono: 'comments' });
        items.push({ id: 'sobre-nosotros', nombre: 'Sobre Nosotros', icono: 'school' });
        items.push({ id: 'contacto', nombre: 'Contacto', icono: 'envelope' });
    } else if (rol === 'admin') {
        items.push({ id: 'inicio', nombre: 'Inicio', icono: 'home' });
        items.push({ id: 'muestras-artisticas', nombre: 'Muestras Artísticas', icono: 'palette' });
        items.push({ id: 'cultura-deporte', nombre: 'Cultura y Deporte', icono: 'futbol' });
        items.push({ id: 'actividades', nombre: 'Agenda Escolar', icono: 'calendar-alt' });
        items.push({ id: 'foro', nombre: 'Foro', icono: 'comments' });
        items.push({ id: 'solicitudes', nombre: 'Solicitudes', icono: 'inbox' });
        items.push({ id: 'sobre-nosotros', nombre: 'Sobre Nosotros', icono: 'school' });
        items.push({ id: 'contacto', nombre: 'Contacto', icono: 'envelope' });
    }

    menuPrincipal.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.className = 'nav-link';
        a.setAttribute('data-seccion', item.id);
        a.innerHTML = `<i class="fas fa-${item.icono}"></i> ${item.nombre}`;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            mostrarSeccion(item.id);
            if (window.innerWidth <= 768) {
                document.getElementById('mainNav').classList.remove('mostrar');
            }
        });
        li.appendChild(a);
        menuPrincipal.appendChild(li);
    });
    
    document.querySelector('[data-seccion="inicio"]')?.classList.add('activo');
}

function mostrarSeccion(idSeccion) {
    secciones.forEach(sec => sec.classList.remove('activo'));
    const seccion = document.getElementById(idSeccion);
    if (seccion) seccion.classList.add('activo');
    
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('activo'));
    const activeLink = document.querySelector(`[data-seccion="${idSeccion}"]`);
    if (activeLink) activeLink.classList.add('activo');

    if (idSeccion === 'inicio') {
        renderizarCarrusel();
        iniciarCarrusel();
        cargarTextosInicio();
    } else {
        detenerCarrusel();
    }
    if (idSeccion === 'actividades') {
        calendarioManager.renderizarCalendario('calendario-actividades');
        calendarioManager.renderizarListaActividades();
        renderizarHorarios();
        inicializarAgendaTabs();
    }
    if (idSeccion === 'foro') renderizarForo();
    if (idSeccion === 'solicitudes') {
        renderizarSolicitudesAprobacion();
        const tabsContainer = document.getElementById('solicitudes');
        const tabs = tabsContainer.querySelectorAll('.tab-btn');
        const panels = tabsContainer.querySelectorAll('.tab-panel');
        tabs.forEach(b => b.classList.remove('activo'));
        panels.forEach(p => p.classList.remove('activo'));
        if (tabs[0]) tabs[0].classList.add('activo');
        if (panels[0]) panels[0].classList.add('activo');
    }
    if (idSeccion === 'cultura-deporte') {
        renderizarCulturaDeporte();
        volverCDPrincipal();
    }
    if (idSeccion === 'muestras-artisticas') {
        renderizarMuestrasArtisticas();
    }
    if (idSeccion === 'sobre-nosotros') cargarSobreNosotros();
    if (idSeccion === 'contacto') cargarContacto();
}

function actualizarUIporRol() {
    const rol = usuarioActual ? usuarioActual.rol : 'invitado';
    
    btnAgregarActividad.style.display = (rol === 'admin' || rol === 'profesor') ? 'inline-block' : 'none';
    btnEditarHorario.style.display = (rol === 'admin' || rol === 'profesor') ? 'inline-block' : 'none';
    
    document.querySelectorAll('.edit-btn').forEach(btn => btn.style.display = (rol === 'admin') ? 'inline-flex' : 'none');
    document.querySelectorAll('.edit-btn-small').forEach(btn => btn.style.display = (rol === 'admin') ? 'inline-flex' : 'none');
    
    const formNuevoMensaje = document.getElementById('form-nuevo-mensaje');
    if (formNuevoMensaje) {
        formNuevoMensaje.style.display = (rol === 'estudiante') ? 'block' : 'none';
    }

    const selectorContainer = document.querySelector('#horarios .selector-grado');
    if (selectorContainer) {
        selectorContainer.style.display = (rol === 'estudiante') ? 'none' : 'block';
    }
}

// ===== FUNCIONES DE RENDERIZADO =====
function cargarTextosInicio() {
    const textos = JSON.parse(localStorage.getItem('inicioTextos')) || {};
    document.getElementById('colegio-nombre').innerText = textos.colegioNombre || 'Colegio CEI';
    document.getElementById('colegio-lema').innerText = textos.colegioLema || 'Educación con valores';
    document.getElementById('eventos-destacados').innerHTML = textos.eventos || '<p>No hay eventos</p>';
    document.getElementById('avisos-lista').innerHTML = textos.avisos || '<li>No hay avisos</li>';
    document.getElementById('calendario-resumen').innerHTML = textos.calendarioResumen || '<p>Calendario no disponible</p>';
}

function cargarSobreNosotros() {
    const sn = JSON.parse(localStorage.getItem('sobreNosotros')) || {};
    document.getElementById('historia').innerText = sn.historia || '';
    document.getElementById('mision').innerText = sn.mision || '';
    document.getElementById('vision').innerText = sn.vision || '';
    document.getElementById('valores').innerText = sn.valores || '';
}

function cargarContacto() {
    const contacto = JSON.parse(localStorage.getItem('contacto')) || {};
    document.getElementById('contacto-telefono').innerText = contacto.telefono || '📞 (011) 1234-5678';
    document.getElementById('contacto-email').innerText = contacto.email || '📧 info@colegio.edu';
    document.getElementById('contacto-direccion').innerText = contacto.direccion || '📍 Av. Siempre Viva 123';
}

// ===== MUESTRAS ARTÍSTICAS =====
function renderizarMuestrasArtisticas() {
    const muestras = JSON.parse(localStorage.getItem('muestrasArtisticas')) || {};
    const container = document.getElementById('catalogo-artistico');
    
    document.querySelector('.catalogo-container').style.display = 'block';
    document.getElementById('galeria-muestras').style.display = 'none';
    
    let html = '';
    for (let key in muestras) {
        const muestra = muestras[key];
        html += `
            <div class="card" 
                 style="background-image: url('${muestra.imagen}')" 
                 onclick="mostrarGaleria('${key}')"
                 aria-label="Ver galería de ${muestra.titulo}">
                <div class="card-desc">${muestra.descripcion || ''}</div>
                <span>${muestra.titulo}</span>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

window.editarCatalogoMuestras = function() {
    if (!usuarioActual || (usuarioActual.rol !== 'admin' && usuarioActual.rol !== 'profesor')) {
        alert('No tienes permisos para esta acción');
        return;
    }
    
    const container = document.getElementById('catalogo-artistico');
    const btnEditar = document.getElementById('btnEditarCatalogo');
    const isEditMode = container.querySelector('.card-edit') !== null;
    
    if (isEditMode) {
        renderizarMuestrasArtisticas();
        btnEditar.innerHTML = '<i class="fas fa-edit"></i> Editar Catálogo';
        btnEditar.title = 'Editar tarjetas del catálogo';
        return;
    }
    
    btnEditar.innerHTML = '<i class="fas fa-eye"></i> Vista Normal';
    btnEditar.title = 'Volver a vista normal';
    
    const muestras = JSON.parse(localStorage.getItem('muestrasArtisticas')) || {};
    
    let html = '';
    let isFirst = true;
    for (let key in muestras) {
        const muestra = muestras[key];
        const clipPath = isFirst ? 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)' : 'polygon(8% 0, 100% 0, 92% 100%, 0% 100%)';
        const marginLeft = isFirst ? '0' : '-40px';
        
        html += `
            <div class="card card-edit" 
                 style="background-image: url('${muestra.imagen}'); clip-path: ${clipPath}; margin-left: ${marginLeft};" 
                 onclick="editarCategoriaCatalogo('${key}')"
                 aria-label="Editar categoría ${muestra.titulo}">
                <div class="card-edit-overlay">
                    <i class="fas fa-edit"></i>
                    <span>Editar</span>
                </div>
                <span>${muestra.titulo}</span>
            </div>
        `;
        isFirst = false;
    }
    
    html += `
        <div class="card card-add" onclick="crearNuevaCategoria()">
            <div class="card-add-content">
                <i class="fas fa-plus"></i>
                <span>Agregar Categoría</span>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    document.getElementById('galeria-muestras').style.display = 'none';
};

window.editarCategoriaCatalogo = function(categoria) {
    const muestras = JSON.parse(localStorage.getItem('muestrasArtisticas')) || {};
    const muestra = muestras[categoria];
    
    if (!muestra) return;
    
    const modalExistente = document.getElementById('modalEditarCategoria');
    if (modalExistente) modalExistente.remove();
    
    const modalHtml = `
        <div id="modalEditarCategoria" class="modal">
            <div class="modal-contenido">
                <div class="modal-header">
                    <h2><i class="fas fa-edit"></i> Editar Categoría</h2>
                    <span class="cerrar" onclick="cerrarModalEditarCategoria()">&times;</span>
                </div>
                
                <form id="formEditarCategoria">
                    <input type="hidden" id="categoria-editar-id" value="${categoria}">
                    
                    <div class="form-group">
                        <label for="categoria-titulo">Título de la Categoría</label>
                        <input type="text" id="categoria-titulo" value="${muestra.titulo.replace(/"/g, '&quot;')}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Imagen de Portada</label>
                        <div class="imagen-opciones">
                            <div class="opcion-imagen">
                                <label for="categoria-imagen-local">
                                    <i class="fas fa-image"></i> Subir desde Local
                                </label>
                                <input type="file" id="categoria-imagen-local" accept="image/*">
                                <div id="preview-categoria-imagen" style="margin-top: 10px;"></div>
                                <small>Sube una imagen desde tu dispositivo</small>
                            </div>
                            <div class="opcion-imagen">
                                <label for="categoria-imagen-url">
                                    <i class="fas fa-link"></i> URL de Imagen
                                </label>
                                <input type="url" id="categoria-imagen-url" placeholder="https://ejemplo.com/imagen.jpg">
                                <small>Pega la URL de una imagen en línea</small>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="categoria-descripcion">Descripción</label>
                        <textarea id="categoria-descripcion" rows="3" placeholder="Describe esta categoría artística...">${muestra.descripcion || ''}</textarea>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn-danger" onclick="eliminarCategoria('${categoria}')">
                            <i class="fas fa-trash"></i> Eliminar Categoría
                        </button>
                        <button type="button" class="btn-secondary" onclick="cerrarModalEditarCategoria()">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                        <button type="submit" class="btn-success">
                            <i class="fas fa-save"></i> Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.getElementById('modalEditarCategoria').style.display = 'flex';
    
    mostrarPreviewImagen('categoria-imagen-local', 'preview-categoria-imagen');
    
    document.getElementById('formEditarCategoria').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fileInput = document.getElementById('categoria-imagen-local');
        const urlInput = document.getElementById('categoria-imagen-url').value;
        
        const guardarCategoria = (imagenUrl) => {
            const nuevasMuestras = JSON.parse(localStorage.getItem('muestrasArtisticas')) || {};
            nuevasMuestras[categoria] = {
                titulo: document.getElementById('categoria-titulo').value,
                imagen: imagenUrl || muestra.imagen,
                descripcion: document.getElementById('categoria-descripcion').value,
                galeria: muestra.galeria || []
            };
            
            localStorage.setItem('muestrasArtisticas', JSON.stringify(nuevasMuestras));
            cerrarModalEditarCategoria();
            renderizarMuestrasArtisticas();
            alert('Categoría actualizada exitosamente');
        };
        
        if (fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            if (file.size > 20 * 1024 * 1024) {
                alert('La imagen es demasiado grande. Usa una imagen más pequeña (máx 20MB)');
                return;
            }
            comprimirImagen(file, 1, (imagenComprimida) => {
                if (imagenComprimida) {
                    guardarCategoria(imagenComprimida);
                } else {
                    alert('Error al procesar la imagen');
                }
            });
        } else if (urlInput) {
            guardarCategoria(urlInput);
        } else {
            guardarCategoria(null);
        }
    });
};

window.crearNuevaCategoria = function() {
    const categoriaId = prompt('Ingresa el ID de la nueva categoría (ej: "danza", "teatro"):');
    if (!categoriaId) return;
    
    const muestras = JSON.parse(localStorage.getItem('muestrasArtisticas')) || {};
    
    if (muestras[categoriaId]) {
        alert('Esta categoría ya existe');
        return;
    }
    
    muestras[categoriaId] = {
        titulo: categoriaId.charAt(0).toUpperCase() + categoriaId.slice(1),
        imagen: 'https://via.placeholder.com/300x200?text=Nueva+Categoría',
        descripcion: 'Descripción de la nueva categoría',
        galeria: []
    };
    
    localStorage.setItem('muestrasArtisticas', JSON.stringify(muestras));
    editarCatalogoMuestras();
};

window.eliminarCategoria = function(categoria) {
    if (!confirm(`¿Estás seguro de eliminar la categoría "${categoria}"? Se perderán todas las imágenes.`)) return;
    
    const muestras = JSON.parse(localStorage.getItem('muestrasArtisticas')) || {};
    delete muestras[categoria];
    localStorage.setItem('muestrasArtisticas', JSON.stringify(muestras));
    
    cerrarModalEditarCategoria();
    renderizarMuestrasArtisticas();
};

window.cerrarModalEditarCategoria = function() {
    const modal = document.getElementById('modalEditarCategoria');
    if (modal) {
        modal.remove();
    }
    renderizarMuestrasArtisticas();
    const btnEditar = document.getElementById('btnEditarCatalogo');
    if (btnEditar) {
        btnEditar.innerHTML = '<i class="fas fa-edit"></i> Editar Catálogo';
        btnEditar.title = 'Editar tarjetas del catálogo';
    }
};

window.mostrarGaleria = function(categoria) {
    const muestras = JSON.parse(localStorage.getItem('muestrasArtisticas')) || {};
    const muestra = muestras[categoria];
    
    if (!muestra) {
        alert('Categoría no encontrada');
        return;
    }
    
    document.getElementById('titulo-galeria').textContent = muestra.titulo;
    
    const galeriaContainer = document.getElementById('galeria-imagenes');
    galeriaContainer.innerHTML = '';
    
    if (muestra.galeria && muestra.galeria.length > 0) {
        muestra.galeria.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'galeria-item';
            
            const imagen = document.createElement('img');
            imagen.src = img.url;
            imagen.alt = `${muestra.titulo} - ${img.descripcion || `Imagen ${index + 1}`}`;
            imagen.loading = 'lazy';
            
            const descripcion = document.createElement('div');
            descripcion.className = 'galeria-descripcion';
            descripcion.textContent = img.descripcion || `Imagen ${index + 1}`;
            
            if (usuarioActual && (usuarioActual.rol === 'admin' || usuarioActual.rol === 'profesor')) {
                const accionesContainer = document.createElement('div');
                accionesContainer.className = 'galeria-acciones';
                
                const editarBtn = document.createElement('button');
                editarBtn.className = 'btn-accion editar';
                editarBtn.innerHTML = '<i class="fas fa-edit"></i>';
                editarBtn.title = 'Editar descripción';
                editarBtn.type = 'button';
                editarBtn.style.cursor = 'pointer';
                editarBtn.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    abrirModalEditarImagen(categoria, index);
                    return false;
                };
                
                const eliminarBtn = document.createElement('button');
                eliminarBtn.className = 'btn-accion eliminar';
                eliminarBtn.innerHTML = '<i class="fas fa-trash"></i>';
                eliminarBtn.title = 'Eliminar imagen';
                eliminarBtn.type = 'button';
                eliminarBtn.style.cursor = 'pointer';
                eliminarBtn.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    eliminarImagenGaleria(categoria, index);
                    return false;
                };
                
                accionesContainer.appendChild(editarBtn);
                accionesContainer.appendChild(eliminarBtn);
                item.appendChild(accionesContainer);
            }
            
            item.appendChild(imagen);
            item.appendChild(descripcion);
            item.onclick = () => abrirModalImagen(img.url, img.descripcion || `Imagen ${index + 1}`, muestra.galeria, index);
            
            galeriaContainer.appendChild(item);
        });
    }
    
    if (usuarioActual && (usuarioActual.rol === 'admin' || usuarioActual.rol === 'profesor')) {
        const addButton = document.createElement('div');
        addButton.className = 'galeria-item add-item';
        addButton.innerHTML = `
            <div class="add-content">
                <i class="fas fa-plus"></i>
                <span>Agregar Imagen</span>
            </div>
        `;
        addButton.onclick = () => abrirModalAgregarImagen(categoria);
        galeriaContainer.appendChild(addButton);
    }
    
    document.querySelector('.catalogo-container').style.display = 'none';
    document.getElementById('galeria-muestras').style.display = 'block';
};

window.volverCatalogo = function() {
    document.querySelector('.catalogo-container').style.display = 'block';
    document.getElementById('galeria-muestras').style.display = 'none';
    renderizarMuestrasArtisticas();
};

window.abrirModalAgregarImagen = function(categoria) {
    if (!usuarioActual || (usuarioActual.rol !== 'admin' && usuarioActual.rol !== 'profesor')) {
        alert('No tienes permisos para esta acción');
        return;
    }
    
    document.getElementById('formAgregarImagen').reset();
    document.getElementById('preview-imagen-file').innerHTML = '';
    document.getElementById('categoria-imagen').value = categoria;
    document.getElementById('modalAgregarImagen').style.display = 'flex';
};

let galeriaNavActual = { imagenes: [], indice: 0 };

window.abrirModalImagen = function(url, descripcion, imagenes, indice) {
    const modal = document.getElementById('modalImagen');
    const imagen = document.getElementById('imagenAmpliada');
    const descripcionEl = document.getElementById('imagen-descripcion');
    const contador = document.getElementById('imagen-contador');

    if (imagenes && imagenes.length) {
        galeriaNavActual.imagenes = imagenes;
        galeriaNavActual.indice = indice ?? 0;
    } else {
        galeriaNavActual.imagenes = [{ url, descripcion }];
        galeriaNavActual.indice = 0;
    }

    const actual = galeriaNavActual.imagenes[galeriaNavActual.indice];
    imagen.src = actual.url;
    descripcionEl.textContent = actual.descripcion || '';

    if (galeriaNavActual.imagenes.length > 1) {
        contador.textContent = `${galeriaNavActual.indice + 1} / ${galeriaNavActual.imagenes.length}`;
        contador.style.display = 'flex';
    } else {
        contador.style.display = 'none';
    }

    const prev = document.querySelector('.img-nav-prev');
    const next = document.querySelector('.img-nav-next');
    if (prev) prev.style.display = galeriaNavActual.imagenes.length > 1 ? 'flex' : 'none';
    if (next) next.style.display = galeriaNavActual.imagenes.length > 1 ? 'flex' : 'none';

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.navegarImagen = function(dir) {
    const total = galeriaNavActual.imagenes.length;
    if (total <= 1) return;
    galeriaNavActual.indice = (galeriaNavActual.indice + dir + total) % total;
    const actual = galeriaNavActual.imagenes[galeriaNavActual.indice];
    const imagen = document.getElementById('imagenAmpliada');
    const descripcionEl = document.getElementById('imagen-descripcion');
    const contador = document.getElementById('imagen-contador');

    imagen.style.opacity = '0';
    setTimeout(() => {
        imagen.src = actual.url;
        descripcionEl.textContent = actual.descripcion || '';
        contador.textContent = `${galeriaNavActual.indice + 1} / ${total}`;
        imagen.style.opacity = '1';
    }, 150);
};

window.cerrarModalImagen = function() {
    document.getElementById('modalImagen').style.display = 'none';
    document.body.style.overflow = 'auto';
};

window.abrirModalEditarImagen = function(categoria, index) {
    if (!usuarioActual || (usuarioActual.rol !== 'admin' && usuarioActual.rol !== 'profesor')) {
        alert('No tienes permisos para esta acción');
        return;
    }
    
    const muestras = JSON.parse(localStorage.getItem('muestrasArtisticas')) || {};
    const imagen = muestras[categoria].galeria[index];
    
    document.getElementById('categoria-editar').value = categoria;
    document.getElementById('index-editar').value = index;
    document.getElementById('descripcion-editar').value = imagen.descripcion || '';
    
    document.getElementById('imagen-editar-local').value = '';
    document.getElementById('imagen-editar-url').value = '';
    document.getElementById('preview-imagen-editar-local').innerHTML = '';
    
    document.getElementById('modalEditarImagen').style.display = 'flex';
};

window.eliminarImagenGaleria = function(categoria, index) {
    if (!usuarioActual || (usuarioActual.rol !== 'admin' && usuarioActual.rol !== 'profesor')) {
        alert('No tienes permisos para esta acción');
        return;
    }
    
    if (confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
        const muestras = JSON.parse(localStorage.getItem('muestrasArtisticas')) || {};
        if (muestras[categoria] && muestras[categoria].galeria[index]) {
            muestras[categoria].galeria.splice(index, 1);
            localStorage.setItem('muestrasArtisticas', JSON.stringify(muestras));
            mostrarGaleria(categoria);
            alert('Imagen eliminada exitosamente');
        }
    }
};

document.getElementById('formEditarImagen').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const categoria = document.getElementById('categoria-editar').value;
    const index = parseInt(document.getElementById('index-editar').value);
    const nuevaDescripcion = document.getElementById('descripcion-editar').value;
    const fileInput = document.getElementById('imagen-editar-local');
    const urlInput = document.getElementById('imagen-editar-url').value;
    
    const muestras = JSON.parse(localStorage.getItem('muestrasArtisticas')) || {};
    if (muestras[categoria] && muestras[categoria].galeria[index]) {
        const actualizarImagen = (nuevaUrl) => {
            if (nuevaUrl) {
                muestras[categoria].galeria[index].url = nuevaUrl;
            }
            muestras[categoria].galeria[index].descripcion = nuevaDescripcion;
            
            localStorage.setItem('muestrasArtisticas', JSON.stringify(muestras));
            document.getElementById('modalEditarImagen').style.display = 'none';
            mostrarGaleria(categoria);
            alert('Imagen actualizada exitosamente');
        };
        
        if (fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            if (file.size > 20 * 1024 * 1024) {
                alert('La imagen es demasiado grande. Usa una imagen más pequeña (máx 20MB)');
                return;
            }
            comprimirImagen(file, 1, (imagenComprimida) => {
                if (imagenComprimida) {
                    actualizarImagen(imagenComprimida);
                } else {
                    alert('Error al procesar la imagen');
                }
            });
        } else if (urlInput) {
            actualizarImagen(urlInput);
        } else {
            actualizarImagen(null);
        }
    }
});

document.getElementById('cerrarModalAgregarImagen').addEventListener('click', () => {
    document.getElementById('modalAgregarImagen').style.display = 'none';
});

document.getElementById('formAgregarImagen').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const categoria = document.getElementById('categoria-imagen').value;
    const fileInput = document.getElementById('imagen-file');
    const descripcion = document.getElementById('imagen-descripcion-input').value;
    
    if (!categoria) {
        alert('Error: no se pudo determinar la categoría. Cierra y vuelve a abrir el editor.');
        return;
    }
    
    if (!fileInput.files || !fileInput.files[0]) {
        alert('Por favor selecciona una imagen');
        return;
    }
    
    const file = fileInput.files[0];
    
    if (file.size > 20 * 1024 * 1024) {
        alert('La imagen es demasiado grande (máx 20MB). Por favor usa una imagen más pequeña o una URL en su lugar.');
        return;
    }
    
    comprimirImagen(file, 1, (imagenComprimida) => {
        if (!imagenComprimida) {
            alert('Error al procesar la imagen');
            return;
        }
        
        try {
            const muestras = JSON.parse(localStorage.getItem('muestrasArtisticas')) || {};
            if (!muestras[categoria]) {
                alert('Error: categoría no encontrada.');
                return;
            }
            
            const nuevoDato = JSON.stringify({ url: imagenComprimida, descripcion: descripcion });
            if (!verificarStorageAntesDeGuardar(nuevoDato, "imagen")) {
                return;
            }
            
            muestras[categoria].galeria.push({
                url: imagenComprimida,
                descripcion: descripcion
            });
            
            localStorage.setItem('muestrasArtisticas', JSON.stringify(muestras));
            
            document.getElementById('modalAgregarImagen').style.display = 'none';
            document.getElementById('formAgregarImagen').reset();
            document.getElementById('preview-imagen-file').innerHTML = '';
            mostrarGaleria(categoria);
            alert('Imagen agregada exitosamente');
            
            mostrarAdvertenciaStorage();
        } catch (err) {
            if (err.name === 'QuotaExceededError') {
                alert('❌ No hay suficiente espacio en el almacenamiento. Elimina algunas imágenes existentes o usa URLs en lugar de imágenes locales.');
            } else {
                alert('Error inesperado: ' + err.message);
            }
        }
    });
});

// ===== CULTURA Y DEPORTE =====
function renderizarCulturaDeporte() {
    const data = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
    const container = document.getElementById('cultura-deporte-container');

    if (!data.cultura || !data.deporte) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Cargando...</p>';
        return;
    }

    // Encabezado con botón editar (solo admin)
    const btnEditar = (usuarioActual && usuarioActual.rol === 'admin')
        ? `<span class="edit-btn" id="btnEditarCD" onclick="editarModoCD()" title="Editar catálogo" style="display:inline-flex;">
               <i class="fas fa-edit"></i>
           </span>`
        : '';

    // Catálogo tipo muestras artísticas
    const tipos = Object.keys(data);
    let cards = '';
    tipos.forEach((tipo, i) => {
        const cat = data[tipo];
        const isFirst = i === 0;
        const isLast = i === tipos.length - 1;
        const clip = isFirst
            ? 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)'
            : isLast
                ? 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)'
                : 'polygon(8% 0, 100% 0, 92% 100%, 0% 100%)';
        const ml = isFirst ? '0' : '-50px';
        cards += `
            <div class="card cd-card"
                 style="background-image: url('${cat.imagen || ''}'); clip-path: ${clip}; margin-left: ${ml};"
                 onclick="mostrarSubcategorias('${tipo}')"
                 aria-label="Ver ${cat.titulo}">
                <span>${cat.titulo || tipo}</span>
            </div>`;
    });

    container.innerHTML = `
        <div class="cd-header-bar">
            ${btnEditar}
        </div>
        <div class="catalogo cd-catalogo">
            ${cards}
        </div>`;
}

window.editarModoCD = function() {
    if (!usuarioActual || usuarioActual.rol !== 'admin') {
        alert('No tienes permisos');
        return;
    }

    const container = document.getElementById('cultura-deporte-container');
    const isEditMode = container.querySelector('.card-edit') !== null;

    if (isEditMode) {
        renderizarCulturaDeporte();
        return;
    }

    const data = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
    if (!data.cultura || !data.deporte) {
        alert('Datos no disponibles');
        return;
    }

    const btnEditar = document.getElementById('btnEditarCD');
    if (btnEditar) {
        btnEditar.innerHTML = '<i class="fas fa-eye"></i>';
        btnEditar.title = 'Vista normal';
    }

    const tipos = Object.keys(data);
    let cards = '';
    tipos.forEach((tipo, i) => {
        const cat = data[tipo];
        const isFirst = i === 0;
        const isLast = i === tipos.length - 1;
        const clip = isFirst
            ? 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)'
            : isLast
                ? 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)'
                : 'polygon(8% 0, 100% 0, 92% 100%, 0% 100%)';
        const ml = isFirst ? '0' : '-50px';
        const esc = tipo.replace(/'/g, "\'");
        cards += `
            <div class="card card-edit cd-card"
                 style="background-image: url('${cat.imagen || ''}'); clip-path: ${clip}; margin-left: ${ml};"
                 onclick="abrirEditorCD('${esc}')"
                 aria-label="Editar ${cat.titulo}">
                <div class="card-edit-overlay">
                    <i class="fas fa-edit"></i>
                    <span>Editar</span>
                </div>
                <span>${cat.titulo || tipo}</span>
            </div>`;
    });

    // Catálogo reutiliza el mismo wrapper
    const catalogoEl = container.querySelector('.cd-catalogo');
    if (catalogoEl) {
        catalogoEl.innerHTML = cards;
    }
};

window.abrirEditorCD = function(tipo) {
    const data = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
    const cat = data[tipo];
    
    if (!cat || !cat.subcategorias) {
        alert('Los datos de ' + tipo + ' no están disponibles');
        return;
    }
    
    let subHtml = '';
    for (let key in cat.subcategorias) {
        const sub = cat.subcategorias[key];
        const escapedTipo = tipo.replace(/'/g, "\\'");
        const escapedKey = key.replace(/'/g, "\\'");
        subHtml += `
            <div style="padding: 1rem; border: 1px solid #eee; border-radius: 8px; margin-bottom: 1rem;">
                <h4>${sub.titulo}</h4>
                <button class="btn-warning btn-small" onclick="abrirEditorSubCD('${escapedTipo}', '${escapedKey}')"><i class="fas fa-edit"></i> Editar</button>
            </div>
        `;
    }
    
    const modalExistente = document.getElementById('modalEditorCD');
    if (modalExistente) modalExistente.remove();
    
    const modal = `
        <div id="modalEditorCD" class="modal">
            <div class="modal-contenido">
                <div class="modal-header">
                    <h2>Editar ${tipo === 'cultura' ? 'Cultura' : 'Deporte'}</h2>
                    <span class="cerrar" onclick="document.getElementById('modalEditorCD').remove()">&times;</span>
                </div>
                <form id="formEditorCD">
                    <input type="hidden" value="${tipo}" id="tipoCD">
                    
                    <div class="form-group">
                        <label>Título</label>
                        <input type="text" id="tituloCDEdit">
                    </div>
                    
                    <div class="form-group">
                        <label>Descripción</label>
                        <textarea id="descCDEdit" rows="2"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Imagen Principal</label>
                        <div style="display: flex; gap: 1rem; flex-direction: column;">
                            <input type="file" id="imagenCDFile" accept="image/*">
                            <input type="url" id="imagenCDUrl" placeholder="O URL...">
                        </div>
                    </div>
                    
                    <h3 style="margin-top: 2rem;">Subcategorías</h3>
                    <div id="listaSubCD">${subHtml}</div>
                    
                    <div class="modal-actions">
                        <button type="submit" class="btn-success"><i class="fas fa-save"></i> Guardar</button>
                        <button type="button" class="btn-secondary" onclick="document.getElementById('modalEditorCD').remove()"><i class="fas fa-times"></i> Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    document.getElementById('modalEditorCD').style.display = 'flex';
    
    document.getElementById('tituloCDEdit').value = cat.titulo || '';
    document.getElementById('descCDEdit').value = cat.descripcion || '';
    
    document.getElementById('formEditorCD').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fileInput = document.getElementById('imagenCDFile');
        const urlInput = document.getElementById('imagenCDUrl').value;
        
        const guardarCD = (img) => {
            const dataActual = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
            const t = document.getElementById('tipoCD').value;
            dataActual[t].titulo = document.getElementById('tituloCDEdit').value;
            dataActual[t].descripcion = document.getElementById('descCDEdit').value;
            if (img) dataActual[t].imagen = img;
            
            localStorage.setItem('culturaDeporte', JSON.stringify(dataActual));
            document.getElementById('modalEditorCD').remove();
            renderizarCulturaDeporte();
            alert('Cambios guardados exitosamente');
        };
        
        if (fileInput.files[0]) {
            const file = fileInput.files[0];
            comprimirImagen(file, 1, (imagenComprimida) => {
                guardarCD(imagenComprimida);
            });
        } else if (urlInput) {
            guardarCD(urlInput);
        } else {
            guardarCD(null);
        }
    });
};

window.abrirEditorSubCD = function(tipo, key) {
    const data = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
    
    if (!data[tipo] || !data[tipo].subcategorias || !data[tipo].subcategorias[key]) {
        alert('Los datos de la subcategoría no están disponibles');
        return;
    }
    
    const sub = data[tipo].subcategorias[key];
    
    let galHtml = '';
    if (sub.galeria) {
        sub.galeria.forEach((img, i) => {
            const escapedTipo = tipo.replace(/'/g, "\\'");
            const escapedKey = key.replace(/'/g, "\\'");
            galHtml += `
                <div style="position: relative; border-radius: 8px; overflow: hidden; aspect-ratio: 1; border: 1px solid #ddd;">
                    <img src="${img.url}" style="width: 100%; height: 100%; object-fit: cover;">
                    <button type="button" class="btn-warning btn-small" onclick="editarImagenCD('${escapedTipo}', '${escapedKey}', ${i})" style="position: absolute; top: 5px; right: 5px;">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button type="button" class="btn-danger btn-small" onclick="eliminarImagenCD('${escapedTipo}', '${escapedKey}', ${i})" style="position: absolute; top: 5px; right: 40px;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
    }
    
    const escapedTipo = tipo.replace(/'/g, "\\'");
    const escapedKey = key.replace(/'/g, "\\'");
    galHtml += `
        <div style="border: 2px dashed #ccc; border-radius: 8px; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; cursor: pointer;" onclick="abrirAgregarImagenCD('${escapedTipo}', '${escapedKey}')">
            <button type="button" style="background: none; border: none; color: #666; font-size: 2rem; cursor: pointer; pointer-events: none;">
                <i class="fas fa-plus"></i>
            </button>
        </div>
    `;
    
    const modalExistente = document.getElementById('modalSubCD');
    if (modalExistente) modalExistente.remove();
    
    const modal = `
        <div id="modalSubCD" class="modal">
            <div class="modal-contenido">
                <div class="modal-header">
                    <h2>Editar ${sub.titulo}</h2>
                    <span class="cerrar" onclick="document.getElementById('modalSubCD').remove()">&times;</span>
                </div>
                <form id="formSubCD">
                    <input type="hidden" value="${tipo}" id="tipoSubCD">
                    <input type="hidden" value="${key}" id="keySubCD">
                    
                    <div class="form-group">
                        <label>Título</label>
                        <input type="text" id="tituloSubCD">
                    </div>
                    
                    <div class="form-group">
                        <label>Información</label>
                        <textarea id="infoSubCD" rows="3"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Imagen Principal</label>
                        <div style="display: flex; gap: 1rem; flex-direction: column;">
                            <input type="file" id="imagenSubFile" accept="image/*">
                            <input type="url" id="imagenSubUrl" placeholder="O URL...">
                        </div>
                    </div>
                    
                    <h3 style="margin-top: 2rem;">Galería</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1rem;">
                        ${galHtml}
                    </div>
                    
                    <div class="modal-actions">
                        <button type="submit" class="btn-success"><i class="fas fa-save"></i> Guardar</button>
                        <button type="button" class="btn-secondary" onclick="document.getElementById('modalSubCD').remove()"><i class="fas fa-times"></i> Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    document.getElementById('modalSubCD').style.display = 'flex';
    
    document.getElementById('tituloSubCD').value = sub.titulo || '';
    document.getElementById('infoSubCD').value = sub.informacion || '';
    
    document.getElementById('formSubCD').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fileInput = document.getElementById('imagenSubFile');
        const urlInput = document.getElementById('imagenSubUrl').value;
        
        const guardarSub = (img) => {
            const dataActual = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
            const t = document.getElementById('tipoSubCD').value;
            const k = document.getElementById('keySubCD').value;
            
            dataActual[t].subcategorias[k].titulo = document.getElementById('tituloSubCD').value;
            dataActual[t].subcategorias[k].informacion = document.getElementById('infoSubCD').value;
            if (img) dataActual[t].subcategorias[k].imagen = img;
            
            localStorage.setItem('culturaDeporte', JSON.stringify(dataActual));
            document.getElementById('modalSubCD').remove();
            renderizarCulturaDeporte();
            alert('Subcategoría guardada exitosamente');
        };
        
        if (fileInput.files[0]) {
            const file = fileInput.files[0];
            comprimirImagen(file, 1, (imagenComprimida) => {
                guardarSub(imagenComprimida);
            });
        } else if (urlInput) {
            guardarSub(urlInput);
        } else {
            guardarSub(null);
        }
    });
};

window.editarImagenCD = function(tipo, key, idx) {
    const data = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
    
    if (!data[tipo] || !data[tipo].subcategorias || !data[tipo].subcategorias[key] || 
        !data[tipo].subcategorias[key].galeria || !data[tipo].subcategorias[key].galeria[idx]) {
        alert('Los datos de la imagen no están disponibles');
        return;
    }
    
    const img = data[tipo].subcategorias[key].galeria[idx];
    
    const modalExistente = document.getElementById('modalEditImgCD');
    if (modalExistente) modalExistente.remove();
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'modalEditImgCD';
    
    let html = '<div class="modal-contenido">';
    html += '<div class="modal-header">';
    html += '<h2>Editar Imagen</h2>';
    html += '<span class="cerrar" onclick="document.getElementById(\'modalEditImgCD\').remove()">&times;</span>';
    html += '</div>';
    html += '<form id="formEditImgCD">';
    html += '<input type="hidden" value="' + tipo + '" id="tipoEditImg">';
    html += '<input type="hidden" value="' + key + '" id="keyEditImg">';
    html += '<input type="hidden" value="' + idx + '" id="idxEditImg">';
    
    html += '<div class="form-group">';
    html += '<label>Imagen</label>';
    html += '<div style="display: flex; gap: 1rem; flex-direction: column;">';
    html += '<input type="file" id="fileEditImg" accept="image/*">';
    html += '<div id="preview-fileEditImg" style="margin-top: 10px;"></div>';
    html += '<input type="url" id="urlEditImg" placeholder="O ingresa URL de imagen...">';
    html += '</div>';
    html += '</div>';
    
    html += '<div class="form-group">';
    html += '<label>Descripción (texto debajo de la imagen)</label>';
    html += '<textarea id="descEditImg" rows="3" placeholder="Describe esta imagen..."></textarea>';
    html += '</div>';
    
    html += '<div class="modal-actions">';
    html += '<button type="submit" class="btn-success"><i class="fas fa-save"></i> Guardar</button>';
    html += '<button type="button" class="btn-secondary" onclick="document.getElementById(\'modalEditImgCD\').remove()"><i class="fas fa-times"></i> Cerrar</button>';
    html += '</div>';
    html += '</form>';
    html += '</div>';
    
    modal.innerHTML = html;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    mostrarPreviewImagen('fileEditImg', 'preview-fileEditImg');
    
    document.getElementById('descEditImg').value = img.descripcion || '';
    
    document.getElementById('formEditImgCD').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fileInput = document.getElementById('fileEditImg');
        const urlInput = document.getElementById('urlEditImg').value.trim();
        const desc = document.getElementById('descEditImg').value.trim();
        
        const guardarImg = function(url) {
            try {
                const dataActual = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
                const t = document.getElementById('tipoEditImg').value;
                const k = document.getElementById('keyEditImg').value;
                const i = parseInt(document.getElementById('idxEditImg').value);
                
                if (url) {
                    dataActual[t].subcategorias[k].galeria[i].url = url;
                }
                dataActual[t].subcategorias[k].galeria[i].descripcion = desc;
                
                localStorage.setItem('culturaDeporte', JSON.stringify(dataActual));
                
                if (document.getElementById('modalEditImgCD')) {
                    document.getElementById('modalEditImgCD').remove();
                }
                mostrarGaleriaCD(t, k);
                alert('Imagen actualizada correctamente');
            } catch (error) {
                console.error('Error al guardar:', error);
                alert('Error al guardar: ' + error.message);
            }
        };
        
        if (fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            comprimirImagen(file, 1, (imagenComprimida) => {
                guardarImg(imagenComprimida);
            });
        } else if (urlInput) {
            guardarImg(urlInput);
        } else {
            guardarImg(null);
        }
    });
};

window.abrirAgregarImagenCD = function(tipo, key) {
    const modalExistente = document.getElementById('modalAgrImgCD');
    if (modalExistente) modalExistente.remove();
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'modalAgrImgCD';
    
    let html = '<div class="modal-contenido">';
    html += '<div class="modal-header">';
    html += '<h2>Agregar Nueva Imagen</h2>';
    html += '<span class="cerrar" onclick="document.getElementById(\'modalAgrImgCD\').remove()">&times;</span>';
    html += '</div>';
    html += '<form id="formAgrImgCD">';
    html += '<input type="hidden" value="' + tipo + '" id="tipoAgrImg">';
    html += '<input type="hidden" value="' + key + '" id="keyAgrImg">';
    
    html += '<div class="form-group">';
    html += '<label>Imagen</label>';
    html += '<div style="display: flex; gap: 1rem; flex-direction: column;">';
    html += '<input type="file" id="fileAgrImg" accept="image/*">';
    html += '<div id="preview-fileAgrImg" style="margin-top: 10px;"></div>';
    html += '<small>O pega una URL aquí:</small>';
    html += '<input type="url" id="urlAgrImg" placeholder="https://ejemplo.com/imagen.jpg">';
    html += '</div>';
    html += '</div>';
    
    html += '<div class="form-group">';
    html += '<label>Descripción (texto debajo de la imagen)</label>';
    html += '<textarea id="descAgrImg" rows="3" placeholder="Describe esta imagen..."></textarea>';
    html += '</div>';
    
    html += '<div class="modal-actions">';
    html += '<button type="submit" class="btn-success"><i class="fas fa-plus"></i> Agregar</button>';
    html += '<button type="button" class="btn-secondary" onclick="document.getElementById(\'modalAgrImgCD\').remove()"><i class="fas fa-times"></i> Cerrar</button>';
    html += '</div>';
    html += '</form>';
    html += '</div>';
    
    modal.innerHTML = html;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    mostrarPreviewImagen('fileAgrImg', 'preview-fileAgrImg');
    
    document.getElementById('formAgrImgCD').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fileInput = document.getElementById('fileAgrImg');
        const urlInput = document.getElementById('urlAgrImg').value.trim();
        const desc = document.getElementById('descAgrImg').value.trim();
        
        const guardarImg = function(url) {
            try {
                if (!url) {
                    alert('Debes seleccionar una imagen o ingresar una URL');
                    return;
                }
                
                const dataActual = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
                const t = document.getElementById('tipoAgrImg').value;
                const k = document.getElementById('keyAgrImg').value;
                
                if (!dataActual[t] || !dataActual[t].subcategorias || !dataActual[t].subcategorias[k]) {
                    alert('No se pudo encontrar la subcategoría');
                    return;
                }
                
                if (!dataActual[t].subcategorias[k].galeria) {
                    dataActual[t].subcategorias[k].galeria = [];
                }
                
                dataActual[t].subcategorias[k].galeria.push({
                    url: url,
                    descripcion: desc
                });
                
                try {
                    localStorage.setItem('culturaDeporte', JSON.stringify(dataActual));
                } catch (storageErr) {
                    alert('Error: el almacenamiento está lleno. Elimina algunas imágenes o usa URLs en lugar de archivos locales.');
                    return;
                }
                
                if (document.getElementById('modalAgrImgCD')) {
                    document.getElementById('modalAgrImgCD').remove();
                }
                mostrarGaleriaCD(t, k);
                alert('Imagen agregada correctamente');
            } catch (error) {
                console.error('Error al guardar:', error);
                alert('Error al guardar: ' + error.message);
            }
        };
        
        if (fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            if (file.size > 20 * 1024 * 1024) {
                alert('La imagen es demasiado grande (máx 20MB). Usa una imagen más pequeña o una URL.');
                return;
            }
            comprimirImagen(file, 1, (imagenComprimida) => {
                guardarImg(imagenComprimida);
            });
        } else if (urlInput) {
            guardarImg(urlInput);
        } else {
            alert('Debes seleccionar una imagen o ingresar una URL');
        }
    });
};

window.eliminarImagenCD = function(tipo, key, idx) {
    const data = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
    if (!data[tipo] || !data[tipo].subcategorias || !data[tipo].subcategorias[key] || 
        !data[tipo].subcategorias[key].galeria || !data[tipo].subcategorias[key].galeria[idx]) {
        alert('Los datos de la imagen no están disponibles');
        return;
    }
    
    if (confirm('¿Estás seguro de que deseas eliminar esta imagen?')) {
        data[tipo].subcategorias[key].galeria.splice(idx, 1);
        localStorage.setItem('culturaDeporte', JSON.stringify(data));
        mostrarGaleriaCD(tipo, key);
    }
};

window.mostrarSubcategorias = function(tipo) {
    const data = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
    const cat = data[tipo];

    if (!cat || !cat.subcategorias) {
        alert('Los datos de ' + tipo + ' no están disponibles');
        return;
    }

    let subCards = '';
    for (const key in cat.subcategorias) {
        const sub = cat.subcategorias[key];
        const esc = tipo.replace(/'/g, "\'");
        const escKey = key.replace(/'/g, "\'");
        const info = (sub.informacion || '').substring(0, 110);
        subCards += `
            <div class="subcat-card" onclick="mostrarGaleriaCD('${esc}','${escKey}')">
                <div class="subcat-img" style="background-image:url('${sub.imagen || ''}')"></div>
                <div class="subcat-body">
                    <h4>${sub.titulo}</h4>
                    <p>${info}${(sub.informacion || '').length > 110 ? '…' : ''}</p>
                </div>
            </div>`;
    }

    const html = `
        <div class="galeria-header">
            <button class="btn-back" onclick="volverCDPrincipal()">
                <i class="fas fa-arrow-left"></i> Volver
            </button>
            <div>
                <h3 style="margin:0;">${cat.titulo}</h3>
                <p style="margin:0.3rem 0 0;color:var(--gray-dark);font-size:0.95rem;">${cat.descripcion || ''}</p>
            </div>
        </div>
        <div class="subcat-grid">${subCards}</div>`;

    document.getElementById('categoria-detalle-container').innerHTML = html;
    document.getElementById('cultura-deporte-container').style.display = 'none';
    document.getElementById('categoria-detalle-container').style.display = 'block';
    document.getElementById('subcategoria-detalle-container').style.display = 'none';
};

window.mostrarGaleriaCD = function(tipo, key) {
    try {
        const data = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
        
        if (!data[tipo] || !data[tipo].subcategorias || !data[tipo].subcategorias[key]) {
            alert('Los datos de la galería no están disponibles');
            return;
        }
        
        const sub = data[tipo].subcategorias[key];
        
        let html = '<div style="margin-bottom: 2rem;">';
        html += '<button class="btn-back" onclick="mostrarSubcategorias(\'' + tipo + '\')" style="padding: 0.5rem 1rem; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer;"><i class="fas fa-arrow-left"></i> Volver</button>';
        html += '<h2 style="margin-top: 1rem;">' + sub.titulo + '</h2>';
        html += '</div>';
        
        // Guardar galería para navegación en modal
        window._cdGaleriaActual = sub.galeria || [];

        if (usuarioActual && (usuarioActual.rol==='admin'||usuarioActual.rol==='profesor')) {
            html += '<div style="margin-bottom:1rem;">';
            html += '<button type="button" class="btn-primary" onclick="abrirAgregarImagenCD(\'' + tipo + '\',\'' + key + '\')"><i class="fas fa-plus"></i> Agregar Imagen</button>';
            html += '</div>';
        }

        html += '<div class="galeria-grid">';
        
        if (sub.galeria && sub.galeria.length > 0) {
            sub.galeria.forEach(function(img, idx) {
                const escUrl = img.url.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
                const escDesc = (img.descripcion||'').replace(/'/g,"\\'");
                html += '<div class="galeria-item" style="position:relative;">';
                html += '<img src="' + img.url + '" alt="' + (img.descripcion||'Imagen') + '" style="width:100%;height:100%;object-fit:cover;display:block;cursor:pointer;" onclick="abrirModalImagen(\'' + escUrl + '\',\'' + escDesc + '\',window._cdGaleriaActual,' + idx + ')">';
                html += '<div class="galeria-descripcion">' + (img.descripcion||'') + '</div>';
                if (usuarioActual && (usuarioActual.rol==='admin'||usuarioActual.rol==='profesor')) {
                    html += '<div class="galeria-acciones">';
                    html += '<button type="button" class="btn-accion editar" onclick="editarImagenCD(\'' + tipo + '\',\'' + key + '\',' + idx + ')" title="Editar"><i class="fas fa-edit"></i></button>';
                    html += '<button type="button" class="btn-accion eliminar" onclick="eliminarImagenCD(\'' + tipo + '\',\'' + key + '\',' + idx + ')" title="Eliminar"><i class="fas fa-trash"></i></button>';
                    html += '</div>';
                }
                html += '</div>';
            });
        } else {
            html += '<p style="grid-column:1/-1;text-align:center;color:#999;">Sin imágenes disponibles</p>';
        }
        
        html += '</div>';
        
        const galeryContainer = document.getElementById('subcategoria-detalle-container');
        if (galeryContainer) {
            galeryContainer.innerHTML = html;
            galeryContainer.style.display = 'block';
        }
        document.getElementById('categoria-detalle-container').style.display = 'none';
    } catch (e) {
        console.error('Error en mostrarGaleriaCD:', e);
    }
};

window.volverCDPrincipal = function() {
    document.getElementById('cultura-deporte-container').style.display = '';
    document.getElementById('categoria-detalle-container').style.display = 'none';
    document.getElementById('subcategoria-detalle-container').style.display = 'none';
    // Restaurar botón editar si estaba en modo edición
    renderizarCulturaDeporte();
};

// ===== HORARIOS =====
function renderizarHorarios() {
    const selectorContainer = document.querySelector('#horarios .selector-grado');
    const select = document.getElementById('selector-grado-horario');

    if (usuarioActual && usuarioActual.rol === 'estudiante') {
        if (selectorContainer) selectorContainer.style.display = 'none';
        const grado = usuarioActual.grado;
        if (!grado) {
            document.getElementById('horarios-tabla-container').innerHTML = '<p class="text-center">No tienes un grado asignado. Contacta al administrador.</p>';
            return;
        }
        const gradosNombres = {
            primero: 'Primero', segundo: 'Segundo', tercero: 'Tercero',
            cuarto: 'Cuarto', quinto: 'Quinto', sexto: 'Sexto',
            septimo: 'Séptimo', octavo: 'Octavo', noveno: 'Noveno',
            decimo: 'Décimo', once: 'Once'
        };
        const container = document.getElementById('horarios-tabla-container');
        container.innerHTML = `<p style="margin-bottom:1rem; font-weight:600; color:var(--primary);"><i class="fas fa-graduation-cap"></i> Tu horario — Grado: ${gradosNombres[grado] || grado}</p>`;
        gestorHorarios.renderizarHorario(grado, 'horarios-tabla-container');
    } else {
        if (selectorContainer) selectorContainer.style.display = 'block';
        const grado = select.value;
        if (!grado) {
            document.getElementById('horarios-tabla-container').innerHTML = '<p class="text-center">Seleccione un grado para ver el horario.</p>';
            return;
        }
        gestorHorarios.renderizarHorario(grado, 'horarios-tabla-container');
    }
}

// ===== FORO =====
let foroFiltro = '';

function renderizarForo(mensajesFiltrados) {
    const mensajes = mensajesFiltrados || (JSON.parse(localStorage.getItem('foroMensajes')) || []);
    const container = document.getElementById('foro-mensajes');
    container.innerHTML = '';

    if (mensajes.length === 0) {
        container.innerHTML = foroFiltro
            ? `<div class="foro-sin-resultados"><i class="fas fa-search"></i><p>No se encontraron mensajes para "<strong>${foroFiltro}</strong>"</p></div>`
            : '<p class="text-center">No hay mensajes en el foro.</p>';
        return;
    }

    [...mensajes].sort((a,b) => new Date(b.fecha) - new Date(a.fecha)).forEach(m => {
        const div = document.createElement('div');
        div.className = 'mensaje';

        const resaltar = (texto) => {
            if (!foroFiltro) return texto;
            const re = new RegExp(`(${foroFiltro.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi');
            return texto.replace(re, '<mark class="highlight-match">$1</mark>');
        };

        const esMio = usuarioActual && m.id_usuario === usuarioActual.id;
        const puedeEliminar = usuarioActual && (esMio || usuarioActual.rol === 'admin');

        div.innerHTML = `
            <div class="mensaje-header">
                <span><i class="fas fa-user-circle"></i> ${m.autor}${esMio ? ' <em style="font-size:0.75rem;opacity:0.7;">(tú)</em>' : ''}</span>
                <div style="display:flex;align-items:center;gap:0.75rem;">
                    <span><i class="far fa-calendar-alt"></i> ${new Date(m.fecha).toLocaleDateString()}</span>
                    ${puedeEliminar ? `<button class="btn-eliminar-mensaje" onclick="eliminarMensajeForo(${m.id})" title="Eliminar mensaje"><i class="fas fa-trash"></i> Eliminar</button>` : ''}
                </div>
            </div>
            <div class="mensaje-contenido">
                <strong>${resaltar(m.titulo)}</strong>
                <p>${resaltar(m.contenido)}</p>
            </div>
            <div class="mensaje-comentarios" id="comentarios-${m.id}">
                ${m.comentarios ? m.comentarios.map(c => `
                    <div class="comentario">
                        <strong>${c.autor}:</strong> ${resaltar(c.contenido)} <em>(${new Date(c.fecha).toLocaleDateString()})</em>
                    </div>
                `).join('') : ''}
            </div>
            ${usuarioActual ? `
                <button class="btn-primary btn-small" onclick="agregarComentario(${m.id})" style="margin-top:0.75rem;">
                    <i class="fas fa-comment"></i> Comentar
                </button>
            ` : ''}
        `;
        container.appendChild(div);
    });
}

window.eliminarMensajeForo = function(idMensaje) {
    if (!usuarioActual) return;
    if (!confirm('¿Eliminar este mensaje? Esta acción no se puede deshacer.')) return;

    let mensajes = JSON.parse(localStorage.getItem('foroMensajes')) || [];
    const mensaje = mensajes.find(m => m.id === idMensaje);
    if (!mensaje) return;

    if (mensaje.id_usuario !== usuarioActual.id && usuarioActual.rol !== 'admin') {
        mostrarToast('No tienes permisos para eliminar este mensaje.', 'error');
        return;
    }

    mensajes = mensajes.filter(m => m.id !== idMensaje);
    localStorage.setItem('foroMensajes', JSON.stringify(mensajes));
    renderizarForo();
    mostrarToast('Mensaje eliminado correctamente.', 'success');
};

window.filtrarForo = function(texto) {
    foroFiltro = texto.trim();
    const clearBtn = document.getElementById('foroBuscadorClear');
    if (clearBtn) clearBtn.style.display = foroFiltro ? 'flex' : 'none';

    if (!foroFiltro) {
        renderizarForo();
        return;
    }
    const todos = JSON.parse(localStorage.getItem('foroMensajes')) || [];
    const lower = foroFiltro.toLowerCase();
    const filtrados = todos.filter(m =>
        m.titulo.toLowerCase().includes(lower) ||
        m.contenido.toLowerCase().includes(lower) ||
        m.autor.toLowerCase().includes(lower) ||
        (m.comentarios && m.comentarios.some(c => c.contenido.toLowerCase().includes(lower)))
    );
    renderizarForo(filtrados);
};

window.limpiarBuscadorForo = function() {
    const input = document.getElementById('foroBuscador');
    if (input) input.value = '';
    filtrarForo('');
};

function agregarComentario(idMensaje) {
    const comentario = prompt('Escribe tu comentario:');
    if (!comentario) return;
    
    const mensajes = JSON.parse(localStorage.getItem('foroMensajes')) || [];
    const mensaje = mensajes.find(m => m.id === idMensaje);
    if (mensaje) {
        if (!mensaje.comentarios) mensaje.comentarios = [];
        mensaje.comentarios.push({
            autor: usuarioActual.nombre,
            contenido: comentario,
            fecha: new Date().toISOString()
        });
        localStorage.setItem('foroMensajes', JSON.stringify(mensajes));
        renderizarForo();
    }
}

// ===== SOLICITUDES =====
function renderizarSolicitudesAprobacion() {
    const solicitudes = JSON.parse(localStorage.getItem('solicitudesAprobacion')) || [];
    const pendientes = solicitudes.filter(s => s.estado === 'pendiente');
    const historial = solicitudes.filter(s => s.estado !== 'pendiente');

    const pendientesDiv = document.getElementById('solicitudes-pendientes-lista');
    const historialDiv = document.getElementById('solicitudes-historial-lista');

    pendientesDiv.innerHTML = '';
    pendientes.forEach(s => {
        const div = document.createElement('div');
        div.className = 'solicitud';
        div.innerHTML = `
            <div class="solicitud-info">
                <p><strong>${s.nombre}</strong> - ${s.email}</p>
                <p>Grado: ${s.grado} | Fecha: ${new Date(s.fecha).toLocaleDateString()}</p>
            </div>
            <div class="solicitud-acciones">
                <button class="btn-success" onclick="aprobarSolicitud(${s.id})">Aprobar</button>
                <button class="btn-danger" onclick="rechazarSolicitud(${s.id})">Rechazar</button>
            </div>
        `;
        pendientesDiv.appendChild(div);
    });

    historialDiv.innerHTML = '';
    historial.forEach(s => {
        const div = document.createElement('div');
        div.className = 'solicitud';
        div.innerHTML = `
            <div class="solicitud-info">
                <p><strong>${s.nombre}</strong> - ${s.email}</p>
                <p>Grado: ${s.grado} | Fecha: ${new Date(s.fecha).toLocaleDateString()}</p>
                <p>Estado: <span class="estado-${s.estado}">${s.estado}</span></p>
            </div>
        `;
        historialDiv.appendChild(div);
    });
}

function aprobarSolicitud(id) {
    let solicitudes = JSON.parse(localStorage.getItem('solicitudesAprobacion')) || [];
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];
    
    const solicitud = solicitudes.find(s => s.id === id);
    if (!solicitud) return;

    const nuevoEstudiante = {
        id: estudiantes.length + 1,
        nombre: solicitud.nombre.split(' ')[0] || solicitud.nombre,
        apellido: solicitud.nombre.split(' ')[1] || '',
        grado: solicitud.grado
    };
    estudiantes.push(nuevoEstudiante);
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));

    const nuevoUsuario = {
        id: usuarios.length + 1,
        email: solicitud.email,
        password: solicitud.password,
        nombre: solicitud.nombre,
        rol: 'estudiante',
        grado: solicitud.grado,
        id_estudiante: nuevoEstudiante.id,
        estado: 'activo'
    };
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    solicitud.estado = 'aprobado';
    localStorage.setItem('solicitudesAprobacion', JSON.stringify(solicitudes));
    
    renderizarSolicitudesAprobacion();
    alert('Solicitud aprobada');
}

function rechazarSolicitud(id) {
    let solicitudes = JSON.parse(localStorage.getItem('solicitudesAprobacion')) || [];
    const index = solicitudes.findIndex(s => s.id === id);
    if (index !== -1) {
        solicitudes[index].estado = 'rechazado';
        localStorage.setItem('solicitudesAprobacion', JSON.stringify(solicitudes));
        renderizarSolicitudesAprobacion();
        alert('Solicitud rechazada');
    }
}

// ===== CARRUSEL PRINCIPAL =====
function renderizarCarrusel() {
    const carrusel = JSON.parse(localStorage.getItem('carrusel')) || [];
    const container = document.getElementById('carrusel-inicio');
    let html = '';
    carrusel.forEach((item, index) => {
        html += `
            <div class="carrusel-slide ${index === 0 ? 'activo' : ''}" style="background-image: url('${item.imagen}');">
                <div class="carrusel-info">
                    <h3>${item.titulo}</h3>
                    <p>${item.descripcion}</p>
                </div>
            </div>
        `;
    });
    html += `
        <button class="carrusel-btn prev" onclick="cambiarSlide(-1)"><i class="fas fa-chevron-left"></i></button>
        <button class="carrusel-btn next" onclick="cambiarSlide(1)"><i class="fas fa-chevron-right"></i></button>
        <div class="carrusel-indicadores">
            ${carrusel.map((_, i) => `<span class="indicador ${i === 0 ? 'activo' : ''}" onclick="irASlide(${i})"></span>`).join('')}
        </div>
    `;
    container.innerHTML = html;
    if (usuarioActual && usuarioActual.rol === 'admin') {
        container.innerHTML += `<button class="edit-btn" onclick="abrirEditorCarrusel()" style="position: absolute; top: 10px; right: 10px; z-index: 20;"><i class="fas fa-pen"></i></button>`;
    }
    indiceCarrusel = 0;
    iniciarCarrusel();
}

function cambiarSlide(direccion) {
    const slides = document.querySelectorAll('.carrusel-slide');
    const indicadores = document.querySelectorAll('.indicador');
    if (!slides.length) return;
    slides[indiceCarrusel]?.classList.remove('activo');
    indicadores[indiceCarrusel]?.classList.remove('activo');
    indiceCarrusel = (indiceCarrusel + direccion + slides.length) % slides.length;
    slides[indiceCarrusel]?.classList.add('activo');
    indicadores[indiceCarrusel]?.classList.add('activo');
}

function irASlide(index) {
    const slides = document.querySelectorAll('.carrusel-slide');
    const indicadores = document.querySelectorAll('.indicador');
    if (!slides.length) return;
    slides[indiceCarrusel]?.classList.remove('activo');
    indicadores[indiceCarrusel]?.classList.remove('activo');
    indiceCarrusel = index;
    slides[indiceCarrusel]?.classList.add('activo');
    indicadores[indiceCarrusel]?.classList.add('activo');
}

function iniciarCarrusel() {
    if (intervaloCarrusel) clearInterval(intervaloCarrusel);
    intervaloCarrusel = setInterval(() => cambiarSlide(1), 5000);
}

function detenerCarrusel() {
    if (intervaloCarrusel) clearInterval(intervaloCarrusel);
}

function abrirEditorCarrusel() {
    if (!usuarioActual || usuarioActual.rol !== 'admin') return;
    const carrusel = JSON.parse(localStorage.getItem('carrusel')) || [];
    const lista = document.getElementById('lista-carrusel');
    lista.innerHTML = '';
    carrusel.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'carrusel-editor-item';
        div.innerHTML = `
            <div style="display:flex; gap:15px; align-items:center; flex-wrap:wrap; margin-bottom:15px; padding:15px; background:#f8f9fa; border-radius:10px;">
                <img src="${item.imagen}" style="width:150px; height:100px; object-fit:cover; border-radius:8px;" id="img-${index}">
                <div style="flex:1;">
                    <input type="text" placeholder="Título" value="${item.titulo.replace(/"/g, '&quot;')}" data-index="${index}" class="carrusel-titulo form-control" style="margin-bottom:5px;">
                    <input type="text" placeholder="Descripción" value="${item.descripcion.replace(/"/g, '&quot;')}" data-index="${index}" class="carrusel-descripcion form-control" style="margin-bottom:5px;">
                    <input type="file" accept="image/*" onchange="cambiarImagenCarrusel(${index}, this)" style="font-size:0.8rem;">
                </div>
                <button class="btn-danger" onclick="eliminarSlide(${index})">Eliminar</button>
            </div>
        `;
        lista.appendChild(div);
    });
    document.getElementById('modalCarrusel').style.display = 'flex';
}

window.eliminarSlide = function(index) {
    let carrusel = JSON.parse(localStorage.getItem('carrusel')) || [];
    carrusel.splice(index, 1);
    localStorage.setItem('carrusel', JSON.stringify(carrusel));
    abrirEditorCarrusel();
};

window.cambiarImagenCarrusel = function(index, input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        comprimirImagen(file, 1, (imagenComprimida) => {
            if (imagenComprimida) {
                let carrusel = JSON.parse(localStorage.getItem('carrusel')) || [];
                carrusel[index].imagen = imagenComprimida;
                localStorage.setItem('carrusel', JSON.stringify(carrusel));
                document.getElementById(`img-${index}`).src = imagenComprimida;
            }
        });
    }
};

// ===== FUNCIONES DE EDICIÓN =====
window.editarContenido = function(id, tipo) {
    if (!usuarioActual || usuarioActual.rol !== 'admin') {
        alert('Solo el administrador puede editar contenido.');
        return;
    }
    const elemento = document.getElementById(id);
    const contenidoActual = elemento.innerText;
    document.getElementById('editorElementoId').value = id;
    document.getElementById('editorTipo').value = tipo;
    const campo = document.getElementById('editorCampo');
    if (tipo === 'texto') {
        campo.innerHTML = `<input type="text" id="editorValor" class="form-control" value="${contenidoActual.replace(/"/g, '&quot;')}">`;
    } else if (tipo === 'textarea') {
        campo.innerHTML = `<textarea id="editorValor" class="form-control" rows="5">${contenidoActual}</textarea>`;
    }
    document.getElementById('modalEditorTitulo').innerText = 'Editar Contenido';
    document.getElementById('modalEditor').style.display = 'flex';
};

window.editarTituloSeccion = function(seccion, tituloActual) {
    if (!usuarioActual || usuarioActual.rol !== 'admin') return;
    const nuevoTitulo = prompt('Editar título:', tituloActual);
    if (nuevoTitulo) {
        document.querySelector(`#${seccion} .section-header h2`).innerHTML = nuevoTitulo;
    }
};

window.editarTarjeta = function(tarjeta) {
    if (!usuarioActual || usuarioActual.rol !== 'admin') return;
    let contenidoActual = '';
    if (tarjeta === 'eventos') contenidoActual = document.getElementById('eventos-destacados').innerHTML;
    else if (tarjeta === 'avisos') contenidoActual = document.getElementById('avisos-lista').innerHTML;
    else if (tarjeta === 'calendario') contenidoActual = document.getElementById('calendario-resumen').innerHTML;
    document.getElementById('tarjetaId').value = tarjeta;
    document.getElementById('tarjetaContenido').value = contenidoActual;
    document.getElementById('modalTarjetaTitulo').innerText = `Editar ${tarjeta}`;
    document.getElementById('modalTarjeta').style.display = 'flex';
};

window.mostrarPreviewImagen = function(inputFileId, previewContainerId) {
    const fileInput = document.getElementById(inputFileId);
    const previewContainer = document.getElementById(previewContainerId);
    
    if (!fileInput) return;
    
    fileInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            
            if (!file.type.startsWith('image/')) {
                alert('Por favor selecciona un archivo de imagen válido');
                this.value = '';
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                if (previewContainer) {
                    previewContainer.innerHTML = '';
                    
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    img.style.cssText = 'max-width: 100%; max-height: 200px; border-radius: 8px; margin-top: 10px; border: 2px solid #ddd;';
                    img.alt = 'Preview de la imagen';
                    
                    previewContainer.appendChild(img);
                    
                    const info = document.createElement('small');
                    info.textContent = '✓ Imagen cargada correctamente';
                    info.style.cssText = 'display: block; color: #28a745; margin-top: 8px; font-weight: bold;';
                    previewContainer.appendChild(info);
                }
            };
            reader.readAsDataURL(file);
        }
    });
};

// ===== EVENTOS =====
generarMenu();

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        document.getElementById('mainNav').classList.toggle('mostrar');
    });
}

btnLogin.addEventListener('click', () => {
    document.getElementById('modalLogin').style.display = 'flex';
    tabLoginBtn.classList.add('activo');
    tabRegisterBtn.classList.remove('activo');
    panelLogin.classList.add('activo');
    panelRegister.classList.remove('activo');
});
cerrarModal.addEventListener('click', () => document.getElementById('modalLogin').style.display = 'none');

tabLoginBtn.addEventListener('click', () => {
    tabLoginBtn.classList.add('activo');
    tabRegisterBtn.classList.remove('activo');
    panelLogin.classList.add('activo');
    panelRegister.classList.remove('activo');
});

tabRegisterBtn.addEventListener('click', () => {
    tabRegisterBtn.classList.add('activo');
    tabLoginBtn.classList.remove('activo');
    panelRegister.classList.add('activo');
    panelLogin.classList.remove('activo');
});

document.getElementById('cerrarModalEditor')?.addEventListener('click', () => document.getElementById('modalEditor').style.display = 'none');
document.getElementById('cerrarModalCarrusel')?.addEventListener('click', () => document.getElementById('modalCarrusel').style.display = 'none');
document.getElementById('cerrarModalTarjeta')?.addEventListener('click', () => document.getElementById('modalTarjeta').style.display = 'none');
document.getElementById('cerrarModalHorario')?.addEventListener('click', () => document.getElementById('modalHorario').style.display = 'none');
document.getElementById('cerrarModalEditorCultura')?.addEventListener('click', () => document.getElementById('modalEditorCultura').style.display = 'none');
document.getElementById('cerrarModalDetalle')?.addEventListener('click', () => document.getElementById('modalDetalleActividad').style.display = 'none');
document.getElementById('btnCancelarActividad')?.addEventListener('click', () => document.getElementById('modalActividad').style.display = 'none');
document.getElementById('cerrarModalAgregarImagen')?.addEventListener('click', () => document.getElementById('modalAgregarImagen').style.display = 'none');
document.getElementById('cerrarModalEditarImagen')?.addEventListener('click', () => document.getElementById('modalEditarImagen').style.display = 'none');

window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalLogin')) document.getElementById('modalLogin').style.display = 'none';
    if (e.target === document.getElementById('modalActividad')) document.getElementById('modalActividad').style.display = 'none';
    if (e.target === document.getElementById('modalEditor')) document.getElementById('modalEditor').style.display = 'none';
    if (e.target === document.getElementById('modalCarrusel')) document.getElementById('modalCarrusel').style.display = 'none';
    if (e.target === document.getElementById('modalTarjeta')) document.getElementById('modalTarjeta').style.display = 'none';
    if (e.target === document.getElementById('modalHorario')) document.getElementById('modalHorario').style.display = 'none';
    if (e.target === document.getElementById('modalEditorCultura')) document.getElementById('modalEditorCultura').style.display = 'none';
    if (e.target === document.getElementById('modalDetalleActividad')) document.getElementById('modalDetalleActividad').style.display = 'none';
    if (e.target === document.getElementById('modalImagen')) cerrarModalImagen();
    if (e.target === document.getElementById('modalAgregarImagen')) document.getElementById('modalAgregarImagen').style.display = 'none';
    if (e.target === document.getElementById('modalEditarImagen')) document.getElementById('modalEditarImagen').style.display = 'none';
});

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const user = usuarios.find(u => u.email === email && u.password === password);
    
    if (user) {
        usuarioActual = { ...user };
        sessionStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
        userNameSpan.textContent = user.nombre;
        btnLogin.style.display = 'none';
        btnLogout.style.display = 'inline-block';
        document.getElementById('modalLogin').style.display = 'none';
        generarMenu();
        actualizarUIporRol();
        mostrarToast(`¡Bienvenido/a, ${user.nombre}!`, 'success');
        mostrarSeccion('inicio');
        mostrarBannerNotificaciones();
    } else {
        mostrarToast('Credenciales incorrectas. Verifica tu email y contraseña.', 'error');
    }
});

formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    const nombre = document.getElementById('register-nombre').value;
    const email = document.getElementById('register-email').value;
    const grado = document.getElementById('register-grado').value;

    let solicitudes = JSON.parse(localStorage.getItem('solicitudesAprobacion')) || [];
    
    const nuevaSolicitud = {
        id: Date.now(),
        nombre: nombre,
        email: email,
        password: password,
        grado: grado,
        estado: 'pendiente',
        fecha: new Date().toISOString()
    };
    solicitudes.push(nuevaSolicitud);
    localStorage.setItem('solicitudesAprobacion', JSON.stringify(solicitudes));
    mostrarToast('Solicitud enviada. El administrador la revisará pronto.', 'info', 4000);
    document.getElementById('modalLogin').style.display = 'none';
    formRegister.reset();
    tabLoginBtn.click();
});

btnLogout.addEventListener('click', () => {
    usuarioActual = null;
    sessionStorage.removeItem('usuarioActual');
    userNameSpan.textContent = 'Invitado';
    btnLogin.style.display = 'inline-block';
    btnLogout.style.display = 'none';
    generarMenu();
    actualizarUIporRol();
    mostrarSeccion('inicio');
    mostrarToast('Sesión cerrada correctamente.', 'info', 2500);
    cerrarBannerNotificaciones();
});

btnAgregarActividad.addEventListener('click', () => {
    calendarioManager.abrirModalActividad();
});

document.getElementById('formActividad').addEventListener('submit', (e) => {
    calendarioManager.guardarActividad(e);
});

document.getElementById('formEditor').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('editorElementoId').value;
    const valor = document.getElementById('editorValor').value;
    document.getElementById(id).innerText = valor;
    
    if (id === 'colegio-nombre' || id === 'colegio-lema' || id === 'eventos-destacados' || id === 'avisos-lista' || id === 'calendario-resumen') {
        let textos = JSON.parse(localStorage.getItem('inicioTextos')) || {};
        if (id === 'colegio-nombre') textos.colegioNombre = valor;
        else if (id === 'colegio-lema') textos.colegioLema = valor;
        else if (id === 'eventos-destacados') textos.eventos = valor;
        else if (id === 'avisos-lista') textos.avisos = valor;
        else if (id === 'calendario-resumen') textos.calendarioResumen = valor;
        localStorage.setItem('inicioTextos', JSON.stringify(textos));
    } else if (id === 'historia' || id === 'mision' || id === 'vision' || id === 'valores') {
        let sn = JSON.parse(localStorage.getItem('sobreNosotros')) || {};
        sn[id] = valor;
        localStorage.setItem('sobreNosotros', JSON.stringify(sn));
    } else if (id.startsWith('contacto-')) {
        let contacto = JSON.parse(localStorage.getItem('contacto')) || {};
        if (id === 'contacto-telefono') contacto.telefono = valor;
        else if (id === 'contacto-email') contacto.email = valor;
        else if (id === 'contacto-direccion') contacto.direccion = valor;
        localStorage.setItem('contacto', JSON.stringify(contacto));
    }
    document.getElementById('modalEditor').style.display = 'none';
});

document.getElementById('formTarjeta').addEventListener('submit', (e) => {
    e.preventDefault();
    const tarjeta = document.getElementById('tarjetaId').value;
    const contenido = document.getElementById('tarjetaContenido').value;
    let textos = JSON.parse(localStorage.getItem('inicioTextos')) || {};
    if (tarjeta === 'eventos') {
        textos.eventos = contenido;
        document.getElementById('eventos-destacados').innerHTML = contenido;
    } else if (tarjeta === 'avisos') {
        textos.avisos = contenido;
        document.getElementById('avisos-lista').innerHTML = contenido;
    } else if (tarjeta === 'calendario') {
        textos.calendarioResumen = contenido;
        document.getElementById('calendario-resumen').innerHTML = contenido;
    }
    localStorage.setItem('inicioTextos', JSON.stringify(textos));
    document.getElementById('modalTarjeta').style.display = 'none';
});

if (formContacto) {
    formContacto.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensaje enviado correctamente');
        e.target.reset();
    });
}


// ===== AGENDA TABS (Actividades + Horarios) =====
function inicializarAgendaTabs() {
    const btns = document.querySelectorAll('.agenda-tab-btn');
    const panels = document.querySelectorAll('.agenda-tab-panel');
    
    btns.forEach(btn => {
        // Remover listeners previos clonando el nodo
        const nuevoBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(nuevoBtn, btn);
        nuevoBtn.addEventListener('click', () => {
            document.querySelectorAll('.agenda-tab-btn').forEach(b => b.classList.remove('activo'));
            panels.forEach(p => p.classList.remove('activo'));
            nuevoBtn.classList.add('activo');
            const target = document.getElementById(nuevoBtn.dataset.agendaTab);
            if (target) target.classList.add('activo');
            // Si se activa el panel de horarios, re-renderizar
            if (nuevoBtn.dataset.agendaTab === 'tab-horarios') {
                renderizarHorarios();
            }
        });
    });
}

function inicializarTabs(contenedor) {
    if (!contenedor) return;
    
    const tabs = contenedor.querySelectorAll('.tab-btn');
    const panels = contenedor.querySelectorAll('.tab-panel');
    
    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('activo')) return;
            
            tabs.forEach(b => b.classList.remove('activo'));
            panels.forEach(p => p.classList.remove('activo'));
            
            btn.classList.add('activo');
            const targetPanel = contenedor.querySelector(`#${btn.dataset.tab}`);
            if (targetPanel) targetPanel.classList.add('activo');
        });
    });
}

document.getElementById('selector-grado-horario').addEventListener('change', renderizarHorarios);
document.getElementById('selector-grado-visualizar')?.addEventListener('change', function() {
    gestorHorarios.renderizarHorario(this.value, 'horario-visualizacion');
});
document.getElementById('selector-grado-editar')?.addEventListener('change', function() {
    gestorHorarios.renderizarHorarioEdicion(this.value, 'horario-edicion');
});

document.getElementById('btnAgregarNuevoBloque')?.addEventListener('click', function() {
    const grado = document.getElementById('selector-grado-editar').value;
    const nuevaHora = document.getElementById('nueva-hora').value;
    
    if (!grado) {
        alert('Seleccione un grado');
        return;
    }
    
    if (!nuevaHora || !/^\d{2}:\d{2} - \d{2}:\d{2}$/.test(nuevaHora)) {
        alert('Formato de hora inválido. Use: HH:MM - HH:MM');
        return;
    }
    
    gestorHorarios.agregarBloqueHorario(grado, {
        hora: nuevaHora,
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: ''
    });
    
    gestorHorarios.renderizarHorarioEdicion(grado, 'horario-edicion');
    document.getElementById('nueva-hora').value = '';
});

document.getElementById('btnGuardarHorario')?.addEventListener('click', function() {
    const grado = document.getElementById('selector-grado-editar').value;
    if (!grado) {
        alert('Seleccione un grado');
        return;
    }
    gestorHorarios.guardarEdicion(grado);
});

btnEditarHorario.addEventListener('click', () => {
    if (!usuarioActual || (usuarioActual.rol !== 'admin' && usuarioActual.rol !== 'profesor')) return;
    const grado = document.getElementById('selector-grado-horario').value;
    if (!grado) { alert('Seleccione un grado'); return; }
    
    document.getElementById('modalHorario').style.display = 'flex';
    
    document.querySelectorAll('#modalHorario .tab-btn').forEach(b => b.classList.remove('activo'));
    document.querySelectorAll('#modalHorario .tab-panel').forEach(p => p.classList.remove('activo'));
    document.querySelector('#modalHorario [data-tab="editar-horario"]').classList.add('activo');
    document.getElementById('editar-horario').classList.add('activo');
    
    document.getElementById('selector-grado-editar').value = grado;
    gestorHorarios.renderizarHorarioEdicion(grado, 'horario-edicion');
    
    const bloquesPrimaria = document.getElementById('bloques-primaria');
    const bloquesSecundaria = document.getElementById('bloques-secundaria');
    if (bloquesPrimaria) {
        bloquesPrimaria.innerHTML = gestorHorarios.bloquesPorNivel.primaria.map(b => `<div class="bloque-item">${b}</div>`).join('');
    }
    if (bloquesSecundaria) {
        bloquesSecundaria.innerHTML = gestorHorarios.bloquesPorNivel.secundaria.map(b => `<div class="bloque-item">${b}</div>`).join('');
    }
});

if (formMensaje) {
    formMensaje.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!usuarioActual || usuarioActual.rol !== 'estudiante') return;
        const mensajes = JSON.parse(localStorage.getItem('foroMensajes')) || [];
        const nuevoMensaje = {
            id: Date.now(),
            id_usuario: usuarioActual.id,
            autor: usuarioActual.nombre,
            titulo: document.getElementById('mensaje-titulo').value,
            contenido: document.getElementById('mensaje-contenido').value,
            fecha: new Date().toISOString(),
            comentarios: []
        };
        mensajes.push(nuevoMensaje);
        localStorage.setItem('foroMensajes', JSON.stringify(mensajes));
        formMensaje.reset();
        renderizarForo();
        mostrarToast('Mensaje publicado en el foro.', 'success');
    });
}

document.getElementById('btnAgregarSlide')?.addEventListener('click', () => {
    let carrusel = JSON.parse(localStorage.getItem('carrusel')) || [];
    carrusel.push({ id: Date.now(), imagen: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200', titulo: 'Nueva imagen', descripcion: '' });
    localStorage.setItem('carrusel', JSON.stringify(carrusel));
    abrirEditorCarrusel();
});

document.getElementById('btnGuardarCarrusel')?.addEventListener('click', () => {
    const titulos = document.querySelectorAll('.carrusel-titulo');
    const descripciones = document.querySelectorAll('.carrusel-descripcion');
    let carrusel = JSON.parse(localStorage.getItem('carrusel')) || [];
    titulos.forEach((input, i) => { if (carrusel[i]) carrusel[i].titulo = input.value; });
    descripciones.forEach((input, i) => { if (carrusel[i]) carrusel[i].descripcion = input.value; });
    localStorage.setItem('carrusel', JSON.stringify(carrusel));
    document.getElementById('modalCarrusel').style.display = 'none';
    renderizarCarrusel();
    mostrarToast('Carrusel guardado exitosamente.', 'success');
});

// ===== INICIALIZAR =====
if (usuarioActual) {
    userNameSpan.textContent = usuarioActual.nombre;
    btnLogin.style.display = 'none';
    btnLogout.style.display = 'inline-block';
}

actualizarUIporRol();
calendarioManager.renderizarCalendario('calendario-actividades');
calendarioManager.renderizarListaActividades();
calendarioManager.actualizarEventosDestacados();
cargarTextosInicio();
cargarSobreNosotros();
cargarContacto();
renderizarCarrusel();
renderizarHorarios();
renderizarForo();
renderizarCulturaDeporte();
renderizarMuestrasArtisticas();
if (usuarioActual && usuarioActual.rol === 'admin') renderizarSolicitudesAprobacion();
mostrarSeccion('inicio');

mostrarPreviewImagen('imagen-file', 'preview-imagen-file');

setTimeout(() => {
    inicializarTabs(document.getElementById('solicitudes'));
    inicializarTabs(document.getElementById('modalHorario'));
}, 100);

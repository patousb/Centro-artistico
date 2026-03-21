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

    // Calificaciones
    if (!localStorage.getItem('calificaciones')) {
        const calificaciones = [
            { id: 1, id_estudiante: 1, materia: 'Matemáticas', nota1: 4.5, nota2: 5.0, nota3: 4.0, comportamiento: 'Bueno' },
            { id: 2, id_estudiante: 1, materia: 'Lengua', nota1: 3.5, nota2: 4.0, nota3: 4.5, comportamiento: 'Excelente' },
            { id: 3, id_estudiante: 2, materia: 'Matemáticas', nota1: 2.5, nota2: 3.0, nota3: 3.5, comportamiento: 'Regular' }
        ];
        localStorage.setItem('calificaciones', JSON.stringify(calificaciones));
    }

    // Asistencia
    if (!localStorage.getItem('asistencia')) {
        const asistencia = [
            { id: 1, id_estudiante: 1, materia: 'Matemáticas', clases_totales: 20, asistencias: 18 },
            { id: 2, id_estudiante: 1, materia: 'Lengua', clases_totales: 20, asistencias: 19 },
            { id: 3, id_estudiante: 2, materia: 'Matemáticas', clases_totales: 20, asistencias: 15 }
        ];
        localStorage.setItem('asistencia', JSON.stringify(asistencia));
    }

    // Actividades
    if (!localStorage.getItem('actividades')) {
        const actividades = [
            { 
                id: '1', 
                titulo: 'Feria de Ciencias', 
                descripcion: 'Presentación de proyectos científicos de todos los cursos. Habrá experimentos, stands y competencias.',
                fecha: '2026-04-10', 
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
                fecha: '2026-04-15', 
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
                fecha: '2026-04-20',
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
                imagen: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600',
                categorias: {
                    danza: {
                        nombre: 'Danza Folclórica',
                        informacion: 'Grupo de danza folclórica. Ensayos: martes y jueves 4-6pm. Participamos en festivales locales.',
                        imagen: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600',
                        imagenes: [
                            'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600',
                            'https://images.unsplash.com/photo-1547153760-18fc86324498?w=600',
                            'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600'
                        ]
                    },
                    teatro: {
                        nombre: 'Teatro',
                        informacion: 'Taller de teatro escolar. Ensayos: lunes y miércoles 3-5pm. Presentaciones trimestrales.',
                        imagen: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600',
                        imagenes: [
                            'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600',
                            'https://images.unsplash.com/photo-1503095396548-807c10322a0c?w=600',
                            'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600'
                        ]
                    }
                }
            },
            deporte: {
                titulo: 'Deporte',
                descripcion: 'Vive la pasión del deporte',
                color: '#f72585',
                icono: 'futbol',
                imagen: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600',
                categorias: {
                    futbol: {
                        nombre: 'Fútbol Masculino',
                        informacion: 'Equipo de fútbol masculino. Entrenamientos: lunes, miércoles y viernes 4-6pm. Categorías: sub-13, sub-15 y sub-17.',
                        imagen: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600',
                        imagenes: [
                            'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600',
                            'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=600',
                            'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600'
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
                imagen: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
                galeria: [
                    { url: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80" },
                    { url: "https://images.unsplash.com/photo-1518834107812-5b84b60f6fd4?auto=format&fit=crop&w=800&q=80" },
                    { url: "https://images.unsplash.com/photo-1460723237483-7d6dc9bf3de6?auto=format&fit=crop&w=800&q=80" },
                    { url: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=800&q=80" }
                ]
            },
            teatro: {
                titulo: "🎭 Teatro",
                imagen: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1200&q=80",
                galeria: [
                    { url: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=800&q=80" },
                    { url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80" },
                    { url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80" },
                    { url: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=800&q=80" }
                ]
            },
            muestras: {
                titulo: "🎨 Muestras de Arte",
                imagen: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=80",
                galeria: [
                    { url: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=800&q=80" },
                    { url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80" },
                    { url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80" },
                    { url: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=800&q=80" }
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
                    <td><input type="text" class="edit-hora" value="${bloque.hora}" placeholder="HH:MM - HH:MM"></td>
                    <td><input type="text" class="edit-lunes" value="${bloque.lunes || ''}" placeholder="Materia"></td>
                    <td><input type="text" class="edit-martes" value="${bloque.martes || ''}" placeholder="Materia"></td>
                    <td><input type="text" class="edit-miercoles" value="${bloque.miercoles || ''}" placeholder="Materia"></td>
                    <td><input type="text" class="edit-jueves" value="${bloque.jueves || ''}" placeholder="Materia"></td>
                    <td><input type="text" class="edit-viernes" value="${bloque.viernes || ''}" placeholder="Materia"></td>
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
                html += `<span class="evento-titulo" title="${act.titulo}">${act.titulo.substring(0, 15)}${act.titulo.length > 15 ? '...' : ''}</span>`;
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
                        ${act.requiere_inscripcion ? '<p><i class="fas fa-clipboard-list"></i> Requiere inscripción</p>' : ''}
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
            const actividad = this.actividades.find(a => a.id === actividadId);
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
                document.getElementById('actividad-imagen').value = actividad.imagen || '';
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
            imagen: document.getElementById('actividad-imagen').value || null
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
        
        alert(id ? 'Actividad actualizada' : 'Actividad creada');
    }
    
    eliminarActividad(id) {
        if (!confirm('¿Estás seguro de eliminar esta actividad?')) return;
        
        this.actividades = this.actividades.filter(a => a.id !== id);
        this.guardarActividades();
        
        document.getElementById('modalDetalleActividad').style.display = 'none';
        this.renderizarCalendario('calendario-actividades');
        this.renderizarListaActividades();
        this.actualizarEventosDestacados();
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
const btnAgregarCalificacion = document.getElementById('btnAgregarCalificacion');
const btnAgregarAsistencia = document.getElementById('btnAgregarAsistencia');
const formContacto = document.getElementById('formContacto');
const formMensaje = document.getElementById('formMensaje');
const menuToggle = document.getElementById('menuToggle');

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
        items.push({ id: 'actividades', nombre: 'Actividades', icono: 'calendar-alt' });
        items.push({ id: 'horarios', nombre: 'Horarios', icono: 'clock' });
        items.push({ id: 'calificaciones', nombre: 'Calificaciones', icono: 'chart-line' });
        items.push({ id: 'foro', nombre: 'Foro', icono: 'comments' });
        items.push({ id: 'sobre-nosotros', nombre: 'Sobre Nosotros', icono: 'school' });
        items.push({ id: 'contacto', nombre: 'Contacto', icono: 'envelope' });
    } else if (rol === 'profesor') {
        items.push({ id: 'inicio', nombre: 'Inicio', icono: 'home' });
        items.push({ id: 'muestras-artisticas', nombre: 'Muestras Artísticas', icono: 'palette' });
        items.push({ id: 'cultura-deporte', nombre: 'Cultura y Deporte', icono: 'futbol' });
        items.push({ id: 'actividades', nombre: 'Actividades', icono: 'calendar-alt' });
        items.push({ id: 'horarios', nombre: 'Horarios', icono: 'clock' });
        items.push({ id: 'calificaciones', nombre: 'Calificaciones', icono: 'chart-line' });
        items.push({ id: 'foro', nombre: 'Foro', icono: 'comments' });
        items.push({ id: 'sobre-nosotros', nombre: 'Sobre Nosotros', icono: 'school' });
        items.push({ id: 'contacto', nombre: 'Contacto', icono: 'envelope' });
    } else if (rol === 'admin') {
        items.push({ id: 'inicio', nombre: 'Inicio', icono: 'home' });
        items.push({ id: 'muestras-artisticas', nombre: 'Muestras Artísticas', icono: 'palette' });
        items.push({ id: 'cultura-deporte', nombre: 'Cultura y Deporte', icono: 'futbol' });
        items.push({ id: 'actividades', nombre: 'Actividades', icono: 'calendar-alt' });
        items.push({ id: 'horarios', nombre: 'Horarios', icono: 'clock' });
        items.push({ id: 'calificaciones', nombre: 'Calificaciones', icono: 'chart-line' });
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
    }
    if (idSeccion === 'horarios') renderizarHorarios();
    if (idSeccion === 'calificaciones') {
        cargarSelectorEstudiantes();
        renderizarCalificacionesYAsistencia();
    }
    if (idSeccion === 'foro') renderizarForo();
    if (idSeccion === 'solicitudes') renderizarSolicitudesAprobacion();
    if (idSeccion === 'cultura-deporte') {
        renderizarCulturaDeporte();
        volverACultura();
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
    btnAgregarCalificacion.style.display = (rol === 'admin' || rol === 'profesor') ? 'inline-block' : 'none';
    btnAgregarAsistencia.style.display = (rol === 'admin' || rol === 'profesor') ? 'inline-block' : 'none';
    
    document.querySelectorAll('.edit-btn').forEach(btn => btn.style.display = (rol === 'admin') ? 'inline-flex' : 'none');
    document.querySelectorAll('.edit-btn-small').forEach(btn => btn.style.display = (rol === 'admin') ? 'inline-flex' : 'none');
    
    const selectorEstudianteContainer = document.getElementById('selector-estudiante-container');
    if (selectorEstudianteContainer) {
        selectorEstudianteContainer.style.display = (rol === 'admin' || rol === 'profesor') ? 'block' : 'none';
    }
    
    const formNuevoMensaje = document.getElementById('form-nuevo-mensaje');
    if (formNuevoMensaje) {
        formNuevoMensaje.style.display = (rol === 'estudiante') ? 'block' : 'none';
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
    document.getElementById('video-container').innerHTML = `<iframe width="100%" height="400" src="${sn.video || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}" frameborder="0" allowfullscreen></iframe>`;
}

function cargarContacto() {
    const contacto = JSON.parse(localStorage.getItem('contacto')) || {};
    document.getElementById('contacto-telefono').innerText = contacto.telefono || '📞 (011) 1234-5678';
    document.getElementById('contacto-email').innerText = contacto.email || '📧 info@colegio.edu';
    document.getElementById('contacto-direccion').innerText = contacto.direccion || '📍 Av. Siempre Viva 123';
}

// ===== MUESTRAS ARTÍSTICAS (NUEVA SECCIÓN) =====
function renderizarMuestrasArtisticas() {
    const muestras = JSON.parse(localStorage.getItem('muestrasArtisticas')) || {};
    const container = document.getElementById('catalogo-artistico');
    
    let html = '';
    for (let key in muestras) {
        const muestra = muestras[key];
        html += `
            <div class="card" 
                 style="background-image: url('${muestra.imagen}')" 
                 onclick="mostrarGaleria('${key}')"
                 aria-label="Ver galería de ${muestra.titulo}">
                <span>${muestra.titulo}</span>
            </div>
        `;
    }
    
    container.innerHTML = html;
    document.getElementById('galeria-muestras').style.display = 'none';
}

window.mostrarGaleria = function(categoria) {
    const muestras = JSON.parse(localStorage.getItem('muestrasArtisticas')) || {};
    const muestra = muestras[categoria];
    
    document.getElementById('titulo-galeria').textContent = muestra.titulo;
    
    const galeriaContainer = document.getElementById('galeria-imagenes');
    galeriaContainer.innerHTML = '';
    
    muestra.galeria.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'galeria-item';
        item.onclick = () => abrirModalImagen(img.url);
        
        const imagen = document.createElement('img');
        imagen.src = img.url;
        imagen.alt = `${muestra.titulo} - Imagen ${index + 1}`;
        imagen.loading = 'lazy';
        
        item.appendChild(imagen);
        galeriaContainer.appendChild(item);
    });
    
    document.getElementById('catalogo-artistico').parentElement.style.display = 'none';
    document.getElementById('galeria-muestras').style.display = 'block';
};

window.volverCatalogo = function() {
    document.getElementById('catalogo-artistico').parentElement.style.display = 'block';
    document.getElementById('galeria-muestras').style.display = 'none';
};

window.abrirModalImagen = function(url) {
    const modal = document.getElementById('modalImagen');
    const imagen = document.getElementById('imagenAmpliada');
    imagen.src = url;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.cerrarModalImagen = function() {
    document.getElementById('modalImagen').style.display = 'none';
    document.body.style.overflow = 'auto';
};

// ===== CULTURA Y DEPORTE =====
function renderizarCulturaDeporte() {
    const data = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
    const container = document.getElementById('cultura-deporte-container');
    
    let html = `
        <div class="cultura-deporte-grid">
            <div class="cultura-card" style="background-image: linear-gradient(135deg, ${data.cultura.color}, #104e8b), url('${data.cultura.imagen}'); background-blend-mode: overlay;" onclick="verCategoria('cultura')">
                <div class="cultura-card-overlay">
                    <i class="fas fa-${data.cultura.icono}"></i>
                    <h3>${data.cultura.titulo}</h3>
                    <p>${data.cultura.descripcion}</p>
                </div>
            </div>
            <div class="cultura-card" style="background-image: linear-gradient(135deg, ${data.deporte.color}, #e67e22), url('${data.deporte.imagen}'); background-blend-mode: overlay;" onclick="verCategoria('deporte')">
                <div class="cultura-card-overlay">
                    <i class="fas fa-${data.deporte.icono}"></i>
                    <h3>${data.deporte.titulo}</h3>
                    <p>${data.deporte.descripcion}</p>
                </div>
            </div>
        </div>
    `;

    if (usuarioActual && usuarioActual.rol === 'admin') {
        html += `<div style="text-align: center; margin-top: 2rem;">
            <button class="btn-warning" onclick="abrirEditorCultura()"><i class="fas fa-edit"></i> Editar Sección</button>
        </div>`;
    }

    container.innerHTML = html;
}

window.verCategoria = function(tipo) {
    const data = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
    const categoria = data[tipo];
    
    let categoriasHtml = '';
    for (let key in categoria.categorias) {
        const sub = categoria.categorias[key];
        categoriasHtml += `
            <div class="subcategoria-card" style="background-image: linear-gradient(135deg, ${data[tipo].color}, #104e8b), url('${sub.imagen}'); background-blend-mode: overlay;" onclick="verSubcategoria('${tipo}', '${key}')">
                <div class="subcategoria-overlay">
                    <h4>${sub.nombre}</h4>
                </div>
            </div>
        `;
    }

    document.getElementById('categoria-detalle-container').innerHTML = `
        <div class="categoria-header">
            <button class="btn-back" onclick="volverACultura()"><i class="fas fa-arrow-left"></i> Volver</button>
            <h2>${categoria.titulo}</h2>
            <p>${categoria.descripcion}</p>
        </div>
        <div class="subcategorias-grid">${categoriasHtml}</div>
    `;

    document.getElementById('cultura-deporte-container').style.display = 'none';
    document.getElementById('categoria-detalle-container').style.display = 'block';
    document.getElementById('subcategoria-detalle-container').style.display = 'none';
};

window.verSubcategoria = function(tipo, key) {
    const data = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
    const sub = data[tipo].categorias[key];
    
    indiceCulturaCarrusel[key] = 0;

    let imagenesHtml = '';
    sub.imagenes.forEach((img, index) => {
        imagenesHtml += `
            <div class="carrusel-cultura-slide ${index === 0 ? 'activo' : ''}" style="background-image: url('${img}')"></div>
        `;
    });

    document.getElementById('subcategoria-detalle-container').innerHTML = `
        <div class="subcategoria-header">
            <button class="btn-back" onclick="verCategoria('${tipo}')"><i class="fas fa-arrow-left"></i> Volver a ${data[tipo].titulo}</button>
            <h2>${sub.nombre}</h2>
        </div>
        <div class="subcategoria-contenido">
            <div class="subcategoria-info">
                <p>${sub.informacion}</p>
                ${usuarioActual && usuarioActual.rol === 'admin' ? `
                    <button class="btn-warning btn-small" onclick="editarSubcategoria('${tipo}', '${key}')" style="margin-top:1rem;">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                ` : ''}
            </div>
            <div class="carrusel-cultura-container" id="carrusel-${key}">
                ${imagenesHtml}
                <button class="carrusel-btn prev" onclick="cambiarSlideCultura('${key}', -1)">❮</button>
                <button class="carrusel-btn next" onclick="cambiarSlideCultura('${key}', 1)">❯</button>
                <div class="carrusel-indicadores" id="indicadores-${key}">
                    ${sub.imagenes.map((_, i) => `<span class="indicador ${i === 0 ? 'activo' : ''}" onclick="irASlideCultura('${key}', ${i})"></span>`).join('')}
                </div>
            </div>
        </div>
    `;

    document.getElementById('categoria-detalle-container').style.display = 'none';
    document.getElementById('subcategoria-detalle-container').style.display = 'block';
    iniciarCarruselCultura(key);
};

window.cambiarSlideCultura = function(key, direccion) {
    const slides = document.querySelectorAll(`#carrusel-${key} .carrusel-cultura-slide`);
    const indicadores = document.querySelectorAll(`#indicadores-${key} .indicador`);
    if (!slides.length) return;
    
    slides[indiceCulturaCarrusel[key]]?.classList.remove('activo');
    indicadores[indiceCulturaCarrusel[key]]?.classList.remove('activo');
    
    indiceCulturaCarrusel[key] = (indiceCulturaCarrusel[key] + direccion + slides.length) % slides.length;
    
    slides[indiceCulturaCarrusel[key]]?.classList.add('activo');
    indicadores[indiceCulturaCarrusel[key]]?.classList.add('activo');
};

window.irASlideCultura = function(key, index) {
    const slides = document.querySelectorAll(`#carrusel-${key} .carrusel-cultura-slide`);
    const indicadores = document.querySelectorAll(`#indicadores-${key} .indicador`);
    if (!slides.length) return;
    
    slides[indiceCulturaCarrusel[key]]?.classList.remove('activo');
    indicadores[indiceCulturaCarrusel[key]]?.classList.remove('activo');
    
    indiceCulturaCarrusel[key] = index;
    slides[index]?.classList.add('activo');
    indicadores[index]?.classList.add('activo');
};

function iniciarCarruselCultura(key) {
    if (intervalosCulturaCarrusel[key]) clearInterval(intervalosCulturaCarrusel[key]);
    intervalosCulturaCarrusel[key] = setInterval(() => {
        cambiarSlideCultura(key, 1);
    }, 5000);
}

window.volverACultura = function() {
    document.getElementById('cultura-deporte-container').style.display = 'block';
    document.getElementById('categoria-detalle-container').style.display = 'none';
    document.getElementById('subcategoria-detalle-container').style.display = 'none';
    
    Object.keys(intervalosCulturaCarrusel).forEach(key => {
        clearInterval(intervalosCulturaCarrusel[key]);
    });
};

window.abrirEditorCultura = function() {
    const data = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
    
    let html = `
        <h3>Editar Cultura y Deporte</h3>
        <div class="editor-cultura">
            <h4>Cultura</h4>
            <div class="form-group">
                <label>Título</label>
                <input type="text" id="edit-cultura-titulo" value="${data.cultura.titulo}">
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="edit-cultura-descripcion">${data.cultura.descripcion}</textarea>
            </div>
            <div class="form-group">
                <label>Imagen URL</label>
                <input type="text" id="edit-cultura-imagen" value="${data.cultura.imagen}">
            </div>
            
            <h4>Deporte</h4>
            <div class="form-group">
                <label>Título</label>
                <input type="text" id="edit-deporte-titulo" value="${data.deporte.titulo}">
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="edit-deporte-descripcion">${data.deporte.descripcion}</textarea>
            </div>
            <div class="form-group">
                <label>Imagen URL</label>
                <input type="text" id="edit-deporte-imagen" value="${data.deporte.imagen}">
            </div>
            
            <button class="btn-success" onclick="guardarEditorCultura()">Guardar</button>
        </div>
    `;
    
    document.getElementById('editor-cultura-contenido').innerHTML = html;
    document.getElementById('modalEditorCultura').style.display = 'flex';
};

window.guardarEditorCultura = function() {
    const data = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
    data.cultura.titulo = document.getElementById('edit-cultura-titulo').value;
    data.cultura.descripcion = document.getElementById('edit-cultura-descripcion').value;
    data.cultura.imagen = document.getElementById('edit-cultura-imagen').value;
    data.deporte.titulo = document.getElementById('edit-deporte-titulo').value;
    data.deporte.descripcion = document.getElementById('edit-deporte-descripcion').value;
    data.deporte.imagen = document.getElementById('edit-deporte-imagen').value;
    
    localStorage.setItem('culturaDeporte', JSON.stringify(data));
    document.getElementById('modalEditorCultura').style.display = 'none';
    renderizarCulturaDeporte();
};

window.editarSubcategoria = function(tipo, key) {
    const data = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
    const sub = data[tipo].categorias[key];
    
    let imagenesHtml = '';
    sub.imagenes.forEach((img, i) => {
        imagenesHtml += `
            <div class="form-group">
                <label>Imagen ${i+1}</label>
                <input type="text" id="edit-imagen-${i}" value="${img}">
            </div>
        `;
    });
    
    let html = `
        <h3>Editar ${sub.nombre}</h3>
        <div class="form-group">
            <label>Nombre</label>
            <input type="text" id="edit-sub-nombre" value="${sub.nombre}">
        </div>
        <div class="form-group">
            <label>Información</label>
            <textarea id="edit-sub-informacion">${sub.informacion}</textarea>
        </div>
        <div class="form-group">
            <label>Imagen Principal</label>
            <input type="text" id="edit-sub-imagen" value="${sub.imagen}">
        </div>
        <h4>Imágenes</h4>
        ${imagenesHtml}
        <button class="btn-success" onclick="guardarSubcategoria('${tipo}', '${key}')">Guardar</button>
    `;
    
    document.getElementById('editor-cultura-contenido').innerHTML = html;
    document.getElementById('modalEditorCultura').style.display = 'flex';
};

window.guardarSubcategoria = function(tipo, key) {
    const data = JSON.parse(localStorage.getItem('culturaDeporte')) || {};
    const sub = data[tipo].categorias[key];
    
    sub.nombre = document.getElementById('edit-sub-nombre').value;
    sub.informacion = document.getElementById('edit-sub-informacion').value;
    sub.imagen = document.getElementById('edit-sub-imagen').value;
    sub.imagenes = [];
    
    let i = 0;
    while(document.getElementById(`edit-imagen-${i}`)) {
        sub.imagenes.push(document.getElementById(`edit-imagen-${i}`).value);
        i++;
    }
    
    localStorage.setItem('culturaDeporte', JSON.stringify(data));
    document.getElementById('modalEditorCultura').style.display = 'none';
    verSubcategoria(tipo, key);
};

// ===== HORARIOS =====
function renderizarHorarios() {
    const select = document.getElementById('selector-grado-horario');
    let grado = select.value;
    if (!grado && usuarioActual?.rol === 'estudiante') {
        grado = usuarioActual.grado;
        select.value = grado;
    }
    
    if (!grado) {
        document.getElementById('horarios-tabla-container').innerHTML = '<p class="text-center">Seleccione un grado para ver el horario.</p>';
        return;
    }
    
    gestorHorarios.renderizarHorario(grado, 'horarios-tabla-container');
}

// ===== CALIFICACIONES =====
function cargarSelectorEstudiantes() {
    const select = document.getElementById('selector-estudiante-calif');
    const estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];
    select.innerHTML = '<option value="">-- Seleccionar --</option>';
    estudiantes.forEach(e => {
        const option = document.createElement('option');
        option.value = e.id;
        option.textContent = `${e.nombre} ${e.apellido} (${e.grado})`;
        select.appendChild(option);
    });
}

function renderizarCalificacionesYAsistencia() {
    if (!usuarioActual) return;

    const rol = usuarioActual.rol;
    let idEstudiante = null;

    if (rol === 'estudiante') {
        idEstudiante = usuarioActual.id_estudiante || usuarioActual.id;
    } else if (rol === 'admin' || rol === 'profesor') {
        const select = document.getElementById('selector-estudiante-calif');
        idEstudiante = select.value ? parseInt(select.value) : null;
    }

    const calificaciones = JSON.parse(localStorage.getItem('calificaciones')) || [];
    const asistencia = JSON.parse(localStorage.getItem('asistencia')) || [];

    let califFiltradas = calificaciones;
    let asisFiltradas = asistencia;
    if (idEstudiante) {
        califFiltradas = calificaciones.filter(c => c.id_estudiante === idEstudiante);
        asisFiltradas = asistencia.filter(a => a.id_estudiante === idEstudiante);
    }

    const tbodyCalif = document.getElementById('calificaciones-body');
    tbodyCalif.innerHTML = '';
    if (califFiltradas.length === 0) {
        tbodyCalif.innerHTML = '<tr><td colspan="7" class="text-center">No hay calificaciones</td></tr>';
    } else {
        califFiltradas.forEach(c => {
            const promedio = ((c.nota1 + c.nota2 + c.nota3) / 3).toFixed(2);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${c.materia}</td>
                <td>${c.nota1}</td>
                <td>${c.nota2}</td>
                <td>${c.nota3}</td>
                <td><strong>${promedio}</strong></td>
                <td>${c.comportamiento || 'N/A'}</td>
                <td>
                    ${(rol === 'admin' || rol === 'profesor') ? 
                        `<button class="btn-warning btn-small" onclick="editarCalificacion(${c.id})"><i class="fas fa-edit"></i></button>
                         <button class="btn-danger btn-small" onclick="eliminarCalificacion(${c.id})"><i class="fas fa-trash"></i></button>` : ''}
                </td>
            `;
            tbodyCalif.appendChild(tr);
        });
    }

    const tbodyAsis = document.getElementById('asistencia-body');
    tbodyAsis.innerHTML = '';
    if (asisFiltradas.length === 0) {
        tbodyAsis.innerHTML = '<tr><td colspan="5" class="text-center">No hay registros</td></tr>';
    } else {
        asisFiltradas.forEach(a => {
            const porcentaje = a.clases_totales > 0 ? ((a.asistencias / a.clases_totales) * 100).toFixed(1) + '%' : '0%';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${a.materia}</td>
                <td>${a.clases_totales}</td>
                <td>${a.asistencias}</td>
                <td><strong>${porcentaje}</strong></td>
                <td>
                    ${(rol === 'admin' || rol === 'profesor') ? 
                        `<button class="btn-warning btn-small" onclick="editarAsistencia(${a.id})"><i class="fas fa-edit"></i></button>
                         <button class="btn-danger btn-small" onclick="eliminarAsistencia(${a.id})"><i class="fas fa-trash"></i></button>` : ''}
                </td>
            `;
            tbodyAsis.appendChild(tr);
        });
    }
}

// ===== FORO =====
function renderizarForo() {
    const mensajes = JSON.parse(localStorage.getItem('foroMensajes')) || [];
    const container = document.getElementById('foro-mensajes');
    container.innerHTML = '';
    
    if (mensajes.length === 0) {
        container.innerHTML = '<p class="text-center">No hay mensajes en el foro.</p>';
        return;
    }
    
    mensajes.sort((a,b) => new Date(b.fecha) - new Date(a.fecha)).forEach(m => {
        const div = document.createElement('div');
        div.className = 'mensaje';
        div.innerHTML = `
            <div class="mensaje-header">
                <span><i class="fas fa-user-circle"></i> ${m.autor}</span>
                <span><i class="far fa-calendar-alt"></i> ${new Date(m.fecha).toLocaleDateString()}</span>
            </div>
            <div class="mensaje-contenido">
                <strong>${m.titulo}</strong>
                <p>${m.contenido}</p>
            </div>
            <div class="mensaje-comentarios" id="comentarios-${m.id}">
                ${m.comentarios ? m.comentarios.map(c => `
                    <div class="comentario">
                        <strong>${c.autor}:</strong> ${c.contenido} <em>(${new Date(c.fecha).toLocaleDateString()})</em>
                    </div>
                `).join('') : ''}
            </div>
            ${usuarioActual && usuarioActual.rol === 'estudiante' ? `
                <button class="btn-primary btn-small" onclick="agregarComentario(${m.id})">
                    <i class="fas fa-comment"></i> Comentar
                </button>
            ` : ''}
        `;
        container.appendChild(div);
    });
}

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
                <img src="${item.imagen}" style="width:150px; height:100px; object-fit:cover; border-radius:8px;">
                <div style="flex:1;">
                    <input type="text" placeholder="Título" value="${item.titulo}" data-index="${index}" class="carrusel-titulo form-control" style="margin-bottom:5px;">
                    <input type="text" placeholder="Descripción" value="${item.descripcion}" data-index="${index}" class="carrusel-descripcion form-control">
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

window.editarVideo = function() {
    if (!usuarioActual || usuarioActual.rol !== 'admin') return alert('No autorizado');
    const nuevoVideo = prompt('URL del video (embed):', 'https://www.youtube.com/embed/dQw4w9WgXcQ');
    if (nuevoVideo) {
        const sn = JSON.parse(localStorage.getItem('sobreNosotros')) || {};
        sn.video = nuevoVideo;
        localStorage.setItem('sobreNosotros', JSON.stringify(sn));
        cargarSobreNosotros();
    }
};

// ===== FUNCIONES PARA CALIFICACIONES =====
function abrirModalCalificacion(id = null) {
    if (!usuarioActual || (usuarioActual.rol !== 'admin' && usuarioActual.rol !== 'profesor')) return;
    
    const select = document.getElementById('selector-estudiante-calif');
    const idEstudiante = select.value ? parseInt(select.value) : null;
    if (!idEstudiante) {
        alert('Seleccione un estudiante');
        return;
    }

    if (id) {
        const calificaciones = JSON.parse(localStorage.getItem('calificaciones')) || [];
        const calif = calificaciones.find(c => c.id === id);
        if (calif) {
            document.getElementById('calificacion-id').value = calif.id;
            document.getElementById('calificacion-id-estudiante').value = calif.id_estudiante;
            document.getElementById('calificacion-materia').value = calif.materia;
            document.getElementById('calificacion-nota1').value = calif.nota1;
            document.getElementById('calificacion-nota2').value = calif.nota2;
            document.getElementById('calificacion-nota3').value = calif.nota3;
            document.getElementById('calificacion-comportamiento').value = calif.comportamiento || 'Bueno';
            document.getElementById('tituloModalCalificacion').innerText = 'Editar Calificación';
        }
    } else {
        document.getElementById('calificacion-id').value = '';
        document.getElementById('calificacion-id-estudiante').value = idEstudiante;
        document.getElementById('calificacion-materia').value = '';
        document.getElementById('calificacion-nota1').value = '';
        document.getElementById('calificacion-nota2').value = '';
        document.getElementById('calificacion-nota3').value = '';
        document.getElementById('calificacion-comportamiento').value = 'Bueno';
        document.getElementById('tituloModalCalificacion').innerText = 'Agregar Calificación';
    }
    document.getElementById('modalCalificacion').style.display = 'flex';
}

function abrirModalAsistencia(id = null) {
    if (!usuarioActual || (usuarioActual.rol !== 'admin' && usuarioActual.rol !== 'profesor')) return;
    
    const select = document.getElementById('selector-estudiante-calif');
    const idEstudiante = select.value ? parseInt(select.value) : null;
    if (!idEstudiante) {
        alert('Seleccione un estudiante');
        return;
    }

    if (id) {
        const asistencias = JSON.parse(localStorage.getItem('asistencia')) || [];
        const asis = asistencias.find(a => a.id === id);
        if (asis) {
            document.getElementById('asistencia-id').value = asis.id;
            document.getElementById('asistencia-id-estudiante').value = asis.id_estudiante;
            document.getElementById('asistencia-materia').value = asis.materia;
            document.getElementById('asistencia-clases-totales').value = asis.clases_totales;
            document.getElementById('asistencia-asistencias').value = asis.asistencias;
        }
    } else {
        document.getElementById('asistencia-id').value = '';
        document.getElementById('asistencia-id-estudiante').value = idEstudiante;
        document.getElementById('asistencia-materia').value = '';
        document.getElementById('asistencia-clases-totales').value = '';
        document.getElementById('asistencia-asistencias').value = '';
    }
    document.getElementById('modalAsistencia').style.display = 'flex';
}

window.editarCalificacion = function(id) { abrirModalCalificacion(id); };
window.eliminarCalificacion = function(id) {
    if (!confirm('¿Eliminar esta calificación?')) return;
    let calificaciones = JSON.parse(localStorage.getItem('calificaciones')) || [];
    calificaciones = calificaciones.filter(c => c.id !== id);
    localStorage.setItem('calificaciones', JSON.stringify(calificaciones));
    renderizarCalificacionesYAsistencia();
};
window.editarAsistencia = function(id) { abrirModalAsistencia(id); };
window.eliminarAsistencia = function(id) {
    if (!confirm('¿Eliminar este registro?')) return;
    let asistencia = JSON.parse(localStorage.getItem('asistencia')) || [];
    asistencia = asistencia.filter(a => a.id !== id);
    localStorage.setItem('asistencia', JSON.stringify(asistencia));
    renderizarCalificacionesYAsistencia();
};

// ===== EVENTOS =====
generarMenu();

// Toggle menú móvil
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        document.getElementById('mainNav').classList.toggle('mostrar');
    });
}

// Login
btnLogin.addEventListener('click', () => document.getElementById('modalLogin').style.display = 'flex');
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

// Cerrar modales
document.getElementById('cerrarModalEditor').addEventListener('click', () => document.getElementById('modalEditor').style.display = 'none');
document.getElementById('cerrarModalCarrusel').addEventListener('click', () => document.getElementById('modalCarrusel').style.display = 'none');
document.getElementById('cerrarModalTarjeta').addEventListener('click', () => document.getElementById('modalTarjeta').style.display = 'none');
document.getElementById('cerrarModalHorario').addEventListener('click', () => document.getElementById('modalHorario').style.display = 'none');
document.getElementById('cerrarModalCalificacion').addEventListener('click', () => document.getElementById('modalCalificacion').style.display = 'none');
document.getElementById('cerrarModalAsistencia').addEventListener('click', () => document.getElementById('modalAsistencia').style.display = 'none');
document.getElementById('cerrarModalEditorCultura').addEventListener('click', () => document.getElementById('modalEditorCultura').style.display = 'none');
document.getElementById('cerrarModalDetalle').addEventListener('click', () => document.getElementById('modalDetalleActividad').style.display = 'none');
document.getElementById('btnCancelarActividad')?.addEventListener('click', () => document.getElementById('modalActividad').style.display = 'none');

// Cerrar modales al hacer click fuera
window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalLogin')) document.getElementById('modalLogin').style.display = 'none';
    if (e.target === document.getElementById('modalActividad')) document.getElementById('modalActividad').style.display = 'none';
    if (e.target === document.getElementById('modalEditor')) document.getElementById('modalEditor').style.display = 'none';
    if (e.target === document.getElementById('modalCarrusel')) document.getElementById('modalCarrusel').style.display = 'none';
    if (e.target === document.getElementById('modalTarjeta')) document.getElementById('modalTarjeta').style.display = 'none';
    if (e.target === document.getElementById('modalHorario')) document.getElementById('modalHorario').style.display = 'none';
    if (e.target === document.getElementById('modalCalificacion')) document.getElementById('modalCalificacion').style.display = 'none';
    if (e.target === document.getElementById('modalAsistencia')) document.getElementById('modalAsistencia').style.display = 'none';
    if (e.target === document.getElementById('modalEditorCultura')) document.getElementById('modalEditorCultura').style.display = 'none';
    if (e.target === document.getElementById('modalDetalleActividad')) document.getElementById('modalDetalleActividad').style.display = 'none';
    if (e.target === document.getElementById('modalImagen')) cerrarModalImagen();
});

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const user = usuarios.find(u => u.email === email && u.password === password);
    
    if (user) {
        usuarioActual = { ...user };
        userNameSpan.textContent = user.nombre;
        btnLogin.style.display = 'none';
        btnLogout.style.display = 'inline-block';
        document.getElementById('modalLogin').style.display = 'none';
        generarMenu();
        actualizarUIporRol();
        mostrarSeccion('inicio');
    } else {
        alert('Credenciales incorrectas');
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

    alert('Solicitud enviada al administrador');
    document.getElementById('modalLogin').style.display = 'none';
    formRegister.reset();
    tabLoginBtn.click();
});

btnLogout.addEventListener('click', () => {
    usuarioActual = null;
    userNameSpan.textContent = 'Invitado';
    btnLogin.style.display = 'inline-block';
    btnLogout.style.display = 'none';
    generarMenu();
    actualizarUIporRol();
    mostrarSeccion('inicio');
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

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('activo'));
        btn.classList.add('activo');
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('activo'));
        document.getElementById(btn.dataset.tab).classList.add('activo');
    });
});

// Selectores
document.getElementById('selector-grado-horario').addEventListener('change', renderizarHorarios);
document.getElementById('selector-estudiante-calif').addEventListener('change', renderizarCalificacionesYAsistencia);
document.getElementById('selector-grado-visualizar')?.addEventListener('change', function() {
    gestorHorarios.renderizarHorario(this.value, 'horario-visualizacion');
});
document.getElementById('selector-grado-editar')?.addEventListener('change', function() {
    gestorHorarios.renderizarHorarioEdicion(this.value, 'horario-edicion');
});

// Botones de horario
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

// Botones de calificaciones
btnAgregarCalificacion.addEventListener('click', () => abrirModalCalificacion());
btnAgregarAsistencia.addEventListener('click', () => abrirModalAsistencia());

btnEditarHorario.addEventListener('click', () => {
    if (!usuarioActual || (usuarioActual.rol !== 'admin' && usuarioActual.rol !== 'profesor')) return;
    const grado = document.getElementById('selector-grado-horario').value;
    if (!grado) { alert('Seleccione un grado'); return; }
    
    document.getElementById('modalHorario').style.display = 'flex';
    
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('activo'));
    document.querySelector('[data-tab="editar-horario"]').classList.add('activo');
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('activo'));
    document.getElementById('editar-horario').classList.add('activo');
    
    document.getElementById('selector-grado-editar').value = grado;
    gestorHorarios.renderizarHorarioEdicion(grado, 'horario-edicion');
    
    // Cargar bloques por nivel
    const bloquesPrimaria = document.getElementById('bloques-primaria');
    const bloquesSecundaria = document.getElementById('bloques-secundaria');
    if (bloquesPrimaria) {
        bloquesPrimaria.innerHTML = gestorHorarios.bloquesPorNivel.primaria.map(b => `<div class="bloque-item">${b}</div>`).join('');
    }
    if (bloquesSecundaria) {
        bloquesSecundaria.innerHTML = gestorHorarios.bloquesPorNivel.secundaria.map(b => `<div class="bloque-item">${b}</div>`).join('');
    }
});

document.getElementById('formCalificacion').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('calificacion-id').value;
    const idEstudiante = parseInt(document.getElementById('calificacion-id-estudiante').value);
    let calificaciones = JSON.parse(localStorage.getItem('calificaciones')) || [];
    const nuevaCalif = {
        id: id ? parseInt(id) : Date.now(),
        id_estudiante: idEstudiante,
        materia: document.getElementById('calificacion-materia').value,
        nota1: parseFloat(document.getElementById('calificacion-nota1').value),
        nota2: parseFloat(document.getElementById('calificacion-nota2').value),
        nota3: parseFloat(document.getElementById('calificacion-nota3').value),
        comportamiento: document.getElementById('calificacion-comportamiento').value
    };
    if (id) {
        const index = calificaciones.findIndex(c => c.id == id);
        if (index !== -1) calificaciones[index] = nuevaCalif;
    } else {
        calificaciones.push(nuevaCalif);
    }
    localStorage.setItem('calificaciones', JSON.stringify(calificaciones));
    document.getElementById('modalCalificacion').style.display = 'none';
    renderizarCalificacionesYAsistencia();
});

document.getElementById('formAsistencia').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('asistencia-id').value;
    const idEstudiante = parseInt(document.getElementById('asistencia-id-estudiante').value);
    let asistencias = JSON.parse(localStorage.getItem('asistencia')) || [];
    const nuevaAsis = {
        id: id ? parseInt(id) : Date.now(),
        id_estudiante: idEstudiante,
        materia: document.getElementById('asistencia-materia').value,
        clases_totales: parseInt(document.getElementById('asistencia-clases-totales').value),
        asistencias: parseInt(document.getElementById('asistencia-asistencias').value)
    };
    if (id) {
        const index = asistencias.findIndex(a => a.id == id);
        if (index !== -1) asistencias[index] = nuevaAsis;
    } else {
        asistencias.push(nuevaAsis);
    }
    localStorage.setItem('asistencia', JSON.stringify(asistencias));
    document.getElementById('modalAsistencia').style.display = 'none';
    renderizarCalificacionesYAsistencia();
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
    });
}

document.getElementById('btnAgregarSlide').addEventListener('click', () => {
    let carrusel = JSON.parse(localStorage.getItem('carrusel')) || [];
    carrusel.push({ id: Date.now(), imagen: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200', titulo: 'Nueva imagen', descripcion: '' });
    localStorage.setItem('carrusel', JSON.stringify(carrusel));
    abrirEditorCarrusel();
});

document.getElementById('btnGuardarCarrusel').addEventListener('click', () => {
    const titulos = document.querySelectorAll('.carrusel-titulo');
    const descripciones = document.querySelectorAll('.carrusel-descripcion');
    let carrusel = JSON.parse(localStorage.getItem('carrusel')) || [];
    titulos.forEach((input, i) => { if (carrusel[i]) carrusel[i].titulo = input.value; });
    descripciones.forEach((input, i) => { if (carrusel[i]) carrusel[i].descripcion = input.value; });
    localStorage.setItem('carrusel', JSON.stringify(carrusel));
    document.getElementById('modalCarrusel').style.display = 'none';
    renderizarCarrusel();
});

// ===== INICIALIZAR =====
actualizarUIporRol();
calendarioManager.renderizarCalendario('calendario-actividades');
calendarioManager.renderizarListaActividades();
calendarioManager.actualizarEventosDestacados();
cargarTextosInicio();
cargarSobreNosotros();
cargarContacto();
renderizarCarrusel();
renderizarHorarios();
renderizarCalificacionesYAsistencia();
renderizarForo();
renderizarCulturaDeporte();
renderizarMuestrasArtisticas();
if (usuarioActual && usuarioActual.rol === 'admin') renderizarSolicitudesAprobacion();
mostrarSeccion('inicio');
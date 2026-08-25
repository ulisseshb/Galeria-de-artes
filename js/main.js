// Acervo de Projetos Artísticos dos Alunos
const projects = [
    {
        title: "Sonhos de Silício & Luz",
        author: "Ana Beatriz Ramos",
        category: "Escultura 3D & Render",
        image: "https://picsum.photos/id/1018/900/650",
        description: "Exploração de texturas naturais e iluminação etérea inspirada nos mestres da pintura clássica em composição digital contemporânea."
    },
    {
        title: "Retrato em Tons Quentes",
        author: "Lucas Ferreira",
        category: "Fotografia Autoral",
        image: "https://picsum.photos/id/1025/900/650",
        description: "Ensaio fotográfico intimista focado em luz natural de fim de tarde, expressividade e gradação cromática suave."
    },
    {
        title: "Harmonia Tipográfica",
        author: "Carla Mendes",
        category: "Design Editorial",
        image: "https://picsum.photos/id/1035/900/650",
        description: "Estudo de ritmo visual e espaço negativo aplicado a um manifesto sobre arte e sustentabilidade."
    },
    {
        title: "Dança das Formas",
        author: "Gabriel Souza",
        category: "Arte Generativa",
        image: "https://picsum.photos/id/1040/900/650",
        description: "Algoritmos em JavaScript gerando padrões visuais orgânicos a partir de frequências harmônicas sonoras."
    },
    {
        title: "Metamorfose Floral",
        author: "Juliana Duarte",
        category: "Ilustração Digital",
        image: "https://picsum.photos/id/1050/900/650",
        description: "Pintura conceitual combinando técnicas tradicionais de aquarela com camadas digitais de pigmento e luz."
    },
    {
        title: "Diálogo de Sombras",
        author: "Pedro Alcântara",
        category: "Direção de Arte",
        image: "https://picsum.photos/id/1062/900/650",
        description: "Série minimalista explorando o contraste entre a arquitetura brutalista e a fragilidade da natureza."
    },
    {
        title: "Monólito do Vazio",
        author: "Mariana Costa",
        category: "Modelagem 3D",
        image: "https://picsum.photos/id/1069/900/650",
        description: "Instalação virtual explorando materiais nobres, reflexos dourados e atmosfera contemplativa de museu."
    },
    {
        title: "Névoa sobre o Horizonte",
        author: "Thiago Lima",
        category: "Pintura Matte",
        image: "https://picsum.photos/id/1074/900/650",
        description: "Paisagem panorâmica criada para narrativa de curta-metragem animado, inspirada no impressionismo."
    }
];

// Seletores do DOM
const galleryGrid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTag = document.getElementById('lightbox-tag');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxAuthor = document.getElementById('lightbox-author');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxCounter = document.getElementById('lightbox-counter');

const closeBtn = document.getElementById('close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;

// Renderização dos Quadros na Galeria
function renderGallery() {
    galleryGrid.innerHTML = '';
    projects.forEach((proj, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
                    <div class="thumbnail-container">
                        <img src="${proj.image}" alt="${proj.title}" class="project-thumbnail" loading="lazy">
                    </div>
                    <div class="card-details">
                        <span class="card-tag">${proj.category}</span>
                        <h3 class="card-title">${proj.title}</h3>
                        <p class="card-author">Por ${proj.author}</p>
                    </div>
                `;
        card.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(card);
    });
}

// Atualização do Modal com dados da obra
function updateLightboxContent(index) {
    const proj = projects[index];
    lightboxImg.src = proj.image;
    lightboxImg.alt = proj.title;
    lightboxTag.textContent = proj.category;
    lightboxTitle.textContent = proj.title;
    lightboxAuthor.textContent = `Obra concebida por ${proj.author}`;
    lightboxDescription.textContent = proj.description;

    // Contador formatado com dois dígitos no estilo curadoria de arte (ex: "03 / 08")
    const currentFormatted = String(index + 1).padStart(2, '0');
    const totalFormatted = String(projects.length).padStart(2, '0');
    lightboxCounter.textContent = `${currentFormatted} / ${totalFormatted}`;
}

function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent(currentIndex);
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
}

function navigate(direction) {
    currentIndex += direction;
    if (currentIndex >= projects.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = projects.length - 1;
    updateLightboxContent(currentIndex);
}

// Listeners de Interação
closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => navigate(-1));
nextBtn.addEventListener('click', () => navigate(1));

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'ArrowLeft') navigate(-1);
});

// Inicializa a galeria
renderGallery();
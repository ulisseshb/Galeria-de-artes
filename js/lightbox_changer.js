// Acervo de Projetos Artísticos dos Alunos
const projects = [
    {
        title: "Anúncio Wesing",
        author: "Ulisses H. A. Borceda",
        category: "Cartaz digital",
        image: "./src/wesing.png",
        description: "Anúncio hipotético para a marca Wesing utilizando diversos efeitos e ferramentas do Photoshop."
    },
    {
        title: "Logo Brain-Link",
        author: "Ulisses H. A. Borceda",
        category: "Ilustração digital de logo",
        image: "./src/brain link.png",
        description: "Logo em vetores feita para uma empresa hipotética no illustrator. O trabalho original inclui a metodologia para chegar a esse design."
    },
    {
        title: "Mulher Sem Espinhas",
        author: "Ulisses H. A. Borceda",
        category: "Imagem editada",
        image: "./src/mulher.png",
        description: "Uso da ferramenta de correção do Photoshop para remover espinhas e imperfeições leves de forma natural."
    },
    {
        title: "Site Mundo UFC",
        author: "Ulisses H. A. Borceda",
        category: "Site HTML/CSS",
        image: "./src/mundo ufc.png",
        description: "Projeto de 8 horas que consiste em um site simples em HTML/CSS que simula um portal de notícias do UFC com 3 páginas."
    },
    {
        title: "Muro Estendido",
        author: "Ulisses H. A. Borceda",
        category: "Imagem editada",
        image: "./src/muro.png",
        description: "Uso de ferramentas de correção no Photoshop para estender uma imagem de um muro."
    },
    {
        title: "Mudança de Cenário",
        author: "Ulisses H. A. Borceda",
        category: "Imagem editada",
        image: "./src/cenario.png",
        description: "Uso de filtros e diversas ferramentas no Photoshop para mudar a ambientação de uma foto de uma praia."
    },
    {
        title: "Efeito de Pintura",
        author: "Ulisses H. A. Borceda",
        category: "Imagem editada",
        image: "./src/pintura efeito.png",
        description: "Uso de uma ferramenta no Photoshop para criar um efeito de pintura em uma foto."
    },
    {
        title: "Anúncio de Vestibular",
        author: "Ulisses H. A. Borceda",
        category: "Montagem Photoshop",
        image: "./src/vestibular.png",
        description: "Anúncio hipotético para vestibular feito com montagem em Photoshop."
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
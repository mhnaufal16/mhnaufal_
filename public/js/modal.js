// Portfolio Modal System
const portfolioData = {
    'smart-apill': {
        title: 'Smart APILL - Intelligent Traffic Light System',
        subtitle: 'IoT & Web Development | 2023-2024',
        description: 'Sistem manajemen lampu lalu lintas pintar berbasis IoT dengan monitoring real-time. Dashboard web untuk monitoring status APILL, analisa lalu lintas, ketersediaan data, dan mode operasi. Dilengkapi dengan live CCTV monitoring, alarm system, dan data analytics untuk optimasi traffic flow. Sistem ini membantu mengoptimalkan arus lalu lintas di persimpangan jalan dengan teknologi smart sensor dan AI-based traffic prediction.',
        images: ['images/apill-1.png', 'images/apill-2.jpg'],
        techStack: ['IoT', 'Vue.js', 'Express.js', 'Real-time Monitoring', 'Data Analytics', 'WebSocket']
    },
    'ecommerce': {
        title: 'E-Commerce Platform',
        subtitle: 'Web Development | 2024',
        description: 'Platform e-commerce full-featured dengan fitur shopping cart, checkout system, payment gateway integration, product management, dan admin dashboard. Sistem inventory management yang terintegrasi untuk tracking stok produk secara real-time. Dilengkapi dengan fitur user authentication, product reviews, wishlist, order tracking, dan reporting system yang komprehensif.',
        images: ['images/ecommerce1.jpg', 'images/ecommerce2.jpg', 'images/ecommerce3.jpg'],
        techStack: ['Laravel', 'Tailwind CSS', 'MySQL', 'PHP', 'Payment Gateway', 'RESTful API']
    },
    'jejakembun': {
        title: 'Booking Platform - Jejak Embun',
        subtitle: 'Web Application | 2023',
        description: 'Platform booking online untuk villa dan penginapan Jejak Embun dengan sistem reservasi real-time. Fitur lengkap meliputi pencarian villa berdasarkan tanggal dan kapasitas, booking calendar, payment gateway integration, konfirmasi otomatis via email/WhatsApp, dan admin dashboard untuk management reservasi, pricing, dan availability. Sistem ini memudahkan customer untuk melakukan booking secara online dan membantu owner dalam mengelola properti.',
        images: ['images/jejakembun1.png', 'images/jejakembun2.png', 'images/jejakembun3.png'],
        techStack: ['Vue.js', 'Express.js', 'Node.js', 'MySQL', 'Payment Gateway', 'RESTful API']
    }
};

// Create Modal HTML
function createModal() {
    const modalHTML = `
        <div id="portfolioModal" class="modal">
            <div class="modal-content">
                <div class="modal-close" onclick="closeModal()">×</div>
                <div class="modal-header">
                    <h2 class="modal-title" id="modalTitle"></h2>
                    <p class="modal-subtitle" id="modalSubtitle"></p>
                </div>
                <div class="modal-gallery" id="modalGallery"></div>
                <p class="modal-description" id="modalDescription"></p>
                <div class="modal-tech-stack">
                    <h3>Tech Stack</h3>
                    <div class="tech-tags" id="modalTechStack"></div>
                </div>
            </div>
        </div>
        
        <div id="imageViewer" class="image-viewer">
            <div class="image-viewer-close" onclick="closeImageViewer()">×</div>
            <div class="image-viewer-prev" onclick="prevImage()">‹</div>
            <div class="image-viewer-content">
                <img id="viewerImage" src="" alt="Full size image">
            </div>
            <div class="image-viewer-next" onclick="nextImage()">›</div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Open Modal
function openModal(projectId) {
    const project = portfolioData[projectId];
    if (!project) return;
    
    const modal = document.getElementById('portfolioModal');
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalSubtitle').textContent = project.subtitle;
    document.getElementById('modalDescription').textContent = project.description;
    
    // Gallery
    const gallery = document.getElementById('modalGallery');
    gallery.innerHTML = project.images.map((img, index) => `
        <div class="modal-gallery-item" onclick="openImageViewer('${projectId}', ${index})">
            <img src="${img}" alt="${project.title} - Image ${index + 1}">
        </div>
    `).join('');
    
    // Tech Stack
    const techStack = document.getElementById('modalTechStack');
    techStack.innerHTML = project.techStack.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('portfolioModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Image Viewer
let currentProject = null;
let currentImageIndex = 0;

function openImageViewer(projectId, imageIndex) {
    currentProject = projectId;
    currentImageIndex = imageIndex;
    
    const project = portfolioData[projectId];
    const viewer = document.getElementById('imageViewer');
    const img = document.getElementById('viewerImage');
    
    img.src = project.images[imageIndex];
    viewer.classList.add('active');
}

function closeImageViewer() {
    const viewer = document.getElementById('imageViewer');
    viewer.classList.remove('active');
}

function nextImage() {
    if (!currentProject) return;
    const project = portfolioData[currentProject];
    currentImageIndex = (currentImageIndex + 1) % project.images.length;
    document.getElementById('viewerImage').src = project.images[currentImageIndex];
}

function prevImage() {
    if (!currentProject) return;
    const project = portfolioData[currentProject];
    currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
    document.getElementById('viewerImage').src = project.images[currentImageIndex];
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('portfolioModal');
    const imageViewer = document.getElementById('imageViewer');
    
    if (e.target === modal) {
        closeModal();
    }
    if (e.target === imageViewer) {
        closeImageViewer();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const imageViewer = document.getElementById('imageViewer');
    if (imageViewer && imageViewer.classList.contains('active')) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeImageViewer();
    }
    
    const modal = document.getElementById('portfolioModal');
    if (modal && modal.classList.contains('active') && e.key === 'Escape') {
        closeModal();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createModal();
});

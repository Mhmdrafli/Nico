// ========== PRODUCT DATA ==========
const products = {
    1: { name: 'Stropwafel Gluten Free Caramel', price: '$299.99', image: 'foto/1.jpg' },
    2: { name: 'Stropwafel Hazelnut', price: '$399.99', image: 'foto/2.jpg' },
    3: { name: 'Stropwafel Original Caramel', price: '$349.99', image: 'foto/4.jpg' },
    4: { name: 'Sablé Cookies', price: '$449.99', image: 'foto/5.webp' },
    5: { name: 'Premium Edition', price: '$599.99', image: 'https://via.placeholder.com/300x300/7b0000/ffffff?text=Product+5' }
};

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
// NEW: Fungsi untuk smooth scroll ke section tertentu
function scrollToSection(selector) {
    const target = document.querySelector(selector);
    if (target) {
        // Offset (80px) sama seperti di fungsi smooth scrolling Anda
        const offsetTop = target.offsetTop - 80; 
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}
// NEW: Fungsi untuk smooth scroll ke section tertentu (Diperlukan untuk tombol YA)
function scrollToSection(selector) {
    const target = document.querySelector(selector);
    if (target) {
        // Offset (80px) sama seperti di fungsi smooth scrolling Anda
        const offsetTop = target.offsetTop - 80; 
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ========== HOME CTA LOGIC ==========
const homeYesBtn = document.getElementById('homeYesBtn');
const homeNoBtn = document.getElementById('homeNoBtn');

if (homeYesBtn) {
    homeYesBtn.addEventListener('click', function() {
        alert('Selamat! Diskon 10% untuk pembelian pertama Anda sudah aktif. Kami akan mengarahkan Anda ke koleksi produk kami.');
        scrollToSection('#products'); // Scroll ke bagian Products
    });
}

if (homeNoBtn) {
    homeNoBtn.addEventListener('click', function() {
        alert('Baik, terima kasih atas kunjungannya. Kami harap Anda kembali lagi!');
    });
}
// ========== ACTIVE NAVIGATION HIGHLIGHTING ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
const aboutText = document.querySelector('.about-text');
const aboutImage = document.querySelector('.about-image');
const contactForm = document.querySelector('.contact-form');

if (aboutText) observer.observe(aboutText);
if (aboutImage) observer.observe(aboutImage);
if (contactForm) observer.observe(contactForm);

// ========== INFINITE CAROUSEL ==========
function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const cards = Array.from(track.children);
    
    // Clone all cards to create seamless loop
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
    
    // Add click event to all cards (original and cloned)
    const allCards = track.querySelectorAll('.product-card');
    allCards.forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            openModal(productId);
        });
    });
}

// Initialize carousel on page load
initCarousel();

// ========== MODAL FUNCTIONALITY ==========
const modal = document.getElementById('productModal');
const closeBtn = document.querySelector('.close-modal');
const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');

function openModal(productId) {
    const product = products[productId];
    if (product) {
        document.getElementById('modalImage').src = product.image;
        document.getElementById('modalName').textContent = product.name;
        document.getElementById('modalPrice').textContent = product.price;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal events
closeBtn.addEventListener('click', closeModal);
// noBtn.addEventListener('click', closeModal); // Hapus baris ini karena kita akan menggantinya

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ========== MODIFIED MODAL BUTTON ACTIONS ==========

// Yes button action: Tutup modal dan scroll ke bagian produk
yesBtn.addEventListener('click', function() {
    alert(`Selamat! Diskon 10% Anda sudah aktif. Silakan lihat produk kami!`);
    closeModal();
    scrollToSection('#products'); // Scroll ke bagian Products
});

// No button action: Hanya menutup modal dan memberikan ucapan terima kasih
noBtn.addEventListener('click', function() {
    alert('Baik, terima kasih atas kunjungannya. Kami harap Anda kembali lagi!');
    closeModal();
});

// ========== CONTACT FORM ==========
const contactFormElement = document.querySelector('.contact-form');

contactFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
        alert(`Thank you, ${name}! We've received your message and will get back to you soon.`);
        contactFormElement.reset();
    }
});

// ========== RESPONSIVE NAVBAR ON SCROLL ==========
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.scrollY;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.8)';
    }
    
    lastScroll = currentScroll;
});
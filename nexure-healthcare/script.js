// Product Data Array
const productsData = [
    {
        name: "Gauze Swab Type 17 (Non-Sterile)",
        category: "Gauze Products",
        image: "images/product-gauze.png",
        desc: "High absorbency non-sterile gauze swabs for general medical use.",
        options: [
            "5x5 cm – 8 Ply (Box of 100)",
            "5x5 cm – 12 Ply (Box of 100)",
            "7.5x7.5 cm – 8 Ply (Box of 100)",
            "7.5x7.5 cm – 12 Ply (Box of 100)",
            "10x10 cm – 8 Ply (Box of 100)",
            "10x10 cm – 12 Ply (Box of 100)"
        ]
    },
    {
        name: "Gauze Swab Type 13 (Non-Sterile)",
        category: "Gauze Products",
        image: "images/product-gauze.png",
        desc: "Standard non-sterile gauze swabs for effective wound cleaning.",
        options: [
            "5x5 cm – 8 Ply (Box of 100)",
            "5x5 cm – 12 Ply (Box of 100)",
            "7.5x7.5 cm – 8 Ply (Box of 100)",
            "7.5x7.5 cm – 12 Ply (Box of 100)",
            "10x10 cm – 8 Ply (Box of 100)",
            "10x10 cm – 12 Ply (Box of 100)"
        ]
    },
    {
        name: "Beam Dyeing with X-Ray Detectable Gauze",
        category: "Gauze Products",
        image: "images/product-xray-swab.png",
        desc: "X-ray detectable gauze swabs optimized for surgical safety.",
        options: [
            "7.5x7.5 cm – 12 Ply (Box of 100)",
            "10x10 cm – 12 Ply (Box of 100)"
        ]
    },
    {
        name: "Sterile Gauze Type 17",
        category: "Gauze Products",
        image: "images/product-sterile-gauze.png",
        desc: "Individually packed sterile gauze swabs for surgical procedures.",
        options: [
            "5x5 cm – 8 Ply (Pack of 5)",
            "5x5 cm – 12 Ply (Pack of 5)",
            "7.5x7.5 cm – 8 Ply (Pack of 5)",
            "7.5x7.5 cm – 12 Ply (Pack of 5)",
            "10x10 cm – 8 Ply (Pack of 5)",
            "10x10 cm – 12 Ply (Pack of 5)"
        ]
    },
    {
        name: "Sterile Gauze Type 13",
        category: "Gauze Products",
        image: "images/product-sterile-gauze.png",
        desc: "Sterile packed standard gauze swabs for immediate wound treatment.",
        options: [
            "5x5 cm – 8 Ply (Pack of 5)",
            "5x5 cm – 12 Ply (Pack of 5)",
            "7.5x7.5 cm – 8 Ply (Pack of 5)",
            "7.5x7.5 cm – 12 Ply (Pack of 5)",
            "10x10 cm – 8 Ply (Pack of 5)",
            "10x10 cm – 12 Ply (Pack of 5)"
        ]
    },
    {
        name: "Dressing Pad (Sterile / Non-Sterile)",
        category: "Dressing Products",
        image: "images/product-dressing-pad.png",
        desc: "Sterile non-adherent dressing pads for effective exudate management.",
        options: [
            "10x10 cm (Single pad)",
            "10x10 cm (Pack of 10)",
            "10x20 cm (Single pad)",
            "10x20 cm (Pack of 10)",
            "15x15 cm (Single pad)",
            "15x15 cm (Pack of 10)"
        ]
    },
    {
        name: "Mopping Pad",
        category: "Dressing Products",
        image: "images/product-mopping-pad.png",
        desc: "Thick, highly absorbent mopping pads for precise fluid control.",
        options: [
            "25x25 cm – 8 Ply (1 pc)",
            "25x25 cm – 12 Ply (1 pc)",
            "30x30 cm – 8 Ply (1 pc)",
            "30x30 cm – 12 Ply (1 pc)"
        ]
    },
    {
        name: "Gamjee Roll (With Printing / Without Printing)",
        category: "Dressing Products",
        image: "images/product-gamjee-roll.png",
        desc: "Highly absorbent gamjee rolls of thick cotton wrapped in gauze.",
        options: [
            "10cm x 3m (With Printing) - 1 pc",
            "15cm x 2m (With Printing) - 1 pc",
            "15cm x 3m (With Printing) - 1 pc",
            "10cm x 3m (Without Printing) - 1 pc",
            "15cm x 3m (Without Printing) - 1 pc"
        ]
    },
    {
        name: "Cotton Roll",
        category: "Cotton Products",
        image: "images/product-cotton.png",
        desc: "Premium pure medical grade cotton rolls for clinical absorption.",
        options: [
            "20 gm (1 pc)",
            "50 gm (1 pc)",
            "100 gm (1 pc)",
            "200 gm (1 pc)",
            "300 gm (1 pc)",
            "400 gm (1 pc)",
            "500 gm (1 pc)"
        ]
    }
];

// Constants
const WHATSAPP_NUMBER = "917904089754";
const BRAND_NAME = "Nexure Healthcare";

let currentCategoryFilter = "All";

function renderProducts(searchQuery = '') {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const query = searchQuery.toLowerCase();
    const filteredProducts = productsData.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
        const matchesCategory = currentCategoryFilter === "All" || p.category === currentCategoryFilter;
        return matchesSearch && matchesCategory;
    });

    if (filteredProducts.length === 0) {
        grid.innerHTML = '<span style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; padding: 40px 0;">No products found with that search criteria.</span>';
        return;
    }

    // Group by category
    const grouped = {};
    filteredProducts.forEach(p => {
        if (!grouped[p.category]) grouped[p.category] = [];
        grouped[p.category].push(p);
    });

    const categoryOrder = ["Gauze Products", "Dressing Products", "Cotton Products"];

    categoryOrder.forEach(cat => {
        if (grouped[cat] && grouped[cat].length > 0) {
            const catHTML = `
                <div class="product-category-header">
                    <h3>${cat}</h3>
                    <div class="category-divider"></div>
                </div>
                <div class="products-grid-inner"></div>
            `;
            grid.insertAdjacentHTML('beforeend', catHTML);

            const innerGrids = grid.querySelectorAll('.products-grid-inner');
            const currentInnerGrid = innerGrids[innerGrids.length - 1];

            grouped[cat].forEach(product => {
                const originalIndex = productsData.indexOf(product);
                const optionsHTML = product.options.map(opt => `<option value="${opt}">${opt}</option>`).join('');

                const cardHTML = `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}" class="product-img">
                        <div class="product-info">
                            <h3 class="product-title">${product.name}</h3>
                            <p class="product-desc">${product.desc}</p>
                            <select class="product-select" id="select-${originalIndex}">
                                ${optionsHTML}
                            </select>
                            <button onclick="enquireProduct('${product.name}', ${originalIndex})" class="btn btn-green product-btn">
                                <i class='bx bxl-whatsapp'></i> Enquire on WhatsApp
                            </button>
                            <p class="bulk-order-text">Bulk orders available for hospitals, clinics, and distributors.</p>
                        </div>
                    </div>
                `;
                currentInnerGrid.insertAdjacentHTML('beforeend', cardHTML);
            });
        }
    });
}

function enquireProduct(productName, index) {
    const selectEl = document.getElementById(`select-${index}`);
    const selectedVariant = selectEl ? selectEl.value : '';
    const message = `Hello ${BRAND_NAME}, I am interested in ${productName} – Size ${selectedVariant}.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Mobile Menu Toggle & Navigation setup
function setupNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('bx-menu');
                icon.classList.add('bx-x');
            } else {
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu');
            }
        });
    }

    // Smooth Scrolling & Active State Update
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            let href = link.getAttribute('href');
            if (href.substring(1) === current) {
                link.classList.add('active');
            }
        });

        // Sticky header styling
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.padding = "10px 0";
                header.style.boxShadow = "var(--shadow-hover)";
            } else {
                header.style.padding = "15px 0";
                header.style.boxShadow = "var(--shadow-soft)";
            }
        }
    });

    // Close menu on link click (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav) nav.classList.remove('active');
            const icon = menuToggle ? menuToggle.querySelector('i') : null;
            if (icon) {
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu');
            }
        });
    });
}

// FAQ Accordion setup
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other FAQs
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Toggle the clicked FAQ
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupNavigation();
    setupFAQ();
    setupCategoryFilters();

    // Setup Search Input Listener
    const searchInput = document.getElementById('product-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderProducts(e.target.value);
        });
    }

    // Setup Quick Enquiry Form
    setupEnquiryForm();
});

// Setup Quick Enquiry Form
function setupEnquiryForm() {
    const form = document.getElementById('enquiry-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('eq-name').value;
        const business = document.getElementById('eq-business').value;
        const phone = document.getElementById('eq-phone').value;
        const product = document.getElementById('eq-product').value;
        const messageBox = document.getElementById('eq-message').value;

        // Validation for the dropdown
        if (!product) {
            alert("Please select a product required.");
            return;
        }

        // Format the WhatsApp message
        let whatsappMessage = `*Hello Nexure Healthcare,*\n\n`;
        whatsappMessage += `*Name:* ${name}\n`;

        if (business) {
            whatsappMessage += `*Hospital/Clinic:* ${business}\n`;
        }

        whatsappMessage += `*Phone:* ${phone}\n`;
        whatsappMessage += `*Product Required:* ${product}\n`;

        if (messageBox) {
            whatsappMessage += `*Message:* ${messageBox}\n`;
        }

        // Encode the message to be URL safe
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Open WhatsApp link
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');

        // Optionally reset the form
        form.reset();
    });
}

// Set up Category Filters
function setupCategoryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');

            // Set current category & re-render
            currentCategoryFilter = btn.getAttribute('data-filter');

            const searchInput = document.getElementById('product-search');
            renderProducts(searchInput ? searchInput.value : '');
        });
    });
}



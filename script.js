// ==================== ROOM DATABASE ====================
const roomsData = [
    {
        id: 1,
        title: "Overwater Presidential Villa",
        category: "villa",
        price: 850,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        capacity: "4 Guests",
        size: "180 m²",
        description: "Perched directly above crystal-clear waters, offering private infinity pool access, glass floor viewports, and dedicated 24/7 butler service."
    },
    {
        id: 2,
        title: "Royal Oceanfront Suite",
        category: "suite",
        price: 520,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
        capacity: "2 Guests",
        size: "95 m²",
        description: "Panoramic horizon views featuring floor-to-ceiling glass paneling, a marble bath, and an expansive sunset lounge terrace."
    },
    {
        id: 3,
        title: "Panoramic Skyline Deluxe",
        category: "deluxe",
        price: 340,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
        capacity: "2 Guests",
        size: "65 m²",
        description: "Modern minimalist design outfitted with high-end ambient lighting, smart climate control, and supreme acoustic insulation."
    },
    {
        id: 4,
        title: "Sunset Cliffside Haven",
        category: "villa",
        price: 920,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
        capacity: "6 Guests",
        size: "240 m²",
        description: "Nestled high on coastal cliffs providing uninterrupted panoramic ocean views, private jacuzzi, and open-air dining pavilion."
    },
    {
        id: 5,
        title: "Garden Sanctuary Suite",
        category: "suite",
        price: 410,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        capacity: "3 Guests",
        size: "80 m²",
        description: "Surrounded by lush tropical flora featuring a private plunge pool, open outdoor rain shower, and teak wood furnishings."
    },
    {
        id: 6,
        title: "Executive Luxury Deluxe",
        category: "deluxe",
        price: 290,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
        capacity: "2 Guests",
        size: "55 m²",
        description: "Tailored for refined comfort featuring ergonomic workspaces, plush king-size bedding, and complimentary spa bath amenities."
    }
];

// ==================== HOME PAGE RENDERING & FILTERING ====================
const roomsContainer = document.getElementById('rooms-container');
const searchInput = document.getElementById('room-search-input');
const categoryFilter = document.getElementById('category-filter');
const resetBtn = document.getElementById('reset-filter-btn');
const noRoomsAlert = document.getElementById('no-rooms-alert');
const roomCountBadge = document.getElementById('room-count-badge');

function renderRooms() {
    if (!roomsContainer) return; // Guard clause for other pages

    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';

    const filteredRooms = roomsData.filter(room => {
        const matchesCategory = selectedCategory === 'all' || room.category === selectedCategory;
        const matchesSearch = room.title.toLowerCase().includes(searchTerm) || 
                              room.description.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    roomsContainer.innerHTML = '';

    if (filteredRooms.length === 0) {
        noRoomsAlert.classList.remove('hidden');
        if (roomCountBadge) roomCountBadge.textContent = '0 accommodations';
    } else {
        noRoomsAlert.classList.add('hidden');
        if (roomCountBadge) roomCountBadge.textContent = `Showing ${filteredRooms.length} accommodations`;

        filteredRooms.forEach(room => {
            const card = document.createElement('div');
            card.className = "group bg-slate-800/50 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between";
            card.innerHTML = `
                <div>
                    <div class="relative overflow-hidden h-60">
                        <img src="${room.image}" alt="${room.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        <span class="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                            ${room.category}
                        </span>
                        <div class="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md text-slate-200 text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-slate-700">
                            <i class="fa-solid fa-star text-amber-400"></i> ${room.rating}
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-white group-hover:text-amber-400 transition leading-snug">
                            <a href="room-details.html?id=${room.id}">${room.title}</a>
                        </h3>
                        <p class="text-xs text-slate-400 mt-2 line-clamp-2 font-light">${room.description}</p>
                        <div class="flex items-center gap-4 text-xs text-slate-400 mt-4 pt-4 border-t border-slate-800">
                            <span><i class="fa-solid fa-user-group text-amber-500/80 mr-1"></i> ${room.capacity}</span>
                            <span><i class="fa-solid fa-vector-square text-amber-500/80 mr-1"></i> ${room.size}</span>
                        </div>
                    </div>
                </div>
                <div class="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-800/60 mt-2">
                    <div>
                        <span class="text-2xl font-extrabold text-amber-400">$${room.price}</span>
                        <span class="text-xs text-slate-500"> / night</span>
                    </div>
                    <a href="room-details.html?id=${room.id}" class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-amber-500 hover:bg-amber-400 px-4 py-2 rounded-xl transition">
                        View Details <i class="fa-solid fa-arrow-right text-[10px]"></i>
                    </a>
                </div>
            `;
            roomsContainer.appendChild(card);
        });
    }
}

// Search and Filter Listeners
if (searchInput) searchInput.addEventListener('input', renderRooms);
if (categoryFilter) categoryFilter.addEventListener('change', renderRooms);
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (categoryFilter) categoryFilter.value = 'all';
        renderRooms();
    });
}

// ==================== ROOM DETAILS PAGE LOGIC ====================
const roomDetailView = document.getElementById('room-detail-view');

function renderRoomDetails() {
    if (!roomDetailView) return; // Guard clause

    const urlParams = new URLSearchParams(window.location.search);
    const roomId = parseInt(urlParams.get('id')) || 1;
    const room = roomsData.find(item => item.id === roomId) || roomsData[0];

    roomDetailView.innerHTML = `
        <div class="lg:col-span-2 space-y-6">
            <div class="relative rounded-3xl overflow-hidden border border-slate-800 h-80 sm:h-96">
                <img src="${room.image}" alt="${room.title}" class="w-full h-full object-cover">
                <span class="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    ${room.category}
                </span>
            </div>

            <div class="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                <div class="flex justify-between items-start gap-4 flex-wrap">
                    <div>
                        <h1 class="text-2xl sm:text-3xl font-extrabold text-white">${room.title}</h1>
                        <p class="text-xs text-slate-400 mt-1"><i class="fa-solid fa-star text-amber-400 mr-1"></i> ${room.rating} Rating • Verified Accommodation</p>
                    </div>
                    <div class="text-right">
                        <span class="text-3xl font-extrabold text-amber-400">$${room.price}</span>
                        <span class="text-xs text-slate-400 block">per night</span>
                    </div>
                </div>

                <p class="text-slate-300 text-sm leading-relaxed font-light border-t border-slate-800 pt-4">${room.description}</p>

                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800 pt-4">
                    <div class="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
                        <span class="text-xs text-slate-400 block">Capacity</span>
                        <span class="text-sm font-bold text-white mt-0.5 block">${room.capacity}</span>
                    </div>
                    <div class="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
                        <span class="text-xs text-slate-400 block">Total Area</span>
                        <span class="text-sm font-bold text-white mt-0.5 block">${room.size}</span>
                    </div>
                    <div class="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center col-span-2 sm:col-span-1">
                        <span class="text-xs text-slate-400 block">Breakfast</span>
                        <span class="text-sm font-bold text-emerald-400 mt-0.5 block">Included</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Booking Sidebar Form -->
        <div class="bg-slate-800/60 border border-slate-800 rounded-3xl p-6 sm:p-8 h-fit backdrop-blur-xl space-y-4">
            <h3 class="text-xl font-bold text-white border-b border-slate-700 pb-3">Reserve Accommodation</h3>
            
            <form id="booking-form" class="space-y-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Check-in Date</label>
                    <input type="date" required class="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Check-out Date</label>
                    <input type="date" required class="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Guests</label>
                    <select class="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-500">
                        <option>1 Adult</option>
                        <option selected>2 Adults</option>
                        <option>2 Adults, 2 Children</option>
                    </select>
                </div>

                <div class="border-t border-slate-700 pt-3 space-y-2 text-xs text-slate-300">
                    <div class="flex justify-between">
                        <span>Nightly Rate</span>
                        <span>$${room.price}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Service Fee</span>
                        <span>$50</span>
                    </div>
                    <div class="flex justify-between font-bold text-white text-sm pt-2 border-t border-slate-700">
                        <span>Total Estimated</span>
                        <span class="text-amber-400">$${room.price + 50}</span>
                    </div>
                </div>

                <button type="submit" class="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-extrabold py-3 rounded-xl text-sm transition shadow-lg shadow-amber-500/20">
                    Confirm Reservation
                </button>
            </form>
            <div id="booking-alert" class="hidden text-xs text-emerald-400 text-center font-medium pt-2">
                <i class="fa-solid fa-circle-check mr-1"></i> Reservation submitted! Redirecting...
            </div>
        </div>
    `;

    // Dynamic Form Handlers
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const alertBox = document.getElementById('booking-alert');
            alertBox.classList.remove('hidden');
            setTimeout(() => {
                alertBox.classList.add('hidden');
                bookingForm.reset();
            }, 3000);
        });
    }
}

// ==================== CONTACT FORM LOGIC ====================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const contactAlert = document.getElementById('contact-alert');
        contactAlert.classList.remove('hidden');
        contactForm.reset();
        setTimeout(() => contactAlert.classList.add('hidden'), 4000);
    });
}

// Initializing Logic
document.addEventListener('DOMContentLoaded', () => {
    renderRooms();
    renderRoomDetails();
});
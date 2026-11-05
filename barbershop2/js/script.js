/* ========== SHARED CONFIG — edit this section to customise the site ========== */
// Replace the placeholder below with the business WhatsApp number in international
// format: digits only, no plus sign, spaces or dashes (e.g. "2348012345678").
const businessWhatsAppNumber = "2348033811028";
const BRAND = "Zacchaeus Unisex Salon & Spa"; // business name used in the logo & footer
const HEADER_LOGO_IMAGE = "https://zaccheausunisexsalon.lovable.app/__l5e/assets-v1/e33d14cc-4cac-4521-9268-f7a241d2a0d5/zaccheaus-logo.jpeg";
// Update these links when the salon's social profiles change.
const SOCIAL_LINKS = {
    instagram: "https://www.instagram.com/zaccheaus_unisex_salon_and_spa?obrf=MWg2Ym9rdWx6d3cydw==",
    tiktok: "https://www.tiktok.com/@zaccheaus_unisex_salon_a?_r=1&_t=ZS-9B1iTybsYwU",
    snapchat: "https://snapchat.com/t/PzCLxCdp"
};
const CONFIG = {
    branches: ["Main Branch (Ogbomosho, Nigeria)"],
    barbers: ["Barber One", "Barber Two", "Barber Three"],
    times: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"]
};
// Service categories and booking options match the four categories on index.html and
// services.html. Keep category keys and service names in sync with services.html.
const CATS = {
    hair: "Ladies Hair",
    nails: "Nails & Face",
    barbing: "Barbing",
    lash: "Lash & Brows",
    specialty: "Specialty Services"
};
const BOOKING_SERVICES = {
    hair: ["Normal gel", "Gel ponytail", "Closure sew-in", "Frontal sew-in", "Frontal installation", "Coloring of wig", "Wig revamping", "Straightening of long wig", "Straightening of short wig", "Natural hair straightening", "Relaxer and Setting", "Braids (Men and Women)"],
    nails: ["Pedicure & leg massage", "Jelly pedi", "Milk pedicure", "Manicure", "Acrylic & Gel", "Hydrating facial", "Anti-aging facial", "Refreshing facial", "Pimples and Acne pore extraction (Regular)", "Pimples and Acne pore extraction (Advance)", "Pimples and Acne pore extraction (Pro)", "Skin tag removal", "Knuckles wash"],
    barbing: ["Men haircut", "Carving and shaving", "Women haircut", "Children haircut", "Cut and black dye (Male)", "Carve and black dye", "Cut and black dye (Female)", "Basic gold tint (Male)", "Basic gold tint (Female)", "White tint (Male & Female)", "Low cut, tinting (Wine, Ginger, Red, etc)", "Sporting wave wash & clean", "Fresh Dread (Short hair)", "Fresh Dread (Long hair)", "Dread washing", "Dread maintenance (Relock)", "Cut and black dye with relaxer (Male)", "Legends Pac (Barbing, dying, mini facial steam & neck vibrating massage)"],
    lash: ["Classic lash extension", "Hybrid lash extension", "Volume lash extension", "Wispy lash extension", "Mega volume lash extension", "Bottom lash", "Customized full set", "Microblading", "Micro shading", "Ombre shading", "Combination brows", "Brow tint", "Brow lamination"],
    specialty: ["Tattoo", "Professional Piercing", "Teeth Whitening", "Mobile Barbering", "Barber / Spa Academy"]
};
const SERVICE_CATEGORIES = {
    haircut: "grooming",
    "braids (men and women)": "plaits",
    wig: "installation",
    dreadlocs: "locks",
    "acrylic & gel": "nails",
    "skin rejuvenation": "facial",
    footcare: "pedicure",
    tattoo: "bodyart",
    "professional piercing": "bodyart",
    "teeth whitening": "dental",
    "mobile barbering": "home",
    "barber / spa academy": "training"
};
const SERVICE_NAME_ALIASES = {
    "braids(men and women)": "Braids (Men and Women)",
    "arcylic & gel": "Acrylic & Gel",
    tatto: "Tattoo",
    "barber /spa academy": "Barber / Spa Academy"
};
/* ========== END CONFIG ========== */
const $ = s => document.querySelector(s);
const waReady = () => /^\d{10,15}$/.test(businessWhatsAppNumber);
const WA_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.6-.3.3c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 1.9 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>';
const FOOTER_ICONS = {
    location: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-7.2 8-13a8 8 0 1 0-16 0c0 5.8 8 13 8 13zm0-10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2 11.4 11.4 0 0 0 3.5.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17.9 17.9 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .6 3.5 1 1 0 0 1-.2 1z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v4.6l3.2 1.9-1 1.7-4.2-2.6V7z"/></svg>'
};
const SOCIAL_ICONS = {
    instagram: '<svg class="icon-instagram" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".75"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.6 7.1a6.7 6.7 0 0 1-4.1-1.4v8.1a6.1 6.1 0 1 1-5.3-6.1v3.2a2.9 2.9 0 1 0 2.1 2.8V2.5h3.2c.2 2.2 1.8 4 4.1 4.3v.3z"/></svg>',
    snapchat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2a4.8 4.8 0 0 0-4.8 4.8v2.6c-.7.5-1.5.6-2.3.4a.6.6 0 0 0-.3 1.1c.7.3 1.7.4 2.6.1.2.5.1 1-.1 1.5-.7 1.3-2 2.3-3.2 2.6a.6.6 0 0 0 .1 1.1c.9.2 1.3.7 1.6 1.1.4.5.9.8 1.7.8.3 0 .5.1.7.3.7.7 1.5 1 2.3 1s1.6-.3 2.3-1c.2-.2.4-.3.7-.3.8 0 1.3-.3 1.7-.8.3-.4.7-.9 1.6-1.1a.6.6 0 0 0 .1-1.1c-1.2-.3-2.5-1.3-3.2-2.6-.2-.5-.3-1-.1-1.5.9.3 1.9.2 2.6-.1a.6.6 0 0 0-.3-1.1c-.8.2-1.6.1-2.3-.4V7a4.8 4.8 0 0 0-4.8-4.8z"/></svg>'
};
/* header & footer */
const page = location.pathname.split("/").pop() || "index.html";
const links = [["index.html", "Home"], ["about.html", "About"], ["services.html", "Services"], ["gallery.html", "Gallery"], ["contact.html", "Contact"]];
const headerLogo = HEADER_LOGO_IMAGE
    ? `<img src="${HEADER_LOGO_IMAGE}" alt="${BRAND}">`
    : `${BRAND.split(" ")[0]} <b>${BRAND.split(" ").slice(1).join(" ")}</b>`;
$("#site-header").innerHTML = `<header class="nav"><div class="wrap"><a class="logo" href="index.html">${headerLogo}</a>
<button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
<ul class="menu">${links.map(l => `<li><a href="${l[0]}" class="${l[0] == page ? "active" : ""}">${l[1]}</a></li>`).join("")}<li><a class="btn solid" href="booking.html">BOOK APPOINTMENT</a></li></ul></div></header>`;
$("#site-footer").innerHTML = `<footer><div class="wrap"><div class="fgrid">
<div><a class="logo" href="index.html">${BRAND}</a><p style="margin-top:.8rem">Precision cuts and premium grooming.</p><div class="soc">
<a href="${waReady() ? `https://wa.me/${businessWhatsAppNumber}?text=${encodeURIComponent("Hello! I would like to make an enquiry.")}` : "#"}" aria-label="WhatsApp" target="_blank" rel="noopener">${WA_SVG}</a>
<a href="${SOCIAL_LINKS.instagram}" aria-label="Instagram" target="_blank" rel="noopener">${SOCIAL_ICONS.instagram}</a>
<a href="${SOCIAL_LINKS.tiktok}" aria-label="TikTok" target="_blank" rel="noopener">${SOCIAL_ICONS.tiktok}</a>
<a href="${SOCIAL_LINKS.snapchat}" aria-label="Snapchat" target="_blank" rel="noopener">${SOCIAL_ICONS.snapchat}</a>
</div></div>
<div><h3>Quick Links</h3><ul>${links.map(l => `<li><a href="${l[0]}">${l[1]}</a></li>`).join("")}<li><a href="booking.html">Book Appointment</a></li></ul></div>
<div><h3>Services</h3><ul>${Object.entries(CATS).map(([k, c]) => `<li><a href="services.html?cat=${k}">${c}</a></li>`).join("")}</ul></div>
<div><h3>Contact</h3><ul class="footer-details"><li>${FOOTER_ICONS.location}<span>Opposite prestige along item 7, sabo ogbomosho</span></li><li>${FOOTER_ICONS.phone}<a href="tel:+${businessWhatsAppNumber}">08033811028</a></li></ul><h3 style="margin-top:1rem">Opening Hours</h3><p class="footer-hours">${FOOTER_ICONS.clock}<span>Mon-Sat: 9am - 9pm<br>Sundays: 12pm - 6pm</span></p></div>
</div><p class="copy">&copy; ${new Date().getFullYear()} ${BRAND}. All rights reserved.</p></div></footer>`;
const whatsappButton = document.createElement("a");
whatsappButton.className = "wa-sticky";
whatsappButton.href = waReady()
    ? `https://wa.me/${businessWhatsAppNumber}?text=${encodeURIComponent("Hello! I would like to book an appointment.")}`
    : "#";
whatsappButton.target = "_blank";
whatsappButton.rel = "noopener";
whatsappButton.setAttribute("aria-label", "Book an appointment on WhatsApp");
whatsappButton.title = "Book an appointment on WhatsApp";
whatsappButton.innerHTML = WA_SVG;
whatsappButton.addEventListener("click", event => {
    if (!waReady()) {
        event.preventDefault();
        alert("The business WhatsApp number has not been configured yet. Set businessWhatsAppNumber in js/script.js.");
    }
});
document.body.append(whatsappButton);
/* nav behaviour */
const nav = $(".nav"), burger = $(".burger"), menu = $(".menu"), topBtn = $("#top");
burger.onclick = () => { const o = menu.classList.toggle("open"); burger.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); };
menu.onclick = e => { if (e.target.tagName == "A") {
    menu.classList.remove("open");
    burger.classList.remove("open");
} };
const onScroll = () => { nav.classList.toggle("scrolled", scrollY > 40); topBtn.classList.toggle("show", scrollY > 600); };
addEventListener("scroll", onScroll, { passive: true });
onScroll();
topBtn.onclick = () => scrollTo({ top: 0, behavior: "smooth" });
/* hero video fallback & loading optimisation */
const hero = $(".hero"), hv = $(".hero video");
if (hv) {
    const c = navigator.connection || {};
    if (c.saveData || /2g/.test(c.effectiveType || "") || matchMedia("(prefers-reduced-motion: reduce)").matches) {
        hv.remove();
    }
    else {
        hv.muted = true;
        const src = hv.querySelector("source");
        if (src)
            src.addEventListener("error", () => hero.classList.add("no-video"));
        hv.addEventListener("error", () => hero.classList.add("no-video"));
        hv.play && hv.play().catch(() => hero.classList.add("no-video"));
    }
}
/* filter buttons helper — builds a row of buttons and calls cb(key) when one is clicked */
function filterBar(el, items, cb) {
    el.innerHTML = items.map((x, i) => `<button class="${i ? "" : "on"}" data-k="${x[0]}">${x[1]}</button>`).join("");
    el.onclick = e => { const b = e.target.closest("button"); if (!b)
        return; el.querySelectorAll("button").forEach(x => x.classList.remove("on")); b.classList.add("on"); cb(b.dataset.k); };
}
/* Services are filtered by category/search and paginated on small home-page screens. */
const sg = $("#svc-grid");
if (sg) {
    let cat = "all", q = "", pageIndex = 0;
    const useMobilePagination = Boolean(sg.closest("#services"));
    const mobileServices = matchMedia("(max-width: 640px)");
    const cardsPerPage = 4;
    const cards = () => [...sg.querySelectorAll(".card")];
    cards().forEach(card => {
        const title = card.querySelector("h3");
        if (!title)
            return;
        const currentName = title.textContent.trim().replace(/\s+/g, " ");
        const name = SERVICE_NAME_ALIASES[currentName.toLowerCase()] || currentName;
        const category = SERVICE_CATEGORIES[name.toLowerCase()];
        title.textContent = name;
        if (category) {
            card.dataset.cat = category;
            const tag = card.querySelector(".tag");
            if (tag)
                tag.textContent = CATS[category];
        }
        const image = card.querySelector("img");
        if (image)
            image.alt = name;
        const bookingLink = card.querySelector(".row .btn");
        if (bookingLink)
            bookingLink.href = `booking.html?service=${encodeURIComponent(name)}`;
    });
    const ss = $("#svc-search");
    if (ss) {
        const suggestions = document.createElement("datalist");
        suggestions.id = "svc-suggestions";
        suggestions.innerHTML = cards().map(card => {
            const name = card.querySelector("h3")?.textContent.trim();
            return name ? `<option value="${name.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"></option>` : "";
        }).join("");
        document.body.append(suggestions);
        ss.setAttribute("list", suggestions.id);
        ss.setAttribute("autocomplete", "off");
    }
    const pagination = document.createElement("nav");
    pagination.className = "svc-pagination";
    pagination.setAttribute("aria-label", "Service pages");
    pagination.innerHTML = '<button type="button" class="svc-page-prev">Previous</button><span aria-live="polite"></span><button type="button" class="svc-page-next">Next</button>';
    sg.after(pagination);
    const previousPage = pagination.querySelector(".svc-page-prev");
    const nextPage = pagination.querySelector(".svc-page-next");
    const pageStatus = pagination.querySelector("span");
    const emptyState = ss ? document.createElement("p") : null;
    if (emptyState) {
        emptyState.className = "svc-empty";
        emptyState.setAttribute("role", "status");
        emptyState.textContent = "No services match your search.";
        emptyState.hidden = true;
        sg.after(emptyState);
    }
    const apply = () => {
        const allCards = cards();
        allCards.forEach(c => {
            const matchCat = cat === "all" || c.dataset.cat === cat;
            const imageAlt = c.querySelector("img")?.alt || "";
            const searchableText = `${c.textContent} ${imageAlt} ${c.dataset.search || ""}`.toLowerCase();
            const matchQ = !q || searchableText.includes(q);
            c.dataset.serviceMatch = String(matchCat && matchQ);
        });
        const matchingCards = allCards.filter(c => c.dataset.serviceMatch === "true");
        const pageCount = Math.max(1, Math.ceil(matchingCards.length / cardsPerPage));
        pageIndex = Math.min(pageIndex, pageCount - 1);
        const start = pageIndex * cardsPerPage;
        const paginate = useMobilePagination && mobileServices.matches;
        allCards.forEach(c => {
            const match = c.dataset.serviceMatch === "true";
            const matchIndex = matchingCards.indexOf(c);
            c.hidden = !match || (paginate && (matchIndex < start || matchIndex >= start + cardsPerPage));
        });
        pagination.hidden = !useMobilePagination || !mobileServices.matches || matchingCards.length <= cardsPerPage;
        pageStatus.textContent = `Page ${pageIndex + 1} of ${pageCount}`;
        previousPage.disabled = pageIndex === 0;
        nextPage.disabled = pageIndex >= pageCount - 1;
        if (emptyState)
            emptyState.hidden = matchingCards.length > 0;
    };
    const sf = $("#svc-filters");
    if (sf) {
        const categories = [...new Set(cards().map(c => c.dataset.cat).filter(Boolean))];
        const extraCategories = categories.filter(key => !CATS[key]).map(key => [key, key]);
        filterBar(sf, [["all", "All"], ...Object.entries(CATS), ...extraCategories], k => { cat = k; pageIndex = 0; apply(); });
    }
    if (ss)
        ss.addEventListener("input", () => { q = ss.value.trim().toLowerCase(); pageIndex = 0; apply(); });
    previousPage.addEventListener("click", () => { if (pageIndex > 0) { pageIndex--; apply(); } });
    nextPage.addEventListener("click", () => { pageIndex++; apply(); });
    mobileServices.addEventListener("change", apply);
    apply();
}
/* The gallery hero loops the first five seconds of its single background clip. */
const galleryHeaderVideo = $(".gallery-header-video");
if (galleryHeaderVideo && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const heroClipDuration = 5;
    galleryHeaderVideo.addEventListener("timeupdate", () => {
        if (galleryHeaderVideo.duration > heroClipDuration && galleryHeaderVideo.currentTime >= heroClipDuration)
            galleryHeaderVideo.currentTime = 0;
    });
    galleryHeaderVideo.addEventListener("ended", () => {
        galleryHeaderVideo.currentTime = 0;
        galleryHeaderVideo.play().catch(() => galleryHeaderVideo.classList.add("is-static"));
    });
    galleryHeaderVideo.play().catch(() => galleryHeaderVideo.classList.add("is-static"));
}
const gg = $("#gal-grid");
if (gg) {
    const items = [...gg.querySelectorAll(".gi")];
    let cat = "all", cur = items, i = 0;
    const apply = () => { items.forEach(b => b.hidden = !(cat === "all" || b.dataset.cat === cat)); cur = items.filter(b => !b.hidden); };
    const gf = $("#gal-filters");
    if (gf) {
        const cats = [...new Set(items.map(b => b.dataset.cat))];
        filterBar(gf, [["all", "All"], ...cats.map(c => [c, c])], k => { cat = k; apply(); });
    }
    const galleryVideos = [...gg.querySelectorAll("video")];
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const videoObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const video = entry.target;
                if (!(video instanceof HTMLVideoElement))
                    return;
                if (entry.isIntersecting) {
                    video.play().catch(error => console.warn("Gallery video playback could not start:", error));
                }
                else {
                    video.pause();
                }
            });
        }, { threshold: .35 });
        galleryVideos.forEach(video => videoObserver.observe(video));
    }
    document.body.insertAdjacentHTML("beforeend", '<div class="lb" role="dialog" aria-modal="true" aria-label="Gallery viewer"><button class="x" aria-label="Close">&times;</button><button class="p" aria-label="Previous">&#8249;</button><div class="lb-media"></div><button class="n" aria-label="Next">&#8250;</button></div>');
    const lb = $(".lb"), lbMedia = $(".lb-media");
    const closeLightbox = () => {
        const video = lbMedia.querySelector("video");
        if (video)
            video.pause();
        lbMedia.replaceChildren();
        lb.classList.remove("on");
    };
    const show = n => {
        i = (n + cur.length) % cur.length;
        lbMedia.replaceChildren();
        const source = cur[i].querySelector("img, video");
        if (source instanceof HTMLVideoElement) {
            const video = document.createElement("video");
            video.src = source.currentSrc || source.src;
            video.controls = true;
            video.autoplay = true;
            video.muted = true;
            video.playsInline = true;
            video.setAttribute("aria-label", source.getAttribute("aria-label") || cur[i].textContent.trim());
            lbMedia.append(video);
        }
        else if (source instanceof HTMLImageElement) {
            const image = document.createElement("img");
            image.src = source.currentSrc || source.src;
            image.alt = source.alt;
            lbMedia.append(image);
        }
        lb.classList.add("on");
    };
    gg.onclick = e => { const b = e.target.closest(".gi"); if (b && !b.hidden && !b.classList.contains("gi-instagram"))
        show(cur.indexOf(b)); };
    lb.querySelector(".x").onclick = closeLightbox;
    lb.querySelector(".p").onclick = () => show(i - 1);
    lb.querySelector(".n").onclick = () => show(i + 1);
    lb.onclick = e => { if (e.target == lb)
        closeLightbox(); };
    addEventListener("keydown", e => { if (!lb.classList.contains("on"))
        return; if (e.key == "Escape")
        closeLightbox(); if (e.key == "ArrowLeft")
        show(i - 1); if (e.key == "ArrowRight")
        show(i + 1); });
    let sx = 0;
    lb.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
    lb.addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50)
        show(i + (d < 0 ? 1 : -1)); });
}
/* WhatsApp buttons */
document.querySelectorAll(".wa").forEach(b => b.insertAdjacentHTML("afterbegin", WA_SVG));
document.querySelectorAll("a[data-wa]").forEach(a => {
    a.href = waReady() ? `https://wa.me/${businessWhatsAppNumber}?text=${encodeURIComponent("Hello! I would like to make an enquiry.")}` : "#";
    a.target = "_blank";
    a.rel = "noopener";
    a.onclick = e => { if (!waReady()) {
        e.preventDefault();
        alert("The business WhatsApp number has not been configured yet. Set businessWhatsAppNumber in js/script.js.");
    } };
});
const contactForm = $("#cf");
if (contactForm) {
    contactForm.addEventListener("submit", event => {
        event.preventDefault();
        if (!waReady()) {
            alert("The business WhatsApp number has not been configured yet. Set businessWhatsAppNumber in js/script.js.");
            return;
        }
        const name = $("#cn").value.trim();
        const email = $("#ce").value.trim();
        const message = $("#cm").value.trim();
        const details = [`Name: ${name}`];
        if (email)
            details.push(`Email: ${email}`);
        details.push(`Message: ${message}`);
        const text = `Hello! I would like to make an enquiry.\n\n${details.join("\n")}`;
        location.href = `https://wa.me/${businessWhatsAppNumber}?text=${encodeURIComponent(text)}`;
    });
}
/* scroll animations */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) {
    e.target.classList.add("in");
    io.unobserve(e.target);
} }), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
// Initialize Supabase
const SUPABASE_URL = 'https://dlltsgczsevxzkrcskwi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_o44vDOkHkH8Mz3cookjP3w_dh4FecRC';

if (typeof supabase !== "undefined") {
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const bookingForm = document.getElementById("bk");

    if (bookingForm) {
        bookingForm.addEventListener("submit", async event => {
            event.preventDefault();

            // Safely retrieve values from text inputs, dates, and select dropdowns
            const payload = { 
                name: document.getElementById("name")?.value || "", 
                phone: document.getElementById("phone")?.value || "", 
                email: document.getElementById("email")?.value || "", 
                service: document.getElementById("service")?.value || "", 
                appointment_date: document.getElementById("date")?.value || "", 
                time: document.getElementById("time")?.value || "", 
                notes: document.getElementById("notes")?.value || "" 
            };

            console.log("Submitting payload:", payload);

            const { data, error } = await supabaseClient
                .from("ZACCHAEUS DE BARBER")
                .insert([payload]);

            if (error) {
                console.error("Supabase Error Details:", error);
                alert("Database Error: " + error.message);
            } else {
                alert("Submitted successfully!");
                bookingForm.reset();
            }
        });
    }
}
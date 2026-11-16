/* Booking request submission and preferred messaging handoff. */
(() => {
    const f = $("#booking-form");
    if (!f)
        return;
    const submitButton = f.querySelector('[type="submit"]');
    const submitLabel = submitButton.textContent;
    const PLATFORM_NAMES = { whatsapp: "WhatsApp", instagram: "Instagram", tiktok: "TikTok", snapchat: "Snapchat" };
    const PLATFORM_DESTINATIONS = {
        instagram: "https://ig.me/m/zaccheaus_unisex_salon_and_spa",
        tiktok: SOCIAL_LINKS.tiktok,
        snapchat: SOCIAL_LINKS.snapchat
    };
    // Prices match the services page. "estimate" means a starting price.
    const SERVICE_CATALOG = [{"label": "Ladies Hair", "services": [{"name": "Normal gel", "price": 25000, "estimate": false}, {"name": "Gel ponytail", "price": 20000, "estimate": false}, {"name": "Closure sew-in", "price": 25000, "estimate": false}, {"name": "Frontal sew-in", "price": 28000, "estimate": false}, {"name": "Frontal installation", "price": 30000, "estimate": false}, {"name": "Coloring of wig", "price": 20000, "estimate": false}, {"name": "Wig revamping", "price": 12000, "estimate": false}, {"name": "Straightening of long wig", "price": 10000, "estimate": false}, {"name": "Straightening of short wig", "price": 12000, "estimate": false}, {"name": "Natural hair straightening", "price": 10000, "estimate": false}, {"name": "Relaxer and Setting", "price": 15000, "estimate": false}, {"name": "Braids (Men and Women)", "price": 15000, "estimate": true}]}, {"label": "Nails & Face", "services": [{"name": "Pedicure & leg massage", "price": 15000, "estimate": false}, {"name": "Jelly pedi", "price": 20000, "estimate": false}, {"name": "Milk pedicure", "price": 25000, "estimate": false}, {"name": "Manicure", "price": 8000, "estimate": false}, {"name": "Acrylic & Gel", "price": 7000, "estimate": true}, {"name": "Hydrating facial", "price": 25000, "estimate": false}, {"name": "Anti-aging facial", "price": 25000, "estimate": false}, {"name": "Refreshing facial", "price": 20000, "estimate": false}, {"name": "Pimples and Acne pore extraction (Regular)", "price": 25000, "estimate": false}, {"name": "Pimples and Acne pore extraction (Advance)", "price": 35000, "estimate": false}, {"name": "Pimples and Acne pore extraction (Pro)", "price": 45000, "estimate": false}, {"name": "Skin tag removal", "price": 20000, "estimate": false}, {"name": "Knuckles wash", "price": 10000, "estimate": false}]}, {"label": "Barbing", "services": [{"name": "Men haircut", "price": 5000, "estimate": false}, {"name": "Carving and shaving", "price": 3000, "estimate": false}, {"name": "Women haircut", "price": 6000, "estimate": false}, {"name": "Children haircut", "price": 3000, "estimate": false}, {"name": "Cut and black dye (Male)", "price": 7000, "estimate": false}, {"name": "Carve and black dye", "price": 5000, "estimate": false}, {"name": "Cut and black dye (Female)", "price": 7000, "estimate": false}, {"name": "Basic gold tint (Male)", "price": 20000, "estimate": false}, {"name": "Basic gold tint (Female)", "price": 20000, "estimate": false}, {"name": "White tint (Male & Female)", "price": 25000, "estimate": false}, {"name": "Low cut, tinting (Wine, Ginger, Red, etc)", "price": 30000, "estimate": false}, {"name": "Sporting wave wash & clean", "price": 10000, "estimate": false}, {"name": "Fresh Dread (Short hair)", "price": 40000, "estimate": false}, {"name": "Fresh Dread (Long hair)", "price": 40000, "estimate": false}, {"name": "Dread washing", "price": 3000, "estimate": false}, {"name": "Dread maintenance (Relock)", "price": 30000, "estimate": false}, {"name": "Cut and black dye with relaxer (Male)", "price": 15000, "estimate": false}, {"name": "Legends Pac (Barbing, dying, mini facial steam & neck vibrating massage)", "price": 50000, "estimate": false}]}, {"label": "Lash & Brows", "services": [{"name": "Classic lash extension", "price": 15000, "estimate": false}, {"name": "Hybrid lash extension", "price": 18000, "estimate": false}, {"name": "Volume lash extension", "price": 22000, "estimate": false}, {"name": "Wispy lash extension", "price": 8000, "estimate": false}, {"name": "Mega volume lash extension", "price": 25000, "estimate": false}, {"name": "Bottom lash", "price": 8000, "estimate": false}, {"name": "Customized full set", "price": 38000, "estimate": false}, {"name": "Microblading", "price": 30000, "estimate": false}, {"name": "Micro shading", "price": 35000, "estimate": false}, {"name": "Ombre shading", "price": 40000, "estimate": false}, {"name": "Combination brows", "price": 45000, "estimate": false}, {"name": "Brow tint", "price": 10000, "estimate": false}, {"name": "Brow lamination", "price": 10000, "estimate": false}]}, {"label": "Specialty Services", "services": [{"name": "Tattoo", "price": 15000, "estimate": true}, {"name": "Professional Piercing", "price": 8000, "estimate": true}, {"name": "Teeth Whitening", "price": 50000, "estimate": true}, {"name": "Mobile Barbering", "price": 30000, "estimate": true}, {"name": "Barber / Spa Academy", "price": 200000, "estimate": true}]}];

    const serviceOptions = $("#service-options");
    const formatNaira = amount => `₦${new Intl.NumberFormat("en-NG").format(amount)}`;
    const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    serviceOptions.innerHTML = SERVICE_CATALOG.map(category => `
        <fieldset class="service-category">
          <legend>${esc(category.label)}</legend>
          ${category.services.map(({ name, price, estimate }) => `<label class="service-option">
              <input type="checkbox" value="${esc(name)}" data-price="${price}" data-estimate="${estimate}">
              <span><span class="service-name">${esc(name)}</span><small>${estimate ? "From " : ""}${formatNaira(price)}</small></span>
            </label>`).join("")}
        </fieldset>`).join("");

    const opts = (arr, ph) => `<option value="">${ph}</option>` + arr.map(x => `<option>${x}</option>`).join("");
    $("#time").innerHTML = opts(CONFIG.times, "Select a time");
    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
    $("#date").min = today;
    const wanted = new URLSearchParams(location.search).get("service");
    if (wanted) {
        const option = [...serviceOptions.querySelectorAll("input")].find(input => input.value.toLowerCase() === wanted.toLowerCase());
        if (option)
            option.checked = true;
    }

    const val = id => $("#" + id)?.value.trim() || "";
    const setErr = (id, message) => {
        const error = id === "service" ? $("#service .err") : $("#" + id).parentElement.querySelector(".err");
        error.textContent = message || "";
        return !!message;
    };
    const validPhone = phone => /^\+?[\d\s().-]+$/.test(phone) && phone.replace(/\D/g, "").length >= 10 && phone.replace(/\D/g, "").length <= 15;
    const note = $("#note");
    const show = (message, bad, success) => {
        note.hidden = false;
        note.className = "notice full" + (bad ? " bad" : success ? " success" : "");
        note.textContent = message;
        note.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    const selectedServices = () => [...serviceOptions.querySelectorAll("input:checked")];
    const updateTotal = () => {
        const selected = selectedServices();
        const total = selected.reduce((sum, input) => sum + Number(input.dataset.price), 0);
        $("#service-total").textContent = formatNaira(total);
    };
    serviceOptions.addEventListener("change", updateTotal);
    updateTotal();

    const copyText = async text => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        }
        catch (error) {
            const temporaryInput = document.createElement("textarea");
            temporaryInput.value = text;
            temporaryInput.setAttribute("readonly", "");
            temporaryInput.style.position = "fixed";
            temporaryInput.style.opacity = "0";
            document.body.append(temporaryInput);
            temporaryInput.select();
            let copied = false;
            try {
                copied = document.execCommand("copy");
            }
            catch (_) { }
            temporaryInput.remove();
            return copied;
        }
    };
    /* Sending the request to the chosen platform */
    const panel = $("#social-booking");
    const buildMessage = ({ total, hasEstimatedPrices, date, time, platform }) => {
        const nice = new Date(date + "T00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
        return `Hello! I would like to book an appointment at ${BRAND}.

APPOINTMENT REQUEST

Customer Name: ${val("name") || ""}

Phone Number: ${val("phone") || ""}

Estimated Total: ${formatNaira(total)}${hasEstimatedPrices ? " (includes starting prices)" : ""}

Appointment Date: ${nice}

Appointment Time: ${time}

Preferred Platform: ${PLATFORM_NAMES[platform]}

Please confirm whether this appointment is available and the final service price.

Thank you!`;
    };
    const showPanel = ({ msg, openUrl, openLabel, notice }) => {
        panel.hidden = false;
        const n = panel.querySelector(".notice");
        if (n)
            n.textContent = notice;
        $("#booking-message").value = msg;
        $("#copy-status").textContent = "";
        const link = $("#social-booking-link");
        link.hidden = !openUrl;
        if (openUrl) {
            link.href = openUrl;
            link.textContent = openLabel;
        }
        panel.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    $("#copy-booking-message")?.addEventListener("click", async () => {
        $("#copy-status").textContent = (await copyText($("#booking-message").value))
            ? "Request copied. Paste it into your chat."
            : "Could not copy. Select the text above and copy it manually.";
    });

    f.addEventListener("submit", async event => {
        event.preventDefault();
        note.hidden = true;
        panel.hidden = true;
        const date = val("date");
        const errors = [
            setErr("name", val("name").length < 2 ? "Please enter your full name." : ""),
            setErr("phone", validPhone(val("phone")) ? "" : "Enter 10–15 digits, for example 08033811028 or +2348033811028."),
            setErr("service", selectedServices().length ? "" : "Please select at least one service."),
            setErr("date", !date ? "Please choose a date." : date < today ? "Date cannot be in the past." : ""),
            setErr("time", val("time") ? "" : "Please choose a time."),
            setErr("platform", val("platform") ? "" : "Please choose your preferred messaging platform.")
        ];
        if (errors.some(Boolean))
            return show("Please fix the highlighted fields.", true);

        const platform = val("platform");
        const profile = platform === "whatsapp" ? "" : PLATFORM_DESTINATIONS[platform] || "";
        if (platform === "whatsapp" && !waReady())
            return show("WhatsApp number is not configured. The site owner must set businessWhatsAppNumber in js/script.js.", true);
        if (platform !== "whatsapp" && !profile)
            return show("That platform's profile link is not configured yet. Please choose another platform.", true);

        const selected = selectedServices();
        const total = selected.reduce((sum, input) => sum + Number(input.dataset.price), 0);
        const services = selected.map(input => ({
            name: input.value,
            price: Number(input.dataset.price),
            estimate: input.dataset.estimate === "true"
        }));
        const time = val("time");
        const customer = { name: val("name"), phone: val("phone") };

        const hasEstimatedPrices = services.some(service => service.estimate);
        const msg = buildMessage({ total, hasEstimatedPrices, date, time, platform });
        const openUrl = platform === "whatsapp"
            ? `https://wa.me/${businessWhatsAppNumber}?text=${encodeURIComponent(msg)}`
            : profile;
        const popup = window.open("", "_blank");
        const copiedMessage = copyText(msg);
        const openPlatform = () => {
            if (!popup)
                return false;
            try {
                popup.opener = null;
                popup.location.replace(openUrl);
                return true;
            }
            catch (error) {
                console.error("Could not open the selected messaging platform.", error);
                return false;
            }
        };
        const showHandoff = async notice => {
            const copied = await copiedMessage;
            showPanel({
                msg,
                openUrl,
                openLabel: "Open " + PLATFORM_NAMES[platform],
                notice: `${notice} ${copied ? "The request was copied." : "Copy the request below."}`
            });
        };

        if (typeof supabase === "undefined" || typeof SUPABASE_URL === "undefined" || typeof SUPABASE_ANON_KEY === "undefined") {
            openPlatform();
            showHandoff("The messaging platform was opened, but the booking could not be saved because Supabase is not configured.");
            return show("Your request is ready to send, but it was not saved on the website. Check the Supabase setup, then submit again.", true);
        }

        submitButton.disabled = true;
        submitButton.textContent = "Submitting securely…";
        let succeeded = false;
        try {
            const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            const { error: bookingError } = await client
                .from("appointment_requests")
                .insert([{
                    full_name: customer.name,
                    phone: customer.phone,
                    services,
                    total_amount: total,
                    has_estimated_prices: services.some(service => service.estimate),
                    appointment_date: date,
                    appointment_time: time,
                    preferred_platform: platform
                }]);
            if (bookingError)
                throw new Error(`Booking record failed: ${bookingError.message}`);
            const opened = openPlatform();
            const copied = await copiedMessage;
            f.reset();
            updateTotal();
            showPanel({
                msg,
                openUrl,
                openLabel: "Open " + PLATFORM_NAMES[platform],
                notice: platform === "whatsapp"
                    ? "Your booking request was saved. WhatsApp opened with the request filled in; press Send there to message the salon."
                    : `Your booking request was saved. ${copied ? "The request was copied." : "Copy the request below."} Open the salon's ${PLATFORM_NAMES[platform]} profile/chat, paste the request, and send it.`
            });
            succeeded = true;
            show(
                opened
                    ? `Booking request submitted successfully! Finish sending it in ${PLATFORM_NAMES[platform]}. Your appointment is not confirmed until the salon replies.`
                    : `Booking request submitted successfully! Use the link below to open ${PLATFORM_NAMES[platform]} and send the request. Your appointment is not confirmed until the salon replies.`,
                false,
                true
            );
        }
        catch (error) {
            console.error("Could not submit booking request.", error);
            openPlatform();
            await showHandoff("The selected platform was opened, but your booking could not be saved.");
            show(`Your request is ready to send, but it was not saved on the website. ${error.message} Check the Supabase table, permissions, and setup-bookings.sql, then try again.`, true);
        }
        finally {
            if (succeeded) {
                // Shown on the button itself; it goes back to normal after a few seconds.
                submitButton.textContent = "Request submitted \u2713";
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = submitLabel;
                }, 8000);
            }
            else {
                submitButton.disabled = false;
                submitButton.textContent = submitLabel;
            }
        }
    });
})();
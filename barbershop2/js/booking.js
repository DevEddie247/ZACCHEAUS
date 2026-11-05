/* Booking form -> WhatsApp. Config (services, times, number) is in js/script.js */
(() => {
    const f = $("#booking-form");
    if (!f)
        return;
    const opts = (arr, ph) => `<option value="">${ph}</option>` + arr.map(x => `<option>${x}</option>`).join("");
    $("#service").innerHTML = '<option value="">Select a service</option>' + Object.entries(CATS).map(([k, l]) => `<optgroup label="${l}">${(BOOKING_SERVICES[k] || []).map(n => `<option>${n}</option>`).join("")}</optgroup>`).join("");
    $("#time").innerHTML = opts(CONFIG.times, "Select a time");
    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
    $("#date").min = today;
    const wanted = new URLSearchParams(location.search).get("service"); // booking.html?service=Low%20Fade
    if (wanted) {
        const o = [...$("#service").options].find(o => o.value.toLowerCase() == wanted.toLowerCase());
        if (o)
            $("#service").value = o.value;
    }
    const val = id => $("#" + id)?.value.trim() || "";
    const setErr = (id, m) => { $("#" + id).parentElement.querySelector(".err").textContent = m || ""; return !!m; };
    const validPhone = phone => /^\+?[\d\s().-]+$/.test(phone) && phone.replace(/\D/g, "").length >= 10 && phone.replace(/\D/g, "").length <= 15;
    const note = $("#note");
    const show = (m, bad) => { note.hidden = false; note.className = "notice full" + (bad ? " bad" : ""); note.textContent = m; note.scrollIntoView({ behavior: "smooth", block: "center" }); };
    f.addEventListener("submit", e => {
        e.preventDefault();
        note.hidden = true;
        const d = val("date");
        const errs = [
            setErr("name", val("name").length < 2 ? "Please enter your full name." : ""),
            setErr("phone", validPhone(val("phone")) ? "" : "Enter 10\u201315 digits, for example 08033811028 or +2348033811028."),
            setErr("email", val("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val("email")) ? "Enter a valid email or leave blank." : ""),
            setErr("service", val("service") ? "" : "Please choose a service."),
            setErr("date", !d ? "Please choose a date." : d < today ? "Date cannot be in the past." : ""),
            setErr("time", val("time") ? "" : "Please choose a time.")
        ];
        if (errs.some(Boolean))
            return show("Please fix the highlighted fields.", true);
        if (!waReady())
            return show("WhatsApp number is not configured. The site owner must set businessWhatsAppNumber in js/script.js.", true);
        const nice = new Date(d + "T00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
        const msg = `Hello! I would like to book an appointment at your barbershop.

APPOINTMENT REQUEST

Customer Name: ${val("name")}

Phone Number: ${val("phone")}

Email: ${val("email") || "Not provided"}

Service: ${val("service")}

Appointment Date: ${nice}

Appointment Time: ${val("time")}

Additional Notes: ${val("notes") || "None"}

Please confirm whether this appointment is available.

Thank you!`;
        window.open(`https://wa.me/${businessWhatsAppNumber}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
        show("Your appointment details are ready in WhatsApp. Please press Send to submit your booking request. Your appointment is not confirmed until our team responds.");
    });
})();
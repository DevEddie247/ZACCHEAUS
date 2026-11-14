/* Booking and bank-transfer receipt sharing. Config is in js/script.js. */
(() => {
    const f = $("#booking-form");
    if (!f)
        return;

    const serviceOptions = $("#service-options");
    const formatNaira = amount => `₦${new Intl.NumberFormat("en-NG").format(amount)}`;
    serviceOptions.innerHTML = Object.entries(BOOKING_SERVICES).map(([key, services]) => `
        <fieldset class="service-category">
          <legend>${CATS[key]}</legend>
          ${services.map(name => {
        const price = SERVICE_PRICES[name];
        const amount = typeof price === "number" ? price : price.amount;
        const estimate = typeof price === "object" && price.estimate;
        return `<label class="service-option">
              <input type="checkbox" value="${name}" data-price="${amount}" data-estimate="${estimate}">
              <span><span class="service-name">${name}</span><small>${estimate ? "From " : ""}${formatNaira(amount)}</small></span>
            </label>`;
    }).join("")}
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
    const show = (message, bad) => {
        note.hidden = false;
        note.className = "notice full" + (bad ? " bad" : "");
        note.textContent = message;
        note.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    const selectedServices = () => [...serviceOptions.querySelectorAll("input:checked")];
    const updateTotal = () => {
        const selected = selectedServices();
        const total = selected.reduce((sum, input) => sum + Number(input.dataset.price), 0);
        $("#price-breakdown").textContent = selected.length
            ? selected.map(input => `${input.value}: ${input.dataset.estimate === "true" ? "From " : ""}${formatNaira(Number(input.dataset.price))}`).join(" | ")
            : "Choose services to see their prices.";
        $("#service-total").textContent = formatNaira(total);
    };
    serviceOptions.addEventListener("change", updateTotal);
    updateTotal();

    const socialBooking = $("#social-booking");
    const socialProfiles = {
        instagram: SOCIAL_LINKS.instagram,
        tiktok: SOCIAL_LINKS.tiktok,
        snapchat: SOCIAL_LINKS.snapchat
    };
    document.querySelectorAll(".copy-account").forEach(button => {
        button.addEventListener("click", async () => {
            const status = $("#account-copy-status");
            try {
                await navigator.clipboard.writeText(button.dataset.account);
                status.textContent = `${button.dataset.account} copied.`;
            }
            catch (error) {
                const temporaryInput = document.createElement("input");
                temporaryInput.value = button.dataset.account;
                temporaryInput.setAttribute("readonly", "");
                temporaryInput.style.position = "fixed";
                temporaryInput.style.opacity = "0";
                document.body.append(temporaryInput);
                temporaryInput.select();
                const copied = document.execCommand("copy");
                temporaryInput.remove();
                status.textContent = copied
                    ? `${button.dataset.account} copied.`
                    : `Copy failed. Please select and copy ${button.dataset.account}.`;
            }
        });
    });
    $("#copy-booking-message").addEventListener("click", async () => {
        const status = $("#copy-status");
        try {
            await navigator.clipboard.writeText($("#booking-message").value);
            status.textContent = "Request copied. Paste it into your message and attach the receipt.";
        }
        catch (error) {
            status.textContent = "Could not copy automatically. Select and copy the request above, then attach the receipt in your message.";
        }
    });

    f.addEventListener("submit", async event => {
        event.preventDefault();
        note.hidden = true;
        socialBooking.hidden = true;
        const date = val("date");
        const receipt = $("#receipt").files[0];
        const validReceiptType = receipt && (
            ["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(receipt.type) ||
            /\.(jpe?g|png|webp|pdf)$/i.test(receipt.name)
        );
        const errors = [
            setErr("name", val("name").length < 2 ? "Please enter your full name." : ""),
            setErr("phone", validPhone(val("phone")) ? "" : "Enter 10–15 digits, for example 08033811028 or +2348033811028."),
            setErr("email", val("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val("email")) ? "Enter a valid email or leave blank." : ""),
            setErr("service", selectedServices().length ? "" : "Please select at least one service."),
            setErr("date", !date ? "Please choose a date." : date < today ? "Date cannot be in the past." : ""),
            setErr("time", val("time") ? "" : "Please choose a time."),
            setErr("receipt", !receipt ? "Please choose your payment receipt." : !validReceiptType ? "Upload a JPG, PNG, WEBP or PDF receipt." : receipt.size > 10 * 1024 * 1024 ? "Receipt must be 10 MB or smaller." : ""),
            setErr("payment-confirmation", $("#payment-confirmation").checked ? "" : "Confirm that you have completed the bank transfer."),
            setErr("platform", val("platform") ? "" : "Please choose your preferred messaging platform.")
        ];
        if (errors.some(Boolean))
            return show("Please fix the highlighted fields.", true);

        const platform = val("platform");
        if (platform === "whatsapp" && !waReady())
            return show("WhatsApp number is not configured. The site owner must set businessWhatsAppNumber in js/script.js.", true);

        const niceDate = new Date(date + "T00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
        const selected = selectedServices();
        const total = selected.reduce((sum, input) => sum + Number(input.dataset.price), 0);
        const serviceDetails = selected.map(input => `- ${input.value}: ${input.dataset.estimate === "true" ? "From " : ""}${formatNaira(Number(input.dataset.price))}`).join("\n");
        const message = `Hello! I would like to book an appointment at Zacchaeus Unisex Salon and Spa.

APPOINTMENT & PAYMENT REQUEST

Customer Name: ${val("name")}
Phone Number: ${val("phone")}
Email: ${val("email") || "Not provided"}
Services:
${serviceDetails}
Total transferred: ${formatNaira(total)}
Receipt file: ${receipt.name}
Appointment Date: ${niceDate}
Appointment Time: ${val("time")}
Preferred contact: ${platform}

Please confirm receipt of payment and whether this appointment is available. I understand the booking is not confirmed until the salon replies.

Thank you!`;

        $("#booking-message").value = message;
        const destination = platform === "whatsapp"
            ? `https://wa.me/${businessWhatsAppNumber}?text=${encodeURIComponent(message)}`
            : socialProfiles[platform];
        const destinationLink = $("#social-booking-link");
        destinationLink.href = destination;
        $("#social-booking-link").textContent = `Open ${platform[0].toUpperCase() + platform.slice(1)}`;
        $("#copy-status").textContent = "";
        socialBooking.hidden = false;
        const opened = window.open(destination, "_blank");
        if (opened)
            opened.opener = null;
        show(opened
            ? `Opened ${platform[0].toUpperCase() + platform.slice(1)} in a new tab. Copy the request below and attach your receipt before sending.`
            : `Your browser blocked the new tab. Use the Open ${platform[0].toUpperCase() + platform.slice(1)} button below, then copy the request and attach your receipt.`);
        socialBooking.scrollIntoView({ behavior: "smooth", block: "center" });
    });
})();

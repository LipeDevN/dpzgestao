      // ── Navigation Scroll ──────────────────────────────────
      const nav = document.getElementById("mainNav");

      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          nav.classList.add("scrolled");
        } else {
          nav.classList.remove("scrolled");
        }
      });

      // ── Mobile Menu ────────────────────────────────────────
      const navToggle = document.getElementById("navToggle");
      const mobileMenu = document.getElementById("mobileMenu");
      const mobileClose = document.getElementById("mobileClose");

      navToggle.addEventListener("click", () => {
        mobileMenu.classList.add("open");
        document.body.style.overflow = "hidden";
      });

      mobileClose.addEventListener("click", closeMobile);

      function closeMobile() {
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      }

      // ── Scroll Reveal ──────────────────────────────────────
      const revealElements = document.querySelectorAll(".ph-reveal");

      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
      );

      revealElements.forEach((el) => revealObserver.observe(el));

      // ── Simulator ──────────────────────────────────────────
      const simRates = {
        imovel: 0.0012,
        veiculo: 0.0014,
        servicos: 0.0015,
      };

      const simRateLabels = {
        imovel: "0,12% a.m.",
        veiculo: "0,14% a.m.",
        servicos: "0,15% a.m.",
      };

      const simTypeLabels = {
        imovel: "Imóvel",
        veiculo: "Veículo",
        servicos: "Serviços",
      };

      let currentType = "imovel";

      function selectType(el) {
        document
          .querySelectorAll(".cs-sim-type")
          .forEach((t) => t.classList.remove("active"));
        el.classList.add("active");
        currentType = el.dataset.type;
        updateSimulator();
      }

      function formatCurrency(value) {
        return value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        });
      }

      function formatCurrencyShort(value) {
        return "R$ " + Math.round(value).toLocaleString("pt-BR");
      }

      function updateSimulator() {
        const valor = parseInt(document.getElementById("simValue").value);
        const prazo = parseInt(document.getElementById("simTerm").value);
        const taxa = simRates[currentType];

        // Parcela formula: PMT = (PV * r * (1+r)^n) / ((1+r)^n - 1)
        const parcela =
          (valor * taxa * Math.pow(1 + taxa, prazo)) /
          (Math.pow(1 + taxa, prazo) - 1);
        const total = parcela * prazo;

        // Update displays
        document.getElementById("simValueDisplay").textContent =
          formatCurrencyShort(valor);
        document.getElementById("simTermDisplay").textContent =
          prazo + " meses";

        // Parse parcela into integer and decimal parts
        const parcelaStr = parcela.toFixed(2);
        const [parcelaInt, parcelaDec] = parcelaStr.split(".");
        const parcelaIntFormatted =
          parseInt(parcelaInt).toLocaleString("pt-BR");
        document.getElementById("simParcela").innerHTML =
          "R$ " +
          parcelaIntFormatted +
          "<small>," +
          parcelaDec +
          "/mês</small>";

        document.getElementById("simTypeDisplay").textContent =
          simTypeLabels[currentType];
        document.getElementById("simCreditDisplay").textContent =
          formatCurrency(valor);
        document.getElementById("simRateDisplay").textContent =
          simRateLabels[currentType];
        document.getElementById("simTermResultDisplay").textContent =
          prazo + " meses";
        document.getElementById("simTotalDisplay").textContent =
          formatCurrency(total);

        // Update slider backgrounds
        updateSliderTrack("simValue", 50000, 1000000);
        updateSliderTrack("simTerm", 60, 200);
      }

      function updateSliderTrack(id, min, max) {
        const slider = document.getElementById(id);
        const val = parseInt(slider.value);
        const percent = ((val - min) / (max - min)) * 100;
        slider.style.background = `linear-gradient(to right, var(--ph-red) 0%, var(--ph-red) ${percent}%, var(--ph-gray) ${percent}%, var(--ph-gray) 100%)`;
      }

      // Initialize simulator
      updateSimulator();

      // ── FAQ Toggle ─────────────────────────────────────────
      function toggleFaq(el) {
        const item = el.parentElement;
        const answer = item.querySelector(".ph-faq-answer");
        const isOpen = item.classList.contains("active");

        // Close all
        document.querySelectorAll(".ph-faq-item").forEach((faq) => {
          faq.classList.remove("active");
          faq.querySelector(".ph-faq-answer").style.maxHeight = "0";
        });

        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      }

      // ── Lead Modal ─────────────────────────────────────────
      function openLeadModal() {
        const modal = document.getElementById("leadModal");
        modal.classList.add("open");
        document.body.style.overflow = "hidden";

        // Fill hidden fields with simulator data
        document.getElementById("leadTipo").value = simTypeLabels[currentType];
        document.getElementById("leadValor").value =
          document.getElementById("simValue").value;
        document.getElementById("leadPrazo").value =
          document.getElementById("simTerm").value;
        document.getElementById("leadParcela").value =
          document.getElementById("simParcela").textContent;
      }

      function closeLeadModal() {
        const modal = document.getElementById("leadModal");
        modal.classList.remove("open");
        document.body.style.overflow = "";
      }

      // Close modal on overlay click
      document.getElementById("leadModal").addEventListener("click", (e) => {
        if (e.target === e.currentTarget) closeLeadModal();
      });

      // Close modal on ESC key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closeLeadModal();
          closeMobile();
        }
      });

      // ── Phone Mask ─────────────────────────────────────────
      const phoneInput = document.getElementById("leadTelefone");

      phoneInput.addEventListener("input", (e) => {
        let v = e.target.value.replace(/\D/g, "");
        if (v.length > 11) v = v.slice(0, 11);

        if (v.length > 6) {
          v = "(" + v.slice(0, 2) + ") " + v.slice(2, 7) + "-" + v.slice(7);
        } else if (v.length > 2) {
          v = "(" + v.slice(0, 2) + ") " + v.slice(2);
        } else if (v.length > 0) {
          v = "(" + v;
        }

        e.target.value = v;
      });

      // ── Lead Form Submit ───────────────────────────────────
      async function submitLead(e) {
        e.preventDefault();

        const btn = document.getElementById("leadSubmitBtn");
        const originalText = btn.textContent;
        btn.textContent = "Enviando...";
        btn.disabled = true;

        const formData = {
          nome: document.getElementById("leadNome").value,
          email: document.getElementById("leadEmail").value,
          telefone: document.getElementById("leadTelefone").value,
          observacoes: document.getElementById("leadObs").value,
          tipo: document.getElementById("leadTipo").value,
          valor: document.getElementById("leadValor").value,
          prazo: document.getElementById("leadPrazo").value,
          parcela: document.getElementById("leadParcela").value,
        };

        // The original CRM is not part of this static clone.
        // The visitor can send the proposal through the original WhatsApp link.

        // Build WhatsApp message
        const nome = formData.nome;
        const msg = encodeURIComponent(
          `Olá! Meu nome é ${nome}.\n` +
            `Tenho interesse em consórcio de ${formData.tipo}.\n` +
            `Valor: R$ ${parseInt(formData.valor).toLocaleString("pt-BR")}\n` +
            `Prazo: ${formData.prazo} meses\n` +
            `Parcela estimada: ${formData.parcela}\n` +
            (formData.observacoes ? `Obs: ${formData.observacoes}\n` : "") +
            `E-mail: ${formData.email}\n` +
            `Telefone: ${formData.telefone}`,
        );

        // Redirect to WhatsApp
        window.open(`https://wa.me/551147651770?text=${msg}`, "_blank");

        // Reset
        btn.textContent = "WhatsApp aberto!";
        btn.style.background = "#25D366";

        setTimeout(() => {
          closeLeadModal();
          document.getElementById("leadForm").reset();
          btn.textContent = originalText;
          btn.style.background = "";
          btn.disabled = false;
        }, 2000);
      }

      // ── Smooth scroll for anchor links ─────────────────────
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          const href = this.getAttribute("href");
          if (href === "#" || href === "#contato") return;

          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offset = 90;
            const pos =
              target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: pos, behavior: "smooth" });
          }
        });
      });

      // ── Counter Animation for Stats ────────────────────────
      function animateCounters() {
        const counters = document.querySelectorAll(".cs-stat-number");
        counters.forEach((counter) => {
          if (counter.dataset.animated) return;
          const text = counter.textContent;
          // Only animate simple numbers
          const match = text.match(/^(\d+)/);
          if (!match) return;

          const target = parseInt(match[1]);
          const suffix = text.replace(match[1], "");
          let current = 0;
          const increment = Math.ceil(target / 60);
          const duration = 1500;
          const stepTime = duration / (target / increment);

          counter.dataset.animated = "true";

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            counter.textContent = current + suffix;
          }, stepTime);
        });
      }

      // Trigger counter animation when stats section is visible
      const statsSection = document.querySelector(".cs-stats");
      if (statsSection) {
        const statsObserver = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              animateCounters();
              statsObserver.disconnect();
            }
          },
          { threshold: 0.3 },
        );
        statsObserver.observe(statsSection);
      }

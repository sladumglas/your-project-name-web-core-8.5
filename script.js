(() => {
    const section = document.querySelector(".brands");
    const list = document.getElementById("brandsList");
    const slider = document.getElementById("brandsSlider");
    const pagination = document.getElementById("brandsPagination");
    const toggleBtn = document.getElementById("brandsToggle");
    const toggleText = toggleBtn.querySelector(".brands__toggle-text");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    let swiper = null;

    function initSwiper() {
        if (swiper) return;

        slider.classList.add("swiper");
        list.classList.add("swiper-wrapper");

        list.querySelectorAll(".brands__item").forEach((el) => {
            el.classList.add("swiper-slide");
        });

        swiper = new Swiper(slider, {
            slidesPerView: "auto",
            spaceBetween: 0,
            pagination: {
                el: pagination,
                clickable: true,
            },
        });
    }

    function destroySwiper() {
        if (!swiper) return;
        swiper.destroy(true, true);
        swiper = null;

        slider.classList.remove("swiper");
        list.classList.remove("swiper-wrapper");

        list.querySelectorAll(".brands__item").forEach((el) => {
            el.classList.remove("swiper-slide");
            el.style.width = "";
            el.style.marginRight = "";
        });

        list.style.transform ="";
        list.style.transitionDuration = "";
    }

    function needToggleButton() {
        if (window.innerWidth < 768) return false;
        const itemsCount = list.querySelectorAll(".brands__item").length;

        if (window.innerWidth >= 1120) return itemsCount > 8;

        return itemsCount > 6;
    }

    function applyCollapsedState() {
        if (!needToggleButton()) {
            toggleBtn.style.display = "none";
            section.classList.remove("is-collapsed", "is-expanded");
            return;
        }
         
        toggleBtn.style.display = "inline-flex";
        section.classList.add("is-collapsed");
        section.classList.remove("is-expanded");
        toggleText.textContent = "Показать все";
    }

    function applyState() {
        if (mobileQuery.matches) {
            toggleBtn.style.display = "none";
            section.classList.remove("is-collapsed", "is-expanded");
            initSwiper();
        }
        else {
            destroySwiper();
            applyCollapsedState();
        }
    }

    toggleBtn.addEventListener("click", () => {
        const expanded = section.classList.toggle("is-expanded");

      if (expanded) {
      section.classList.remove("is-collapsed");
      toggleText.textContent = "Скрыть";
    } else {
      section.classList.add("is-collapsed");
      toggleText.textContent = "Показать все";
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

    applyState();
    mobileQuery.addEventListener("change", applyState);
    window.addEventListener("resize", () => {
        if (!mobileQuery.matches) applyCollapsedState();
    });
})();

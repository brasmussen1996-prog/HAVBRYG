// HAVBRYG – Main JavaScript

//fade in og out
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (!href.startsWith("#") && !href.startsWith("mailto")) {
      e.preventDefault();

      document.body.classList.remove("loaded");

      setTimeout(() => {
        window.location = href;
      }, 400);
    }
  });
});

//scroll
document.addEventListener("DOMContentLoaded", () => {
  const scrollArrow = document.querySelector(".scroll-arrow");
  const hero = document.querySelector("#hero");
  const sections = Array.from(document.querySelectorAll("main section"));

  if (!scrollArrow || !hero || sections.length === 0) return;

  function isAtBottom() {
    return (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 10
    );
  }

  function setArrowDirection() {
    if (isAtBottom()) {
      scrollArrow.classList.add("is-up");
    } else {
      scrollArrow.classList.remove("is-up");
    }
  }

  function scrollToNextSection() {
    const currentScroll = window.scrollY;

    const nextSection = sections.find(
      (section) => section.offsetTop > currentScroll + 50,
    );

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  function scrollToHero() {
    hero.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  scrollArrow.addEventListener("click", (event) => {
    event.preventDefault();

    if (scrollArrow.classList.contains("is-up")) {
      scrollToHero();
    } else {
      scrollToNextSection();
    }
  });

  window.addEventListener("scroll", setArrowDirection);
  setArrowDirection();
});

//Glow text
const glowTexts = document.querySelectorAll(".mouse-glow-text");

glowTexts.forEach((text) => {
  text.addEventListener("mousemove", (e) => {
    const rect = text.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    text.style.setProperty("--x", `${x}px`);
    text.style.setProperty("--y", `${y}px`);
  });
});

// Storytelling video logic
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".video-wrapper");
  if (!wrapper) return;

  const video = wrapper.querySelector(".storytelling-video");

  wrapper.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      wrapper.classList.add("is-playing");
    } else {
      video.pause();
      wrapper.classList.remove("is-playing");
    }
  });

  video.addEventListener("ended", () => {
    wrapper.classList.remove("is-playing");
    video.currentTime = 0;
  });

  // hvis brugeren pauser via tastatur/andet (sikkerhed)
  video.addEventListener("pause", () => {
    wrapper.classList.remove("is-playing");
  });

  video.addEventListener("play", () => {
    wrapper.classList.add("is-playing");
  });
});

//Images moving based by mousemove

let basic = document.querySelectorAll(".basic");
let behind = document.querySelectorAll(".behind");
let between = document.querySelectorAll(".between");
let front = document.querySelectorAll(".front");
let extrafront = document.querySelectorAll(".extra-front");

document.querySelector("body").addEventListener("mousemove", (event) => {
  const x = event.pageX;
  const y = event.pageY;

  console.log(y);

  basic.forEach((el) => {
    el.style.transform = `translateX(${0.015 * x}px) translateY(${0.015 * y}px)`;
  });

  behind.forEach((el) => {
    el.style.transform = `translateX(${0.02 * x}px) translateY(${0.02 * y}px)`;
  });

  between.forEach((el) => {
    el.style.transform = `translateX(${0.025 * x}px) translateY(${0.025 * y}px)`;
  });

  front.forEach((el) => {
    el.style.transform = `translateX(${0.03 * x}px) translateY(${0.03 * y}px)`;
  });

  extrafront.forEach((el) => {
    el.style.transform = `translateX(${0.035 * x}px) translateY(${0.035 * y}px)`;
  });
});

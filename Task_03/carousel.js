const images = [
  {
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    title: "Misty Forest",
    desc: "A peaceful foggy morning in a dense forest."
  },
  {
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    title: "Mountain Range",
    desc: "Sunlight casting shadows over the peaks." 
  },
  {
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    title: "Serene Lake",
    desc: "Mirror-like reflection on a calm mountain lake."
  },
  {
    url: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    title: "Desert Road",
    desc: "A road cutting through golden desert dunes."
  },
  {
    url: "https://images.unsplash.com/photo-1441716844725-09cedc13a4e7",
    title: "Waterfall Retreat",
    desc: "A secluded waterfall surrounded by mossy rocks."
  },
  {
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    title: "Tropical Beach",
    desc: "Palm trees line a turquoise sea on a sunny day."
  }
];

const carouselImages = document.getElementById('carouselImages');
const caption = document.getElementById('caption');
const dotsContainer = document.getElementById('dots');
let index = 0;

// Populate images
images.forEach((img, i) => {
  const el = document.createElement('img');
  el.src = img.url + "?auto=format&fit=crop&w=600&h=400&q=80";
  el.alt = img.title;
  carouselImages.appendChild(el);

  const dot = document.createElement('div');
  dot.className = 'dot';
  dot.addEventListener('click', () => {
    index = i;
    updateCarousel();
    resetAutoplay();
  });
  dotsContainer.appendChild(dot);
});

const updateDots = () => {
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
};

const updateCarousel = () => {
  carouselImages.style.transform = `translateX(-${index * 100}%)`;
  caption.classList.remove('visible');
  setTimeout(() => {
    caption.innerHTML = `
        <h3>${images[index].title}</h3>
        <p>${images[index].desc}</p>
      `;
    caption.classList.add('visible');
  }, 100);
  updateDots();
};

document.getElementById('next').addEventListener('click', () => {
  index = (index + 1) % images.length;
  updateCarousel();
  resetAutoplay();
});

document.getElementById('prev').addEventListener('click', () => {
  index = (index - 1 + images.length) % images.length;
  updateCarousel();
  resetAutoplay();
});

// Autoplay
let autoplay = setInterval(() => {
  index = (index + 1) % images.length;
  updateCarousel();
}, 5000);

const resetAutoplay = () => {
  clearInterval(autoplay);
  autoplay = setInterval(() => {
    index = (index + 1) % images.length;
    updateCarousel();
  }, 5000);
};

// Swipe support
const carousel = document.getElementById('carousel');
let startX = 0;
let isDown = false;

carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDown = true;
});

carousel.addEventListener('touchmove', (e) => {
  if (!isDown) return;
  const endX = e.touches[0].clientX;
  if (startX - endX > 50) {
    index = (index + 1) % images.length;
    updateCarousel();
    isDown = false;
    resetAutoplay();
  } else if (endX - startX > 50) {
    index = (index - 1 + images.length) % images.length;
    updateCarousel();
    isDown = false;
    resetAutoplay();
  }
});

carousel.addEventListener('touchend', () => isDown = false);

// Initial load
updateCarousel();



// Back to Top Button functionality
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


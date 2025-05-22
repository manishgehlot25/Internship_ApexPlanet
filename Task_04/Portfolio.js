// About me Section 
// Fade-in on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Scroll to Top Button
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Back Button
document.getElementById('backBtn').addEventListener('click', () => {
  window.history.back();
});

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Theme Toggle via button
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Close menu on link click (for mobile)
document.querySelectorAll('#navMenu a, button').forEach(link => {
  link.addEventListener('click', () => {
    // Only close if menu is currently active
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
});

// <!-- // About Education : -->
// Animate education cards on scroll
const eduCards = document.querySelectorAll('.edu-card');

const revealOnScroll = () => {
  eduCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
};

window.addEventListener('scroll', revealOnScroll);

// Initial style for animation
eduCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
});

// <!-- // Skills Section: -->
// Animate skills on scroll
const skillCategories = document.querySelectorAll('.skill-category');

const revealSkills = () => {
  skillCategories.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
};

window.addEventListener('scroll', revealSkills);

// Initial state for animation
skillCategories.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
});

// <!-- //Project Section: -->
// Animate project cards on scroll
const projectCards = document.querySelectorAll('.project-card');

const revealProjects = () => {
  projectCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
};

window.addEventListener('scroll', revealProjects);

// Initial animation styles
projectCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
});

// <!-- // experience Section: -->
const expItems = document.querySelectorAll('.experience-item');

expItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = 'all 0.6s ease';
});

function revealExperience() {
  expItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }
  });
}

window.addEventListener('scroll', revealExperience);

// <!-- // Contact Section: -->
const contact = document.querySelector('.contact-details');
contact.style.opacity = '0';
contact.style.transform = 'translateY(30px)';
contact.style.transition = 'all 0.6s ease';

function revealContactInfo() {
  const rect = contact.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    contact.style.opacity = '1';
    contact.style.transform = 'translateY(0)';
  }
}

window.addEventListener('scroll', revealContactInfo);

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const closeBtn = lightbox.querySelector('.close');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentIndex = 0;

// Filter gallery items by category
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    let filter = btn.getAttribute('data-filter');

    galleryItems.forEach((item) => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Show lightbox modal with selected image
function showLightbox(index) {
  currentIndex = index;
  const imgSrc = galleryItems[currentIndex].querySelector('img').src;
  const altText = galleryItems[currentIndex].querySelector('img').alt;
  lightboxImg.src = imgSrc;
  lightboxImg.alt = altText;
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent scroll behind modal
}

// Hide lightbox modal
function hideLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = ''; // Restore scroll
}

// Navigate to next image
function showNext() {
  do {
    currentIndex = (currentIndex + 1) % galleryItems.length;
  } while (galleryItems[currentIndex].style.display === 'none')
  showLightbox(currentIndex);
}

// Navigate to previous image
function showPrev() {
  do {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  } while (galleryItems[currentIndex].style.display === 'none')
  showLightbox(currentIndex);
}

// Click event on gallery images
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    if (item.style.display !== 'none') {
      showLightbox(index);
    }
  });
});

// Close button event
closeBtn.addEventListener('click', hideLightbox);

// Next and Prev button events
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    hideLightbox();
  }
});

// Keyboard navigation inside lightbox
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    } else if (e.key === 'Escape') {
      hideLightbox();
    }
  }
});

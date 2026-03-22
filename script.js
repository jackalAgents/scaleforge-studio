// Reveal animations on scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        if (entry.target.parentElement?.classList.contains('stagger-group')) {
          entry.target.style.setProperty('--reveal-delay', `${idx * 80}ms`);
        }
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Contact form handling with success state
const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');
const submitButton = contactForm.querySelector('button[type="submit"]');

// Real-time validation feedback
const fields = contactForm.querySelectorAll('input[required], textarea[required]');
fields.forEach((field) => {
  field.addEventListener('blur', () => {
    const label = field.closest('.field');
    if (field.value.trim()) {
      label.classList.add('field-filled');
      label.classList.remove('field-error');
      if (field.checkValidity()) {
        label.classList.add('field-valid');
      } else {
        label.classList.remove('field-valid');
      }
    } else {
      label.classList.remove('field-filled', 'field-valid');
    }
  });

  field.addEventListener('input', () => {
    const label = field.closest('.field');
    label.classList.remove('field-error');
  });
});

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Clear previous status
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  // Validate all required fields
  let hasError = false;
  fields.forEach((field) => {
    const label = field.closest('.field');
    if (!field.value.trim() || !field.checkValidity()) {
      label.classList.add('field-error');
      hasError = true;
    }
  });

  if (hasError) {
    formStatus.textContent = '⚠️ Please fill in all required fields correctly.';
    formStatus.classList.add('is-error');
    return;
  }

  // Disable submit button
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  try {
    const formData = new FormData(contactForm);
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      // Success state
      formStatus.textContent = '✅ Success! We'll reach out within 24 hours.';
      formStatus.classList.add('is-success');
      contactForm.reset();

      // Clear field states
      document.querySelectorAll('.field').forEach((label) => {
        label.classList.remove('field-filled', 'field-valid', 'field-error');
      });

      // Re-enable button after delay
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Request Proposal';
      }, 3000);
    } else {
      const data = await response.json();
      const errorMsg = data.errors?.map((e) => e.message).join(', ') || 'Something went wrong.';
      formStatus.textContent = `❌ ${errorMsg}`;
      formStatus.classList.add('is-error');
      submitButton.disabled = false;
      submitButton.textContent = 'Request Proposal';
    }
  } catch (error) {
    formStatus.textContent = '❌ Network error. Please try again.';
    formStatus.classList.add('is-error');
    submitButton.disabled = false;
    submitButton.textContent = 'Request Proposal';
  }
});

// Dynamic year in footer
document.getElementById('year').textContent = new Date().getFullYear();

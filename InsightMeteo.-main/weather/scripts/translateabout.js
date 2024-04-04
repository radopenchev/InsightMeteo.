let isEnglish = true;

function translatePage() {
  const translateButton = document.querySelector('.translate');
  
  if (isEnglish) {
    document.getElementById('home-link').textContent = 'Home';
    document.getElementById('about-link').textContent = 'Contact';
    document.getElementById('sign-out-button').textContent = 'Sign out';
    document.querySelector('.footer-content p').textContent = '© 2024 InsightMeteo. All rights reserved.';
    translateButton.textContent = 'BG';
    if (!isEnglish) { 
      translateAboutPageToEnglish(); 
    }
  } else {
    document.getElementById('home-link').textContent = 'Начало';
    document.getElementById('about-link').textContent = 'Контакт';
    document.getElementById('sign-out-button').textContent = 'Изход';
    document.querySelector('.footer-content p').textContent = '© 2024 InsightMeteo. Всички права са запазени.';
    translateButton.textContent = 'EN';
    if (isEnglish) { 
      translateAboutPageToBulgarian(); 
    }
  }
  isEnglish = !isEnglish;
}
translateAboutPageToEnglish();

translatePage();


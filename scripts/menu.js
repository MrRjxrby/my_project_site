// menu.js - Скрипт для работы адаптивного меню и кнопки "Наверх"

// Получаем элементы меню
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

// Создаем оверлей для меню
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

// Функция открытия/закрытия меню
function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

    // Переключаем состояния
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('active');
    navOverlay.classList.toggle('active');

    // Блокируем скролл при открытом меню
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
}

// Обработчики событий для меню
menuToggle.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

// Закрытие меню при клике на ссылку
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// Закрытие меню при изменении размера окна (если меню открыто на мобильном и перешли на десктоп)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
        toggleMenu();
    }
});

// Кнопка "Наверх"
const scrollTopButton = document.getElementById('scrollTop');

// Показываем кнопку после скролла
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
});

// Прокрутка к началу страницы
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Добавляем анимацию нажатия
    scrollTopButton.classList.add('active');
    setTimeout(() => {
        scrollTopButton.classList.remove('active');
    }, 200);
});

// Добавляем обработчики для всех кнопок для лучшей доступности
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
});

// Улучшаем доступность для меню
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        toggleMenu();
        menuToggle.focus();
    }
});
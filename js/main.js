// ===== ОСНОВНАЯ ФУНКЦИОНАЛЬНОСТЬ =====

// 1. Переключение темы (светлая/темная)
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Проверяем сохраненную тему в localStorage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.textContent = '☀️';
    }
    
    // Обработчик клика по кнопке темы
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            // Меняем иконку и сохраняем тему
            if (document.body.classList.contains('dark-theme')) {
                themeIcon.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // 2. Плавная прокрутка для якорей (если есть)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Плавная прокрутка только для якорей на этой же странице
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 3. Оптимизация загрузки изображений (ленивая загрузка)
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // 4. Активный пункт меню (подсветка текущей страницы)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.header__link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        // Убираем класс active у всех ссылок
        link.classList.remove('active');
        // Добавляем класс active к ссылке текущей страницы
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    console.log('Сайт загружен и оптимизирован!');
});
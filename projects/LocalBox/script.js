// Инициализация темы
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileNav.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = menuToggle.querySelectorAll('span');
    if (mobileNav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (!menuToggle.contains(event.target) && !mobileNav.contains(event.target)) {
        mobileNav.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
            
            // Scroll to element
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    
    if (theme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

// Telegram bot configuration
// Telegram bot configuration
const TELEGRAM_BOT_TOKEN = window.TELEGRAM_CONFIG?.BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = window.TELEGRAM_CONFIG?.CHAT_ID || '';
const TELEGRAM_API_URL = TELEGRAM_BOT_TOKEN ? 
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage` : '';

// Проверка настройки
if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN.includes('ваш_токен')) {
    console.warn('⚠️ Telegram bot token not configured!');
}

// Функция для экранирования спецсимволов Markdown
function escapeMarkdown(text) {
    return text.replace(/([_[\]()~`>#\+\-=|{}.!])/g, '\\$1');
}

// Form submission with real Telegram notification
const subscribeForm = document.getElementById('subscribeForm');
subscribeForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Simple validation
    const inputs = this.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });
    
    if (!isValid) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }
    
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        subscription: document.getElementById('subscriptionType').value,
        subscriptionText: document.getElementById('subscriptionType').options[document.getElementById('subscriptionType').selectedIndex].text,
        date: new Date().toLocaleString('ru-RU'),
        pageUrl: window.location.href
    };
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    try {
        // Prepare message for Telegram (без Markdown для простоты)
        const message = `🎁 НОВАЯ ЗАЯВКА LOKAL BOX!
        
👤 Имя: ${escapeMarkdown(formData.name)}
📧 Email: ${escapeMarkdown(formData.email)}
📱 Телефон: ${escapeMarkdown(formData.phone)}
📦 Подписка: ${escapeMarkdown(formData.subscriptionText)}
🕐 Дата: ${escapeMarkdown(formData.date)}
🌐 Страница: ${escapeMarkdown(formData.pageUrl)}

Заявка отправлена с сайта LOKAL BOX`;
        
        // Send to Telegram
        const response = await fetch(TELEGRAM_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML', // Используем HTML вместо Markdown
                disable_web_page_preview: true
            })
        });
        
        const result = await response.json();
        
        if (result.ok) {
            // Success message
            alert(`✅ Спасибо, ${formData.name}!\n\nВаша заявка успешно отправлена!\nМы свяжемся с вами в течение дня для подтверждения заказа.`);
            
            // Log success
            console.log('✅ Telegram message sent successfully:', result);
            
            // Reset form
            this.reset();
            
        } else {
            // Если ошибка с HTML, пробуем без parse_mode
            if (result.description && result.description.includes('parse')) {
                console.log('Trying without parse_mode...');
                
                const plainResponse = await fetch(TELEGRAM_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: message,
                        disable_web_page_preview: true
                        // Без parse_mode
                    })
                });
                
                const plainResult = await plainResponse.json();
                
                if (plainResult.ok) {
                    alert(`✅ Спасибо, ${formData.name}!\n\nВаша заявка успешно отправлена!\nМы свяжемся с вами в течение дня.`);
                    this.reset();
                } else {
                    throw new Error(plainResult.description || 'Ошибка отправки');
                }
            } else {
                throw new Error(result.description || 'Ошибка отправки в Telegram');
            }
        }
        
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        
        // Fallback: Show user-friendly message
        alert(`✅ Спасибо, ${formData.name}!\n\nВаша заявка получена!\nМы свяжемся с вами в течение дня.\n\nЕсли нужно срочно, звоните:\n📞 8 800 123-45-67`);
        
        // Save to localStorage as backup
        try {
            const existingApplications = JSON.parse(localStorage.getItem('lokalbox_applications') || '[]');
            existingApplications.push({
                ...formData,
                timestamp: new Date().toISOString(),
                status: 'pending'
            });
            localStorage.setItem('lokalbox_applications', JSON.stringify(existingApplications));
            console.log('📁 Application saved to localStorage');
        } catch (storageError) {
            console.error('Error saving to localStorage:', storageError);
        }
        
    } finally {
        // Restore button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Form input validation
subscribeForm.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value.trim()) {
            this.style.borderColor = '';
        }
    });
});

// Scroll animation
function checkVisibility() {
    const elements = document.querySelectorAll('.fade-in, .slide-up');
    
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top <= windowHeight * 0.85) {
            el.classList.add('visible');
        }
    });
}

// Initial check
checkVisibility();

// Check on scroll
window.addEventListener('scroll', () => {
    checkVisibility();
});

// Check on resize
window.addEventListener('resize', () => {
    checkVisibility();
});

// Test Telegram connection
async function testTelegramConnection() {
    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`);
        const data = await response.json();
        if (data.ok) {
            console.log('✅ Telegram bot connection: OK');
            console.log('🤖 Bot name:', data.result.first_name);
            return true;
        } else {
            console.warn('⚠️ Telegram bot connection issue:', data.description);
            return false;
        }
    } catch (error) {
        console.error('❌ Telegram bot connection failed:', error);
        return false;
    }
}

// Test on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        testTelegramConnection();
    }, 1000);
});


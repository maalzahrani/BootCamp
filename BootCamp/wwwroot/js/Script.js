// Dashboard JavaScript functionality
document.addEventListener('DOMContentLoaded', function () {
    // Get current time for greeting
    function updateGreeting() {
        const now = new Date();
        const hour = now.getHours();
        let greeting = 'Good Morning';

        if (hour >= 12 && hour < 17) {
            greeting = 'Good Afternoon';
        } else if (hour >= 17) {
            greeting = 'Good Evening';
        }

        const greetingElement = document.querySelector('.greeting');
        if (greetingElement) {
            greetingElement.textContent = `${greeting} MOHAMMED ABDULKAREEM M ALZAHRANI`;
        }
    }

    // Initialize greeting
    updateGreeting();

    // Update greeting every minute
    setInterval(updateGreeting, 60000);

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const query = e.target.value.toLowerCase();
            console.log('Searching for:', query);
            // Add search logic here
        });
    }

    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');

            console.log('Navigation clicked:', this.textContent.trim());
        });
    });

    // Chat functionality
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.send-button');
    const chatMessages = document.querySelector('.chat-messages');

    function addMessage(text, type = 'sent') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;

        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        messageDiv.innerHTML = `
            <div class="message-bubble">
                <p>${text}</p>
                <span class="message-time">${timeString}</span>
            </div>
        `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'sent');
            chatInput.value = '';

            // Simulate response after 1 second
            setTimeout(() => {
                const responses = [
                    "Thank you for your message. How can I assist you further?",
                    "I understand your concern. Let me help you with that.",
                    "Could you provide more details about this issue?",
                    "I'll look into this right away for you."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'received');
            }, 1000);
        }
    }

    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Action buttons
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const action = this.textContent.trim().toLowerCase();
            console.log('Action clicked:', action);

            // Add button press animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Chat button in header
    const chatButton = document.querySelector('.chat-button');
    if (chatButton) {
        chatButton.addEventListener('click', function () {
            // Scroll to chat section
            const chatCard = document.querySelector('.chat-card');
            if (chatCard) {
                chatCard.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Floating action button
    const floatingButton = document.querySelector('.floating-button');
    if (floatingButton) {
        floatingButton.addEventListener('click', function () {
            // Scroll to chat section or open chat modal
            const chatCard = document.querySelector('.chat-card');
            if (chatCard) {
                chatCard.scrollIntoView({ behavior: 'smooth' });
                // Focus on chat input
                setTimeout(() => {
                    if (chatInput) {
                        chatInput.focus();
                    }
                }, 500);
            }
        });
    }

    // Add hover effects for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Phone animation
    const phones = document.querySelectorAll('.phone');
    phones.forEach((phone, index) => {
        phone.addEventListener('mouseenter', function () {
            this.style.transform = this.style.transform.replace('scale(1)', 'scale(1.05)');
            if (!this.style.transform.includes('scale')) {
                const currentTransform = this.style.transform || (index === 0 ? 'rotate(-12deg)' : 'rotate(12deg)');
                this.style.transform = currentTransform + ' scale(1.05)';
            }
        });

        phone.addEventListener('mouseleave', function () {
            this.style.transform = this.style.transform.replace('scale(1.05)', 'scale(1)');
        });
    });

    // Add loading animation for status indicators
    const statusDots = document.querySelectorAll('.dot, .activity-dot');
    statusDots.forEach((dot, index) => {
        setInterval(() => {
            dot.style.opacity = dot.style.opacity === '0.5' ? '1' : '0.5';
        }, 1000 + (index * 200));
    });

    // Profile avatar click
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('click', function () {
            console.log('Profile avatar clicked');
            // Could open profile modal or navigate to profile page
        });
    }

    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';

    console.log('Dashboard initialized successfully!');
});
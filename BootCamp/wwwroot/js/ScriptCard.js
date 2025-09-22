// Card Layout Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function () {
    console.log('Card Layout Dashboard initialized');

    // Animate progress bars on load
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0%';

            setTimeout(() => {
                bar.style.width = width;
            }, 300 + (index * 200));
        });
    }

    // Animate cards on load
    function animateCards() {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + (index * 150));
        });
    }

    // Update real-time data simulation
    function updateRealTimeData() {
        // Update CPU usage
        const cpuMetric = document.querySelector('.metric-row .metric-value.good');
        if (cpuMetric && cpuMetric.textContent.includes('%')) {
            const currentValue = parseInt(cpuMetric.textContent);
            const newValue = Math.max(15, Math.min(85, currentValue + Math.floor(Math.random() * 10) - 5));
            cpuMetric.textContent = newValue + '%';

            // Update color based on value
            cpuMetric.className = 'metric-value ' + (newValue < 50 ? 'good' : newValue < 80 ? 'warning' : 'danger');
        }

        // Update server load progress
        const serverLoadProgress = document.querySelector('.progress-fill');
        if (serverLoadProgress) {
            const currentWidth = parseInt(serverLoadProgress.style.width);
            const newWidth = Math.max(20, Math.min(90, currentWidth + Math.floor(Math.random() * 10) - 5));
            serverLoadProgress.style.width = newWidth + '%';

            const progressText = serverLoadProgress.closest('.progress-section').querySelector('.progress-text');
            if (progressText) {
                progressText.textContent = newWidth + '% Usage';
            }
        }
    }

    // Add hover effects for interactive elements
    function addInteractiveEffects() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-4px)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0)';
            });
        });

        // Add click effects for status indicators
        const statusIndicators = document.querySelectorAll('.status-indicator');
        statusIndicators.forEach(indicator => {
            indicator.addEventListener('click', function () {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });

        // Add pulse animation to activity icons
        const activityIcons = document.querySelectorAll('.activity-icon');
        activityIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function () {
                this.style.animation = 'pulse 0.5s ease-in-out';
            });

            icon.addEventListener('animationend', function () {
                this.style.animation = '';
            });
        });
    }

    // Simulate new activity updates
    function addNewActivity() {
        const activityList = document.querySelector('.activity-list');
        if (!activityList) return;

        const activities = [
            { icon: 'fas fa-download', title: 'System backup completed', time: 'Just now' },
            { icon: 'fas fa-shield-alt', title: 'Security scan finished', time: '1 minute ago' },
            { icon: 'fas fa-sync', title: 'Data synchronization complete', time: '2 minutes ago' },
            { icon: 'fas fa-chart-bar', title: 'Weekly report generated', time: '5 minutes ago' }
        ];

        const randomActivity = activities[Math.floor(Math.random() * activities.length)];

        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.style.opacity = '0';
        activityItem.style.transform = 'translateY(-10px)';

        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="${randomActivity.icon}"></i>
            </div>
            <div class="activity-details">
                <div class="activity-title">${randomActivity.title}</div>
                <div class="activity-time">${randomActivity.time}</div>
            </div>
        `;

        // Remove last activity if there are more than 4
        const existingActivities = activityList.querySelectorAll('.activity-item');
        if (existingActivities.length >= 4) {
            existingActivities[existingActivities.length - 1].remove();
        }

        // Add new activity at the top
        activityList.insertBefore(activityItem, activityList.firstChild);

        // Animate in
        setTimeout(() => {
            activityItem.style.transition = 'all 0.4s ease-out';
            activityItem.style.opacity = '1';
            activityItem.style.transform = 'translateY(0)';
        }, 100);
    }

    // Update team member scores
    function updateTeamScores() {
        const memberScores = document.querySelectorAll('.member-score');
        memberScores.forEach(score => {
            const currentScore = parseInt(score.textContent);
            const newScore = Math.max(85, Math.min(100, currentScore + Math.floor(Math.random() * 4) - 2));
            score.textContent = newScore + '%';
        });
    }

    // Responsive behavior
    function handleResize() {
        const container = document.querySelector('.dashboard-container');
        const cards = document.querySelectorAll('.card');

        if (window.innerWidth <= 768) {
            container.classList.add('mobile-view');
        } else {
            container.classList.remove('mobile-view');
        }
    }

    // Initialize animations
    setTimeout(animateCards, 100);
    setTimeout(animateProgressBars, 600);

    // Add interactive effects
    addInteractiveEffects();

    // Set up periodic updates
    setInterval(updateRealTimeData, 5000); // Update every 5 seconds
    setInterval(addNewActivity, 15000); // Add new activity every 15 seconds
    setInterval(updateTeamScores, 10000); // Update team scores every 10 seconds

    // Handle window resize
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .mobile-view .metrics-grid {
            grid-template-columns: 1fr;
        }
        
        .mobile-view .header-stats {
            flex-direction: column;
            gap: 8px;
        }
    `;
    document.head.appendChild(style);

    // Keyboard navigation support
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function () {
        document.body.classList.remove('keyboard-navigation');
    });

    console.log('All dashboard features initialized successfully!');
});
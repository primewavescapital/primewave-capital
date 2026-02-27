// ===== FOMO JavaScript for PrimeWave Capital =====

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. COUNT-UP STATS ANIMATION
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const isDecimal = target % 1 !== 0;
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                if (isDecimal) {
                    stat.textContent = current.toFixed(1);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 30);
        });
    }

    // 2. ROTATING ACTIVITY TICKER
    class ActivityTicker {
        constructor() {
            this.items = [
                { name: 'Sipho', action: 'invested', amount: 'R15,000', product: 'Retirement Portfolio' },
                { name: 'Nomsa', action: 'upgraded to', product: 'Offshore Investment' },
                { name: 'David', action: 'withdrew', amount: 'R8,500', product: 'profit' },
                { name: 'Thabo', action: 'joined with', amount: 'R25,000', product: 'starter portfolio' },
                { name: 'Linda', action: 'invested', amount: 'R50,000', product: 'Premium Advisory' },
                { name: 'Peter', action: 'added', amount: 'R12,000', product: 'to TFSA' }
            ];
            this.currentIndex = 0;
            this.tickerElement = document.querySelector('.ticker-content');
            this.init();
        }

        getRandomItem() {
            return this.items[Math.floor(Math.random() * this.items.length)];
        }

        formatMessage(item) {
            if (item.action === 'invested') {
                return `⚡ ${item.name} just ${item.action} ${item.amount} in ${item.product}`;
            } else if (item.action === 'withdrew') {
                return `💰 ${item.name} ${item.action} ${item.amount} ${item.product}`;
            } else if (item.action === 'joined with') {
                return `🎉 ${item.name} ${item.action} ${item.amount} ${item.product}`;
            } else {
                return `📊 ${item.name} ${item.action} ${item.product}`;
            }
        }

        updateTicker() {
            const item = this.getRandomItem();
            if (this.tickerElement) {
                this.tickerElement.innerHTML = this.formatMessage(item);
            }
        }

        init() {
            this.updateTicker();
            setInterval(() => this.updateTicker(), 8000);
        }
    }

    // 3. LIVE POP-UP NOTIFICATIONS
    class LivePopups {
        constructor() {
            this.container = document.querySelector('.live-popup-container');
            this.viewers = Math.floor(Math.random() * 15) + 10;
            this.names = ['Sipho', 'Nomsa', 'David', 'Thabo', 'Linda', 'Peter', 'Grace', 'Michael', 'Sarah', 'John'];
            this.init();
        }

        createPopup(message, icon = '👤') {
            const popup = document.createElement('div');
            popup.className = 'popup-message';
            popup.innerHTML = `
                <span class="popup-close">&times;</span>
                <i>${icon}</i> ${message}
            `;
            
            this.container.appendChild(popup);

            setTimeout(() => {
                if (popup.parentNode) {
                    popup.remove();
                }
            }, 5000);

            popup.querySelector('.popup-close').addEventListener('click', () => {
                popup.remove();
            });
        }

        init() {
            setTimeout(() => {
                this.createPopup(`${this.viewers} people are viewing this page right now`, '👀');
            }, 3000);

            setTimeout(() => {
                const name = this.names[Math.floor(Math.random() * this.names.length)];
                this.createPopup(`${name} just requested more information`, '💬');
            }, 8000);

            setTimeout(() => {
                this.createPopup(`Someone from Johannesburg just invested R25,000`, '💰');
            }, 15000);

            setInterval(() => {
                const type = Math.floor(Math.random() * 3);
                const name = this.names[Math.floor(Math.random() * this.names.length)];
                
                if (type === 0) {
                    this.createPopup(`${name} just joined PrimeWave Capital`, '🎉');
                } else if (type === 1) {
                    this.createPopup(`New investor from Cape Town`, '📍');
                } else {
                    const amount = Math.floor(Math.random() * 50000) + 10000;
                    this.createPopup(`Someone just invested R${amount.toLocaleString()}`, '⚡');
                }
            }, 25000);
        }
    }

    // 4. UPDATE TESTIMONIAL TIMESTAMPS
    function updateTestimonialTimes() {
        const times = [
            'Joined 2 days ago',
            'Joined last week',
            'Joined just now',
            'Joined 3 days ago',
            'Joined yesterday',
            'Joined 5 hours ago',
            'Joined 1 hour ago'
        ];

        document.querySelectorAll('.testimonial-time').forEach((element, index) => {
            element.textContent = times[index % times.length];
        });
    }

    // 5. RANDOM AVAILABILITY BADGES
    function updateAvailabilityBadges() {
        const badges = document.querySelectorAll('.availability-badge');
        const spots = [3, 5, 2, 1, 4, 6];
        
        badges.forEach((badge, index) => {
            const spotCount = spots[Math.floor(Math.random() * spots.length)];
            badge.innerHTML = `🔥 Only ${spotCount} spot${spotCount > 1 ? 's' : ''} left`;
        });
    }

    setTimeout(animateStats, 500);
    updateTestimonialTimes();
    
    if (document.querySelector('.ticker-content')) {
        new ActivityTicker();
    }

    if (document.querySelector('.live-popup-container')) {
        new LivePopups();
    }

    updateAvailabilityBadges();
    setInterval(updateAvailabilityBadges, 300000);
});

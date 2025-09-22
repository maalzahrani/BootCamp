
document.addEventListener('DOMContentLoaded', function () {
        const greetingElement = document.querySelector('.greeting');
        const computerName = greetingElement ? greetingElement.getAttribute('data-computer-name') : '';

        function updateGreeting() {
            const now = new Date();
            const hour = now.getHours();
            let greeting = 'Good Morning';

            if (hour >= 12 && hour < 17) {
                greeting = 'Good Afternoon';
            } else if (hour >= 17) {
                greeting = 'Good Evening';
            }

            if (greetingElement) {
                greetingElement.textContent = `${greeting} ${computerName}`;
            }
        }

        updateGreeting();
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

    // Enhance with smooth client-side behavior
    document.addEventListener('DOMContentLoaded', function () {
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            if (link) {
                link.addEventListener('click', function (e) {
                    // Remove active class from all items
                    navItems.forEach(nav => nav.classList.remove('active'));
                    // Add active class to clicked item
                    item.classList.add('active');

                    // Optional: Store for persistence
                    localStorage.setItem('activeNav', item.getAttribute('data-action'));
                });
            }
        });
    });

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


    // Price filter functionality with debug
    document.addEventListener('DOMContentLoaded', function () {
        const filterButton = document.getElementById('filterPrice');

        if (filterButton) {
            // Debug: Check all data attributes on page load
            const table = document.getElementById('productTable');
            if (table) {
                const rows = table.querySelectorAll('tbody tr');
                console.log('Debug - All data-price attributes:');
                rows.forEach((row, index) => {
                    const priceAttr = row.getAttribute('data-price');
                    console.log(`Row ${index}:`, priceAttr, 'Type:', typeof priceAttr);
                });
            }

            filterButton.addEventListener('click', function () {
                const table = document.getElementById('productTable');
                if (!table) {
                    console.error('Table with id "productTable" not found!');
                    return;
                }

                const rows = table.querySelectorAll('tbody tr');
                let isCurrentlyFiltered = filterButton.textContent.includes('Show All');

                console.log('Filter button clicked. Current state:', isCurrentlyFiltered);

                rows.forEach((row, index) => {
                    const priceAttr = row.getAttribute('data-price');
                    console.log(`Row ${index} data-price:`, priceAttr);

                    // Handle both comma and dot decimal separators
                    const priceText = priceAttr ? priceAttr.replace(',', '.') : '0';
                    const price = parseFloat(priceText);

                    console.log(`Row ${index} parsed price:`, price);

                    if (isCurrentlyFiltered) {
                        // Show all rows
                        row.style.display = '';
                        filterButton.textContent = 'Show Price < 100';
                    } else {
                        // Filter rows
                        if (!isNaN(price) && price < 100) {
                            row.style.display = '';
                            console.log(`Row ${index} shown (price < 100)`);
                        } else {
                            row.style.display = 'none';
                            console.log(`Row ${index} hidden (price >= 100)`);
                        }
                        filterButton.textContent = 'Show All';
                    }
                });
            });
        } else {
            console.error('Filter button with id "filterPrice" not found!');
        }
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
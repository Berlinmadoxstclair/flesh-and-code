document.addEventListener('DOMContentLoaded', () => {
    
    /* === VARIABLES === */
    const sections = document.querySelectorAll('.fade-section');
    const navElement = document.getElementById('ghost-nav');
    const navItems = document.querySelectorAll('#ghost-nav li');
    
    let currentIndex = 0;
    let isAnimating = false;

    /* === 1. MAIN TRANSITION FUNCTION === */
    function goToSection(index) {
        // Boundary checks
        if (index < 0 || index >= sections.length || isAnimating) return;
        
        // LOCK: Start Animation
        isAnimating = true;

        // ACTION: Hide the Menu immediately
        navElement.classList.remove('visible');
        navElement.classList.add('hidden');

        // 1. Switch Content
        sections.forEach(sec => sec.classList.remove('active'));
        sections[index].classList.add('active');

        // 2. Update Menu Active State (ready for when it reappears)
        navItems.forEach(item => item.classList.remove('active'));
        navItems[index].classList.add('active');

        currentIndex = index;

        // 3. UNLOCK: End Animation & Reveal Menu
        // TIMING UPDATE: 1300ms creates a "soft landing" sync with the 1500ms CSS fade
        setTimeout(() => {
            isAnimating = false;
            navElement.classList.remove('hidden');
            navElement.classList.add('visible');
        }, 1300);
    }

    /* === 2. WHEEL LISTENER (The Trigger) === */
    window.addEventListener('wheel', (e) => {
        if (isAnimating) return;
        
        if (e.deltaY > 0) {
            goToSection(currentIndex + 1);
        } else {
            goToSection(currentIndex - 1);
        }
    });

    /* === 3. CLICK LISTENER === */
    window.jumpToSection = function(index) {
        goToSection(index);
    }
});
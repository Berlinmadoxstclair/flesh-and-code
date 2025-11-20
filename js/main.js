document.addEventListener('DOMContentLoaded', () => {
    
    /* === VARIABLES === */
    const sections = document.querySelectorAll('.fade-section');
    const navElement = document.getElementById('ghost-nav');
    const navItems = document.querySelectorAll('#ghost-nav li');
    
    let currentIndex = 0;
    let isAnimating = false;

    /* === 1. TRANSITION FUNCTION === */
    function goToSection(index) {
        if (index < 0 || index >= sections.length || isAnimating) return;
        
        isAnimating = true;

        // Hide Menu
        navElement.classList.remove('visible');
        navElement.classList.add('hidden');

        // Switch Content
        sections.forEach(sec => sec.classList.remove('active'));
        sections[index].classList.add('active');

        // Update Menu State
        navItems.forEach(item => item.classList.remove('active'));
        navItems[index].classList.add('active');

        currentIndex = index;

        // Reveal Menu (1.2s delay)
        setTimeout(() => {
            isAnimating = false;
            navElement.classList.remove('hidden');
            navElement.classList.add('visible');
        }, 1200);
    }

    /* === 2. MOUSE WHEEL (Desktop) === */
    window.addEventListener('wheel', (e) => {
        if (document.body.classList.contains('scroll-mode')) return;
        if (isAnimating) return;
        
        if (e.deltaY > 0) {
            goToSection(currentIndex + 1);
        } else {
            goToSection(currentIndex - 1);
        }
    });

    /* === 3. TOUCH SWIPE (Mobile Fix) === */
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        if (document.body.classList.contains('scroll-mode')) return;
        touchStartY = e.changedTouches[0].screenY;
    }, {passive: false});

    document.addEventListener('touchend', (e) => {
        if (document.body.classList.contains('scroll-mode')) return;
        touchEndY = e.changedTouches[0].screenY;
        handleGesture();
    }, {passive: false});

    function handleGesture() {
        if (isAnimating) return;
        const swipeDistance = touchStartY - touchEndY;
        
        // Threshold of 50px prevents accidental small movements
        if (swipeDistance > 50) {
            goToSection(currentIndex + 1); // Swipe Up -> Next
        } else if (swipeDistance < -50) {
            goToSection(currentIndex - 1); // Swipe Down -> Prev
        }
    }

    /* === 4. CLICK LISTENER === */
    window.jumpToSection = function(index) {
        goToSection(index);
    }
});
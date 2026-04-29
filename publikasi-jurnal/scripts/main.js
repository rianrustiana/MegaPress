document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp Badge Animation
    const badge = document.getElementById('wa-badge');
    
    if (badge) {
        // Hide badge initially
        badge.style.display = 'none';
        
        // Show badge after 3 seconds with animation
        setTimeout(function() {
            badge.style.display = 'flex';
            
            // Add bounce animation
            badge.style.animation = 'bounce 1s ease-in-out 3';
            
            // Optional: Add a subtle shake effect after showing
            setTimeout(function() {
                badge.style.animation = 'none';
            }, 3000);
        }, 3000);
    }

    // Promotional Popup with Progress Bar Countdown
    const promoPopup = document.getElementById('promo-popup');
    const promoModal = document.getElementById('promo-modal');
    const closePopup = document.getElementById('close-popup');
    const claimPromo = document.getElementById('claim-promo');
    const countdownSeconds = document.getElementById('countdown-seconds');
    const countdownProgress = document.getElementById('countdown-progress');
    
    // Always show popup (removed sessionStorage check)
    if (promoPopup && promoModal) {
        let countdown = 5;
        let countdownInterval;
        
        // Show popup after 2 seconds
        setTimeout(function() {
            promoPopup.classList.remove('hidden');
            promoPopup.classList.add('flex');
            
            // Animate modal entrance
            setTimeout(function() {
                promoModal.style.transform = 'scale(1)';
                promoModal.style.opacity = '1';
            }, 50);
            
            // Start countdown with progress bar
            countdownInterval = setInterval(function() {
                countdown--;
                
                // Update seconds display
                if (countdownSeconds) {
                    countdownSeconds.textContent = countdown;
                }
                
                // Update progress bar (calculate percentage)
                if (countdownProgress) {
                    const percentage = (countdown / 5) * 100;
                    countdownProgress.style.width = percentage + '%';
                }
                
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    // Auto-close popup when countdown ends
                    hidePopup();
                }
            }, 1000);
        }, 2000);
        
        // Close popup function
        function hidePopup() {
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
            
            promoModal.style.transform = 'scale(0.95)';
            promoModal.style.opacity = '0';
            
            setTimeout(function() {
                promoPopup.classList.add('hidden');
                promoPopup.classList.remove('flex');
            }, 300);
        }
        
        // Close button handler
        if (closePopup) {
            closePopup.addEventListener('click', hidePopup);
        }
        
        // Click outside to close
        promoPopup.addEventListener('click', function(e) {
            if (e.target === promoPopup) {
                hidePopup();
            }
        });
        
        // Claim promo button handler
        if (claimPromo) {
            claimPromo.addEventListener('click', function() {
                const email = document.getElementById('promo-email').value;
                
                if (email && email.includes('@')) {
                    // Redirect to WhatsApp with promo message
                    const message = encodeURIComponent('Halo Admin Mega Press, saya tertarik dengan promo diskon 30% untuk publikasi jurnal. Email saya: ' + email);
                    window.open('https://wa.me/6281234567890?text=' + message, '_blank');
                    hidePopup();
                } else {
                    // If no email, just redirect with generic promo message
                    const message = encodeURIComponent('Halo Admin Mega Press, saya tertarik dengan promo diskon 30% untuk publikasi jurnal.');
                    window.open('https://wa.me/6281234567890?text=' + message, '_blank');
                    hidePopup();
                }
            });
        }
        
        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !promoPopup.classList.contains('hidden')) {
                hidePopup();
            }
        });
    }
});

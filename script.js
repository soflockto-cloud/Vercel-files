// Generate a random key
function generateRandomKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const keyLength = 16;
    let key = '';
    
    for (let i = 0; i < keyLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        key += characters[randomIndex];
    }
    
    return key;
}

// Format key for display (add hyphens for readability)
function formatKey(key) {
    return key.match(/.{1,4}/g).join('-');
}

// Start countdown timer (24 hours)
function startCountdownTimer(generatedKey) {
    const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours from now
    
    // Save to localStorage
    localStorage.setItem('keyExpiryTime', expiryTime);
    localStorage.setItem('generatedKey', generatedKey);
    
    const timerElement = document.getElementById('timerDisplay');
    
    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = expiryTime - now;
        
        if (timeLeft <= 0) {
            timerElement.textContent = 'Key Expired!';
            timerElement.style.color = '#dc3545';
            document.getElementById('adLink').disabled = true;
            document.getElementById('copyBtn').disabled = true;
            document.getElementById('newKeyBtn').disabled = true;
            clearInterval(timerInterval);
            return;
        }
        
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        timerElement.textContent = `⏱️ Valid for: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timerElement.style.color = hours > 6 ? '#28a745' : hours > 2 ? '#ffc107' : '#dc3545';
    }
    
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    const adLink = document.getElementById('adLink');
    const status = document.getElementById('status');
    const keyDisplay = document.getElementById('keyDisplay');
    const generatedKey = document.getElementById('generatedKey');
    const copyBtn = document.getElementById('copyBtn');
    const newKeyBtn = document.getElementById('newKeyBtn');
    
    // Replace with your actual ad link URL
    const YOUR_AD_LINK = 'https://link-unlock.com/kn4ghtunlocker';
    adLink.href = YOUR_AD_LINK;
    
    // Check for stored key on page load
    const storedKey = localStorage.getItem('generatedKey');
    const expiryTime = localStorage.getItem('keyExpiryTime');
    
    if (storedKey && expiryTime) {
        const now = new Date().getTime();
        if (now < parseInt(expiryTime)) {
            generatedKey.textContent = storedKey;
            keyDisplay.classList.remove('hidden');
            startCountdownTimer(storedKey);
            status.textContent = '✓ Your existing key is still valid!';
            status.style.color = '#28a745';
            return;
        } else {
            localStorage.removeItem('generatedKey');
            localStorage.removeItem('keyExpiryTime');
        }
    }
    
    // Track if user actually went to ad link
    let adLinkOpened = false;
    
    // Handle ad link click
    adLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        status.textContent = '⏳ Opening ad link... Please complete it and return here.';
        status.style.color = '#667eea';
        
        // Open ad link in new window
        const adWindow = window.open(YOUR_AD_LINK, '_blank');
        
        // Check if user returned after some time
        if (adWindow) {
            adLinkOpened = true;
            
            // Wait for user to potentially close ad window and return
            let checkAttempts = 0;
            const checkInterval = setInterval(function() {
                checkAttempts++;
                
                // If user comes back to this window, show success
                if (document.hasFocus()) {
                    clearInterval(checkInterval);
                    
                    // Generate and display key
                    const key = generateRandomKey();
                    const formattedKey = formatKey(key);
                    
                    generatedKey.textContent = formattedKey;
                    keyDisplay.classList.remove('hidden');
                    status.textContent = '✓ Key generated successfully! Valid for 24 hours.';
                    status.style.color = '#28a745';
                    
                    // Start 24-hour countdown timer
                    startCountdownTimer(formattedKey);
                }
                
                // Stop checking after 5 minutes if user doesn't return
                if (checkAttempts > 300) {
                    clearInterval(checkInterval);
                    if (!adLinkOpened) {
                        status.textContent = '⚠️ Please complete the ad link and return to this page.';
                        status.style.color = '#ffc107';
                    }
                }
            }, 1000);
        }
    });
    
    // Copy to clipboard
    copyBtn.addEventListener('click', function() {
        const key = generatedKey.textContent;
        navigator.clipboard.writeText(key).then(function() {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.style.background = '#28a745';
            
            setTimeout(function() {
                copyBtn.textContent = originalText;
                copyBtn.style.background = '#667eea';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy:', err);
        });
    });
    
    // Generate new key
    newKeyBtn.addEventListener('click', function() {
        const key = generateRandomKey();
        const formattedKey = formatKey(key);
        generatedKey.textContent = formattedKey;
        
        // Update stored key and expiry time
        const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        localStorage.setItem('keyExpiryTime', expiryTime);
        localStorage.setItem('generatedKey', formattedKey);
        
        // Restart timer
        startCountdownTimer(formattedKey);
        
        status.textContent = '✓ New key generated! Timer reset to 24 hours.';
        status.style.color = '#28a745';
    });
});

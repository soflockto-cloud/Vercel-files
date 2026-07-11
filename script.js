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
    localStorage.setItem('keyVerified', 'true'); // Mark as verified
    
    const timerElement = document.getElementById('timerDisplay');
    
    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = expiryTime - now;
        
        if (timeLeft <= 0) {
            timerElement.textContent = '❌ Key Expired!';
            timerElement.style.color = '#dc3545';
            document.getElementById('copyBtn').disabled = true;
            document.getElementById('newKeyBtn').disabled = true;
            clearInterval(timerInterval);
            return;
        }
        
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        timerElement.textContent = `⏱️ Expires in: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
    const keyVerified = localStorage.getItem('keyVerified');
    
    if (storedKey && expiryTime && keyVerified === 'true') {
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
            localStorage.removeItem('keyVerified');
        }
    }
    
    // Generate a unique verification token for this session
    const verificationToken = 'verify_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    localStorage.setItem('adVerificationToken', verificationToken);
    localStorage.setItem('adVerificationTimestamp', Date.now());
    localStorage.setItem('adCompleted', 'false'); // Start with false
    
    // Handle ad link click
    adLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        status.textContent = '⏳ Opening ad link... Please complete the ENTIRE task on the other page.';
        status.style.color = '#667eea';
        copyBtn.disabled = true;
        newKeyBtn.disabled = true;
        
        // Create new verification token
        const newToken = 'verify_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem('adVerificationToken', newToken);
        localStorage.setItem('adVerificationTimestamp', Date.now());
        localStorage.setItem('adCompleted', 'false'); // Reset flag
        
        // Add verification token as URL parameter
        const adLinkWithToken = YOUR_AD_LINK + (YOUR_AD_LINK.includes('?') ? '&' : '?') + 'ref=' + newToken;
        
        // Open ad link in new window
        window.open(adLinkWithToken, '_blank');
        
        // Start polling for completion
        startCompletionCheck();
    });
    
    // Check for ad completion
    function startCompletionCheck() {
        let checkCount = 0;
        const maxChecks = 600; // 10 minutes
        
        const completionInterval = setInterval(function() {
            checkCount++;
            
            // Check if ad completion was set by callback
            const adCompleted = localStorage.getItem('adCompleted');
            const verificationToken = localStorage.getItem('adVerificationToken');
            const verificationTimestamp = localStorage.getItem('adVerificationTimestamp');
            
            // Check if verification expired (15 minutes)
            const now = Date.now();
            const isExpired = (now - parseInt(verificationTimestamp)) > (15 * 60 * 1000);
            
            if (isExpired) {
                clearInterval(completionInterval);
                status.textContent = '❌ Verification timeout. Please try again.';
                status.style.color = '#dc3545';
                copyBtn.disabled = false;
                newKeyBtn.disabled = false;
                return;
            }
            
            // Check if callback set the flag
            if (adCompleted === 'true' && verificationToken) {
                clearInterval(completionInterval);
                
                // Generate and display key
                const key = generateRandomKey();
                const formattedKey = formatKey(key);
                
                generatedKey.textContent = formattedKey;
                keyDisplay.classList.remove('hidden');
                status.textContent = '✓ Ad completed! Key generated successfully! Valid for 24 hours.';
                status.style.color = '#28a745';
                copyBtn.disabled = false;
                newKeyBtn.disabled = false;
                
                // Start 24-hour countdown timer
                startCountdownTimer(formattedKey);
                
                // Clean up
                localStorage.removeItem('adCompleted');
                localStorage.removeItem('adVerificationToken');
                
                return;
            }
            
            // Stop checking after max attempts
            if (checkCount > maxChecks) {
                clearInterval(completionInterval);
                status.textContent = '⚠️ Ad completion not detected. Please try again.';
                status.style.color = '#ffc107';
                copyBtn.disabled = false;
                newKeyBtn.disabled = false;
            }
        }, 1000);
    }
    
    // Listen for messages from callback
    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'AD_COMPLETED') {
            const token = event.data.token;
            const storedToken = localStorage.getItem('adVerificationToken');
            
            if (token === storedToken) {
                localStorage.setItem('adCompleted', 'true');
            }
        }
    });
    
    // Copy to clipboard
    copyBtn.addEventListener('click', function() {
        const key = generatedKey.textContent;
        navigator.clipboard.writeText(key).then(function() {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✓ Copied!';
            copyBtn.style.background = '#28a745';
            
            setTimeout(function() {
                copyBtn.textContent = originalText;
                copyBtn.style.background = '#667eea';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy:', err);
        });
    });
    
    // Generate new key (only if already verified once)
    newKeyBtn.addEventListener('click', function() {
        if (localStorage.getItem('keyVerified') === 'true') {
            const key = generateRandomKey();
            const formattedKey = formatKey(key);
            generatedKey.textContent = formattedKey;
            
            // Update stored key and expiry time
            const newExpiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
            localStorage.setItem('keyExpiryTime', newExpiryTime);
            localStorage.setItem('generatedKey', formattedKey);
            
            // Restart timer
            startCountdownTimer(formattedKey);
            
            status.textContent = '✓ New key generated! Timer reset to 24 hours.';
            status.style.color = '#28a745';
        } else {
            status.textContent = '❌ Must complete ad link first!';
            status.style.color = '#dc3545';
        }
    });
});

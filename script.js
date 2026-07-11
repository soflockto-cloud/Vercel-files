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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    const adLink = document.getElementById('adLink');
    const status = document.getElementById('status');
    const keyDisplay = document.getElementById('keyDisplay');
    const generatedKey = document.getElementById('generatedKey');
    const copyBtn = document.getElementById('copyBtn');
    const newKeyBtn = document.getElementById('newKeyBtn');
    
    // Replace with your actual ad link URL
    const YOUR_AD_LINK = 'https://your-ad-link-here.com';
    adLink.href = YOUR_AD_LINK;
    
    // Handle ad link click
    adLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        status.textContent = 'Processing...';
        status.style.color = '#667eea';
        
        // Simulate ad completion delay (2-3 seconds)
        const delay = 2000 + Math.random() * 1000;
        
        setTimeout(function() {
            // Generate and display key
            const key = generateRandomKey();
            const formattedKey = formatKey(key);
            
            generatedKey.textContent = formattedKey;
            keyDisplay.classList.remove('hidden');
            status.textContent = '✓ Key generated successfully!';
            status.style.color = '#28a745';
            
            // Open ad link in new window
            window.open(YOUR_AD_LINK, '_blank');
        }, delay);
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
    });
});
// LuaArmor-style protection system for JavaScript
class SecurityManager {
    constructor() {
        this.suspiciousActivities = 0;
        this.maxSuspiciousActivities = 5;
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.initializeProtections();
    }
    
    generateSessionId() {
        return 'sess_' + Math.random().toString(36).substr(2, 32) + '_' + Date.now();
    }
    
    // Initialize all security measures
    initializeProtections() {
        this.protectConsole();
        this.protectLocalStorage();
        this.protectDebugger();
        this.preventScriptInjection();
        this.monitorPerformance();
        this.detectVirtualMachines();
        this.preventDevTools();
        this.checkIntegrity();
        this.monitorNetworkRequests();
    }
    
    // Protect console from manipulation
    protectConsole() {
        const originalLog = console.log;
        const originalWarn = console.warn;
        const originalError = console.error;
        
        console.log = (...args) => {
            originalLog.apply(console, args);
        };
        
        console.warn = (...args) => {
            originalWarn.apply(console, args);
        };
        
        console.error = (...args) => {
            originalError.apply(console, args);
        };
        
        // Prevent console manipulation
        Object.defineProperty(window, 'console', {
            value: console,
            writable: false,
            configurable: false
        });
    }
    
    // Protect localStorage from tampering
    protectLocalStorage() {
        const originalSetItem = Storage.prototype.setItem;
        const originalGetItem = Storage.prototype.getItem;
        const originalRemoveItem = Storage.prototype.removeItem;
        
        Storage.prototype.setItem = function(key, value) {
            if (key.includes('bypass') || key.includes('admin') || key.includes('verify')) {
                console.warn('Suspicious localStorage modification detected:', key);
                this.suspiciousActivities++;
                return;
            }
            originalSetItem.call(this, key, value);
        }.bind(this);
        
        Storage.prototype.getItem = function(key) {
            return originalGetItem.call(this, key);
        };
        
        Storage.prototype.removeItem = function(key) {
            return originalRemoveItem.call(this, key);
        };
        
        Object.defineProperty(window, 'localStorage', {
            value: localStorage,
            writable: false,
            configurable: false
        });
    }
    
    // Prevent debugger attachment
    preventDevTools() {
        // Disable F12, Ctrl+Shift+I, etc
        document.onkeydown = (e) => {
            // F12
            if (e.key === 'F12') {
                e.preventDefault();
                this.suspiciousActivities++;
                return false;
            }
            // Ctrl+Shift+I (Chrome, Firefox)
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();
                this.suspiciousActivities++;
                return false;
            }
            // Ctrl+Shift+C (Chrome inspector)
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                this.suspiciousActivities++;
                return false;
            }
            // Ctrl+Shift+J (Chrome console)
            if (e.ctrlKey && e.shiftKey && e.key === 'J') {
                e.preventDefault();
                this.suspiciousActivities++;
                return false;
            }
        };
        
        // Disable right-click context menu
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.suspiciousActivities++;
            return false;
        });
    }
    
    // Protect debugger from attachment
    protectDebugger() {
        // Inline debugger detection
        setInterval(() => {
            const before = new Date();
            debugger;
            const after = new Date();
            
            if (after - before > 100) {
                this.suspiciousActivities++;
                this.triggerSecurityResponse('Debugger detected');
            }
        }, 5000);
    }
    
    // Prevent script injection attacks
    preventScriptInjection() {
        // Protect eval
        const originalEval = eval;
        window.eval = function(code) {
            console.warn('Eval attempt blocked');
            this.suspiciousActivities++;
            return null;
        }.bind(this);
        
        // Protect Function constructor
        const OriginalFunction = Function;
        window.Function = function() {
            console.warn('Function constructor blocked');
            this.suspiciousActivities++;
            return null;
        }.bind(this);
        
        // Monitor DOM manipulation
        const originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
        Object.defineProperty(Element.prototype, 'innerHTML', {
            get: originalInnerHTML.get,
            set: function(value) {
                if (value.includes('script') || value.includes('iframe')) {
                    console.warn('Suspicious innerHTML modification');
                    this.suspiciousActivities++;
                    return;
                }
                originalInnerHTML.set.call(this, value);
            }.bind(this)
        });
    }
    
    // Monitor performance for signs of manipulation
    monitorPerformance() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 1000 || entry.name.includes('bypass')) {
                    console.warn('Suspicious performance entry:', entry.name);
                    this.suspiciousActivities++;
                }
            }
        });
        
        try {
            observer.observe({entryTypes: ['measure', 'navigation']});
        } catch (e) {
            // Some browsers don't support all entry types
        }
    }
    
    // Detect virtual machines and emulators
    detectVirtualMachines() {
        // Check for common VM indicators
        const vmIndicators = [
            // VirtualBox
            () => navigator.userAgent.includes('VirtualBox'),
            // VMware
            () => navigator.userAgent.includes('VMware'),
            // Hyper-V
            () => navigator.userAgent.includes('Hyper-V'),
            // KVM
            () => navigator.userAgent.includes('KVM'),
            // QEMU
            () => navigator.userAgent.includes('QEMU'),
            // Xen
            () => navigator.userAgent.includes('Xen'),
            // Docker
            () => navigator.userAgent.includes('Docker'),
            // Suspicious user agent
            () => /headless|bot|spider|crawler/i.test(navigator.userAgent),
            // Check screen resolution (VMs often have specific resolutions)
            () => (screen.width === 1024 && screen.height === 768) ||
                   (screen.width === 800 && screen.height === 600) ||
                   (screen.width === 1280 && screen.height === 720),
            // Check for no plugins
            () => navigator.plugins.length === 0,
            // Check timezone
            () => new Date().getTimezoneOffset() === 0
        ];
        
        for (let indicator of vmIndicators) {
            try {
                if (indicator()) {
                    this.suspiciousActivities++;
                    this.triggerSecurityResponse('Virtual machine detected');
                }
            } catch (e) {}
        }
    }
    
    // Check code integrity
    checkIntegrity() {
        setInterval(() => {
            // Check if critical functions were modified
            const criticalFunctions = [
                'generateRandomKey',
                'formatKey',
                'startCountdownTimer',
                'detectBypass'
            ];
            
            for (let func of criticalFunctions) {
                if (window[func] && window[func].toString().length === 0) {
                    this.suspiciousActivities++;
                    this.triggerSecurityResponse('Code integrity check failed');
                }
            }
        }, 10000);
    }
    
    // Monitor network requests
    monitorNetworkRequests() {
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
            const url = args[0].toString();
            
            // Block requests to known bypass sites
            const bypassSites = [
                'izen.lol',
                'rtaoexe.xyz',
                'bypass.tools',
                'bypass.links',
                'bypass.city',
                'bypass.vip'
            ];
            
            for (let site of bypassSites) {
                if (url.includes(site)) {
                    console.warn('Blocked request to:', url);
                    this.suspiciousActivities++;
                    return Promise.reject(new Error('Blocked request'));
                }
            }
            
            return originalFetch.apply(this, args);
        }.bind(this);
    }
    
    // Trigger security response
    triggerSecurityResponse(reason) {
        this.suspiciousActivities++;
        console.warn('Security threat detected:', reason);
        
        if (this.suspiciousActivities >= this.maxSuspiciousActivities) {
            this.lockDown(reason);
        }
    }
    
    // Lock down the website
    lockDown(reason) {
        document.body.innerHTML = `
            <div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:Arial;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <div style="background:white;padding:40px;border-radius:12px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.3);max-width:400px">
                    <h1 style="color:#dc3545;font-size:48px">🔒</h1>
                    <h2 style="color:#333;margin:20px 0">Security Lockdown</h2>
                    <p style="color:#666;margin:10px 0">Multiple security threats detected.</p>
                    <p style="color:#dc3545;font-weight:bold;margin:15px 0">Reason: ${reason}</p>
                    <p style="color:#666;margin:15px 0">Your session has been terminated for security purposes.</p>
                    <p style="color:#999;font-size:12px;margin-top:20px">Session ID: ${this.sessionId}</p>
                </div>
            </div>
        `;
        
        // Disable all interactions
        document.body.style.pointerEvents = 'none';
        window.onbeforeunload = () => '';
        
        // Log incident
        this.logIncident(reason);
    }
    
    // Log security incidents
    logIncident(reason) {
        const incident = {
            sessionId: this.sessionId,
            timestamp: new Date().toISOString(),
            reason: reason,
            userAgent: navigator.userAgent,
            url: window.location.href,
            suspiciousActivities: this.suspiciousActivities
        };
        
        // Send to backend (implement your logging endpoint)
        try {
            fetch('/log-security-incident', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(incident)
            }).catch(e => console.log('Logging failed (expected)'));
        } catch (e) {}
    }
}

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

// Anti-bypass detection
function detectBypass() {
    const bypassDomains = [
        'izen.lol',
        'rtaoexe.xyz/bypass',
        'bypass.tools',
        'bypass.links',
        'bypass.city',
        'bypass.vip'
    ];
    
    // Check if running in iframe
    if (window.self !== window.top) {
        return true;
    }
    
    // Check for Discord bot
    if (navigator.userAgent.includes('Discord')) {
        return true;
    }
    
    // Check for bots
    const botPatterns = [
        /bot/i, /crawler/i, /spider/i, /scraper/i, 
        /curl/i, /wget/i, /python/i, /phantomjs/i, 
        /selenium/i, /puppeteer/i, /playwright/i
    ];
    
    for (let pattern of botPatterns) {
        if (pattern.test(navigator.userAgent)) {
            return true;
        }
    }
    
    // Check for userscript managers
    if (window.GM_getValue || window.GM_setValue || window.$$ || window.unsafeWindow) {
        return true;
    }
    
    return false;
}

// Start countdown timer (24 hours)
function startCountdownTimer(generatedKey) {
    const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    localStorage.setItem('keyExpiryTime', expiryTime);
    localStorage.setItem('generatedKey', generatedKey);
    localStorage.setItem('keyVerified', 'true');
    localStorage.setItem('keyGeneratedTime', Date.now());
    
    const timerElement = document.getElementById('timerDisplay');
    const adLink = document.getElementById('adLink');
    
    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = expiryTime - now;
        
        if (timeLeft <= 0) {
            timerElement.textContent = '❌ Key Expired!';
            timerElement.style.color = '#dc3545';
            document.getElementById('copyBtn').disabled = true;
            document.getElementById('newKeyBtn').disabled = true;
            adLink.disabled = false;
            adLink.style.opacity = '1';
            adLink.style.cursor = 'pointer';
            clearInterval(timerInterval);
            
            localStorage.removeItem('generatedKey');
            localStorage.removeItem('keyExpiryTime');
            localStorage.removeItem('keyVerified');
            
            document.getElementById('keyDisplay').classList.add('hidden');
            document.getElementById('status').textContent = 'Key expired. Click the button below to get a new one.';
            return;
        }
        
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        timerElement.textContent = `⏱️ Key expires in: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timerElement.style.color = hours > 6 ? '#28a745' : hours > 2 ? '#ffc107' : '#dc3545';
    }
    
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

// Initialize security on document load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize security manager
    const security = new SecurityManager();
    
    // Check for bypass attempts
    if (detectBypass()) {
        security.triggerSecurityResponse('Bypass attempt detected');
        return;
    }
    
    const adLink = document.getElementById('adLink');
    const status = document.getElementById('status');
    const keyDisplay = document.getElementById('keyDisplay');
    const generatedKey = document.getElementById('generatedKey');
    const copyBtn = document.getElementById('copyBtn');
    const newKeyBtn = document.getElementById('newKeyBtn');
    
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
            adLink.disabled = true;
            adLink.style.opacity = '0.5';
            adLink.style.cursor = 'not-allowed';
            return;
        }
    }
    
    const verificationToken = 'verify_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    localStorage.setItem('adVerificationToken', verificationToken);
    localStorage.setItem('adVerificationTimestamp', Date.now());
    localStorage.setItem('adCompleted', 'false');
    
    sessionStorage.setItem('lastURL', window.location.href);
    
    adLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (detectBypass()) {
            security.triggerSecurityResponse('Bypass detected during ad link click');
            return;
        }
        
        status.textContent = '⏳ Opening ad link... Complete the task and you\'ll be redirected back with your key.';
        status.style.color = '#667eea';
        copyBtn.disabled = true;
        newKeyBtn.disabled = true;
        adLink.disabled = true;
        adLink.style.opacity = '0.5';
        
        const newToken = 'verify_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem('adVerificationToken', newToken);
        localStorage.setItem('adVerificationTimestamp', Date.now());
        localStorage.setItem('adCompleted', 'false');
        
        const adLinkWithToken = YOUR_AD_LINK + (YOUR_AD_LINK.includes('?') ? '&' : '?') + 'ref=' + newToken;
        
        window.open(adLinkWithToken, '_blank');
        
        startCompletionCheck(security);
    });
    
    function startCompletionCheck(security) {
        let checkCount = 0;
        const maxChecks = 600;
        
        const completionInterval = setInterval(function() {
            checkCount++;
            
            if (detectBypass()) {
                clearInterval(completionInterval);
                security.triggerSecurityResponse('Bypass detected during completion check');
                return;
            }
            
            const adCompleted = localStorage.getItem('adCompleted');
            const verificationToken = localStorage.getItem('adVerificationToken');
            const verificationTimestamp = localStorage.getItem('adVerificationTimestamp');
            
            const now = Date.now();
            const isExpired = (now - parseInt(verificationTimestamp)) > (15 * 60 * 1000);
            
            if (isExpired) {
                clearInterval(completionInterval);
                status.textContent = '❌ Verification timeout. Please try again.';
                status.style.color = '#dc3545';
                copyBtn.disabled = false;
                newKeyBtn.disabled = false;
                adLink.disabled = false;
                adLink.style.opacity = '1';
                return;
            }
            
            if (adCompleted === 'true' && verificationToken) {
                clearInterval(completionInterval);
                
                const key = generateRandomKey();
                const formattedKey = formatKey(key);
                
                generatedKey.textContent = formattedKey;
                keyDisplay.classList.remove('hidden');
                status.textContent = '✓ Ad completed! Your key is ready! Valid for 24 hours.';
                status.style.color = '#28a745';
                copyBtn.disabled = false;
                newKeyBtn.disabled = false;
                adLink.disabled = true;
                adLink.style.opacity = '0.5';
                
                startCountdownTimer(formattedKey);
                
                localStorage.removeItem('adCompleted');
                localStorage.removeItem('adVerificationToken');
                
                return;
            }
            
            if (checkCount > maxChecks) {
                clearInterval(completionInterval);
                status.textContent = '⚠️ Ad completion not detected. Please try again.';
                status.style.color = '#ffc107';
                copyBtn.disabled = false;
                newKeyBtn.disabled = false;
                adLink.disabled = false;
                adLink.style.opacity = '1';
            }
        }, 1000);
    }
    
    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'AD_COMPLETED') {
            if (detectBypass()) {
                security.triggerSecurityResponse('Bypass detected in message handler');
                return;
            }
            
            const token = event.data.token;
            const storedToken = localStorage.getItem('adVerificationToken');
            
            if (token === storedToken) {
                localStorage.setItem('adCompleted', 'true');
            }
        }
    });
    
    copyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const keyWithoutHyphens = generatedKey.textContent.replace(/-/g, '');
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(keyWithoutHyphens).then(function() {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = '✓ Copied!';
                copyBtn.style.background = '#28a745';
                copyBtn.style.color = 'white';
                
                setTimeout(function() {
                    copyBtn.textContent = originalText;
                    copyBtn.style.background = '#667eea';
                    copyBtn.style.color = 'white';
                }, 2000);
            }).catch(function(err) {
                console.error('Clipboard error:', err);
                fallbackCopy(keyWithoutHyphens);
            });
        } else {
            fallbackCopy(keyWithoutHyphens);
        }
    });
    
    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            copyBtn.textContent = '✓ Copied!';
            copyBtn.style.background = '#28a745';
            copyBtn.style.color = 'white';
            
            setTimeout(function() {
                copyBtn.textContent = 'Copy to Clipboard';
                copyBtn.style.background = '#667eea';
                copyBtn.style.color = 'white';
            }, 2000);
        } catch (err) {
            console.error('Fallback copy failed:', err);
            status.textContent = '❌ Copy failed. Try manual copy.';
            status.style.color = '#dc3545';
        }
        document.body.removeChild(textarea);
    }
    
    newKeyBtn.addEventListener('click', function() {
        if (localStorage.getItem('keyVerified') === 'true') {
            const expiryTime = localStorage.getItem('keyExpiryTime');
            const now = Date.now();
            
            if (now < parseInt(expiryTime)) {
                status.textContent = '⏱️ Your current key is still valid. Wait for it to expire.';
                status.style.color = '#ffc107';
                return;
            }
            
            const key = generateRandomKey();
            const formattedKey = formatKey(key);
            generatedKey.textContent = formattedKey;
            
            const newExpiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
            localStorage.setItem('keyExpiryTime', newExpiryTime);
            localStorage.setItem('generatedKey', formattedKey);
            
            startCountdownTimer(formattedKey);
            
            status.textContent = '✓ New key generated! Timer reset to 24 hours.';
            status.style.color = '#28a745';
        } else {
            status.textContent = '❌ Must complete ad link first!';
            status.style.color = '#dc3545';
        }
    });
});

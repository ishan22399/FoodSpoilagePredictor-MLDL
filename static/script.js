document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const fileInput = document.getElementById('file-input');
    const selectButton = document.getElementById('select-button');
    const dropArea = document.getElementById('drop-area');
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('preview-image');
    const closePreview = document.getElementById('close-preview');
    const changeImage = document.getElementById('change-image');
    const analyzeButton = document.getElementById('analyze-button');
    const resultContainer = document.getElementById('result-container');
    const loader = document.getElementById('loader');
    const result = document.getElementById('result');
    
    // File selection via button
    if (selectButton) {
        selectButton.addEventListener('click', function() {
            fileInput.click();
        });
    }
    
    // File selection via input change
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            if (fileInput.files && fileInput.files[0]) {
                handleFileSelect(fileInput.files[0]);
            }
        });
    }
    
    // Drag and drop functionality
    if (dropArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            dropArea.classList.add('highlight');
        }
        
        function unhighlight() {
            dropArea.classList.remove('highlight');
        }
        
        dropArea.addEventListener('drop', function(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            
            if (files && files[0]) {
                handleFileSelect(files[0]);
            }
        });
    }
    
    // File selection handler
    function handleFileSelect(file) {
        // Validate file type
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        if (!validImageTypes.includes(file.type)) {
            showNotification('Please select a valid image file (JPG, PNG, GIF)', 'error');
            return;
        }
        
        // Display preview
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            dropArea.classList.add('hidden');
            previewContainer.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
        
        // Store the file in the input for later submission
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;
    }
    
    // Close preview
    if (closePreview) {
        closePreview.addEventListener('click', function() {
            previewContainer.classList.add('hidden');
            dropArea.classList.remove('hidden');
            fileInput.value = '';
        });
    }
    
    // Change image
    if (changeImage) {
        changeImage.addEventListener('click', function() {
            fileInput.click();
        });
    }
    
    // Analyze image
    if (analyzeButton) {
        analyzeButton.addEventListener('click', function() {
            console.log('Analyze button clicked');
            
            // Validate if file is selected
            if (!fileInput.files || !fileInput.files[0]) {
                showNotification('Please select an image first', 'error');
                return;
            }
            
            // Show loader
            resultContainer.classList.remove('hidden');
            loader.classList.remove('hidden');
            result.classList.add('hidden');
            
            // Update analysis steps animation
            const steps = document.querySelectorAll('.analysis-steps .step');
            if (steps.length) {
                steps[0].classList.add('active');
                setTimeout(() => {
                    steps[0].classList.add('completed');
                    steps[1].classList.add('active');
                    setTimeout(() => {
                        steps[1].classList.add('completed');
                        steps[2].classList.add('active');
                    }, 1500);
                }, 1500);
            }
            
            // Create FormData
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);
            
            // Log the file that's about to be sent
            console.log('Sending file:', fileInput.files[0].name);
            
            // Send request
            fetch('/analyze', {
                method: 'POST',
                body: formData,
                // Don't set Content-Type header when sending FormData
            })
            .then(response => {
                console.log('Response status:', response.status);
                return response.json().then(data => {
                    if (!response.ok) {
                        throw new Error(data.error || 'Error analyzing image');
                    }
                    return data;
                });
            })
            .then(data => {
                console.log('Analysis successful:', data);
                displayResults(data);
            })
            .catch(error => {
                console.error('Error during analysis:', error);
                showNotification(error.message || 'Error analyzing image', 'error');
                loader.classList.add('hidden');
            });
        });
    }
    
    // Display results
    function displayResults(data) {
        // Hide loader
        loader.classList.add('hidden');
        
        // Update result elements
        const resultIcon = document.getElementById('result-icon');
        const resultTitle = document.getElementById('result-title');
        const resultTimestamp = document.getElementById('result-timestamp');
        const confidenceLevel = document.getElementById('confidence-level');
        const confidenceText = document.getElementById('confidence-text');
        const recommendation = document.getElementById('recommendation');
        const analysisDate = document.getElementById('analysis-date');
        
        // Set values
        if (resultIcon) {
            resultIcon.innerHTML = data.result === 'Fresh Fruit' ? 
                '<i class="fas fa-check-circle"></i>' : 
                '<i class="fas fa-times-circle"></i>';
            resultIcon.className = 'result-icon ' + 
                (data.result === 'Fresh Fruit' ? 'fresh' : 'spoiled');
        }
        
        if (resultTitle) resultTitle.textContent = data.result;
        if (resultTimestamp) resultTimestamp.textContent = new Date().toLocaleString();
        
        if (confidenceLevel) {
            confidenceLevel.style.width = data.confidence + '%';
            confidenceLevel.className = data.result === 'Fresh Fruit' ? 'fresh' : 'spoiled';
        }
        
        if (confidenceText) confidenceText.textContent = data.confidence + '%';
        if (recommendation) recommendation.textContent = data.recommendation;
        if (analysisDate) analysisDate.textContent = new Date().toLocaleString();
        
        // Show result
        result.classList.remove('hidden');
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Check if notification element exists, if not create it
        let notification = document.getElementById('notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'notification';
            notification.className = 'notification';
            
            notification.innerHTML = `
                <div class="notification-icon">
                    <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                </div>
                <div class="notification-content">
                    <p id="notification-message">${message}</p>
                </div>
                <button id="notification-close" class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            document.body.appendChild(notification);
            
            const closeButton = notification.querySelector('.notification-close');
            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    notification.classList.remove('show');
                });
            }
        } else {
            const messageElement = notification.querySelector('#notification-message');
            if (messageElement) messageElement.textContent = message;
            
            const iconElement = notification.querySelector('.notification-icon i');
            if (iconElement) {
                iconElement.className = `fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}`;
            }
        }
        
        notification.className = `notification ${type} show`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (notification) notification.classList.remove('show');
        }, 5000);
    }
    
    // Other UI elements
    
    // Accordion functionality
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const icon = themeToggle.querySelector('i');
            if (icon) {
                if (document.body.classList.contains('dark-theme')) {
                    icon.className = 'fas fa-sun';
                    localStorage.setItem('theme', 'dark');
                } else {
                    icon.className = 'fas fa-moon';
                    localStorage.setItem('theme', 'light');
                }
            }
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            const icon = themeToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-sun';
        }
    }
    
    // Create empty favicon if it doesn't exist
    createEmptyFaviconIfNeeded();
});

// Utility function to create an empty favicon if needed
function createEmptyFaviconIfNeeded() {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
        favicon.addEventListener('error', function() {
            this.href = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAFdQTFRFAAAA5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL5uYL////tEL0AgAAAAx0Uk5TADKIzfn9JG3L8uwDQXhVhgAAAAFiS0dEDxi6ANkAAAAJcEhZcwAAFxEAABcRAcom8z8AAABgSURBVDjLxdPBDsIwDETRkGAnaZq0TQv//58YiBBCIHbBzNZz5GoJuFBAQCCAogAeQFWBZoRmBDXMYFuAIACXANcA3gAii9IAyaJ0iZngy47iyx+kAbuoMDXfVDu4/QCigQ0aMvXQPQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyNC0wNC0xOVQyMDozNTozMCswMDowMPxRXxkAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjQtMDQtMTlUMjA6MzU6MzArMDA6MDCNDO+lAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDI0LTA0LTE5VDIwOjM1OjMwKzAwOjAwug3OWAAAAABJRU5ErkJggg==';
        });
    }
}
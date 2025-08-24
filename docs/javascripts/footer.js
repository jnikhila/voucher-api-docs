// Enhanced Voucher API Documentation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add HTTP method badges to endpoint headers
    addHttpMethodBadges();
    
    // Enhance code blocks with copy functionality
    enhanceCodeBlocks();
    
    // Add interactive elements to tables
    enhanceTables();
    
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
    
    // Add syntax highlighting for JSON responses
    highlightJsonResponses();
    
    // Add interactive parameter examples
    addParameterExamples();
});

// Add HTTP method badges to endpoint headers
function addHttpMethodBadges() {
    const endpointHeaders = document.querySelectorAll('h3');
    
    endpointHeaders.forEach(header => {
        const text = header.textContent;
        const methodMatch = text.match(/^(GET|POST|PUT|DELETE|PATCH)\s+/);
        
        if (methodMatch) {
            const method = methodMatch[1];
            const badge = document.createElement('span');
            badge.className = `http-method ${method.toLowerCase()}`;
            badge.textContent = method;
            
            // Replace the method text with the badge
            header.innerHTML = header.innerHTML.replace(
                methodMatch[0],
                badge.outerHTML + ' '
            );
        }
    });
}

// Enhance code blocks with better copy functionality
function enhanceCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const pre = block.parentElement;
        
        // Add language indicator
        const language = getLanguageFromClass(block.className);
        if (language) {
            const langBadge = document.createElement('div');
            langBadge.className = 'code-language-badge';
            langBadge.textContent = language.toUpperCase();
            langBadge.style.cssText = `
                position: absolute;
                top: 8px;
                right: 8px;
                background: rgba(255, 255, 255, 0.1);
                color: #f8f9fa;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 0.7rem;
                font-weight: 500;
            `;
            pre.style.position = 'relative';
            pre.appendChild(langBadge);
        }
        
        // Enhance copy button
        const copyButton = pre.querySelector('.md-clipboard');
        if (copyButton) {
            copyButton.addEventListener('click', function(e) {
                e.preventDefault();
                copyToClipboard(block.textContent);
                
                // Show success feedback
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Copied!';
                copyButton.style.background = '#4caf50';
                copyButton.style.color = 'white';
                
                setTimeout(() => {
                    copyButton.textContent = originalText;
                    copyButton.style.background = '';
                    copyButton.style.color = '';
                }, 2000);
            });
        }
    });
}

// Get language from code block class
function getLanguageFromClass(className) {
    const match = className.match(/language-(\w+)/);
    return match ? match[1] : null;
}

// Copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Enhance tables with better styling and interactions
function enhanceTables() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        // Add hover effects
        table.addEventListener('mouseover', function(e) {
            if (e.target.tagName === 'TD') {
                const row = e.target.parentElement;
                row.style.backgroundColor = '#f8f9fa';
            }
        });
        
        table.addEventListener('mouseout', function(e) {
            if (e.target.tagName === 'TD') {
                const row = e.target.parentElement;
                row.style.backgroundColor = '';
            }
        });
        
        // Add required/optional indicators
        const cells = table.querySelectorAll('td');
        cells.forEach(cell => {
            if (cell.textContent.includes('✅')) {
                cell.innerHTML = cell.innerHTML.replace('✅', '<span class="required">Required</span>');
            } else if (cell.textContent.includes('❌')) {
                cell.innerHTML = cell.innerHTML.replace('❌', '<span class="optional">Optional</span>');
            }
        });
    });
}

// Add smooth scrolling for anchor links
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Highlight JSON responses with syntax highlighting
function highlightJsonResponses() {
    const jsonBlocks = document.querySelectorAll('pre code.language-json');
    
    jsonBlocks.forEach(block => {
        try {
            const json = JSON.parse(block.textContent);
            const highlighted = highlightJson(json);
            block.innerHTML = highlighted;
        } catch (e) {
            // If it's not valid JSON, leave as is
        }
    });
}

// Simple JSON syntax highlighting
function highlightJson(obj, indent = 0) {
    const spaces = '  '.repeat(indent);
    let result = '';
    
    if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
            result += '[\n';
            obj.forEach((item, index) => {
                result += spaces + '  ' + highlightJson(item, indent + 1);
                if (index < obj.length - 1) result += ',';
                result += '\n';
            });
            result += spaces + ']';
        } else {
            result += '{\n';
            const keys = Object.keys(obj);
            keys.forEach((key, index) => {
                result += spaces + '  <span style="color: #9cdcfe;">"' + key + '"</span>: ' + highlightJson(obj[key], indent + 1);
                if (index < keys.length - 1) result += ',';
                result += '\n';
            });
            result += spaces + '}';
        }
    } else if (typeof obj === 'string') {
        result += '<span style="color: #ce9178;">"' + obj + '"</span>';
    } else if (typeof obj === 'number') {
        result += '<span style="color: #b5cea8;">' + obj + '</span>';
    } else if (typeof obj === 'boolean') {
        result += '<span style="color: #569cd6;">' + obj + '</span>';
    } else {
        result += '<span style="color: #569cd6;">null</span>';
    }
    
    return result;
}

// Add interactive parameter examples
function addParameterExamples() {
    const parameterSections = document.querySelectorAll('h3');
    
    parameterSections.forEach(section => {
        if (section.textContent.includes('Parameters')) {
            const table = section.nextElementSibling;
            if (table && table.tagName === 'TABLE') {
                addExampleToggles(table);
            }
        }
    });
}

// Add example toggles to parameter tables
function addExampleToggles(table) {
    const rows = table.querySelectorAll('tr');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 0) {
            const paramName = cells[0].textContent.trim();
            const paramType = cells[1] ? cells[1].textContent.trim() : '';
            
            // Add example button for string parameters
            if (paramType.includes('string') && paramName) {
                const exampleButton = document.createElement('button');
                exampleButton.textContent = 'Show Example';
                exampleButton.className = 'example-toggle';
                exampleButton.style.cssText = `
                    background: #6772e5;
                    color: white;
                    border: none;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    cursor: pointer;
                    margin-left: 8px;
                `;
                
                exampleButton.addEventListener('click', function() {
                    const example = getParameterExample(paramName);
                    if (example) {
                        const exampleDiv = document.createElement('div');
                        exampleDiv.className = 'parameter-example';
                        exampleDiv.style.cssText = `
                            background: #f8f9fa;
                            padding: 8px;
                            margin-top: 4px;
                            border-radius: 4px;
                            font-family: monospace;
                            font-size: 0.9rem;
                        `;
                        exampleDiv.textContent = example;
                        
                        const cell = cells[cells.length - 1];
                        if (!cell.querySelector('.parameter-example')) {
                            cell.appendChild(exampleDiv);
                        }
                        
                        this.textContent = this.textContent === 'Show Example' ? 'Hide Example' : 'Show Example';
                    }
                });
                
                cells[cells.length - 1].appendChild(exampleButton);
            }
        }
    });
}

// Get example value for parameter
function getParameterExample(paramName) {
    const examples = {
        'code': '"SUMMER2024"',
        'type': '"percentage" or "fixed"',
        'value': '20 (percentage) or 1000 (fixed amount in cents)',
        'min_order_value': '5000 (in cents)',
        'max_uses': '1000',
        'valid_from': '"2024-06-01T00:00:00Z"',
        'valid_until': '"2024-08-31T23:59:59Z"',
        'currency': '"USD"',
        'order_id': '"order_1234567890"',
        'limit': '10',
        'offset': '0',
        'status': '"active", "inactive", or "expired"'
    };
    
    return examples[paramName] || null;
}

// Add loading states for interactive elements
function addLoadingStates() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('loading')) return;
            
            this.classList.add('loading');
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.classList.remove('loading');
                this.style.opacity = '';
                this.style.pointerEvents = '';
            }, 1000);
        });
    });
}

// Initialize loading states
document.addEventListener('DOMContentLoaded', addLoadingStates);
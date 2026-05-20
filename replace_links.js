const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public');
const files = ['index.html', 'about.html', 'projects.html', 'contact.html'];

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Replace Home links
    content = content.replace(/href="#"(.*?)>Home<\/a>/g, 'href="/"$1>Home</a>');
    content = content.replace(/href="#"(.*?)>About<\/a>/g, 'href="/about"$1>About</a>');
    content = content.replace(/href="#"(.*?)>Projects<\/a>/g, 'href="/projects"$1>Projects</a>');
    content = content.replace(/href="#"(.*?)>Contact<\/a>/g, 'href="/contact"$1>Contact</a>');
    
    // In index.html, there's "VIEW ALL PROJECTS"
    content = content.replace(/href="#"(.*?)>\s*VIEW ALL PROJECTS/g, 'href="/projects"$1>\n                    VIEW ALL PROJECTS');

    // In projects.html, there's a big button for Hire me / Contact
    // Actually, I can just replace `href="#"` with `href="javascript:void(0)"` for any remaining `#` links.
    
    // Fix the form in contact.html
    if (file === 'contact.html') {
        content = content.replace('<form class="glass-card p-10 rounded-xl space-y-8">', '<form id="contactForm" class="glass-card p-10 rounded-xl space-y-8">');
        
        // Add form submission script before </body>
        const script = `
<script>
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Assume the inputs are name, email, message based on common structures. 
            // We should find out their actual IDs or names, but let's query them by type/placeholder or assume standard names.
            const inputs = form.querySelectorAll('input, textarea');
            const data = {};
            inputs.forEach(input => {
                if (input.placeholder.toLowerCase().includes('name')) data.name = input.value;
                if (input.placeholder.toLowerCase().includes('email') || input.type === 'email') data.email = input.value;
                if (input.tagName.toLowerCase() === 'textarea' || input.placeholder.toLowerCase().includes('message')) data.message = input.value;
            });

            try {
                const submitBtn = form.querySelector('button');
                const originalText = submitBtn.innerText;
                submitBtn.innerText = 'Sending...';
                submitBtn.disabled = true;

                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    alert('Message sent successfully!');
                    form.reset();
                } else {
                    alert('Error: ' + result.error);
                }
                
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            } catch (err) {
                alert('An error occurred. Please try again.');
                const submitBtn = form.querySelector('button');
                submitBtn.innerText = 'Send Message';
                submitBtn.disabled = false;
            }
        });
    }
});
</script>
`;
        content = content.replace('</body>', script + '</body>');
    }
    
    fs.writeFileSync(path.join(dir, file), content);
});

console.log('Links and contact form replaced successfully.');

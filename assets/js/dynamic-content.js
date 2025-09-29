/**
 * Dynamic Content Loader for Math 180A
 * Automatically generates navigation, lecture cards, and homework cards
 */

class DynamicContentLoader {
    constructor() {
        this.content = null;
        this.currentPage = this.getCurrentPage();
        this.isSidebarOpen = false;
    }

    async init() {
        try {
            console.log('Initializing dynamic content loader...');
            await this.loadContent();
            console.log('Content loaded successfully:', this.content);
            this.initializeSidebar();
            this.initializeThemeToggle();
            this.generateSidebarNavigation();
            this.generateLectureCards();
            this.generateHomeworkCards();
            this.highlightCodeBlocks();
            console.log('Dynamic content initialization complete');
        } catch (error) {
            console.error('Error loading dynamic content:', error);
            // Still initialize sidebar and theme even if content fails to load
            this.initializeSidebar();
            this.initializeThemeToggle();
            this.highlightCodeBlocks();
        }
    }

    initializeSidebar() {
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const sidebar = document.getElementById('sidebar');
        const sidebarClose = document.querySelector('.sidebar-close');
        const overlay = document.getElementById('sidebar-overlay');
        const header = document.querySelector('.header');
        const main = document.querySelector('.main');

        console.log('Initializing sidebar...');
        console.log('Found elements:', {
            hamburgerMenu: !!hamburgerMenu,
            sidebar: !!sidebar,
            sidebarClose: !!sidebarClose,
            overlay: !!overlay,
            header: !!header,
            main: !!main
        });

        if (!hamburgerMenu || !sidebar) {
            console.error('Required sidebar elements not found!');
            return;
        }

        // Toggle sidebar
        const toggleSidebar = () => {
            console.log('Toggling sidebar, current state:', this.isSidebarOpen);
            this.isSidebarOpen = !this.isSidebarOpen;
            
            if (this.isSidebarOpen) {
                sidebar.classList.add('open');
                overlay.classList.add('open');
                hamburgerMenu.classList.add('active');
                if (header) header.classList.add('open');
                if (main) main.classList.add('sidebar-open');
                document.body.style.overflow = 'hidden';
            } else {
                sidebar.classList.remove('open');
                overlay.classList.remove('open');
                hamburgerMenu.classList.remove('active');
                if (header) header.classList.remove('open');
                if (main) main.classList.remove('sidebar-open');
                document.body.style.overflow = '';
            }
        };

        // Event listeners
        hamburgerMenu.addEventListener('click', (e) => {
            console.log('Hamburger menu clicked');
            e.preventDefault();
            toggleSidebar();
        });
        
        if (sidebarClose) {
            sidebarClose.addEventListener('click', toggleSidebar);
        }
        
        if (overlay) {
            overlay.addEventListener('click', toggleSidebar);
        }

        // Close sidebar on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isSidebarOpen) {
                toggleSidebar();
            }
        });

        console.log('Sidebar initialization complete');
    }

    initializeThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeDropdown = document.getElementById('themeDropdown');
        const currentTheme = localStorage.getItem('theme') || 'light';
        const currentThemeName = localStorage.getItem('themeName') || 'VS Code Light+';

        if (!themeToggle || !themeDropdown) {
            console.log('Theme selector elements not found');
            return;
        }

        // Set initial theme
        this.setTheme(currentTheme, currentThemeName);

        // Toggle dropdown
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            themeDropdown.classList.toggle('open');
        });

        // Handle theme selection
        const themeOptions = themeDropdown.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                const name = option.dataset.name;
                this.setTheme(theme, name);
                themeDropdown.classList.remove('open');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!themeToggle.contains(e.target) && !themeDropdown.contains(e.target)) {
                themeDropdown.classList.remove('open');
            }
        });

        // Keyboard navigation
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                themeDropdown.classList.toggle('open');
            }
        });

        console.log('Advanced theme selector initialized');
    }

    setTheme(theme, themeName) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        localStorage.setItem('themeName', themeName);
        
        // Update current theme display
        const currentThemeElement = document.getElementById('currentTheme');
        if (currentThemeElement) {
            currentThemeElement.textContent = themeName;
        }

        // Update active state in dropdown
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === theme);
        });

        // Update theme icon based on theme type
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            if (theme === 'light') {
                themeIcon.textContent = '☀️';
            } else if (theme.includes('dark') || theme.includes('plus') || theme.includes('material') || theme.includes('solarized')) {
                themeIcon.textContent = '🌙';
            } else {
                themeIcon.textContent = '🎨';
            }
        }
        
        console.log('Theme set to:', theme, '(', themeName, ')');
    }

    // Syntax highlighting for code blocks
    highlightCodeBlocks() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(block => {
            const language = this.detectLanguage(block.textContent);
            const highlightedCode = this.highlightSyntax(block.textContent, language);
            
            if (highlightedCode !== block.textContent) {
                block.innerHTML = highlightedCode;
            }
            
            // Add language indicator to pre element
            const preElement = block.parentElement;
            if (preElement && language) {
                preElement.setAttribute('data-language', language);
            }
        });
    }

    detectLanguage(code) {
        // Simple language detection based on common patterns
        const patterns = {
            javascript: [/\b(function|const|let|var|if|else|for|while|return)\b/, /=>/, /console\.log/, /\bclass\s+\w+/],
            python: [/\bdef\s+\w+/, /\bimport\s+\w+/, /\bclass\s+\w+/, /\bif\s+__name__/, /\bprint\s*\(/],
            java: [/\bpublic\s+class/, /\bprivate\s+\w+/, /\bpublic\s+static\s+void/, /\bSystem\.out\.print/],
            cpp: [/#include/, /\bint\s+main\s*\(/, /\bstd::/, /\bcout\s*<</],
            css: [/@media/, /\.\w+\s*{/, /\bcolor:\s*/, /\bmargin:\s*/],
            html: [/<!DOCTYPE/, /<html/, /<head/, /<body/, /<div/]
        };

        for (const [lang, patterns] of Object.entries(patterns)) {
            if (patterns.some(pattern => pattern.test(code))) {
                return lang;
            }
        }
        return 'text';
    }

    highlightSyntax(code, language) {
        // Simple syntax highlighting using regex patterns
        let highlighted = code;

        // Common patterns for multiple languages
        const patterns = {
            keyword: /\b(function|const|let|var|if|else|for|while|return|class|import|def|public|private|static|void|int|string|bool|true|false|null|undefined|this|new|extends|implements)\b/g,
            string: /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g,
            comment: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
            number: /\b\d+\.?\d*\b/g,
            function: /\b(\w+)\s*\(/g,
            operator: /([+\-*/%=<>!&|^~]+)/g
        };

        // Apply highlighting
        highlighted = highlighted.replace(patterns.keyword, '<span class="token keyword">$&</span>');
        highlighted = highlighted.replace(patterns.string, '<span class="token string">$1$2$1</span>');
        highlighted = highlighted.replace(patterns.comment, '<span class="token comment">$1</span>');
        highlighted = highlighted.replace(patterns.number, '<span class="token number">$&</span>');
        highlighted = highlighted.replace(patterns.function, '<span class="token function">$1</span>(');
        highlighted = highlighted.replace(patterns.operator, '<span class="token operator">$1</span>');

        return highlighted;
    }

    async loadContent() {
        // Determine the correct path to content.json based on current location
        const currentPath = window.location.pathname;
        let contentPath = 'content.json';
        
        // If we're in a lecture subdirectory, go up to the root
        if (currentPath.includes('/lectures/')) {
            contentPath = '../../content.json';
        }
        
        const response = await fetch(contentPath);
        if (!response.ok) {
            throw new Error(`Failed to load content.json: ${response.status}`);
        }
        this.content = await response.json();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('lectures/')) return 'lecture';
        if (path.includes('homework.html')) return 'homework';
        return 'home';
    }

    getCurrentLecture() {
        const path = window.location.pathname;
        const lectureMatch = path.match(/lectures\/(L\d+)/);
        return lectureMatch ? lectureMatch[1] : null;
    }

    generateSidebarNavigation() {
        const sidebarNavList = document.querySelector('.sidebar-nav-list');
        
        if (!sidebarNavList) return;
        
        // Clear existing content
        sidebarNavList.innerHTML = '';
        
        // Add Home link
        const homeLink = this.createSidebarNavLink('Home', 'index.html', this.currentPage === 'home');
        sidebarNavList.appendChild(homeLink);
        
        // Add Lectures dropdown
        const lecturesDropdown = this.createSidebarLecturesDropdown();
        sidebarNavList.appendChild(lecturesDropdown);
        
        // Add Homework link
        const homeworkLink = this.createSidebarNavLink('Homework', 'homework.html', this.currentPage === 'homework');
        sidebarNavList.appendChild(homeworkLink);
    }

    createSidebarLecturesDropdown() {
        const li = document.createElement('li');
        li.className = 'sidebar-nav-item sidebar-dropdown';
        
        const button = document.createElement('button');
        button.className = 'sidebar-dropdown-toggle';
        button.textContent = 'Lectures';
        button.setAttribute('aria-expanded', 'false');
        button.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleSidebarDropdown(e.target);
        });
        
        const dropdown = document.createElement('div');
        dropdown.className = 'sidebar-dropdown-menu';
        
        // Add available lectures
        const currentLecture = this.getCurrentLecture();
        this.content.lectures.forEach(lecture => {
            const lectureLink = this.createSidebarDropdownLink(
                `Lecture ${lecture.id.replace('L', '')}: ${lecture.title}`,
                lecture.files.html,
                currentLecture === lecture.id
            );
            dropdown.appendChild(lectureLink);
        });
        
        // Add "Coming Soon" lectures
        if (this.content.navigation.showComingSoon) {
            const maxLectures = this.content.navigation.maxLectures;
            for (let i = this.content.lectures.length + 1; i <= maxLectures; i++) {
                const comingSoonLink = this.createSidebarDropdownLink(
                    `Lecture ${i} (Coming Soon)`,
                    '#',
                    false,
                    true
                );
                dropdown.appendChild(comingSoonLink);
            }
        }
        
        li.appendChild(button);
        li.appendChild(dropdown);
        
        return li;
    }

    createSidebarNavLink(text, href, isActive) {
        const li = document.createElement('li');
        li.className = 'sidebar-nav-item';
        
        const link = document.createElement('a');
        link.className = isActive ? 'sidebar-nav-link active' : 'sidebar-nav-link';
        link.href = this.getCorrectPath(href);
        link.textContent = text;
        
        li.appendChild(link);
        return li;
    }

    createSidebarDropdownLink(text, href, isActive, isDisabled = false) {
        const link = document.createElement('a');
        link.className = isDisabled ? 'sidebar-dropdown-item disabled' : (isActive ? 'sidebar-dropdown-item active' : 'sidebar-dropdown-item');
        link.href = this.getCorrectPath(href);
        link.textContent = text;
        
        if (isDisabled) {
            link.style.pointerEvents = 'none';
            link.style.opacity = '0.6';
        }
        
        return link;
    }

    getCorrectPath(href) {
        const currentPath = window.location.pathname;
        
        // If we're in a lecture subdirectory, adjust paths
        if (currentPath.includes('/lectures/')) {
            if (href === 'index.html') {
                return '../../index.html';
            } else if (href === 'homework.html') {
                return '../../homework.html';
            } else if (href.includes('lectures/')) {
                // For lecture links, keep as is since they're relative to lectures directory
                return href;
            }
        }
        
        // For root pages, return as is
        return href;
    }

    toggleSidebarDropdown(button) {
        const dropdown = button.nextElementSibling;
        const isOpen = dropdown.classList.contains('open');
        
        // Close all other dropdowns
        document.querySelectorAll('.sidebar-dropdown-menu.open').forEach(menu => {
            if (menu !== dropdown) {
                menu.classList.remove('open');
                menu.previousElementSibling.classList.remove('active');
                menu.previousElementSibling.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Toggle current dropdown
        if (isOpen) {
            dropdown.classList.remove('open');
            button.classList.remove('active');
            button.setAttribute('aria-expanded', 'false');
        } else {
            dropdown.classList.add('open');
            button.classList.add('active');
            button.setAttribute('aria-expanded', 'true');
        }
    }


    generateLectureCards() {
        const lectureGrid = document.querySelector('.lecture-grid');
        if (!lectureGrid) return;
        
        // Clear existing content
        lectureGrid.innerHTML = '';
        
        // Generate cards for available lectures
        this.content.lectures.forEach(lecture => {
            const card = this.createLectureCard(lecture);
            lectureGrid.appendChild(card);
        });
        
        // Generate "Coming Soon" cards
        if (this.content.navigation.showComingSoon) {
            const maxLectures = this.content.navigation.maxLectures;
            for (let i = this.content.lectures.length + 1; i <= maxLectures; i++) {
                const comingSoonCard = this.createComingSoonLectureCard(i);
                lectureGrid.appendChild(comingSoonCard);
            }
        }
    }

    createLectureCard(lecture) {
        const card = document.createElement('div');
        card.className = 'lecture-card';
        
        card.innerHTML = `
            <div class="lecture-card-header">
                <h3>Lecture ${lecture.id.replace('L', '')}</h3>
                <span class="lecture-number">${lecture.id}</span>
            </div>
            <div class="lecture-card-content">
                <h4>${lecture.title}</h4>
                <p>${lecture.subtitle}</p>
                <ul class="lecture-topics">
                    ${lecture.topics.map(topic => `<li>${topic}</li>`).join('')}
                </ul>
                <a href="${lecture.files.html}" class="lecture-link">Read ${lecture.id}</a>
            </div>
        `;
        
        return card;
    }

    createComingSoonLectureCard(lectureNumber) {
        const card = document.createElement('div');
        card.className = 'lecture-card coming-soon';
        
        card.innerHTML = `
            <div class="lecture-card-header">
                <h3>Lecture ${lectureNumber}</h3>
                <span class="lecture-number">L${lectureNumber}</span>
            </div>
            <div class="lecture-card-content">
                <h4>Coming Soon</h4>
                <p>This lecture will be added soon.</p>
                <div class="coming-soon-badge">Coming Soon</div>
            </div>
        `;
        
        return card;
    }

    generateHomeworkCards() {
        // Update homepage homework section
        this.updateHomepageHomework();
        
        // Update homework page if it exists
        this.updateHomeworkPage();
    }

    updateHomepageHomework() {
        const homeworkSection = document.querySelector('.homework-section');
        if (!homeworkSection) return;
        
        const homeworkGrid = homeworkSection.querySelector('.homework-grid');
        if (!homeworkGrid) return;
        
        // Clear existing content
        homeworkGrid.innerHTML = '';
        
        // Generate cards for available homework
        this.content.homework.forEach(hw => {
            const card = this.createHomeworkCard(hw);
            homeworkGrid.appendChild(card);
        });
        
        // Generate "Coming Soon" cards
        if (this.content.navigation.showComingSoon) {
            const maxHomework = this.content.navigation.maxHomework;
            for (let i = this.content.homework.length + 1; i <= maxHomework; i++) {
                const comingSoonCard = this.createComingSoonHomeworkCard(i);
                homeworkGrid.appendChild(comingSoonCard);
            }
        }
    }

    updateHomeworkPage() {
        const homeworkPage = document.querySelector('.homework-page .homework-grid');
        if (!homeworkPage) return;
        
        // Clear existing content
        homeworkPage.innerHTML = '';
        
        // Generate cards for available homework
        this.content.homework.forEach(hw => {
            const card = this.createDetailedHomeworkCard(hw);
            homeworkPage.appendChild(card);
        });
        
        // Generate "Coming Soon" cards
        if (this.content.navigation.showComingSoon) {
            const maxHomework = this.content.navigation.maxHomework;
            for (let i = this.content.homework.length + 1; i <= maxHomework; i++) {
                const comingSoonCard = this.createComingSoonDetailedHomeworkCard(i);
                homeworkPage.appendChild(comingSoonCard);
            }
        }
    }

    createHomeworkCard(hw) {
        const card = document.createElement('div');
        card.className = 'homework-card';
        
        const psLink = hw.files.ps ? 
            `<a href="${hw.files.ps}" class="homework-link ps-link" target="_blank">Problem Set</a>` : '';
        
        const solLink = hw.files.sol ? 
            `<a href="${hw.files.sol}" class="homework-link sol-link" target="_blank">Solution</a>` :
            `<a href="#" class="homework-link sol-link disabled">Solution (Coming Soon)</a>`;
        
        card.innerHTML = `
            <div class="homework-card-header">
                <h3>${hw.title}</h3>
                <span class="homework-number">${hw.id}</span>
            </div>
            <div class="homework-card-content">
                <p>${hw.description}</p>
                <div class="homework-links">
                    ${psLink}
                    ${solLink}
                </div>
            </div>
        `;
        
        return card;
    }

    createDetailedHomeworkCard(hw) {
        const card = document.createElement('div');
        card.className = 'homework-card';
        
        const psLink = hw.files.ps ? 
            `<a href="${hw.files.ps}" class="homework-link ps-link" target="_blank">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
                Problem Set
            </a>` : '';
        
        const solLink = hw.files.sol ? 
            `<a href="${hw.files.sol}" class="homework-link sol-link" target="_blank">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                </svg>
                Solution
            </a>` :
            `<a href="#" class="homework-link sol-link disabled">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                </svg>
                Solution (Coming Soon)
            </a>`;
        
        card.innerHTML = `
            <div class="homework-card-header">
                <h3>${hw.title}</h3>
                <span class="homework-number">${hw.id}</span>
            </div>
            <div class="homework-card-content">
                <div class="homework-info">
                    <h4>Topics Covered:</h4>
                    <ul>
                        ${hw.topics.map(topic => `<li>${topic}</li>`).join('')}
                    </ul>
                </div>
                <div class="homework-links">
                    ${psLink}
                    ${solLink}
                </div>
            </div>
        `;
        
        return card;
    }

    createComingSoonHomeworkCard(hwNumber) {
        const card = document.createElement('div');
        card.className = 'homework-card coming-soon';
        
        card.innerHTML = `
            <div class="homework-card-header">
                <h3>Homework ${hwNumber}</h3>
                <span class="homework-number">HW${hwNumber}</span>
            </div>
            <div class="homework-card-content">
                <p>This homework will be added soon.</p>
                <div class="coming-soon-badge">Coming Soon</div>
            </div>
        `;
        
        return card;
    }

    createComingSoonDetailedHomeworkCard(hwNumber) {
        const card = document.createElement('div');
        card.className = 'homework-card coming-soon';
        
        card.innerHTML = `
            <div class="homework-card-header">
                <h3>Homework ${hwNumber}</h3>
                <span class="homework-number">HW${hwNumber}</span>
            </div>
            <div class="homework-card-content">
                <div class="homework-info">
                    <h4>Topics Covered:</h4>
                    <p>This homework will be added soon.</p>
                </div>
                <div class="coming-soon-badge">Coming Soon</div>
            </div>
        `;
        
        return card;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const loader = new DynamicContentLoader();
    loader.init();
});

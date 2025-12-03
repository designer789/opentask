document.addEventListener('DOMContentLoaded', () => {
    // Header scroll behavior
    let lastScroll = 0;
    const header = document.querySelector('header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            header.classList.add('nav-hidden');
        } else {
            header.classList.remove('nav-hidden');
        }
        
        lastScroll = currentScroll;
    });

    // Words animation
    const words = ['Decentralized', 'Fair', 'Borderless'];
    const wordElement = document.querySelector('.changing-word');
    let currentIndex = 0;

    // 初始显示第一个词
    wordElement.textContent = words[currentIndex];
    wordElement.classList.add('active');

    function changeWord() {
        // 淡出当前词
        wordElement.classList.remove('active');
        wordElement.classList.add('fade-out');

        setTimeout(() => {
            // 更新到下一个词
            currentIndex = (currentIndex + 1) % words.length;
            wordElement.textContent = words[currentIndex];
            
            // 重置位置准备淡入
            wordElement.classList.remove('fade-out');
            
            // 触发重排后淡入
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    wordElement.classList.add('active');
                });
            });
        }, 500); // 与 CSS transition 时间匹配
    }

    // 每 2 秒切换一次
    setInterval(changeWord, 2000);

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const targetId = button.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Vertical tabs functionality with auto-play
    const verticalTabButtons = document.querySelectorAll('.vertical-tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    let currentTabIndex = 0;
    let autoPlayInterval;

    function switchTab(index) {
        // Get current active panel
        const currentPanel = document.querySelector('.tab-panel.active');
        
        // Remove active class from all buttons
        verticalTabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        verticalTabButtons[index].classList.add('active');
        
        // Get new panel to show
        const newPanel = tabPanels[index];
        
        if (currentPanel) {
            // Add inactive class to trigger exit animation
            currentPanel.classList.add('inactive');
            
            // Wait for animation to complete before hiding
            setTimeout(() => {
                currentPanel.classList.remove('active', 'inactive');
                // Show new panel
                newPanel.classList.add('active');
            }, 500); // Match animation duration
        } else {
            // No current panel, just show new one
            newPanel.classList.add('active');
        }
    }

    function nextTab() {
        currentTabIndex = (currentTabIndex + 1) % verticalTabButtons.length;
        switchTab(currentTabIndex);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextTab, 5000); // Changed from 5000 to 3000 ms
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // 初始化自动播放
    startAutoPlay();

    // 添加鼠标悬停时暂停，移出时继续的功能
    const featuresWrapper = document.querySelector('.features-wrapper');
    
    // 点击标签时也要处理
    verticalTabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            currentTabIndex = index;
            switchTab(currentTabIndex);
            
            // 点击后重置自动播放计时
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // Scroll animation handler
    function handleScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            observer.observe(card);
        });

        // Observe timeline content
        document.querySelectorAll('.timeline-content').forEach(content => {
            observer.observe(content);
        });

        // Observe utility list items
        document.querySelectorAll('.utility-list li').forEach(item => {
            observer.observe(item);
        });

        // Observe FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            observer.observe(item);
        });

        // Observe footer elements
        document.querySelectorAll('.footer-logo, .footer-links-column').forEach(item => {
            observer.observe(item);
        });
    }

    // Initialize scroll animations when DOM is loaded
    handleScrollAnimations();

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle active class on clicked item
            item.classList.toggle('active');
        });
    });
}); 
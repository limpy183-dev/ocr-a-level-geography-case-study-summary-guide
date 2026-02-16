// Theme Logic
(function () {
    // Init theme immediately
    const saved = localStorage.getItem('cs_theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
})();

document.addEventListener('DOMContentLoaded', () => {
    // Inject Theme Toggle Button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.innerHTML = '<span id="theme-icon">🌙</span>';
    toggleBtn.title = 'Toggle Dark Mode';
    document.body.appendChild(toggleBtn);

    const icon = toggleBtn.querySelector('#theme-icon');

    // Set initial icon
    const currentTheme = localStorage.getItem('cs_theme') || 'light';
    icon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('cs_theme', next);
        icon.textContent = next === 'dark' ? '☀️' : '🌙';
    });

    // Scroll to top button (existing logic)

    // Only add scroll-to-top on case study pages (not index)
    if (!document.querySelector('.index-page')) {
        const btn = document.createElement('button');
        btn.className = 'scroll-top-btn';
        btn.innerHTML = '↑';
        btn.title = 'Back to top';
        document.body.appendChild(btn);

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });
    }

    // Animate sections on scroll
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(s => {
        s.style.opacity = '0';
        s.style.transform = 'translateY(16px)';
        s.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(s);
    });
    // === QUESTION MODE LOGIC ===
    let questionModeActive = false;
    let currentDifficulty = 'easy';
    const originalContentMap = new Map(); // Store original HTML of sections

    // Create Controls
    function initQuestionMode() {
        // Only on topic pages (check for .content-section)
        if (!document.querySelector('.content-section')) return;

        const controls = document.createElement('div');
        controls.className = 'study-controls';

        const modeBtn = document.createElement('button');
        modeBtn.className = 'mode-btn';
        modeBtn.textContent = '📝 Question Mode';

        const diffSelect = document.createElement('select');
        diffSelect.className = 'difficulty-select';
        diffSelect.innerHTML = `
            <option value="easy">Easy (Key Terms)</option>
            <option value="hard">Hard (More Gaps)</option>
        `;

        controls.appendChild(modeBtn);
        controls.appendChild(diffSelect);
        document.body.appendChild(controls);

        // Event Listeners
        modeBtn.addEventListener('click', () => {
            questionModeActive = !questionModeActive;
            modeBtn.classList.toggle('active', questionModeActive);
            modeBtn.textContent = questionModeActive ? 'Exit Mode' : '📝 Question Mode';

            if (questionModeActive) {
                enableQuestionMode();
            } else {
                disableQuestionMode();
            }
        });

        diffSelect.addEventListener('change', (e) => {
            currentDifficulty = e.target.value;
            if (questionModeActive) {
                // Restart mode to apply new difficulty
                disableQuestionMode();
                enableQuestionMode();
            }
        });
    }

    function enableQuestionMode() {
        const sections = document.querySelectorAll('.section-body, .info-box, .key-fact');

        sections.forEach((section, index) => {
            // Save original content if not already saved
            if (!originalContentMap.has(index)) {
                originalContentMap.set(index, section.innerHTML);
            }

            // Generate gaps
            section.innerHTML = generateGaps(section.innerHTML, currentDifficulty);
        });

        // Add input listeners
        document.querySelectorAll('.gap-input').forEach(input => {
            input.addEventListener('change', validateAnswer);
            input.addEventListener('input', (e) => {
                // Remove wrong class on typing
                e.target.classList.remove('wrong');
            });
            // Hint on hover/focus (first letter)
            input.addEventListener('mouseenter', showHint);
            input.addEventListener('focus', showHint);
        });
    }

    function disableQuestionMode() {
        const sections = document.querySelectorAll('.section-body, .info-box, .key-fact');
        sections.forEach((section, index) => {
            if (originalContentMap.has(index)) {
                section.innerHTML = originalContentMap.get(index);
            }
        });
    }

    function generateGaps(html, difficulty) {
        // Create a temporary container to traverse text nodes
        const div = document.createElement('div');
        div.innerHTML = html;

        // Helper to process text nodes
        function processNode(node) {
            if (node.nodeType === 3) { // Text node
                const text = node.textContent;
                // Only process substantial text
                if (text.trim().length < 3) return;

                // For HARD mode: Randomly select words > 4 chars
                if (difficulty === 'hard') {
                    const words = text.split(/(\s+)/); // Split keeping delimiters
                    const processed = words.map(w => {
                        // 20% chance to gap words > 4 chars that aren't stop words
                        if (w.trim().length > 4 && Math.random() > 0.8) {
                            return createGap(w.trim());
                        }
                        return w;
                    });

                    // Replace text node with new HTML
                    // NOTE: This simple regex split is fragile for complex HTML retention in text nodes
                    // Better approach: Replace text content if we modify it.
                    // But we can't replace a text node with HTML string directly in traversing.
                    // So we wrap in span?

                    // Allow simple replacement for now, risk of breaking structure in complex nodes is low in this content
                    const newHtml = processed.join('');
                    if (newHtml !== text) {
                        const span = document.createElement('span');
                        span.innerHTML = newHtml;
                        node.parentNode.replaceChild(span, node);
                    }
                }
            } else if (node.nodeType === 1) { // Element node
                // EASY MODE: Target <strong>, <b>, <em> tags specifically
                if (['STRONG', 'B', 'EM'].includes(node.tagName)) {
                    const answer = node.textContent.trim();
                    if (answer.length > 2) {
                        node.innerHTML = createGap(answer);
                    }
                } else if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
                    // Recurse for other elements
                    Array.from(node.childNodes).forEach(processNode);
                }
            }
        }

        Array.from(div.childNodes).forEach(processNode);
        return div.innerHTML;
    }

    function createGap(word) {
        // Strip punctuation from end of word for the answer check
        const cleanWord = word.replace(/[.,;:]$/, '');
        const punctuation = word.slice(cleanWord.length);

        return `<input type="text" class="gap-input" data-answer="${cleanWord}" style="width: ${cleanWord.length}ch;" placeholder="____">` + punctuation;
    }

    function validateAnswer(e) {
        const input = e.target;
        const answer = input.dataset.answer.toLowerCase();
        const value = input.value.trim().toLowerCase();

        if (value === answer) {
            input.classList.remove('wrong');
            input.classList.add('correct');
            // Optional: Replace input with text? No, keep green input as reward.
            // input.disabled = true; // Maybe lock it?
        } else {
            input.classList.add('wrong');
            input.classList.remove('correct');
        }
    }

    function showHint(e) {
        const input = e.target;
        if (!input.classList.contains('correct') && !input.value) {
            input.placeholder = input.dataset.answer.charAt(0) + '...';
        }
    }

    // Init Logic must run after DOM content loaded (which we are inside)
    initQuestionMode();
});

// ============================================
// Dashboard Application
// ============================================

// ============================================
// Greeting System
// ============================================

function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const greetingEl = document.getElementById('greeting');
    const timeEl = document.getElementById('currentTime');

    // Get time-based greeting
    let greeting = '';
    if (hour < 12) {
        greeting = 'Good Morning';
    } else if (hour < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }

    // Add custom name if set
    const userName = localStorage.getItem('userName') || '';
    if (userName.trim()) {
        greeting += `, ${userName}!`;
    } else {
        greeting += '!';
    }

    greetingEl.textContent = greeting;

    // Format current time
    const timeString = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
    timeEl.textContent = timeString;
}

function loadUserName() {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        document.getElementById('userName').value = savedName;
    }
}

function saveUserName() {
    const name = document.getElementById('userName').value.trim();
    localStorage.setItem('userName', name);
    updateGreeting();
}

// ============================================
// Focus Timer (Pomodoro)
// ============================================

let timerInterval = null;
let timerSeconds = 25 * 60;
let isTimerRunning = false;

function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    document.getElementById('timerMinutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('timerSeconds').textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    if (isTimerRunning) return;

    isTimerRunning = true;
    document.getElementById('startTimer').disabled = true;
    document.getElementById('stopTimer').disabled = false;

    timerInterval = setInterval(() => {
        if (timerSeconds > 0) {
            timerSeconds--;
            updateTimerDisplay();
        } else {
            stopTimer();
            alert('Timer complete! Take a break! 🎉');
        }
    }, 1000);
}

function stopTimer() {
    if (!isTimerRunning) return;

    clearInterval(timerInterval);
    isTimerRunning = false;
    document.getElementById('startTimer').disabled = false;
    document.getElementById('stopTimer').disabled = true;
}

function resetTimer() {
    stopTimer();
    const duration = parseInt(document.getElementById('timerDuration').value) || 25;
    timerSeconds = duration * 60;
    updateTimerDisplay();
}

function updateTimerDuration() {
    if (!isTimerRunning) {
        const duration = parseInt(document.getElementById('timerDuration').value) || 25;
        timerSeconds = duration * 60;
        updateTimerDisplay();
    }
}

// ============================================
// To-Do List
// ============================================

function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                <span class="task-text">${escapeHtml(task.text)}</span>
            </div>
            <div class="task-actions">
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById('newTask');
    const text = input.value.trim();

    if (text) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push({ text, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        input.value = '';
        loadTasks();
    }
}

function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const newText = prompt('Edit your task:', tasks[index].text);
    if (newText !== null && newText.trim()) {
        tasks[index].text = newText.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
}

function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// Quick Links
// ============================================

function loadLinks() {
    const linkList = document.getElementById('linkList');
    linkList.innerHTML = '';

    const links = JSON.parse(localStorage.getItem('links') || '[]');

    links.forEach((link, index) => {
        const li = document.createElement('li');
        li.className = 'link-item';
        li.innerHTML = `
            <div class="link-content">
                <a href="${escapeHtml(link.url)}" target="_blank" class="link-name">${escapeHtml(link.name)}</a>
                <div class="link-url">${escapeHtml(link.url)}</div>
            </div>
            <div class="link-actions">
                <button onclick="deleteLink(${index})">Delete</button>
            </div>
        `;
        linkList.appendChild(li);
    });
}

function addLink() {
    const nameInput = document.getElementById('newLinkName');
    const urlInput = document.getElementById('newLinkUrl');
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();

    if (name && url) {
        // Add https:// if missing
        let formattedUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            formattedUrl = 'https://' + url;
        }

        const links = JSON.parse(localStorage.getItem('links') || '[]');
        links.push({ name, url: formattedUrl });
        localStorage.setItem('links', JSON.stringify(links));
        nameInput.value = '';
        urlInput.value = '';
        loadLinks();
    }
}

function deleteLink(index) {
    if (confirm('Are you sure you want to delete this link?')) {
        const links = JSON.parse(localStorage.getItem('links') || '[]');
        links.splice(index, 1);
        localStorage.setItem('links', JSON.stringify(links));
        loadLinks();
    }
}

// ============================================
// Theme Toggle
// ============================================

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const button = document.getElementById('themeToggle');
    button.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// ============================================
// Event Listeners
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Greeting
    updateGreeting();
    loadUserName();
    document.getElementById('userName').addEventListener('input', saveUserName);

    // Timer
    updateTimerDisplay();
    document.getElementById('startTimer').addEventListener('click', startTimer);
    document.getElementById('stopTimer').addEventListener('click', stopTimer);
    document.getElementById('resetTimer').addEventListener('click', resetTimer);
    document.getElementById('timerDuration').addEventListener('change', updateTimerDuration);

    // To-Do List
    loadTasks();
    document.getElementById('addTask').addEventListener('click', addTask);
    document.getElementById('newTask').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Quick Links
    loadLinks();
    document.getElementById('addLink').addEventListener('click', addLink);
    document.getElementById('newLinkName').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addLink();
    });
    document.getElementById('newLinkUrl').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addLink();
    });

    // Theme
    loadTheme();
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Update time every second
    setInterval(updateGreeting, 1000);
});

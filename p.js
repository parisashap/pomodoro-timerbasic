class PomodoroTimer {
    constructor() {
        this.totalSeconds = 25 * 60; // Default 25 minutes
        this.remainingSeconds = this.totalSeconds;
        this.isRunning = false;
        this.intervalId = null;
        
        this.initializeElements();
        this.attachEventListeners();
        this.updateDisplay();
    }
    
    initializeElements() {
        this.timeDisplay = document.getElementById('timeDisplay');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.presetButtons = document.querySelectorAll('.preset-btn');
    }
    
    attachEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        // Preset buttons
        this.presetButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const minutes = parseInt(btn.dataset.minutes);
                this.setTime(minutes, 0);
            });
        });
    }
    
    start() {
        if (this.remainingSeconds <= 0) {
            this.reset();
            return;
        }
        
        this.isRunning = true;
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        
        this.intervalId = setInterval(() => {
            this.remainingSeconds--;
            this.updateDisplay();
            
            if (this.remainingSeconds <= 0) {
                this.complete();
            }
        }, 1000);
    }
    
    pause() {
        this.isRunning = false;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    
    reset() {
        this.pause();
        this.remainingSeconds = this.totalSeconds;
        this.updateDisplay();
    }
    
    setTime(minutes, seconds) {
        if (this.isRunning) {
            this.pause();
        }
        
        this.totalSeconds = minutes * 60 + seconds;
        this.remainingSeconds = this.totalSeconds;
        this.updateDisplay();
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        
        this.timeDisplay.textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    
    complete() {
        this.pause();
        alert('Timer Complete! 🍅');
        // Optional: play a sound or show a notification
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});


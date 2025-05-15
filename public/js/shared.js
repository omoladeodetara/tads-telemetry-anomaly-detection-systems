/**
 * shared.js - Common JavaScript functions for TelemetryIQ
 * This file contains shared functionality used across multiple pages
 */

// Configuration
const CONFIG = {
    MAX_HISTORY: 100,
    ANOMALY_THRESHOLDS: {
        temperature: { high: 75, low: 15 },
        power: { high: 1000, low: 100 }
    },
    CHART_ANIMATION_DURATION: 500
};

// Side navigation functionality
function initSideNav() {
    const sidenavToggle = document.getElementById('sidenavToggle');
    const appContainer = document.querySelector('.app-container');
    
    if (sidenavToggle) {
        sidenavToggle.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                // Mobile view toggle
                appContainer.classList.toggle('sidenav-mobile-open');
            } else {
                // Desktop view collapse/expand
                appContainer.classList.toggle('sidenav-collapsed');
            }
        });
    }
    
    // Close sidenav when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992 && 
            appContainer.classList.contains('sidenav-mobile-open') && 
            !e.target.closest('.sidenav') && 
            !e.target.closest('.sidenav-toggle')) {
            appContainer.classList.remove('sidenav-mobile-open');
        }
    });
}

// Data handling functions
function formatTimeLabel(date) {
    return date.toLocaleTimeString(undefined, { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
}

function getStatusClass(status) {
    switch(status.toUpperCase()) {
        case 'OPERATIONAL': return 'status-operational';
        case 'WARNING': return 'status-warning';
        case 'CRITICAL': return 'status-critical';
        default: return 'status-operational';
    }
}

// API functions
function sendTelemetryData(data) {
    return fetch('/api/telemetry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}

function fetchTelemetryData() {
    return fetch('/api/telemetry')
        .then(response => response.json());
}

function fetchAnomalies() {
    return fetch('/api/anomalies')
        .then(response => response.json());
}

// Generate random test data
function generateTestData(isAnomaly = false) {
    const sensorIds = ['SENSOR001', 'SENSOR002', 'SENSOR003'];
    const sensorId = sensorIds[Math.floor(Math.random() * sensorIds.length)];
    
    let temperature, power, status;
    
    if (isAnomaly || Math.random() < 0.3) {
        // Generate anomalous data
        if (Math.random() < 0.5) {
            temperature = 80 + Math.random() * 10; // High temperature anomaly
            power = 500 + Math.random() * 200;
            status = 'WARNING';
        } else {
            temperature = 25 + Math.random() * 10;
            power = 1100 + Math.random() * 200; // High power anomaly
            status = 'WARNING';
        }
    } else {
        // Generate normal data
        temperature = 25 + (Math.random() * 10 - 5);
        power = 500 + (Math.random() * 200 - 100);
        status = 'OPERATIONAL';
    }
    
    return {
        sensorId,
        timestamp: new Date().toISOString(),
        reading: {
            temperature,
            power,
            status
        }
    };
}

// Dark mode toggle
function initDarkModeToggle() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            // Could also save preference to localStorage here
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initSideNav();
    initDarkModeToggle();
});

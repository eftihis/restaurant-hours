(function() {
    'use strict';
    
    console.log('🍽️ Restaurant Hours Topbar: Script loading...');
    
    // Configuration - Restaurant owners can modify this
    const RESTAURANT_CONFIG = {
        name: "ThirdEye", // Restaurant name
        
        timezone: "Europe/Athens", // Timezone for Athens, Greece
        schedule: {
            // Format: "HH:MM" in 24-hour format, null means closed
            monday: { open: "16:00", close: "22:00" },
            tuesday: null,
            wednesday: { open: "16:00", close: "22:00" },
            thursday: { open: "16:00", close: "22:00" },
            friday: { open: "16:00", close: "22:00" },
            saturday: { open: "16:00", close: "22:00" },
            sunday: { open: "16:00", close: "22:00" }
        },
        closingSoonMinutes: 30, // Minutes before closing to show "Closes soon"
        openingSoonMinutes: 60, // Minutes before opening to show "Opens soon"
        style: {
            backgroundColor: "#4A4846",
            textColor: "#F4F0EF",
            closeButtonColor: "#F4F0EF",
            fontSize: "14px",
            fontFamily: "Inherit"
        }
    };

    console.log('🍽️ Restaurant Hours Topbar: Configuration loaded', RESTAURANT_CONFIG);

    // Check if topbar already exists to prevent duplicate
    if (document.getElementById('restaurant-hours-topbar')) {
        console.log('🍽️ Restaurant Hours Topbar: Already exists, skipping...');
        return;
    }

    console.log('🍽️ Restaurant Hours Topbar: No existing topbar found, continuing...');

    // CSS Styles
    const styles = `
        #restaurant-hours-topbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background-color: ${RESTAURANT_CONFIG.style.backgroundColor};
            color: ${RESTAURANT_CONFIG.style.textColor};
            font-family: ${RESTAURANT_CONFIG.style.fontFamily};
            font-size: ${RESTAURANT_CONFIG.style.fontSize};
            padding: 8px 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            z-index: 999999;
            transition: transform 0.3s ease;
            line-height: 1.4;
        }
        
        #restaurant-hours-topbar.hidden {
            transform: translateY(-100%);
        }
        
        .restaurant-hours-content {
            display: flex;
            align-items: center;
            gap: 16px;
            flex: 1;
        }
        
        .restaurant-status {
            font-weight: bold;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 12px;
            text-transform: uppercase;
        }
        
        .status-open {
            background-color: #27ae60;
            color: white;
        }
        
        .status-closed {
            background-color: #e74c3c;
            color: white;
        }
        
        .status-closing-soon {
            background-color: #f39c12;
            color: white;
        }
        
        .status-opening-soon {
            background-color: #3498db;
            color: white;
        }
        
        .restaurant-hours-close {
            background: none;
            border: none;
            color: ${RESTAURANT_CONFIG.style.closeButtonColor};
            font-size: 18px;
            cursor: pointer;
            padding: 4px;
            line-height: 1;
            opacity: 0.7;
            transition: opacity 0.2s ease;
        }
        
        .restaurant-hours-close:hover {
            opacity: 1;
        }
        
        .hours-info {
            font-size: 13px;
            opacity: 0.9;
        }
        
        @media (max-width: 768px) {
            #restaurant-hours-topbar {
                font-size: 12px;
                padding: 6px 12px;
            }
            
            .restaurant-hours-content {
                gap: 8px;
            }
            
            .hours-info {
                display: none;
            }
        }
    `;

    // Add styles to page
    console.log('🍽️ Restaurant Hours Topbar: Adding styles to page...');
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    console.log('🍽️ Restaurant Hours Topbar: Styles added successfully');

    // Utility functions
    function getCurrentTime() {
        return new Date().toLocaleString("en-US", {
            timeZone: RESTAURANT_CONFIG.timezone,
            hour12: false,
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function getCurrentDay() {
        return new Date().toLocaleDateString("en-US", {
            timeZone: RESTAURANT_CONFIG.timezone,
            weekday: 'long'
        }).toLowerCase();
    }

    function parseTime(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes; // Convert to minutes since midnight
    }

    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return `${displayHour}:${minutes} ${ampm}`;
    }

    function getRestaurantStatus() {
        const now = new Date();
        const currentDay = getCurrentDay();
        const currentTime = now.toLocaleTimeString("en-US", {
            timeZone: RESTAURANT_CONFIG.timezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        
        console.log('🍽️ Restaurant Hours Topbar: Current day:', currentDay);
        console.log('🍽️ Restaurant Hours Topbar: Current time:', currentTime);
        
        const currentMinutes = parseTime(currentTime);
        const todaySchedule = RESTAURANT_CONFIG.schedule[currentDay];
        
        console.log('🍽️ Restaurant Hours Topbar: Today\'s schedule:', todaySchedule);
        
        if (!todaySchedule || !todaySchedule.open || !todaySchedule.close) {
            const result = { status: 'closed', message: 'Closed today' };
            console.log('🍽️ Restaurant Hours Topbar: Status result (closed today):', result);
            return result;
        }

        const openMinutes = parseTime(todaySchedule.open);
        const closeMinutes = parseTime(todaySchedule.close);
        
        console.log('🍽️ Restaurant Hours Topbar: Current minutes:', currentMinutes);
        console.log('🍽️ Restaurant Hours Topbar: Open minutes:', openMinutes);
        console.log('🍽️ Restaurant Hours Topbar: Close minutes:', closeMinutes);
        
        // Check if currently open
        if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
            const minutesToClose = closeMinutes - currentMinutes;
            
            if (minutesToClose <= RESTAURANT_CONFIG.closingSoonMinutes) {
                const result = {
                    status: 'closing-soon',
                    message: `Closes soon at ${formatTime(todaySchedule.close)}`
                };
                console.log('🍽️ Restaurant Hours Topbar: Status result (closing soon):', result);
                return result;
            }
            
            const result = {
                status: 'open',
                message: `Open until ${formatTime(todaySchedule.close)}`
            };
            console.log('🍽️ Restaurant Hours Topbar: Status result (open):', result);
            return result;
        }
        
        // Check if opening soon today
        if (currentMinutes < openMinutes) {
            const minutesToOpen = openMinutes - currentMinutes;
            
            if (minutesToOpen <= RESTAURANT_CONFIG.openingSoonMinutes) {
                const result = {
                    status: 'opening-soon',
                    message: `Opens soon at ${formatTime(todaySchedule.open)}`
                };
                console.log('🍽️ Restaurant Hours Topbar: Status result (opening soon):', result);
                return result;
            }
            
            const result = {
                status: 'closed',
                message: `Opens today at ${formatTime(todaySchedule.open)}`
            };
            console.log('🍽️ Restaurant Hours Topbar: Status result (closed, opens today):', result);
            return result;
        }
        
        // Closed for today, check tomorrow
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDay = tomorrow.toLocaleDateString("en-US", {
            timeZone: RESTAURANT_CONFIG.timezone,
            weekday: 'long'
        }).toLowerCase();
        
        const tomorrowSchedule = RESTAURANT_CONFIG.schedule[tomorrowDay];
        if (tomorrowSchedule && tomorrowSchedule.open) {
            const result = {
                status: 'closed',
                message: `Opens tomorrow at ${formatTime(tomorrowSchedule.open)}`
            };
            console.log('🍽️ Restaurant Hours Topbar: Status result (closed, opens tomorrow):', result);
            return result;
        }
        
        const result = { status: 'closed', message: 'Closed' };
        console.log('🍽️ Restaurant Hours Topbar: Status result (closed):', result);
        return result;
    }

    // Create topbar HTML
    function createTopbar() {
        console.log('🍽️ Restaurant Hours Topbar: Creating topbar elements...');
        
        const topbar = document.createElement('div');
        topbar.id = 'restaurant-hours-topbar';
        
        const content = document.createElement('div');
        content.className = 'restaurant-hours-content';
        
        const statusElement = document.createElement('span');
        statusElement.className = 'restaurant-status';
        
        const infoElement = document.createElement('span');
        infoElement.className = 'hours-info';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'restaurant-hours-close';
        closeButton.innerHTML = '×';
        closeButton.setAttribute('aria-label', 'Close hours banner');
        
        content.appendChild(statusElement);
        content.appendChild(infoElement);
        topbar.appendChild(content);
        topbar.appendChild(closeButton);
        
        // Close button functionality
        closeButton.addEventListener('click', function() {
            console.log('🍽️ Restaurant Hours Topbar: Close button clicked');
            topbar.classList.add('hidden');
            // Remember that user dismissed it for this session
            sessionStorage.setItem('restaurant-hours-dismissed', 'true');
        });
        
        console.log('🍽️ Restaurant Hours Topbar: Topbar elements created successfully');
        return { topbar, statusElement, infoElement };
    }

    // Update topbar content
    function updateTopbar(statusElement, infoElement) {
        console.log('🍽️ Restaurant Hours Topbar: Updating topbar content...');
        const status = getRestaurantStatus();
        
        // Update status badge
        statusElement.className = `restaurant-status status-${status.status}`;
        statusElement.textContent = status.status.replace('-', ' ');
        
        // Update info text
        infoElement.textContent = status.message;
        
        console.log('🍽️ Restaurant Hours Topbar: Topbar updated with status:', status);
    }

    // Initialize the topbar
    function init() {
        console.log('🍽️ Restaurant Hours Topbar: Initializing...');
        
        // Check if user already dismissed it this session
        if (sessionStorage.getItem('restaurant-hours-dismissed') === 'true') {
            console.log('🍽️ Restaurant Hours Topbar: User previously dismissed, skipping...');
            return;
        }

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            console.log('🍽️ Restaurant Hours Topbar: DOM still loading, waiting...');
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        console.log('🍽️ Restaurant Hours Topbar: DOM ready, creating topbar...');
        
        const { topbar, statusElement, infoElement } = createTopbar();
        
        // Insert at the beginning of body
        console.log('🍽️ Restaurant Hours Topbar: Inserting topbar into DOM...');
        document.body.insertBefore(topbar, document.body.firstChild);
        
        // Adjust body padding to account for fixed topbar
        const originalPaddingTop = document.body.style.paddingTop;
        const newPaddingTop = (parseInt(originalPaddingTop) || 0) + 44 + 'px';
        document.body.style.paddingTop = newPaddingTop;
        console.log('🍽️ Restaurant Hours Topbar: Adjusted body padding from', originalPaddingTop, 'to', newPaddingTop);
        
        // Initial update
        updateTopbar(statusElement, infoElement);
        
        // Update every minute
        setInterval(() => {
            console.log('🍽️ Restaurant Hours Topbar: Scheduled update triggered');
            updateTopbar(statusElement, infoElement);
        }, 60000);
        
        console.log('🍽️ Restaurant Hours Topbar: Successfully initialized! 🎉');
    }

    // Start the script
    console.log('🍽️ Restaurant Hours Topbar: Starting initialization...');
    init();

    // Expose configuration for external modification if needed
    window.RestaurantHoursConfig = RESTAURANT_CONFIG;
    console.log('🍽️ Restaurant Hours Topbar: Configuration exposed to window.RestaurantHoursConfig');
    
})(); 
# 🍽️ Restaurant Hours Topbar

A lightweight JavaScript script that adds a live restaurant hours status topbar to any website. Perfect for restaurants that want to show their current open/closed status prominently on their website.

## ✨ Features

- **Live Status Display**: Shows "Open", "Closed", "Closes Soon", or "Opens Soon" based on current time
- **Timezone Aware**: Correctly handles different timezones
- **Auto-Updates**: Updates status every minute without page refresh
- **Dismissible**: Users can close the topbar, and it remembers the choice for the session
- **Mobile Responsive**: Adapts to different screen sizes
- **Easy Integration**: Just add one script tag to your website
- **Customizable**: Easy to customize colors, schedule, and timing thresholds
- **Lightweight**: No dependencies, pure vanilla JavaScript

## 🚀 Quick Start

### 1. Include the Script

Add this script tag to your HTML, preferably before the closing `</body>` tag:

```html
<script src="path/to/restaurant-hours-topbar.js"></script>
```

### 2. Customize Your Schedule

Edit the `RESTAURANT_CONFIG` object at the top of the JavaScript file:

```javascript
const RESTAURANT_CONFIG = {
    name: "Your Restaurant Name",
    timezone: "America/New_York", // Change to your timezone
    schedule: {
        monday: { open: "11:00", close: "22:00" },
        tuesday: { open: "11:00", close: "22:00" },
        wednesday: { open: "11:00", close: "22:00" },
        thursday: { open: "11:00", close: "22:00" },
        friday: { open: "11:00", close: "23:00" },
        saturday: { open: "10:00", close: "23:00" },
        sunday: { open: "10:00", close: "21:00" }
    },
    closingSoonMinutes: 30, // Show "closes soon" 30 min before closing
    openingSoonMinutes: 60, // Show "opens soon" 60 min before opening
    style: {
        backgroundColor: "#2c3e50",
        textColor: "#ffffff",
        closeButtonColor: "#e74c3c",
        fontSize: "14px",
        fontFamily: "Arial, sans-serif"
    }
};
```

## ⚙️ Configuration Options

### Schedule Format

Times should be in 24-hour format (HH:MM). For days when the restaurant is closed, you can either:
- Set to `null`: `monday: null`
- Omit the open/close times: `monday: {}`

### Timezone

Use standard timezone identifiers like:
- `"America/New_York"`
- `"America/Los_Angeles"`
- `"Europe/London"`
- `"Asia/Tokyo"`

### Timing Thresholds

- `closingSoonMinutes`: How many minutes before closing to show "Closes Soon"
- `openingSoonMinutes`: How many minutes before opening to show "Opens Soon"

### Styling

Customize the appearance by modifying the `style` object:
- `backgroundColor`: Background color of the topbar
- `textColor`: Text color
- `closeButtonColor`: Color of the close (×) button
- `fontSize`: Base font size
- `fontFamily`: Font family

## 🎨 Status States

The topbar displays four different states:

1. **🟢 OPEN** - Restaurant is currently open
2. **🔴 CLOSED** - Restaurant is currently closed
3. **🟡 CLOSES SOON** - Restaurant closes within the threshold time
4. **🔵 OPENS SOON** - Restaurant opens within the threshold time

Each state has its own color coding and displays relevant information like closing time or next opening time.

## 📱 Mobile Responsive

The topbar automatically adapts to mobile devices:
- Smaller font size and padding on mobile
- Hides detailed hours information on narrow screens
- Maintains functionality and readability

## 🔧 Advanced Usage

### Programmatic Access

The configuration is exposed globally as `window.RestaurantHoursConfig`, allowing you to modify it programmatically:

```javascript
// Change timezone on the fly
window.RestaurantHoursConfig.timezone = "America/Los_Angeles";

// Update schedule
window.RestaurantHoursConfig.schedule.monday = { open: "10:00", close: "21:00" };
```

### CDN Hosting

To use this as a true CDN script:

1. Upload `restaurant-hours-topbar.js` to your web server or CDN
2. Reference it from any website using the full URL:

```html
<script src="https://yourdomain.com/path/to/restaurant-hours-topbar.js"></script>
```

### Multiple Restaurants

If you need to support multiple restaurant locations, you can create separate versions of the script with different configurations, or modify the script to accept configuration parameters.

## 🛡️ Browser Compatibility

The script uses modern JavaScript features but includes fallbacks:
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Uses vanilla JavaScript with no dependencies
- Gracefully degrades if JavaScript is disabled

## 📄 Demo

Open `demo.html` in your browser to see the topbar in action with sample restaurant hours.

## 🤝 Contributing

Feel free to customize this script for your needs. Some ideas for enhancements:

- Holiday schedule support
- Multiple location support
- Different languages
- Custom messages for special events
- Integration with restaurant POS systems

## 📝 License

This script is provided as-is for restaurant use. Feel free to modify and distribute as needed.

## 🐛 Troubleshooting

### Topbar not appearing?
- Check that the script is loading correctly (no 404 errors in browser console)
- Verify your schedule configuration is valid
- Make sure the current time falls within your configured hours for testing

### Timezone issues?
- Verify your timezone string is correct
- Test with different times to ensure the logic is working
- Check browser console for any JavaScript errors

### Styling conflicts?
- The topbar uses high z-index (999999) to appear on top
- If conflicts occur, you may need to adjust z-index values
- Custom CSS on your site might override the topbar styles

### Performance concerns?
- The script updates every minute, which is very lightweight
- No external API calls or dependencies
- Minimal DOM manipulation

For more advanced customization or issues, examine the source code - it's well-commented and modular. 
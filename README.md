# Matrix LinkedIn Banner Generator

A fun, interactive Matrix-style digital rain effect that creates personalized LinkedIn banners. Watch your skills and information light up as they form words in the falling characters!

![Matrix Effect](https://img.shields.io/badge/Matrix-Digital%20Rain-00ff41?style=for-the-badge)
![LinkedIn](https://img.shields.io/badge/LinkedIn-Banner%20Generator-0077b5?style=for-the-badge)

## ✨ Features

- **Matrix Digital Rain Effect** - Classic falling characters animation
- **Word Detection** - Automatically highlights your skills when they form complete words
- **LinkedIn Optimized** - Perfect 1584 x 396px banner size
- **Customizable** - Easy to modify words and characters
- **One-Click Download** - Export your banner as PNG instantly
- **Pure JavaScript** - No dependencies, works in any modern browser

## 🎯 How It Works

The banner displays characters falling like rain. When characters form complete words from your skills list (like "Rust", "Java", "Kubernetes"), they light up in cyan while everything else remains in faint green.

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Open `index.html`** in your web browser
3. **Wait for words to form** and light up
4. **Click "Download Banner"** when you see a frame you like
5. **Upload** the downloaded PNG to your LinkedIn profile banner

## 🛠️ Customization

### Adding Your Own Words

Edit `script.js` and modify the `words` array:

```javascript
const words = [
    'Rust',
    'C++20',
    'Kubernetes',
    'Java',
    'Spring Boot',
    'CCNA',
    'Software Engineer',
    'Istanbul Turkey | Brussels, Belgium'
];
```

### Changing Characters

Modify the `chars` array to use different characters:

```javascript
const chars = ['R', 'u', 's', 't', 'C', '+', '+', '2', '0', ...];
```

### Adjusting Colors

In the draw function, you can change:
- **Word highlight color**: `#00ffff` (cyan)
- **Background characters**: `rgba(0, 255, 65, 0.2)` (faint green)

## 📁 Project Structure

```
matrix-linkedin-banner/
├── index.html      # Main HTML file
├── style.css       # Styling
├── script.js       # Matrix effect logic
└── README.md       # This file
```

## 🎨 Technical Details

- **Canvas-based rendering** for smooth animation
- **Word detection algorithm** that scans character sequences
- **Trail effect** with fading characters
- **Deterministic character cycling** (no randomness)

## 📝 License

MIT License - See LICENSE file for details.

---

**Made with 💚 and Matrix vibes**


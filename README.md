# Math 180A - Probability Theory Notes

A clean, organized collection of lecture notes for Math 180A Probability Theory course, presented as a modern web application.

## 📁 File Structure

```
math180a/
├── index.html                 # Homepage with lecture overview
├── homework.html             # Homework assignments page
├── README.md                 # This file
├── assets/                   # Static assets
│   ├── css/
│   │   └── styles.css       # Main stylesheet
│   └── js/                  # JavaScript files (for future use)
├── lectures/                 # Individual lecture files
│   ├── L1/                  # Lecture 1 directory
│   │   ├── L1.md           # Original markdown for Lecture 1
│   │   ├── L1.html         # HTML version of Lecture 1
│   │   └── Lecture_1.pdf   # PDF version of Lecture 1
│   └── lecture-template.html # Template for creating new lectures
└── homework/                 # Homework assignments
    ├── ps/                  # Problem sets
    │   └── Homework_1_ps.pdf
    └── sol/                 # Solutions (future)
```

## 🚀 Getting Started

1. Open `index.html` in your web browser to view the homepage
2. Click on any lecture to read the full content
3. Use the navigation to move between lectures

## 🚀 Dynamic Content System

The website now uses a **fully dynamic system** with a modern sidebar navigation that automatically updates when you add new content!

### 🎯 **New Sidebar Navigation**

- **Hamburger Menu** - Click the 3-line button (☰) in the top-left corner
- **Slides in from left** - Clean, modern navigation experience
- **Always available** - Works on all pages (homepage, lectures, homework)
- **Lectures dropdown** - Organized within the sidebar
- **Current page highlighting** - Shows where you are

### 📝 Adding New Lectures (Super Easy!)

1. **Create directory and files**:
   ```bash
   mkdir lectures/L2
   # Add: L2.md, L2.html, Lecture_2.pdf
   ```

2. **Update content automatically**:
   ```bash
   node add-content.js lecture 2 "Conditional Probability" "Introduction to conditional probability" "Conditional Probability,Bayes Theorem"
   ```

3. **That's it!** 🎉 The sidebar navigation automatically updates with the new lecture.

### 📚 Adding New Homework (Super Easy!)

1. **Add PDF files**:
   ```bash
   cp homework.pdf homework/ps/Homework_2_ps.pdf
   cp solution.pdf homework/sol/Homework_2_sol.pdf  # when ready
   ```

2. **Update content automatically**:
   ```bash
   node add-content.js homework 2 "Conditional Probability Problems" "Problems covering conditional probability" "Conditional Probability,Independence"
   ```

3. **That's it!** 🎉 The sidebar navigation automatically updates with the new homework.

### 🔧 Content Manager Commands

```bash
# List current content
node add-content.js list

# Add lecture
node add-content.js lecture <num> "<title>" "<subtitle>" "<topic1,topic2,...>"

# Add homework  
node add-content.js homework <num> "<title>" "<description>" "<topic1,topic2,...>" [hasSolution]

# Add solution later
node add-content.js solution <num>
```

**See `QUICK_START.md` for detailed examples and navigation guide!**

## 🎨 Styling Guidelines

The CSS uses a consistent design system with:
- **Primary color**: Blue (#2563eb)
- **Typography**: Inter font family
- **Responsive design**: Works on all devices
- **Accessibility**: High contrast and readable fonts

### CSS Classes for Content:
- `.highlight-box` - For important concepts and key information
- `.example-box` - For worked examples and detailed explanations
- `.math` - For mathematical expressions (italicized)
- `.separator` - Horizontal dividers between sections

## 📱 Features

### 🎨 **VS Code/Cursor IDE Theme System**
- ✅ **8+ Professional IDE Themes** - VS Code Light+/Dark+, Monokai, Dracula, Nord, One Dark Pro, Solarized Dark, Material Design
- ✅ **Advanced Theme Selector** - Dropdown with theme previews and descriptions
- ✅ **Custom Theme Builder** - Live color picker with real-time preview
- ✅ **Theme Management** - Import/export themes, theme history tracking
- ✅ **IDE-Style Syntax Highlighting** - Automatic language detection with VS Code-accurate colors
- ✅ **Language Indicators** - Code blocks show programming language

### 🚀 **Core Features**
- ✅ **Fully Dynamic System** - Automatically updates when you add content
- ✅ **Modern Sidebar Navigation** - Clean hamburger menu with slide-out sidebar
- ✅ **Always Available** - Navigation accessible from every page
- ✅ **Responsive design** for mobile, tablet, and desktop
- ✅ **Clean, academic styling** with professional IDE aesthetics
- ✅ **Easy navigation** between lectures and homework
- ✅ **Mathematical expression formatting** with proper styling
- ✅ **Organized file structure** that scales automatically
- ✅ **Content management script** for easy updates
- ✅ **PDF integration** with direct links to problem sets and solutions

## 🎨 Theme System

### **Built-in IDE Themes**
The site includes 8 professional IDE themes that replicate popular VS Code/Cursor color schemes:

1. **VS Code Light+** (default) - Clean, bright theme
2. **VS Code Dark+** - Classic dark theme  
3. **Monokai** - Vibrant syntax highlighting
4. **Dracula** - Modern purple/dark theme
5. **Nord** - Arctic-inspired palette
6. **One Dark Pro** - GitHub Atom-inspired
7. **Solarized Dark** - Scientifically balanced
8. **Material** - Google Material Design

### **Custom Theme Builder**
- Click the theme selector in the sidebar
- Use the **Custom Theme Builder** section
- Adjust colors with live preview
- Save your custom themes
- Import/export theme collections

### **Syntax Highlighting**
- Automatic language detection for JavaScript, Python, Java, C++, CSS, HTML
- IDE-accurate color schemes for keywords, strings, comments, numbers
- Language indicators on code blocks
- Seamless integration with all themes

### **Theme Management**
- **Export**: Download all themes as JSON
- **Import**: Upload theme collections
- **History**: Track recently used themes
- **Persistence**: Themes saved across sessions

## 🔧 Customization

- **Colors**: Edit CSS custom properties in `assets/css/styles.css` or use the theme builder
- **Fonts**: Change the Google Fonts import in HTML files
- **Layout**: Modify the grid system in the CSS
- **Themes**: Create custom themes using the built-in theme builder
- **Navigation**: Update the nav structure in all HTML files

## 📚 Current Content

### Lectures
- **Lecture 1**: Probability Space - Introduction to probability spaces, Kolmogorov's axioms, and the birthday problem
- **Lecture 2**: Coming Soon
- **Lecture 3**: Coming Soon

### Homework
- **Homework 1**: Problem set covering probability spaces and basic probability concepts
- **Homework 2**: Coming Soon
- **Homework 3**: Coming Soon

---

*Built with modern web technologies for an optimal learning experience.*

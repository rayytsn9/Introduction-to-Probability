# 🚀 Quick Start Guide - Dynamic Content System

Your Math 180A website is now **fully dynamic**! Here's how to add new content:

## 📖 Adding a New Lecture (e.g., Lecture 2)

### Step 1: Create the directory and files
```bash
mkdir lectures/L2
# Add your files:
# - lectures/L2/L2.md (your markdown notes)
# - lectures/L2/L2.html (copy from lecture-template.html and update)
# - lectures/L2/Lecture_2.pdf (your PDF)
```

### Step 2: Update content.json (automatic method)
```bash
node add-content.js lecture 2 "Conditional Probability" "Introduction to conditional probability and Bayes theorem" "Conditional Probability,Bayes Theorem,Independence"
```

### Step 3: That's it! 🎉
The website automatically updates:
- ✅ Navigation menus
- ✅ Homepage lecture cards
- ✅ All cross-references
- ✅ Lecture links

## 📝 Adding New Homework (e.g., Homework 2)

### Step 1: Add PDF files
```bash
# Add problem set
cp your_homework.pdf homework/ps/Homework_2_ps.pdf

# Add solution (when ready)
cp your_solution.pdf homework/sol/Homework_2_sol.pdf
```

### Step 2: Update content.json
```bash
# Add homework without solution
node add-content.js homework 2 "Conditional Probability Problems" "Problems covering conditional probability concepts" "Conditional Probability,Independence"

# Add solution later
node add-content.js solution 2
```

### Step 3: That's it! 🎉
The website automatically updates:
- ✅ Homepage homework section
- ✅ Homework page
- ✅ All navigation

## 🔧 Content Manager Commands

```bash
# List current content
node add-content.js list

# Add lecture
node add-content.js lecture <num> "<title>" "<subtitle>" "<topic1,topic2,...>"

# Add homework
node add-content.js homework <num> "<title>" "<description>" "<topic1,topic2,...>" [hasSolution]

# Add solution
node add-content.js solution <num>
```

## 📁 File Structure After Adding Content

```
math180a/
├── content.json                 # ← Automatically updated
├── lectures/
│   ├── L1/                     # ← Existing
│   └── L2/                     # ← New lecture directory
│       ├── L2.md
│       ├── L2.html
│       └── Lecture_2.pdf
└── homework/
    ├── ps/
    │   ├── Homework_1_ps.pdf
    │   └── Homework_2_ps.pdf    # ← New homework
    └── sol/
        └── Homework_2_sol.pdf   # ← New solution
```

## 🎯 What Happens Automatically

When you add new content:

1. **JavaScript scans content.json** on page load
2. **Dynamically generates sidebar navigation** for all pages
3. **Creates sidebar with lectures dropdown** (clean & organized!)
4. **Creates homework cards** in organized grid layout
5. **Updates all cross-references** and links
6. **Maintains responsive design** and formatting

## 📋 Sidebar Navigation Layout

- **Hamburger Menu (☰)** - Click to open sidebar
- **Home** - Link to homepage
- **Lectures** - Expandable dropdown with all available lectures
- **Homework** - Link to homework page

**Benefits of sidebar navigation:**
- ✅ **Clean interface** - No cluttered navigation bar
- ✅ **Always available** - Accessible from every page
- ✅ **Scales to unlimited lectures** - Never gets cramped
- ✅ **Modern, professional appearance** - App-like experience
- ✅ **Mobile-friendly** - Works perfectly on all devices
- ✅ **Current page highlighting** - Shows where you are

## 💡 Pro Tips

- **Hamburger menu**: Click the ☰ button in top-left to open navigation
- **File naming matters**: Follow the convention `Lecture_X.pdf`, `Homework_X_ps.pdf`, `Homework_X_sol.pdf`
- **Topics help students**: Include relevant topics for each lecture/homework
- **Solutions are optional**: Add them when ready, they'll show "Coming Soon" until then
- **No manual HTML editing**: Everything is generated dynamically!
- **Sidebar auto-closes**: Navigation slides away after clicking a link
- **Keyboard support**: Press Escape to close the sidebar

## 🆘 Troubleshooting

**If sidebar doesn't open:**
1. Check that the hamburger menu button is visible in the top-left
2. Try refreshing the page
3. Check browser console for JavaScript errors

**If content doesn't appear:**
1. Check that `content.json` was updated correctly
2. Verify file paths in the JSON match your actual files
3. Make sure you're viewing the site through a web server (not file://)

**If JavaScript errors:**
1. Check browser console for errors
2. Ensure `content.json` is valid JSON
3. Verify all referenced files exist
4. Make sure the sidebar HTML structure is present in your files

---

## 🎨 **Advanced IDE Theme System**

### **Theme Selector Features**
- **🎨 Theme Button** - Click to open the theme dropdown
- **8+ IDE Themes** - VS Code Light+/Dark+, Monokai, Dracula, Nord, One Dark Pro, Solarized Dark, Material
- **Live Previews** - Each theme shows a color preview circle
- **Descriptions** - Theme descriptions and categories
- **Persistence** - Your theme choice is saved across sessions

### **Custom Theme Builder**
- **Color Picker** - Adjust background, surface, primary, text, and accent colors
- **Live Preview** - See changes instantly as you adjust colors
- **Save Themes** - Create and save your own custom themes
- **Theme Management** - Import/export theme collections

### **Syntax Highlighting**
- **Automatic Detection** - Recognizes JavaScript, Python, Java, C++, CSS, HTML
- **IDE Colors** - Uses exact VS Code color schemes for syntax highlighting
- **Language Indicators** - Code blocks show the detected programming language
- **Professional Styling** - Keywords, strings, comments, numbers all properly colored

### **Theme Management**
- **Export** - Download all your themes as a JSON file
- **Import** - Upload theme collections from files
- **History** - Track recently used themes for quick access
- **Cross-Page** - Works consistently across all pages

### **How to Use Themes**
1. **Open Sidebar** - Click the hamburger menu (☰)
2. **Access Theme Selector** - Click the theme button with current theme name
3. **Choose Theme** - Click any theme option to apply it instantly
4. **Build Custom Theme** - Use the Custom Theme Builder section
5. **Manage Themes** - Import/export your theme collections

---

**Your website is now a fully dynamic, self-updating system with professional IDE themes!** 🎉

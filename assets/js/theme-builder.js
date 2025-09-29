/**
 * Advanced Theme Builder and Management System
 * Provides custom theme creation, import/export, and advanced theme features
 */

class ThemeBuilder {
    constructor() {
        this.customThemes = JSON.parse(localStorage.getItem('customThemes') || '[]');
        this.themeHistory = JSON.parse(localStorage.getItem('themeHistory') || '[]');
        this.maxHistorySize = 10;
    }

    // Initialize theme builder interface
    initializeThemeBuilder() {
        const themeDropdown = document.getElementById('themeDropdown');
        if (!themeDropdown) return;

        // Add theme builder section to dropdown
        this.addThemeBuilderSection(themeDropdown);
        
        // Add import/export functionality
        this.addImportExportSection(themeDropdown);
    }

    addThemeBuilderSection(container) {
        const builderSection = document.createElement('div');
        builderSection.className = 'theme-builder';
        builderSection.innerHTML = `
            <h4>🎨 Custom Theme Builder</h4>
            <div class="color-input-group">
                <label>Background:</label>
                <input type="color" class="color-input" id="bgColor" value="#ffffff">
            </div>
            <div class="color-input-group">
                <label>Surface:</label>
                <input type="color" class="color-input" id="surfaceColor" value="#f3f3f3">
            </div>
            <div class="color-input-group">
                <label>Primary:</label>
                <input type="color" class="color-input" id="primaryColor" value="#007acc">
            </div>
            <div class="color-input-group">
                <label>Text:</label>
                <input type="color" class="color-input" id="textColor" value="#333333">
            </div>
            <div class="color-input-group">
                <label>Accent:</label>
                <input type="color" class="color-input" id="accentColor" value="#ff8c00">
            </div>
            <div class="theme-actions">
                <button class="btn-small" id="previewTheme">Preview</button>
                <button class="btn-small btn-primary-small" id="saveTheme">Save Theme</button>
                <button class="btn-small" id="resetBuilder">Reset</button>
            </div>
        `;

        container.appendChild(builderSection);
        this.attachBuilderEvents();
    }

    addImportExportSection(container) {
        const importExportSection = document.createElement('div');
        importExportSection.className = 'theme-import-export';
        importExportSection.style.cssText = `
            padding: 1rem;
            border-top: 1px solid var(--border-color);
            background: var(--background-color);
        `;
        importExportSection.innerHTML = `
            <h4>📁 Theme Management</h4>
            <div class="theme-actions">
                <button class="btn-small" id="exportThemes">Export All</button>
                <button class="btn-small" id="importThemes">Import</button>
                <input type="file" id="themeFileInput" accept=".json" style="display: none;">
                <button class="btn-small" id="clearHistory">Clear History</button>
            </div>
            <div class="theme-history" style="margin-top: 0.5rem;">
                <small style="color: var(--text-muted);">Recent themes:</small>
                <div id="themeHistoryList"></div>
            </div>
        `;

        container.appendChild(importExportSection);
        this.attachImportExportEvents();
        this.updateThemeHistory();
    }

    attachBuilderEvents() {
        const previewBtn = document.getElementById('previewTheme');
        const saveBtn = document.getElementById('saveTheme');
        const resetBtn = document.getElementById('resetBuilder');
        const colorInputs = document.querySelectorAll('.color-input');

        if (previewBtn) {
            previewBtn.addEventListener('click', () => this.previewCustomTheme());
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveCustomTheme());
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetBuilder());
        }

        colorInputs.forEach(input => {
            input.addEventListener('input', () => this.previewCustomTheme());
        });
    }

    attachImportExportEvents() {
        const exportBtn = document.getElementById('exportThemes');
        const importBtn = document.getElementById('importThemes');
        const fileInput = document.getElementById('themeFileInput');
        const clearBtn = document.getElementById('clearHistory');

        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportThemes());
        }

        if (importBtn) {
            importBtn.addEventListener('click', () => fileInput.click());
        }

        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.importThemes(e));
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearThemeHistory());
        }
    }

    previewCustomTheme() {
        const colors = {
            background: document.getElementById('bgColor')?.value || '#ffffff',
            surface: document.getElementById('surfaceColor')?.value || '#f3f3f3',
            primary: document.getElementById('primaryColor')?.value || '#007acc',
            text: document.getElementById('textColor')?.value || '#333333',
            accent: document.getElementById('accentColor')?.value || '#ff8c00'
        };

        // Apply preview styles
        const root = document.documentElement;
        root.style.setProperty('--background-color', colors.background);
        root.style.setProperty('--surface-color', colors.surface);
        root.style.setProperty('--primary-color', colors.primary);
        root.style.setProperty('--text-primary', colors.text);
        root.style.setProperty('--accent-color', colors.accent);
        
        // Generate complementary colors
        const borderColor = this.lightenColor(colors.surface, -20);
        const textSecondary = this.lightenColor(colors.text, 40);
        const textMuted = this.lightenColor(colors.text, 60);
        
        root.style.setProperty('--border-color', borderColor);
        root.style.setProperty('--text-secondary', textSecondary);
        root.style.setProperty('--text-muted', textMuted);
    }

    saveCustomTheme() {
        const colors = {
            background: document.getElementById('bgColor')?.value || '#ffffff',
            surface: document.getElementById('surfaceColor')?.value || '#f3f3f3',
            primary: document.getElementById('primaryColor')?.value || '#007acc',
            text: document.getElementById('textColor')?.value || '#333333',
            accent: document.getElementById('accentColor')?.value || '#ff8c00'
        };

        const themeName = prompt('Enter a name for your custom theme:');
        if (!themeName) return;

        const customTheme = {
            id: `custom-${Date.now()}`,
            name: themeName,
            colors: colors,
            created: new Date().toISOString(),
            isCustom: true
        };

        this.customThemes.push(customTheme);
        localStorage.setItem('customThemes', JSON.stringify(this.customThemes));
        
        // Add to theme history
        this.addToHistory(customTheme);
        
        // Refresh theme dropdown
        this.refreshThemeDropdown();
        
        alert(`Theme "${themeName}" saved successfully!`);
    }

    resetBuilder() {
        document.getElementById('bgColor').value = '#ffffff';
        document.getElementById('surfaceColor').value = '#f3f3f3';
        document.getElementById('primaryColor').value = '#007acc';
        document.getElementById('textColor').value = '#333333';
        document.getElementById('accentColor').value = '#ff8c00';
        
        // Reset to default theme
        const root = document.documentElement;
        root.removeAttribute('style');
    }

    exportThemes() {
        const exportData = {
            customThemes: this.customThemes,
            themeHistory: this.themeHistory,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `math180a-themes-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    importThemes(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.customThemes) {
                    this.customThemes = data.customThemes;
                    localStorage.setItem('customThemes', JSON.stringify(this.customThemes));
                }
                
                if (data.themeHistory) {
                    this.themeHistory = data.themeHistory;
                    localStorage.setItem('themeHistory', JSON.stringify(this.themeHistory));
                }
                
                this.refreshThemeDropdown();
                this.updateThemeHistory();
                alert('Themes imported successfully!');
            } catch (error) {
                alert('Error importing themes: ' + error.message);
            }
        };
        reader.readAsText(file);
    }

    addToHistory(theme) {
        this.themeHistory.unshift(theme);
        if (this.themeHistory.length > this.maxHistorySize) {
            this.themeHistory = this.themeHistory.slice(0, this.maxHistorySize);
        }
        localStorage.setItem('themeHistory', JSON.stringify(this.themeHistory));
        this.updateThemeHistory();
    }

    updateThemeHistory() {
        const historyList = document.getElementById('themeHistoryList');
        if (!historyList) return;

        if (this.themeHistory.length === 0) {
            historyList.innerHTML = '<small style="color: var(--text-muted);">No recent themes</small>';
            return;
        }

        historyList.innerHTML = this.themeHistory.slice(0, 5).map(theme => `
            <div class="theme-history-item" style="display: flex; align-items: center; padding: 0.25rem 0; cursor: pointer;">
                <div class="theme-preview" style="width: 12px; height: 12px; border-radius: 50%; margin-right: 0.5rem; background: ${theme.colors?.primary || '#007acc'};"></div>
                <small style="color: var(--text-secondary);">${theme.name}</small>
            </div>
        `).join('');

        // Add click handlers to history items
        historyList.querySelectorAll('.theme-history-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                const theme = this.themeHistory[index];
                this.applyTheme(theme);
            });
        });
    }

    applyTheme(theme) {
        if (theme.isCustom && theme.colors) {
            // Apply custom theme colors
            const root = document.documentElement;
            Object.entries(theme.colors).forEach(([key, value]) => {
                const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
                root.style.setProperty(cssVar, value);
            });
        } else {
            // Apply predefined theme
            document.documentElement.setAttribute('data-theme', theme.id);
        }
        
        // Update localStorage
        localStorage.setItem('theme', theme.id);
        localStorage.setItem('themeName', theme.name);
        
        // Update UI
        const currentThemeElement = document.getElementById('currentTheme');
        if (currentThemeElement) {
            currentThemeElement.textContent = theme.name;
        }
    }

    refreshThemeDropdown() {
        // This would need to be implemented to dynamically update the dropdown
        // with custom themes - for now, it's a placeholder
        console.log('Theme dropdown refresh needed');
    }

    clearThemeHistory() {
        if (confirm('Clear theme history?')) {
            this.themeHistory = [];
            localStorage.setItem('themeHistory', JSON.stringify(this.themeHistory));
            this.updateThemeHistory();
        }
    }

    // Utility function to lighten/darken colors
    lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
}

// Initialize theme builder when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const themeBuilder = new ThemeBuilder();
    themeBuilder.initializeThemeBuilder();
});

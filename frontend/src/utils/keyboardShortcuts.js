// Keyboard shortcut definitions
export const DEBUG_KEYBOARD = true;

export const logKeyPress = (key, action) => {
    if (DEBUG_KEYBOARD) {
        console.log(`Keyboard: ${key} pressed - ${action}`);
    }
};

export const SHORTCUTS = {
    // Navigation
    GOTO_ANNOTATE: { key: 'n', description: 'Go to Annotate Data tab' },
    GOTO_HISTORY: { key: 'h', description: 'Go to History tab' },
    GOTO_SKEW: { key: 'w', description: 'Go to Fix Skew tab' },
    GOTO_ADMIN: { key: 'm', description: 'Go to Admin tab' },
    
    // Card Actions
    ADJUDICATE: { key: 'a', description: 'Adjudicate current card' },
    SKIP: { key: 's', description: 'Skip current card' },
    
    // Labels (defined separately since they're dynamic)
    LABEL_1: { key: '1', description: 'Select label 1' },
    LABEL_2: { key: '2', description: 'Select label 2' },
    LABEL_3: { key: '3', description: 'Select label 3' },
    LABEL_4: { key: '4', description: 'Select label 4' },
    LABEL_5: { key: '5', description: 'Select label 5' },
    
    // Help
    SHOW_SHORTCUTS: { key: 'shift+/', description: 'Show keyboard shortcuts', displayKey: '?' },
    SHOW_SHORTCUTS_ALT_2: { key: 'cmd+/', description: 'Show keyboard shortcuts (alternative)', displayKey: 'CMD+' }
};

// Helper to get all shortcuts for display
export const getShortcutsList = () => {
    const sections = {
        Navigation: ['GOTO_ANNOTATE', 'GOTO_HISTORY', 'GOTO_SKEW', 'GOTO_ADMIN'],
        'Card Actions': ['SKIP', 'ADJUDICATE'],
        'Label Selection': ['LABEL_1', 'LABEL_2', 'LABEL_3', 'LABEL_4', 'LABEL_5'],
        Help: ['SHOW_SHORTCUTS', 'SHOW_SHORTCUTS_ALT_2']
    };

    return Object.entries(sections).map(([section, shortcuts]) => ({
        section,
        shortcuts: shortcuts.map(id => ({
            key: SHORTCUTS[id].key,
            description: SHORTCUTS[id].description
        }))
    }));
}; 

// Initialize Mermaid with configuration
const initMermaid = () => {
    mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
            primaryColor: '#e4d2ba',
            primaryBorderColor: '#523a28',
            primaryTextColor: '#7e5c43',
            lineColor: '#523a28',
            arrowheadColor: '#523a28',
            fontSize: '14px'
        }
    })
}

// Draw flowchart with proper error handling
const drawFlowchart = (code) => {
    const container = document.getElementById('diagram-container')
    
    if (!code || code.trim() === '') {
        container.innerHTML = '<div style="color: orange;">Warning: Empty flowchart code</div>'
        return
    }

    try {
        container.innerHTML = `<div class="mermaid">${code}</div>`
        mermaid.init(undefined, container.querySelector('.mermaid'))
    } catch (err) {
        console.error('Flowchart error:', err)
        container.innerHTML = `<div style="color: red;">Error: ${err.message || 'Invalid syntax'}</div>`
    }
}

// Load model file with fetch
const loadModel = async (file) => {
    try {
        const response = await fetch(`assets/files/${file}`)
        if (!response.ok) throw new Error(`File not found: ${file}`)
        return await response.text()
    } catch (error) {
        console.error('Load error:', error)
        document.getElementById('diagram-container').innerHTML = 
            `<div style="color: red;">Error: ${error.message}</div>`
        return null
    }
}

// Populate dropdown with available files
const populateModelSelect = () => {
    const select = document.getElementById('model-select')
    select.innerHTML = ''
    
    if (!availableFiles || !availableFiles.length) {
        select.innerHTML = '<option disabled>No models found</option>'
        return
    }
    
    availableFiles.forEach((file, index) => {
        const option = new Option(file.replace('.txt', ''), file)
        if (index === 0) option.selected = true
        select.add(option)
    })
    
    // Trigger initial load
    if (availableFiles.length) loadSelectedModel()
}

// Handle model selection
const loadSelectedModel = async () => {
    const selectedFile = document.getElementById('model-select').value
    if (!selectedFile) return
    
    const model = await loadModel(selectedFile)
    if (model) {
        document.getElementById('code').value = model
        drawFlowchart(model)
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (typeof mermaid === 'undefined') {
        document.getElementById('diagram-container').innerHTML = 
            '<div style="color: red;">Error: Mermaid not loaded</div>'
        return
    }

    initMermaid()
    populateModelSelect()
    document.getElementById('model-select').addEventListener('change', loadSelectedModel)
})
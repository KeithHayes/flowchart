function drawFlowchart(code) {
    if (!code || code.trim() === '') {
        document.getElementById('diagram').innerHTML = 
            '<div style="color: orange;">Warning: Empty flowchart code</div>'
        return
    }

    if (typeof flowchart === 'undefined') {
        document.getElementById('diagram').innerHTML = 
            '<div style="color: red;">Error: Flowchart library not loaded</div>'
        return
    }

    const diagram = document.getElementById('diagram')
    diagram.innerHTML = ''
    
    try {
        const chart = flowchart.parse(code)
        chart.drawSVG('diagram', {
            'x': 10,
            'y': 10,
            'line-width': 2,
            'line-length': 50,
            'text-margin': 10,
            'font-size': 14,
            'font': 'normal',
            'font-family': 'Arial',
            'font-weight': 'normal',
            'font-color': '#7e5c43',
            'line-color': '#523a28',
            'element-color': '#523a28',
            'fill': '#e4d2ba',
            'yes-text': 'yes',
            'no-text': 'no',
            'arrow-end': 'block',
            'scale': 1,
            'symbols': {
                'start': {
                    'font-color': '#7e5c43',
                    'element-color': '#523a28',
                    'fill': '#e4d2ba'
                },
                'end': {
                    'font-color': '#7e5c43',
                    'element-color': '#523a28',
                    'fill': '#e4d2ba'
                }
            }
        })

        const svg = diagram.querySelector('svg')
        if (svg) {
            const bbox = svg.getBBox()
            diagram.style.width = '100%'
            diagram.style.minHeight = (bbox.height + 100) + 'px'
            svg.style.maxWidth = '100%'
            svg.style.height = 'auto'
        }
    } catch (err) {
        console.error('Flowchart error:', err)
        diagram.innerHTML = '<div style="color: red;">Error: ' + 
            (err.message || 'Invalid flowchart syntax') + '</div>'
    }
}

async function loadModel(file) {
    try {
        const response = await fetch(`assets/files/${file}`)
        if (!response.ok) throw new Error(`File not found: ${file}`)
        const content = await response.text()
        if (!content.trim()) throw new Error('File is empty')
        return content
    } catch (error) {
        console.error('Load error:', error)
        document.getElementById('diagram').innerHTML = 
            `<div style="color: red;">Error: ${error.message}</div>`
        return null
    }
}

function populateModelSelect() {
    const select = document.getElementById('model-select')
    select.innerHTML = ''
    
    if (!availableFiles || availableFiles.length === 0) {
        const option = document.createElement('option')
        option.textContent = 'No models found'
        option.disabled = true
        select.appendChild(option)
        return
    }
    
    availableFiles.forEach(filename => {
        const option = document.createElement('option')
        option.value = filename
        option.textContent = filename.replace('.txt', '')
        select.appendChild(option)
    })
    
    // Load first file by default
    if (availableFiles.length > 0) {
        loadSelectedModel()
    }
}

async function loadSelectedModel() {
    const modelSelect = document.getElementById('model-select')
    const codeTextarea = document.getElementById('code')
    
    if (!modelSelect.value) return
    
    const model = await loadModel(modelSelect.value)
    if (model) {
        codeTextarea.value = model
        drawFlowchart(model)
    }
}

// Wait for all resources to load
window.addEventListener('load', () => {
    if (typeof Raphael === 'undefined' || typeof flowchart === 'undefined') {
        document.getElementById('diagram').innerHTML = 
            '<div style="color: red;">Error: Required libraries not loaded</div>'
        return
    }

    populateModelSelect()
    
    document.getElementById('model-select')
        .addEventListener('change', loadSelectedModel)
})
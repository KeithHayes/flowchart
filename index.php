<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flowchart Viewer</title>
    <link rel="stylesheet" href="assets/css/flowchart.css">
    <script src="assets/js/mermaid.min.js"></script>
    <script>
        const availableFiles = <?php 
            $files = glob('assets/files/*.txt');
            echo json_encode(array_map('basename', $files ?: ['example.txt']));
        ?>;
    </script>
</head>
<body>
    <div class="container">
        <h1>Render Flowchart</h1>
        <div>
            <label for="model-select">Select File:</label>
            <select id="model-select">
            </select>
        </div>
        <div id="diagram-container"></div>
        <textarea id="code" style="display: none;"></textarea>
    </div>
    <script src="assets/js/flowchart.js"></script>
</body>
</html>
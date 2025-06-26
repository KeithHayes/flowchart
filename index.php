<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flowchart.js Example</title>
    <link rel="stylesheet" href="assets/css/flowchart.css">
    <script src="assets/js/raphael.min.js"></script>
    <script src="assets/js/flowchart.min.js"></script>
    <script>
        // Pass available files to JavaScript
        const availableFiles = <?php 
            $files = glob('assets/files/*.txt');
            echo json_encode(array_map('basename', $files ?: ['example.txt']));
        ?>;
    </script>
    <script src="assets/js/flowchart.js"></script>
</head>
<body>
    <div class="container">
        <h1>Flowchart.js Example</h1>
        
        <div>
            <label for="model-select">Select Model:</label>
            <select id="model-select">
                <!-- Options will be populated by JavaScript -->
            </select>
        </div>
        
        <textarea id="code" style="display: none;"></textarea>
        <div id="diagram"></div>
    </div>
</body>
</html>
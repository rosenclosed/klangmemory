<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Klangmemory</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="record-section">
        <h2>Nehmen Sie Ihre Töne auf</h2>
        <div id="recordings-list">
            <!-- Aufnahmeknöpfe und Listen werden hier dynamisch eingefügt -->
        </div>
        <button id="start-game" disabled>Spiel starten</button>
    </div>
    <div id="game-board" style="display: none;">
        <!-- Die Karten werden hier dynamisch eingefügt -->
    </div>
    <script src="js/script.js"></script>
    <script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
</script>

</body>
</html>

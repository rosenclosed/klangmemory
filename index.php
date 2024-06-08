<?php
header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
header("Pragma: no-cache"); // HTTP 1.0
header("Expires: 0"); // Proxies
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <title>Klangmemory</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=1">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=1">
    <link rel="icon" type="image/png" sizes="194x194" href="/favicon-194x194.png?v=1">
    <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png?v=1">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=1">
    <link rel="manifest" href="https://klangmemory.developedbyrose.de/manifest.webmanifest?v=1">
    <link rel="mask-icon" href="/safari-pinned-tab.svg?v=1" color="#4caf50">
    <link rel="shortcut icon" href="/favicon.ico?v=1">
    <meta name="apple-mobile-web-app-title" content="Klangmemory">
    <meta name="application-name" content="Klangmemory">
    <meta name="msapplication-TileColor" content="#4caf50">
    <meta name="msapplication-TileImage" content="/mstile-144x144.png?v=1">
    <meta name="theme-color" content="#ffffff">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('https://klangmemory.developedbyrose.de/service-worker.js').then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
</script>
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
    <button id="restart-game" style="display: none;">Neues Spiel</button>
    <script src="js/script.js"></script>

</body>
</html>

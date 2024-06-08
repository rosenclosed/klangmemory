document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.getElementById('start-game');
    const recordingsList = document.getElementById('recordings-list');
    const gameBoard = document.getElementById('game-board');
    const recordSection = document.getElementById('record-section');
    const restartGameButton = document.getElementById('restart-game');
    let mediaRecorder;
    let recordedChunks = [];
    let sounds = [];
    let currentRecordingIndex = null;

    // Überprüfen, ob die Seite neu geladen wurde, und Local Storage leeren
    if (performance.getEntriesByType('navigation')[0].type === 'reload') {
        localStorage.removeItem('sounds');
        localStorage.removeItem('gameStarted');
    }

    // Erstelle 8 Aufnahmeknöpfe und Aufnahmefelder
    for (let i = 0; i < 8; i++) {
        const recordingItem = document.createElement('div');
        recordingItem.classList.add('recording-item');

        const audioElement = document.createElement('audio');
        audioElement.controls = true;
        recordingItem.appendChild(audioElement);

        const recordButton = document.createElement('button');
        recordButton.innerText = `Aufnahme ${i + 1}`;
        recordButton.dataset.recording = 'false';
        recordButton.addEventListener('click', () => handleRecording(i, audioElement, recordButton));
        recordingItem.appendChild(recordButton);

        recordingsList.appendChild(recordingItem);
    }

    // Start or stop recording for a specific button
    async function handleRecording(index, audioElement, recordButton) {
        if (recordButton.dataset.recording === 'true') {
            // Stop recording
            mediaRecorder.stop();
        } else {
            // Start recording
            if (mediaRecorder && mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
            }
            currentRecordingIndex = index;

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            recordButton.dataset.recording = 'true';
            recordButton.innerText = `Aufnahme ${index + 1} Stoppen`;

            mediaRecorder.ondataavailable = event => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                sounds[currentRecordingIndex] = audioUrl;
                audioElement.src = audioUrl;
                recordedChunks = [];

                recordButton.dataset.recording = 'false';
                recordButton.innerText = `Aufnahme ${index + 1}`;

                // Speichere die Sounds im Local Storage
                localStorage.setItem('sounds', JSON.stringify(sounds));

                if (sounds.length === 8 && sounds.every(sound => sound)) {
                    startGameButton.disabled = false;
                }
            };
        }
    }

    // Start game
    startGameButton.addEventListener('click', () => {
        recordSection.style.display = 'none';
        gameBoard.style.display = 'grid';
        restartGameButton.style.display = 'block';
        localStorage.setItem('gameStarted', 'true');
        initializeGame();
    });

    // Restart game
    restartGameButton.addEventListener('click', () => {
        gameBoard.innerHTML = ''; // Clear the game board
        initializeGame();
    });

    function initializeGame() {
        let cards = [];

        sounds.forEach((sound, index) => {
            cards.push({ sound: sound, id: index });
            cards.push({ sound: sound, id: index + 8 });
        });

        cards = shuffle(cards);

        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.sound = card.sound;
            cardElement.dataset.id = card.id;

            cardElement.innerHTML = `
                <div class="card-inner">
                    <div class="card-front"></div>
                    <div class="card-back">
                        <img src="/assets/img/fart.png" alt="Fart" />
                    </div>
                </div>
            `;

            cardElement.addEventListener('click', () => {
                flipCard(cardElement);
            });

            gameBoard.appendChild(cardElement);
        });

        let flippedCards = [];
        let matchedPairs = 0;

        function flipCard(card) {
            if (flippedCards.length < 2 && !card.classList.contains('flip')) {
                card.classList.add('flip');
                playSound(card.dataset.sound);
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    checkForMatch();
                }
            }
        }

        function checkForMatch() {
            const [card1, card2] = flippedCards;
            const sound1 = card1.dataset.sound;
            const sound2 = card2.dataset.sound;

            if (sound1 === sound2) {
                flippedCards = [];
                matchedPairs++;
                if (matchedPairs === 8) {
                    setTimeout(() => {
                        alert('Herzlichen Glückwunsch! Sie haben das Spiel gewonnen!');
                    }, 500);
                    localStorage.removeItem('gameStarted');
                }
            } else {
                setTimeout(() => {
                    card1.classList.remove('flip');
                    card2.classList.remove('flip');
                    flippedCards = [];
                }, 1000);
            }
        }

        function playSound(sound) {
            const audio = new Audio(sound);
            audio.play();
        }

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
    }
});

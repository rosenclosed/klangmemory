document.addEventListener('DOMContentLoaded', () => {
    const startRecordingButton = document.getElementById('start-recording');
    const stopRecordingButton = document.getElementById('stop-recording');
    const startGameButton = document.getElementById('start-game');
    const recordingsList = document.getElementById('recordings-list');
    const gameBoard = document.getElementById('game-board');
    const recordSection = document.getElementById('record-section');
    let mediaRecorder;
    let recordedChunks = [];
    let sounds = [];

    // Start recording
    startRecordingButton.addEventListener('click', async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        startRecordingButton.disabled = true;
        stopRecordingButton.disabled = false;

        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            sounds.push(audioUrl);
            const audioElement = document.createElement('audio');
            audioElement.src = audioUrl;
            audioElement.controls = true;
            recordingsList.appendChild(audioElement);
            recordedChunks = [];

            if (sounds.length === 8) {
                startRecordingButton.disabled = true;
                stopRecordingButton.disabled = true;
                startGameButton.disabled = false;
            } else {
                startRecordingButton.disabled = false;
            }
        };
    });

    // Stop recording
    stopRecordingButton.addEventListener('click', () => {
        mediaRecorder.stop();
        stopRecordingButton.disabled = true;
    });

    // Start game
    startGameButton.addEventListener('click', () => {
        recordSection.style.display = 'none';
        gameBoard.style.display = 'grid';
        initializeGame();
    });

    function initializeGame() {
        let cards = [];

        sounds.forEach((sound, index) => {
            cards.push({sound: sound, id: index});
            cards.push({sound: sound, id: index + 8});
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
                    <div class="card-back">${card.id}</div>
                </div>
            `;

            cardElement.addEventListener('click', () => {
                flipCard(cardElement);
            });

            gameBoard.appendChild(cardElement);
        });

        let flippedCards = [];

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

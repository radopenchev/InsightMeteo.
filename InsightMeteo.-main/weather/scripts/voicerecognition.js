const voiceButton = document.getElementById('voice-button');
voiceButton.addEventListener('click', startVoiceRecognition)
function startVoiceRecognition() {
    const recognition = new window.webkitSpeechRecognition(); 
    recognition.lang = 'en-US'; 

    recognition.start();

    recognition.addEventListener('result', (event) => {
        const voiceText = event.results[0][0].transcript; 
        handleVoiceInput(voiceText); 
    });

    recognition.addEventListener('error', (event) => {
        console.error('Voice recognition error:', event.error);
        alert('Error occurred during voice recognition. Please try again.');
    });
}

function handleVoiceInput(text) {
    const cityInput = document.getElementById('city');
    cityInput.value = text.trim(); 
}
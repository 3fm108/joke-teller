const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// VoiceRSS Javascript SDK

// Disable / Enable Button
function toggleButton(){
    button.disabled = !button.disabled;
}

//  passing joke to speech RSS



function tellMe(joke) {
    const jokeString = joke.trim().replace(/ /g, '%20');
    VoiceRSS.speech({
        key: '2c638c58716f4d2fa05d8dffe3a079a8',
        src: `The joke is ${jokeString}`,
        hl: 'en-us',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from Joke API

async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Dark?blacklistFlags=nsfw,religious,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }

        tellMe(joke);
        console.log(joke);
        // disable button
        toggleButton();
        } catch (error) {
        // Catch errors Here
    }
}

button.addEventListener('click', getJokes );
audioElement.addEventListener('ended', toggleButton);
    
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition(); //initialize my instance of speech recognition
recognition.interimResults = true; //this makes the speech recognition to work live. Otherwise you need to stop speak before it poulates the text
// recognition.lang = 'en-US';

//this is where your speech-to-text results will appear
let p = document.createElement('p'); //set variable and create it in DOM
const words = document.querySelector('.words-container'); //find the div in the DOM with class 'words' where words will be added
words.appendChild(p); //place the created p element in the div words

//If I do not have record button I can just add this line instead
//recognition.start();

const recordBtn = document.querySelector('#recordBtn');

// Adding event to click on record button
recordBtn.addEventListener('click', function() {
    function startRecording() {
        recognition.start();
        //why is this making the browser to add a new paragraph instead of overwriting the existing?
        recognition.addEventListener("end", recognition.start) //a line of code to make your recognition start listening again every time it’s done with the previous result!
        recordBtn.addEventListener("click", stopRecording)
    }
    function stopRecording() {
        recognition.removeEventListener("end", recognition.start)
        recognition.stop();
    }
    if(recordBtn.value == 'stop') {
        startRecording();
        recordBtn.value = 'start'
    } else {
        stopRecording();
        recordBtn.value = 'stop'
    }
});

//once speech recognition determines it has a "result", grab the texts of that result, join all of them, and add to paragraph
recognition.addEventListener('result', e => { //we listen for result and when we do we get an event e
    //console.log(e);
    const transcript = Array.from(e.results) //convert the results to an array
    .map(result => result[0]) //grab the first thing from the result and map over them
    .map(result => result.transcript) //map over it again and get the transcript
    .join('') //join the array togetehr to a string

    p.textContent = transcript;

    //console.log(transcript);

    //once speech recognition determines it has a final result, create a new paragraph and append it to the words-container
    //this way every time you add a new p to hold your speech-to-text every time you're finished with the previous results
    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }
});

//why is this making the browser to add a new paragraph instead of overwriting the existing?
//recognition.addEventListener('end', recognition.start); //when the function ends we want it to start again so that we get more paragraphs
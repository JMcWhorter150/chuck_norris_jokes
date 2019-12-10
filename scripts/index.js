// 1. go get that data
const jokeServerAddress = `https://api.chucknorris.io/jokes/random`;


// 2. Wait for it (a stream of data) to finish downloading and then convert it to a usable format.
// .then() waits
// function converToJson converts the response (ton of metadata) into just the json object that I care about

function convertToJson(response) {
    // console.log(response)
    return response.json();
}


// takes the text that I care about out of the object
function extractJoke(dataObject) {
    // console.log(dataObject)
    return dataObject.value;
    // return "knock knock, Chuck Norris";
}

// prints it!!!

// 3. console.log() it
function printJoke(str) {
    console.log(str);
}
// 4. Create DOM elements
function rendersJokeToPage(jokeString) {
    const h1 = document.createElement('h1');
    h1.textContent = jokeString;
    document.body.appendChild(h1);
}




function fetchJoke() {
    fetch(jokeServerAddress)
        // .then(convertToJson)
        .then(r => r.json()) // skinny-jeans version
        .then(extractJoke)
        // .then(printJoke)
        .then(rendersJokeToPage)
}
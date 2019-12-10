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
function rendersJokeToContainer(jokeString) {
    let jokeContainer = document.querySelector(".js-container")
    jokeContainer.textContent = "";
    const h1 = document.createElement('h1');
    h1.textContent = jokeString;
    jokeContainer.appendChild(h1);
}

function makeContainer() {
    jokeContainer = document.createElement("div");
    jokeContainer.className = "js-container";
    document.body.appendChild(jokeContainer)
}

function makeJokeButton() {
    let jokeButton = document.createElement("button");
    jokeButton.className = "js-jokeButton";
    jokeButton.textContent = "New Joke";
    document.body.appendChild(jokeButton);
    jokeButton.addEventListener("click", fetchJoke);
}

function fetchJoke() {
    fetch(jokeServerAddress)
        // .then(convertToJson)
        .then(r => r.json()) // skinny-jeans version
        .then(extractJoke)
        // .then(printJoke)
        .then(rendersJokeToContainer)
}

function main() {
    makeContainer();
    fetchJoke();
    makeJokeButton();
}

main();
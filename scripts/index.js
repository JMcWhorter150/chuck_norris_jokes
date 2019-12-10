// 1. go get that data



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
    // clearJokeContainer();
    const h1 = document.createElement('h1');
    h1.textContent = jokeString;
    jokeContainer.appendChild(h1);
}

function clearJokeContainer() {
    let jokeContainer = document.querySelector(".js-container")
    jokeContainer.textContent = "";
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
    jokeButton.addEventListener("click", whenJokeButtonClicked);
}

function makeMultipleJokeButton() {
    let jokeButton = document.createElement("button");
    jokeButton.className = "js-multipleJokeButton";
    jokeButton.textContent = "5 New Jokes";
    document.body.appendChild(jokeButton);
    jokeButton.addEventListener("click", whenMultipleJokeButtonClicked);
}

function whenJokeButtonClicked() {
    clearJokeContainer();
    fetchJoke();
}

function whenMultipleJokeButtonClicked() {
    clearJokeContainer();
    fetchMultipleJokes();
}

function fetchJoke() {
    let jokeServerAddress = `https://api.chucknorris.io/jokes/random`;
    let category = document.querySelector('h2');
    if (!!category) {
        let categoryName = category.textContent;
        jokeServerAddress = `https://api.chucknorris.io/jokes/random?category=${categoryName}`;
    }
    fetch(jokeServerAddress)
        // .then(convertToJson)
        .then(r => r.json()) // skinny-jeans version
        .then(extractJoke)
        .then(rendersJokeToContainer)
}

function fetchMultipleJokes() {
    fetchJoke();
    fetchJoke();
    fetchJoke();
    fetchJoke();
    fetchJoke();
}

function displayCategoryList() {
    createUL();
    let categoryAddress = "https://api.chucknorris.io/jokes/categories";
    fetch(categoryAddress)
        .then(convertToJson)
        .then(arr => arr.map(convertStringToLi))
        .then(arr => arr.map(addListListener))
        .then(arr => arr.map(appendToUL))
}

function createUL() {
    let ul = document.createElement("ul");
    document.body.appendChild(ul);
}

function convertStringToLi(string) {
    let li = document.createElement("li");
    li.textContent = string;
    return li;
}

function appendToUL(li) {
    let ul = document.querySelector("ul");
    ul.appendChild(li);
}

function addListListener(element) {
    element.addEventListener("click", categoryClick)
    return element
}

function categoryClick(event) {
    clearH2();
    clearJokeContainer();
    let categoryName = event.target.textContent;
    let ul = document.querySelector("ul");
    let h2 = document.createElement("h2");
    h2.textContent = categoryName;
    document.body.insertBefore(h2, ul);
}

function clearH2() {
    let h2 = document.querySelector('h2');
    // console.log(!!h2);
    if(h2) {
        document.body.removeChild(h2);
    }
}


function main() {
    displayCategoryList();
    makeContainer();
    // fetchJoke();
    // fetchMultipleJokes();
    makeJokeButton();
    makeMultipleJokeButton();

}

main();


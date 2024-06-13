/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

/** Make Markov Machine from text and generate text from it */

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

/** Take file and make text from it. */
function makeFileText(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        }
        else {
            generateText(data);
        }
    });
}

/** Take URL and make text from it. */
async function makeURLText(url) {
    let resp;
    try {
        resp = await axios.get(url);
    }
    catch (err) {
        console.error(`Cannot read file: ${path}: ${err}`);
        process.exit(1);
    }
    generateText(resp.data);
}

/** Interpret command line to decide what to do. */
let [method, path] = process.argv.slice(2);

if (method === "file") {
    makeFileText(path);
}
else if (method === "url") {
    makeURLText(path);
}
else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}
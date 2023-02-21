const { extract } = require('words-n-numbers');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


async function countWords(wikilink) {
    const wiki = require('wikipedia');
    await wiki.setLang('es');
    try {
        const page = await wiki.page(wikilink);
        console.log(`Url: ${page.fullurl}`);
        const content = await page.content();
        let tokenized = extract(content);
        let wordCounter = {};
        tokenized.forEach(token => {
            if (token in wordCounter) {
                wordCounter[token]++;
            } else {
                wordCounter[token] = 1;
            }
        });
        console.log("Cada palabra se repite estas veces:", wordCounter);
        console.log(`El artículo tiene un total de: ${tokenized.length} palabras`);
    } catch (error) {
        console.log(error);
    }
}

function main() {
    let wikilink = "";
    readline.question('¿Qué artículo quieres contar?\n', link => {
        console.log(`Contando palabras de: ${link}`);
        wikilink = link;
        readline.close();
        countWords(wikilink);
    });
}

main()
const { extract } = require('words-n-numbers');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


async function countWords(wikilink) {
    const wiki = require('wikipedia');

        try {
            const page = await wiki.page(wikilink);
            console.log(`Url: ${page.fullurl}`);
            const content = await page.content();
            let tokenized = extract(content);
            console.log(`El artículo tiene: ${tokenized.length} palabras`);
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
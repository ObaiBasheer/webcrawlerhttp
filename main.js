const {crawlPage} = require('./crawl.js')



function main() {
    if(process.argv.length < 3 ) {
        console.log("No Website Provided");
    }
    if(process.argv.length > 3 ) {
        console.log("Too many command..");
    }

    const baseUrl = process.argv[2];
    console.log(`starting crawl ${baseUrl}`);

    /* function fullfiled() {
        console.log(`successfully started`);
    }
    function rejected() {
        console.log(`reject`);

    }*/
    crawlPage(baseUrl);
}

main()
const {JSDOM} = require('jsdom');


function getUrlFromHtml(htmlBody, baseUrl) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const domNode = dom.window.document.querySelectorAll('a');

    for (const node of domNode) {
        if(node.href.slice(0,1) === '/') {
            //relative url
            urls.push(`${baseUrl}${node.href}`);
        }else {
            try {
                const urlObj = new URL(node.href);

                urls.push(urlObj.href);
            }catch(e){
                console.log(e.message);
            }
        }
    }
    return urls;

}


function normalizeUrl(urlStr) {
    const urlObj = new URL(urlStr);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

    if(hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return hostPath;

}

module.exports = {
    normalizeUrl,
    getUrlFromHtml
}
function dLS(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL

    document.body.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
} // dLS = dynamically Load script
dLS("./problems.js")
dLS("./components/variable.js")
dLS("./components/blank.js")
dLS("./components/hint.js")
dLS("./components/problem.js")
dLS("./components/problemset.js")
dLS("./index.js")

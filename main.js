$("#login-button").click(function (event) {
    event.preventDefault();

    let actor = document.getElementById("actor").value;
    let sentence = document.getElementById("sentence").value;
    let toSend = {
        user: {
            username: actor
        }, sentence
    };
    console.log({ toSend });
    postData('https://neo4jstg.edvantalabs.com/boosted/api/entity-collector', toSend)
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
        });
    $('form').fadeOut(500);
    $('.wrapper').addClass('form-success');

});
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript 
}





function renderPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
        var contentDiv = document.getElementById('main-content');
        contentDiv.innerHTML = data;
    })
        .catch(error => {
        console.error('Error loading page:', error);
    });
}
export function changeRoute(path) {
    switch (path) {
        case '/':
            console.log('here Iam');
            renderPage('../../src/templates/login.html');
            break;
        case '/register':
            renderPage('../../src/templates/register.html');
            break;
        case '/login':
            renderPage('../../src/templates/login.html');
            break;
        case '/dashboard':
            renderPage('../../src/templates/dashboard.html');
            break;
        default:
            renderPage('../../src/templates/login.html');
            break;
    }
}

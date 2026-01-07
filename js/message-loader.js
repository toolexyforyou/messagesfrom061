(function(){
    const contentContainer = document.getElementById('message-content');
    if(!contentContainer) return;

    const current = window.location.pathname.split('/').pop();
    const markdownPath = '../messages/' + current.replace('.html','.md');

    fetch(markdownPath)
        .then(response => response.text())
        .then(md => {
            contentContainer.innerHTML = marked.parse(md);
        })
        .catch(err => {
            contentContainer.innerHTML = '<p>Could not load message.</p>';
            console.error(err);
        });
})();

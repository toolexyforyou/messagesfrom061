(function() {
    const params = new URLSearchParams(window.location.search);
    const file = params.get('file');
    if (!file) return;
    const contentContainer = document.getElementById('message-content');
    const titleContainer = document.getElementById('message-title');
    const markdownPath = 'messages/' + file;
    fetch(markdownPath)
        .then(res => res.text())
        .then(md => {
            const lines = md.split('\n');
            let titleLineIndex = lines.findIndex(l => l.trim().startsWith('# '));
            let titleText = '';

            if (titleLineIndex >= 0) {
                titleText = lines[titleLineIndex].replace(/^#\s*/, '');
                lines.splice(titleLineIndex, 1); // remove title line from content
            } else {
                titleText = file.replace('.md', '');
            }

            titleContainer.textContent = titleText;
            contentContainer.innerHTML = marked.parse(lines.join('\n'));
        })
        .catch(err => {
            contentContainer.innerHTML = '<p>Could not load message.</p>';
            console.error(err);
        });
})();

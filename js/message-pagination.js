(function() {
    const messages = [
        "cookie-cutter.md",
        "drunk-dial.md",
        "eyes-wide-shut.md",
        "not-guilty.md",
        "russian-roulette.md",
        "strawberry-daiquiri.md",
        "the-last-bite.md"
    ];
    const params = new URLSearchParams(window.location.search);
    const currentFile = params.get("file");
    const index = messages.indexOf(currentFile);
    const titleContainer = document.getElementById("message-title");
    const contentContainer = document.getElementById("message-content");
    const paginationContainer = document.getElementById("message-pagination");
    if (!currentFile) return;
    const markdownPath = "messages/" + currentFile;
    fetch(markdownPath)
        .then(res => res.text())
        .then(md => {
            const lines = md.split("\n");
            let titleLineIndex = lines.findIndex(l => l.trim().startsWith("# "));
            let titleText = "";
            if (titleLineIndex >= 0) {
                titleText = lines[titleLineIndex].replace(/^#\s*/, "");
                lines.splice(titleLineIndex, 1);
            } else {
                titleText = currentFile.replace(".md", "");
            }

            titleContainer.textContent = titleText;
            contentContainer.innerHTML = marked.parse(lines.join("\n"));
        })
        .catch(err => {
            contentContainer.innerHTML = "<p>Could not load message.</p>";
        });
    if (paginationContainer && index >= 0) {
        paginationContainer.innerHTML =
            (index > 0
                ? `<a href="message.html?file=${messages[index - 1]}">← Previous</a>`
                : `<span style="opacity:0.5;">← Previous</span>`)
            + `<span style="margin:0 12px;">|</span>` +
            (index < messages.length - 1
                ? `<a href="message.html?file=${messages[index + 1]}">Next →</a>`
                : `<span style="opacity:0.5;">Next →</span>`);
    }
    const shareBtn = document.getElementById("share-btn");
    if (shareBtn) {
        shareBtn.addEventListener("click", async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: titleContainer?.textContent || "Message",
                        text: "Check out this message from Messages from 061.",
                        url: window.location.href
                    });
                } catch {}
            } else {
                alert("Copy this URL:\n" + window.location.href);
            }
        });
    }
    document.addEventListener("keydown", e => {
        if (index < 0) return;
        if (e.key === "ArrowLeft" && index > 0) {
            window.location.href = `message.html?file=${messages[index - 1]}`;
        }
        if (e.key === "ArrowRight" && index < messages.length - 1) {
            window.location.href = `message.html?file=${messages[index + 1]}`;
        }
    });
})();
  

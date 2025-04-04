document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("./data/data.yaml");
        const projects = await response.text();
        renderArticle(YAML.parse(projects))
    } catch (error) {
        console.error("Error loading projects:", error);
    }
});

async function renderArticle(projects) {
    const data = await fetch("./template/article.html")
    const text = await data.text()
    let dom = new DOMParser().parseFromString(text, "text/html")
    projects.forEach(element => {
        let article = dom.querySelector("article").cloneNode(true)
        article.querySelector("a").href = element.url
        article.querySelector("img").src = `./data/img/${element.slug}.jpg`
        article.querySelector("h2").innerText = element.name
        article.querySelector("h3").innerText = element.date
        article.querySelector("p").innerText = element.description

        document.querySelector("main").appendChild(article)
    })
}
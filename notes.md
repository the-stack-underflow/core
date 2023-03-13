# How to get a list of all Stack Exchange sites.

1. Navigate to https://stackexchange.com/sites?view=grid
2. Open the Developer Tools panel
3. Enter the following code:

```js
let allSites = Array.from(document.querySelectorAll(".gv-item"));
let result = [];

allSites.forEach(site => {
    const logo = site.querySelector("img").getAttribute("src");
    const title = site.querySelector(".gv-expanded-site-name").innerText;
    const description = site.querySelector(".gv-expanded-site-description").innerText;
    const link = site.querySelector("a").getAttribute("href")

    result.push({logo, title, description, link})
})

console.log(JSON.stringify(result))
```
4. Copy and run with it!
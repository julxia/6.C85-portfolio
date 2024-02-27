console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}


let pages = [
    {url: "", title: "Home"},
    {url: "projects/", title: "Projects"},
    {url: "contact/", title: "Contact"},
    {url: "resume/", title: "Resume"},
    {url: "https://www.github.com/julxia", title:"GitHub"}
];

let nav = document.createElement("nav");
document.body.prepend(nav);

for (let p of pages) {
    const ARE_WE_HOME = document.documentElement.classList.contains("home");
    let {url, title} = p;
    url = !ARE_WE_HOME && !url.startsWith("http") ? "../" + url : url;
    
    // nav.insertAdjacentHTML("beforeend", `<a href="${ url }">${ title }</a>` );
    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;
    
    // if (a.host === location.host && a.pathname === location.pathname) {
    //     a.classList.add("current");
    // }
    a.classList.toggle("current", a.host === location.host && a.pathname === location.pathname);
    
    if (a.host !== location.host) {
        a.setAttribute("target", "_blank");
    }
    
    nav.append(a);
}
document.documentElement.style.setProperty("color-scheme", localStorage.colorScheme ?? ( matchMedia("(prefers-color-scheme: dark)").matches ? "dark":"light") );

document.body.insertAdjacentHTML("afterbegin", `
<p style="position:absolute; top: 0.2rem; right: 4.2rem; font-size: 90%">Theme:</p>
<label style="position:absolute; top: 1rem; right: 1rem" class="color-scheme-switch">
    <input type="checkbox" ${(localStorage.colorScheme && localStorage.colorScheme === "dark") || (!localStorage.colorScheme && matchMedia("(prefers-color-scheme: dark)").matches) ? 'checked' : ''}>
    <span class="slider round"/>
</label>`
);

const select = document.querySelector(".color-scheme-switch input")

select.addEventListener("input", function (e) {
    const mode = e.target.checked ? "dark" : "light"
	document.documentElement.style.setProperty("color-scheme", mode );
    localStorage.colorScheme = mode;
});

const form = document.querySelector("form")
form?.addEventListener("submit", function (e) {
    e.preventDefault();
    let data = new FormData(e.target);
    let url = form.action + "?";
    for (let [name, value] of data) {
        // TODO build URL parameters here
        url = url.concat(encodeURIComponent(name), "=", encodeURIComponent(value), "&")
    }
    location.href = url.substring(0, url.length - 1);
});

// let navLinks = $$("nav a")
// let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname)
// currentLink?.classList.add("current");


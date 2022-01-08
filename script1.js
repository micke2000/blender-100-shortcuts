let dane;
let allText;
const nav = document.querySelector("div.wrap div.nav");
const skroty = document.querySelector("div.wrap div.skroty");
let tabSkroty;
let buttony;

function categoriesLoad(){
    dane=JSON.parse(allText);
    const categories = dane.reduce(function (values, item) {
        item.tags.forEach(function (tag) {
            tag = tag.replace(" ","");
            if (!values.includes(tag)) {
                values.push(tag);
            }
        });
        return values;
    }, ["ogolne"]);
    console.log(categories);
    const categoryButtons = categories.map(function (category) {
        return `<button class="${category}">${category}</button>`;
    }).join("");
    nav.innerHTML = categoryButtons;
    buttony = document.querySelectorAll("button");
}
function readTextFile(file)
{
    file = "dane.txt"
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
}
function dodawanie(){
    dane.forEach(function(skrot){
        let addedEl = skroty.children[0].cloneNode(true);
        addedEl.children[0].textContent = skrot.h1;
        addedEl.children[1].style.backgroundImage = skrot.gif;
        addedEl.children[2].textContent = skrot.p;
        addedEl.classList.add(skrot.tags[0]);
        addedEl.classList.add(skrot.tags[1].replace(" ",""));
        skroty.appendChild(addedEl);
    });
    tabSkroty = document.querySelectorAll("div.skrot");
    buttony.forEach(function(butt){
        butt.addEventListener("click",function(){
           tabSkroty.forEach(function(skrot){
                if(skrot.classList.contains(butt.classList[0])){
                    skrot.style.display = "block";
                }
                else{
                    skrot.style.display = "none";
                }
           });  
           buttony.forEach(function(but){
            if(but.classList.contains("aktywny")){
                but.classList.remove("aktywny");
            }
        });   
        butt.classList.add("aktywny");
        });
    });
}
const buttonNocny = document.querySelector("div.nocny");
buttonNocny.addEventListener("click",function(){
    if(!flagaNoc){
    document.documentElement.style
    .setProperty('--primaryColor', 'rgb(44, 44, 44)');
    document.documentElement.style
    .setProperty('--secondaryColor', 'rgb(255, 255, 255)');
    document.documentElement.style
    .setProperty('--shadow', 'rgb(104, 104, 104)');
    flagaNoc=true;
    }
    else{
        document.documentElement.style
        .setProperty('--primaryColor', 'rgb(255, 255, 255)');
        document.documentElement.style
        .setProperty('--secondaryColor', 'rgb(44, 44, 44)');
        
        document.documentElement.style
        .setProperty('--shadow', 'rgb(207, 207, 207)');
        flagaNoc=false;
    }
});
flagaNoc = false;
readTextFile();
categoriesLoad();
dodawanie();
skroty.children[0].classList.add("ogolne");


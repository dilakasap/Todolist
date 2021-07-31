var form1 = document.querySelector("form");
var txt = document.getElementById("txt");
var deleteall = document.getElementById("delete");
var liste = document.getElementById("list");
form1.addEventListener("submit", addList);
liste.addEventListener("click", deleteItem);
deleteall.addEventListener("click", deleteAll);
window.onload = prepareList;


function prepareList(e) {
    var items = localStorage.getItem("items");
    if (items) {
        items = JSON.parse(items);
        for (let index = 0; index < items.length; index++) {
            const value = items[index];
            var li = document.createElement("li");
            li.className = "list-group-item list-group-item-secondary";
            li.appendChild(document.createTextNode(value));
            const a = document.createElement("a");
            a.classList = "delete-item float-right";
            a.setAttribute("href", "#");
            a.innerHTML = "x";
            li.appendChild(a);
            liste.appendChild(li);

        }
    }
}

function addList(e) {
    var li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(txt.value));
    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = "x";
    e.preventDefault();
    li.appendChild(a);
    liste.appendChild(li);
    var items = localStorage.getItem("items");
    if (items == null) {
        items = [];
    }
    else {
        items = JSON.parse(items);
    }
    items.push(txt.value);
    localStorage.setItem("items", JSON.stringify(items));
    txt.value = "";

}


function deleteItem(e) {
    var items = JSON.parse(localStorage.getItem("items"));
    var dizi = [];
    console.log(e.target.parentElement.textContent);
    if (items) {

        if (e.target.innerHTML == "x") {
            e.target.parentElement.remove();
        }
        for (let index = 0; index < items.length; index++) {
            dizi[index] = items[index];
            dizi[index] = dizi[index] + "x";
            if (e.target.parentElement.textContent == dizi[index]) {
                items.splice(index, 1);
            }

        }
        localStorage.setItem("items", JSON.stringify(items));
    }
    e.preventDefault();

}

function deleteAll(e) {
    if (confirm("are you sure?")) {
        liste.innerHTML = "";
        localStorage.removeItem("items");
    }
    e.preventDefault();
}
function add(){
    let inpuname = document.getElementById("inpuname").value;
    let inpudesc = document.getElementById("inpudesc").value;

    if(inpuname == ""){
        alert("Você não deu um nome pra sua tarefa!")
        return;
    }

    const objtarefa = {nome: inpuname, desc: inpudesc, feito: false};
    const myJSONAQUI = (localStorage.getItem("Sibella"));
    
    if (myJSONAQUI == null){
        alert("Ainda não tem tarefas salvas");

        const array = [objtarefa];
        localStorage.setItem("Sibella", JSON.stringify(array));
    } else{
        const array = JSON.parse(myJSONAQUI);
        array.push(objtarefa);
        
        localStorage.setItem("Sibella", JSON.stringify(array));
    }

    tarefa()
}

function tarefa(){
    let inpuname = document.getElementById("inpuname").value;
    let inpudesc = document.getElementById("inpudesc").value;
    const tarefa = document.createElement("div");
    const name = document.createElement("h3");
    const desc = document.createElement("p");
    const confirm = document.createElement("button");
    const imgconfirm = document.createElement("img");
    const dell = document.createElement("button");
    const imgdell = document.createElement("img");
    const starefa = tarefa.classList;

    tarefa.setAttribute("data-nome", inpuname);
    tarefa.setAttribute("data-desc", inpudesc);

    imgdell.src = "img/delete.png";
    imgconfirm.src = "img/check.png";

    confirm.className = "Hello";
    dell.className = "Hello";
    tarefa.className = "tarefa";

    starefa.add("myStyle");

    name.innerText = inpuname;
    desc.innerText = inpudesc;

    document.getElementById("container").appendChild(tarefa);

    confirm.appendChild(imgconfirm);
    dell.appendChild(imgdell);
    tarefa.appendChild(name);
    tarefa.appendChild(desc);
    tarefa.appendChild(confirm);
    tarefa.appendChild(dell);

    confirm.onclick = feito;

    function feito(){
        const nome = tarefa.getAttribute("data-nome");
        const desc = tarefa.getAttribute("data-desc");
        tarefa.style.backgroundColor = "green";

        let arrayAtual = JSON.parse(localStorage.getItem("Sibella"));
        const index = arrayAtual.findIndex(t => t.nome === nome && t.desc === desc);
        if (index !== -1) {
        arrayAtual[index].feito = true;
        localStorage.setItem("Sibella", JSON.stringify(arrayAtual));
     }
    }

    dell.onclick = function () {
        tarefa.remove();
        const nome = tarefa.getAttribute("data-nome");
        const desc = tarefa.getAttribute("data-desc");
    
        let arrayAtual = JSON.parse(localStorage.getItem("Sibella"));
    
        const index = arrayAtual.findIndex(t => t.nome === nome && t.desc === desc);
    
        if (index !== -1) {
            arrayAtual.splice(index, 1);
            localStorage.setItem("Sibella", JSON.stringify(arrayAtual));
        }
    }
}

window.onload = function(){
    const JSONSibella = localStorage.getItem("Sibella");

    if (JSONSibella == null){
        return;
    } else{
        const SibellaJS = JSON.parse(localStorage.getItem("Sibella"));

        SibellaJS.forEach(function(tarefa, i, lista){
            const div = document.createElement("div");
            const nome = document.createElement("h3");
            const desc = document.createElement("p");
            const confirm = document.createElement("button");
            const confirmimg = document.createElement("img");
            const dell = document.createElement("button");
            const dellimg = document.createElement("img");
            const divs = div.classList;

            confirmimg.src = ("img/check.png");
            confirm.className = ("Hello");

            dellimg.src = ("img/delete.png");
            dell.className = ("Hello");

            confirm.appendChild(confirmimg);
            dell.appendChild(dellimg);

            divs.add("myStyle");
            nome.innerText = tarefa["nome"];
            desc.innerText = tarefa["desc"];

            document.getElementById("container").appendChild(div);
            div.appendChild(nome);
            div.appendChild(desc);
            div.appendChild(confirm);
            div.appendChild(dell);

            if(tarefa.feito === true){
                div.style.backgroundColor = "green";
            }

            confirm.onclick = feito;

    function feito(){
        div.style.backgroundColor = "green";
        tarefa.feito = true;

        let arrayAtual = JSON.parse(localStorage.getItem("Sibella"));
        const index = arrayAtual.findIndex(t => t.nome === tarefa.nome && t.desc === tarefa.desc);
        if (index !== -1) {
        arrayAtual[index].feito = true;
        localStorage.setItem("Sibella", JSON.stringify(arrayAtual));
    }
    }

            dell.onclick = function () {
            div.remove();
    
        let arrayAtual = JSON.parse(localStorage.getItem("Sibella"));
    
        const index = arrayAtual.findIndex(t => t.nome === tarefa.nome && t.desc === tarefa.desc);
    
        if (index !== -1) {
            arrayAtual.splice(index, 1);
            localStorage.setItem("Sibella", JSON.stringify(arrayAtual));
        }
    }

        })
    }
}
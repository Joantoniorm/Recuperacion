fetch("arbol.json").then(response => {
    if(!response.ok){
        throw new Error("no llegó");
    }
    return response.json();
}).then(json => {
    
    let contenedor = document.getElementById("contenedor");
    json.forEach(comunidad => {
        let details = document.createElement("details");
        let summary = document.createElement("summary");
        let contador = 0;
        let ul = document.createElement("ul");

        comunidad.provinces.forEach(provincia =>{
            let li = document.createElement("li");
            let details2 = document.createElement("details");
            let summary2 = document.createElement("summary");
            let ul2 = document.createElement("ul");
            let contador2 = 0;

            provincia.towns.forEach(pueblo =>{
                let li2 = document.createElement("li");
                li2.innerHTML = pueblo.label;
                ul2.appendChild(li2);
                contador2++;
            })

            summary2.innerHTML =  provincia.label  + ` (${contador2})`;
            details2.appendChild(summary2);
            details2.appendChild(ul2);
            li.appendChild(details2);
            ul.appendChild(li);
            contador++;
        })

        summary.innerHTML = comunidad.label + ` (${contador})`;
        details.appendChild(summary);
        details.appendChild(ul);
        contenedor.appendChild(details);
    });

}).catch(error => {
    console.error("el json falla", error);
})
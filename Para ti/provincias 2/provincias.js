fetch("arbol.json").then(response => {
    if (!response.ok) {
        throw new Error("No se pudo obtener el archivo JSON");
    }

    return response.json();
}).then(json => {
    let contenedor = document.getElementById("contenedor");

    json.forEach(comunidad => {
        let details = document.createElement("details");
        let summary = document.createElement("summary");
        let ul = document.createElement("ul");

        let contenidoOriginal = [];

        comunidad.provinces.slice(0, 4).forEach(provincia => {
            let liProvincia = document.createElement("li");
            let details2 = document.createElement("details");
            let summary2 = document.createElement("summary");
            let ul2 = document.createElement("ul");

            provincia.towns.slice(0, 4).forEach(pueblo => {
                let liPueblo = document.createElement("li");
                liPueblo.innerHTML = pueblo.label;
                ul2.appendChild(liPueblo);
            });

            summary2.innerHTML = provincia.label + ` (${provincia.towns.length})`;
            details2.appendChild(summary2);
            details2.appendChild(ul2);
            liProvincia.appendChild(details2);

            // Botón para expandir la lista de pueblos
            let liBotonPueblos = document.createElement("li");
            let btnExpandirPueblos = document.createElement("button");
            btnExpandirPueblos.innerHTML = "Ver todos los pueblos";
            btnExpandirPueblos.addEventListener("click", function () {
                ul2.innerHTML = "";
                provincia.towns.forEach(pueblo => {
                    let liPueblo = document.createElement("li");
                    liPueblo.innerHTML = pueblo.label;
                    ul2.appendChild(liPueblo);
                });
                liBotonPueblos.style.display = "none";
            });
            liBotonPueblos.appendChild(btnExpandirPueblos);
            ul2.appendChild(liBotonPueblos);

            ul.appendChild(liProvincia);
            contenidoOriginal.push(liProvincia);
        });

        summary.innerHTML = comunidad.label + ` (${comunidad.provinces.length})`;
        details.appendChild(summary);
        details.appendChild(ul);
        contenedor.appendChild(details);

        if (comunidad.provinces.length > 4) {
            let liMostrarMasProvincias = document.createElement("li");
            liMostrarMasProvincias.innerHTML = "Mostrar todas las provincias";
            liMostrarMasProvincias.classList.add("mostrar-mas");
            let mostrarTodasLasProvincias = function () {
                ul.innerHTML = ""; // Limpiar la lista
                comunidad.provinces.forEach(provincia => {
                    let li = document.createElement("li");
                    let details2 = document.createElement("details");
                    let summary2 = document.createElement("summary");
                    let ul2 = document.createElement("ul");
            
                    provincia.towns.slice(0, 4).forEach(pueblo => {
                        let li2 = document.createElement("li");
                        li2.innerHTML = pueblo.label;
                        ul2.appendChild(li2);
                    });
            
                    // Botón para expandir la lista de pueblos
                    let liBotonPueblos = document.createElement("li");
                    let btnExpandirPueblos = document.createElement("button");
                    btnExpandirPueblos.innerHTML = "Ver todos los pueblos";
                    btnExpandirPueblos.addEventListener("click", function () {
                        ul2.innerHTML = "";
                        provincia.towns.forEach(pueblo => {
                            let li2 = document.createElement("li");
                            li2.innerHTML = pueblo.label;
                            ul2.appendChild(li2);
                        });
                        liBotonPueblos.style.display = "none";
                    });
                    liBotonPueblos.appendChild(btnExpandirPueblos);
                    ul2.appendChild(liBotonPueblos);
            
                    summary2.innerHTML = provincia.label + ` (${provincia.towns.length})`;
                    details2.appendChild(summary2);
                    details2.appendChild(ul2);
                    li.appendChild(details2);
            
                    ul.appendChild(li);
                });
                liMostrarMasProvincias.style.display = "none"; 
            };
            
            liMostrarMasProvincias.addEventListener("click", mostrarTodasLasProvincias);
            ul.appendChild(liMostrarMasProvincias);

            details.addEventListener("toggle", function () {
                if (!this.open) {
                    ul.innerHTML = "";
                    contenidoOriginal.slice(0, 4).forEach(li => {
                        ul.appendChild(li);
                    });
                    liMostrarMasProvincias.style.display = "list-item";
                    ul.appendChild(liMostrarMasProvincias);
                }
            });
        }
    });
}).catch(error => {
    console.error("Error al procesar el JSON", error);
});

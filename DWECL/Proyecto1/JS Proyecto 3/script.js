document.addEventListener("DOMContentLoaded", async function () {
    async function getData(url) {
        return fetch(url)
            .then(res => res.json())
            .catch(err => err = "error");
    }

    let comms = await getData("arbol.json");

    let string = "";
    
    for (const comm of comms) {
        string += `<details style= "color:red"><summary>
                ${comm.label} - ${comm.provinces.length}
                </summary>`;
        
        // Ordenar las provincias alfabéticamente por defecto
        comm.provinces.sort((a, b) => a.label.localeCompare(b.label));

        for (const province of comm.provinces) {
            string += `<details style= "color:blue"><summary>
                        ${province.label} - ${province.towns.length}
                        </summary>`;
            
            // Ordenar los pueblos alfabéticamente por defecto
            province.towns.sort((a, b) => a.label.localeCompare(b.label));

            for (const town of province.towns) {
                string += `<summary style= "color:green">${town.label}</summary>`;
            }
            string += `</details>`;
        }
        string += `</details>`;
    }
    
    let summary = document.querySelector("#comunities");
    summary.innerHTML = string;

    // Función para ordenar las provincias por número de ciudades de forma ascendente
    function sortByCityCountAsc() {
        comms.forEach(comm => {
            comm.provinces.sort((a, b) => a.towns.length - b.towns.length);
        });
        let string = "";
    
        for (const comm of comms) {
            string += `<details style= "color:red"><summary>
                    ${comm.label} - ${comm.provinces.length}
                    </summary>`;
            
            for (const province of comm.provinces) {
                string += `<details style= "color:blue"><summary>
                            ${province.label} - ${province.towns.length}
                            </summary>`;
                
                province.towns.sort((a, b) => a.label.localeCompare(b.label));

                for (const town of province.towns) {
                    string += `<summary style= "color:green">${town.label}</summary>`;
                }
                string += `</details>`;
            }
            string += `</details>`;
        }
        
        summary.innerHTML = sortedString;
    }

    // Función para ordenar las provincias por número de ciudades de forma descendente
    function sortByCityCountDesc() {
        comms.forEach(comm => {
            comm.provinces.sort((a, b) => b.towns.length - a.towns.length);
        });

        let string = "";
    
        for (const comm of comms) {
            string += `<details style= "color:red"><summary>
                    ${comm.label} - ${comm.provinces.length}
                    </summary>`;
            
            for (const province of comm.provinces) {
               string += `<details style= "color:blue"><summary>
                            ${province.label} - ${province.towns.length}
                            </summary>`;
                
                province.towns.sort((a, b) => a.label.localeCompare(b.label));

                for (const town of province.towns) {
                    string += `<summary style= "color:green">${town.label}</summary>`;
                }
                string += `</details>`;
            }
            string += `</details>`;
        }
        
        summary.innerHTML = string;
    }

   
    document.getElementById("sortAscButton").addEventListener("click", sortByCityCountAsc);
    document.getElementById("sortDescButton").addEventListener("click", sortByCityCountDesc);
});

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
        
      
        comm.provinces.sort((a, b) => a.label.localeCompare(b.label));

        for (const province of comm.provinces) {
            string += `<details style= "color:blue"><summary>
                        ${province.label} - ${province.towns.length}
                        </summary>`;
            
           
            province.towns.sort((a, b) => a.label.localeCompare(b.label));


            //Aqui consigo hacer que vean solo los 3 primeros 
            let townsToShow = province.towns.slice(0, 3);
            let townsToHide = province.towns.slice(3);

            for (const town of townsToShow) {
                string += `<summary style= "color:green">${town.label}</summary>`;
            }

            if (townsToHide.length > 0) {
                string += `<button class="showMore">Ver más</button>`;
                for (const town of townsToHide) {

                    //los añados pero con display none. El resto esta en el evento que le doy al summary
                    string += `<summary style= "color:green; display:none;">${town.label}</summary>`;
                }
            }

            string += `</details>`;
        }
        string += `</details>`;
    }
    
    let summary = document.querySelector("#comunities");
    summary.innerHTML = string;

    // Ver más
    summary.addEventListener("click", function (event) {
        if (event.target.classList.contains("showMore")) {
            let summaryDetails = event.target.parentNode;
            let allSummaries = summaryDetails.querySelectorAll("summary");

            //Cambio el display a block de todos los hijos del parentnode
            allSummaries.forEach(summary => summary.style.display = "block");
            event.target.style.display = "none";
        }
    });

    
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
        
        summary.innerHTML = string;
    }


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

let pintar = document.querySelector("#resultado").innerHTML;
document.querySelector(".container").addEventListener("click",(event)=>{
    let objetivo = event.target;
    let body = document.querySelector("body");
    /*aqui tienes dos opciones, o le metes if hasta llegar al padre que tiene la clase caja o el addeventlistener se lo metes solo a la clase padre, sin delegacion de eventos*/
    let encontrado = true;
    while(objetivo != body && encontrado){
        
        if(objetivo.className.includes("caja")){
            encontrado = false;
        }else{
           objetivo = objetivo.parentElement; 
        }
    }
    let pintarDeVerdad = document.querySelector("#resultado");
    pintarDeVerdad.innerHTML = pintar + objetivo.id;
}); 
const createForm = (parentElement) => {
    const data = ["Data","Singola","Doppia","Suite"];

    return {
        render: () => {
            parentElement.innerHtml =
            data.map((e) => `<div>${e}<input id="${e}" type="text" /></div>`)
            .join("") + "<button type='button' id='submit'>Invia</button>";      

            document.getElementById("submit").onclick = () =>{
                const data = document.getElementById("Data").value;
                const singola = document.getElementById("Singola").value;
                const doppia = document.getElementById("Doppia").value;
                const suite = document.getElementById("Suite").value;
            }
            if(data&&singola&&doppia&&suite){
                lista.push({
                    "Data":data,
                    "Singola":singola,
                    "Doppia":doppia,
                    "Suite":suite,
                });
                salva();     //fetch
            }
            carica();
        }
    }
}

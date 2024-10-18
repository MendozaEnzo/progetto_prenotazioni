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

const salva = () => {
    render();
  };
  
  const carica = () => {
    render();
  };
  
  const display = (parentElement, data) => {
    let html =
      '<table><tr><th>Data</th><th>Singola</th><th>Doppia</th><th>Suite</th></tr>';
    data.forEach((e) => {
      html += `<tr><td>${e.Data}</td><td>${e.Singola}</td><td>${e.Doppia}</td><td>${e.Suite}</td></tr>`;
    });
    html += '</table>';
    parentElement.innerHTML = html;
  };
  
  function render() {
    const dataContainer = document.getElementById('data-container');
    display(dataContainer, lista);
  }
  
  const formContainer = document.getElementById('form-container');
  const form = cForm(formContainer);
  form.render();
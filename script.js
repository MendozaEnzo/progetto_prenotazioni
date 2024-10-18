const myToken = '12891abd-4716-4766-922b-6e46eba36b4c';
const myKey = 'prenotazioni';

let lista = []; 

const cForm = (parentElement) => {
    const data = ['Data', 'Singola', 'Doppia', 'Suite'];

    return {
        render: () => {
            parentElement.innerHTML =
                data
                    .map((e) => `<div>${e}<input id="${e}" type="text" /></div>`)
                    .join('') + "<button type='button' id='submit'>Invia</button>";

            document.getElementById('submit').onclick = () => {
                const data = document.getElementById('Data').value;
                const singola = document.getElementById('Singola').value;
                const doppia = document.getElementById('Doppia').value;
                const suite = document.getElementById('Suite').value;

                if (data && singola && doppia && suite) {
                    lista.push({
                        Data: data,
                        Singola: singola,
                        Doppia: doppia,
                        Suite: suite,
                    });
                    salva();
                } else {
                    console.log('Compila tutti i campi!');
                }
            };

            carica();
        },
    };
};

const salva = () => {
    render();
};

const carica = () => {
    render(); 
};

const display = (parentElement, data) => {
    let html =
        '<table><tr><th>Data</th><th>Singola</th><th>Doppia</th><th>Suite</th></tr>';
    data.forEach((entry) => {
        html += `<tr><td>${entry.Data}</td><td>${entry.Singola}</td><td>${entry.Doppia}</td><td>${entry.Suite}</td></tr>`;
    });
    html += '</table>';
    parentElement.innerHTML = html;
};

function render() {
    const dataContainer = document.getElementById('data-container');
    display(dataContainer, lista);
}

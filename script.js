const myToken = '12891abd-4716-4766-922b-6e46eba36b4c';
const myKey = 'prenotazioni';

let lista = [];
let diz = {};
const defa = { Singola: 10, Doppia: 5, Suite: 3 };

for (let i = 0; i < 30; i++) {
    let date = new Date();
    date.setDate(date.getDate() + i);
    let date_string = date.toISOString().split('T')[0];
    console.log(date_string);
    diz[date_string] = defa;
}

console.log(diz);

const cForm = (parentElement) => {
    const data = ['Data', 'Singola', 'Doppia', 'Suite'];

    return {
        render: () => {
            parentElement.innerHTML =
                data
                .map((e) => {
                    if (e === 'Data') {
                        return `<div>${e}<input id="${e}" type="date" /></div>`;
                    } else {
                        return `<div>${e}<input id="${e}" type="text" /></div>`;
                    }
                })
                .join('') + "<button type='button' id='submit'>Invia</button>";

            document.getElementById('submit').onclick = () => {
                const data = document.getElementById('Data').value;
                const singola = parseInt(document.getElementById('Singola').value, 10);
                const doppia = parseInt(document.getElementById('Doppia').value, 5);
                const suite = parseInt(document.getElementById('Suite').value, 3);

                if (data && !isNaN(singola) && !isNaN(doppia) && !isNaN(suite)) {
                    if (diz[data]) {
                        diz[data].Singola -= singola;
                        if (diz[data].Singola < 0) {
                            diz[data].Singola = 0;
                        }

                        diz[data].Doppia -= doppia;
                        if (diz[data].Doppia < 0) {
                            diz[data].Doppia = 0;
                        }

                        diz[data].Suite -= suite;
                        if (diz[data].Suite < 0) {
                            diz[data].Suite = 0;
                        }
                    }

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

            render();
        },
    };
};

const display = (parentElement, data) => {
    let html =
        '<table><tr><th>DATA</th><th>SINGOLA</th><th>DOPPIA</th><th>SUITE</th></tr>';
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
const formContainer = document.getElementById('form-container');
const form = cForm(formContainer);
form.render();
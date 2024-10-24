const myToken = '12891abd-4716-4766-922b-6e46eba36b4c';
const myKey = 'miramare';
const defa = { Singola: 10, Doppia: 5, Suite: 3 };
let diz = {};

//Carica e salva
function carica() { 
    return fetch('https://ws.cipiaceinfo.it/cache/get', {
            headers: {
                'Content-Type': 'application/json',
                key: myToken,
            },
            method: 'POST',
            body: JSON.stringify({
                key: myKey,
            }),
        })
        .then((r) => r.json())
        .then((r) => {
            console.log("Dati carica: " + r.result);
            diz = r.result;
        })
        .catch((err) => console.log('Errore durante il caricamento:', err));
}

function salva() {
    return fetch('https://ws.cipiaceinfo.it/cache/set', {
            headers: {
                'Content-Type': 'application/json',
                key: myToken,
            },
            method: 'POST',
            body: JSON.stringify({
                key: myKey,
                value: diz,
            }),
        })
        .then((r) => r.json())
        .then((r) => {
            console.log('Salvataggio completato:', r.result);
        })
        .catch((err) => console.log('Errore durante il salvataggio:', err));
}

carica().then(() => {
    console.log(diz)
    if (Object.keys(diz).length === 0 || (Object.keys(diz).length === 2 && diz.message && diz.key)) {
        console.log("Diz vuoto");
        delete diz.message; // cancella le due chiavi inutili 
        delete diz.key;
        for (let i = 0; i < 30; i++) { //stampa i 30 giorni seguenti usanda la libreria date
            let date = new Date();
            date.setDate(date.getDate() + i);
            let date_string = date.toISOString().split('T')[0];
            console.log(date_string);
            diz[date_string] = defa; // aggiunge la disponibilità predefinita
        }
    } else {
        console.log("Pieno");
        console.log(diz);
    }

    render();
})




//console.log(diz);
//componente form
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
                const singola = parseInt(document.getElementById('Singola').value);
                const doppia = parseInt(document.getElementById('Doppia').value);
                const suite = parseInt(document.getElementById('Suite').value);
                //controlli sulle quantità delle camere
                if (data && !isNaN(singola) && !isNaN(doppia) && !isNaN(suite)) {
                    if (!diz[data]) {
                        diz[data] = {
                            Singola: defa.Singola,
                            Doppia: defa.Doppia,
                            Suite: defa.Suite
                        };
                    }

                    let tempS = diz[data].Singola - singola;
                    let tempD = diz[data].Doppia - doppia;
                    let tempSu = diz[data].Suite - suite;

                    if (tempS >= 0 && tempD >= 0 && tempSu >= 0) {
                        diz[data].Singola = tempS;
                        diz[data].Doppia = tempD;
                        diz[data].Suite = tempSu;

                        salva().then(() => {
                            render();
                        });
                    } else {
                        console.log('Non ci sono abbastanza camere disponibili!');
                    }
                } else {
                    console.log('Compila tutti i campi!');
                }
            };

        },
    };
};
//componente tabella
const display = (parentElement, data) => {
    let html = '<table><tr><th>DATA</th><th>SINGOLA</th><th>DOPPIA</th><th>SUITE</th></tr>';
    Object.keys(data).forEach((date) => {
        const disponibilita = data[date];
        html += `<tr>
                        <td>${date}</td>
                        <td>${disponibilita.Singola}</td>
                        <td>${disponibilita.Doppia}</td>
                        <td>${disponibilita.Suite}</td>
                     </tr>`;

    });
    html += '</table>';
    parentElement.innerHTML = html;
};


function render() {
    const dataContainer = document.getElementById('data-container');
    display(dataContainer, diz);
}


const formContainer = document.getElementById('form-container');
const form = cForm(formContainer);
form.render();
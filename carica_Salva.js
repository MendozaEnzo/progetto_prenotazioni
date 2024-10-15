const myToken = '3e3bae0c-08f0-46e8-8bca-9f3cb6813514';
const myKey = '';

function carica() {
    return fetch('https://ws.progettimolinari.it/cache/get', {
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
            console.log(r.result);
            lista = r.result || {};
            render();
        })
        .catch((err) => console.log('Errore durante il caricamento:', err));
}

function salva() {
    return fetch('https://ws.progettimolinari.it/cache/set', {
        headers: {
            'Content-Type': 'application/json',
            key: myToken,
        },
        method: 'POST',
        body: JSON.stringify({
            key: myKey,
            value: lista,
        }),
    })
        .then((r) => r.json())
        .then((r) => {
            console.log('Salvataggio completato:', r.result);
            return carica();
        })
        .catch((err) => console.log('Errore durante il salvataggio:', err));
}
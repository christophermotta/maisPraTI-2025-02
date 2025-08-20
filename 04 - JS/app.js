const formAdicionar = document.getElementById('form-adicionar');
const inputItem = document.getElementById('input-item');
const listItems = document.getElementById('list-items');
const btnClear = document.getElementById('btn-clear');
const checkBtn = document.getElementById('btn-check');
const btnTodos = document.getElementById('todos');
const btnPendentes = document.getElementById('pendentes');
const btnComprados = document.getElementById('comprados');
const selectOrdenar = document.getElementById('ordenar');

let items = [];

window.addEventListener('DOMContentLoaded', () => {
    const data = localStorage.getItem('listaCompras');
    if (data) {
        items = JSON.parse(data);
        showList();
    }
});

function saveData() {
    localStorage.setItem('listaCompras', JSON.stringify(items));
};

function showList(itemsToShow) {
    itemsToShow = itemsToShow || items;
    listItems.innerHTML = '';

    itemsToShow.forEach((item, index) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = item.produto;

        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'X';
        btnRemover.title = 'Remover Item';

        btnRemover.addEventListener('click', () => {
            removerItem(index);
        });

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = 'btn-check';

        if (item.comprado) {
            checkBox.checked = true;
        } else {
            checkBox.checked = false;
        }

        checkBox.addEventListener('change', () => {
            itemComprado(index);
        });

        li.append(checkBox, span, btnRemover);
        listItems.appendChild(li);


    })
    const quantidade = document.getElementById('qtd-items');
    quantidade.textContent = itemsToShow.length;
};

formAdicionar.addEventListener('submit', (event) => {
    event.preventDefault();
    const newItem = inputItem.value.trim();
    if (!newItem) return

    items.push({ produto: newItem, comprado: false });
    saveData();
    showList();
    inputItem.value = '';
});

function removerItem(index) {
    items.splice(index, 1);
    saveData();
    showList();
};

function itemComprado(index) {
    if (items[index].comprado) {
        items[index].comprado = false;
    } else {
        items[index].comprado = true;
    }
    saveData();
    showList();
};

btnClear.addEventListener('click', () => {
    if (confirm('Deseja limpar toda lista?')) {
        items = [];
        saveData();
        showList();
    }
});

btnTodos.addEventListener('click', showList());

btnPendentes.addEventListener('click', () => {
    let pendentes = items.filter((items) => {
    return !items.comprado;
    })

    showList(pendentes);
});

btnComprados.addEventListener('click', () => {
    let comprados = items.filter((items) => {
    return items.comprado;
    })

    showList(comprados);
});

selectOrdenar.addEventListener('change', () => {
    switch (selectOrdenar.value){
        case 'alfabetico':
            items.sort((a, b) => a.produto.localeCompare(b.produto));
        break;

        case 'status1':
            items.sort((a, b) => a.comprado - b.comprado);
        break;
    }

    saveData();
    showList();
})
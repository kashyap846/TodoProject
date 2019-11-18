
function textIdSelectorFunction(event) {
    event.preventDefault();

    const textIdSelector = document.querySelector('#text-ID');
    const textvalue = textIdSelector.value.trim();

    if (textvalue.length > 0) {
        const randomID = (Date.now().toString(36).substr(2, 4) + performance.now().toString(36).replace('.','').substr(0, 4) + Math.random().toString(36).substr(3, 4)).toUpperCase();
        const tempContent = document.querySelector('#item-template');
        
        
        const itemContent = document.importNode(tempContent.content, true);
        const inputID = itemContent.querySelector('#select-ID');
        
        const idValue = `textIdSelector-select-${randomID}`;
        inputID.setAttribute('id', idValue);
        const labelValue = itemContent.querySelector('label[for]');
        labelValue.setAttribute('for', idValue);

        labelValue.textContent = textvalue;
        const listItems = document.querySelector('#list-items');

        const db = window.localStorage;
        const itemString = new XMLSerializer().serializeToString(itemContent);
        db.setItem(idValue, itemString);

        listItems.appendChild(itemContent);
    }

    textIdSelector.value = '';
}
function loadToDos() {
    const db = window.localStorage;
    Object.keys(db).forEach(addItem);
    
}
function addItem(item) {
    const db = window.localStorage;
    const list = document.querySelector('#list-items');
    const node = document.createRange().createContextualFragment(db.getItem(item));
    list.appendChild(node);
}
function bindFuncToButton() {
    let button = document.querySelector('#add-button');
    button.addEventListener('click', textIdSelectorFunction);
    loadToDos();
}


function show_img(checkbox){

    if (checkbox.checked){
        
        document.getElementById("smiley").setAttribute("style","display:inline");
}else{
    
    document.getElementById("smiley").setAttribute("style","display:none");
}
}


function checkBoxUpdate(cb) {
    if (cb.checked) {
        cb.setAttribute('checked', cb.checked);
    } else {
        cb.removeAttribute('checked');
    }
    const itemString = new XMLSerializer().serializeToString(cb.parentNode);
    const id = cb.id;
    window.localStorage.setItem(id, itemString);
}

bindFuncToButton();
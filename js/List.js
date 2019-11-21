
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

        const dataObj = window.localStorage;
        const itemString = new XMLSerializer().serializeToString(itemContent);
        dataObj.setItem(idValue, itemString);

        listItems.appendChild(itemContent);
    }

    textIdSelector.value = '';
}
function setContent() {
    const dataObj = window.localStorage;
    Object.keys(dataObj).forEach(addStoredItems);
    
}
function addStoredItems(item) {
    const dataObj = window.localStorage;
    const list = document.querySelector('#list-items');
    const node = document.createRange().createContextualFragment(dataObj.getItem(item));
    list.appendChild(node);
}
function linkFuncToButton() {
    let button = document.querySelector('#add-button');
    button.addEventListener('click', textIdSelectorFunction);
    setContent();
}





function checkBoxUpdate(checkbox) {
   
    if (checkbox.checked) {
        checkbox.setAttribute('checked', checkbox.checked);
       
        document.querySelector('#'+checkbox.id+'+label+img').setAttribute("style","display:inline");
       
    } else {
        checkbox.removeAttribute('checked');
        document.querySelector('#'+checkbox.id+'+label+img').setAttribute("style","display:none");
    }
    const itemString = new XMLSerializer().serializeToString(checkbox.parentNode);
    const checkBoxid = checkbox.id;
    window.localStorage.setItem(checkBoxid, itemString);
}

linkFuncToButton();
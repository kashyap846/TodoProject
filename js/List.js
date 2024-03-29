
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
        //'#'+idValue
       // let elem = document.querySelector('#'+idValue).parentElement;
        
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
    window.addEventListener('online', (event) => {
        //alert("You are now connected to the network.");
        //document.querySelector('header #displayMessage').innerHTML('<p>You are now connected to the network.</p>');
    
        document.getElementById("displayMessage").innerHTML = "<p style='color:red'>You are now connected to the network.</p>";
    });
    
    // ononline version
    // window.ononline = (event) => {
    //   alert("You are now connected to the network.");
    // };
    
    window.addEventListener('offline', (event) => {
        document.getElementById("displayMessage").innerHTML = "<p style='color:red'>Network connection is lost</p>";
        //document.querySelector('header #displayMessage').innerHTML('<p>Network connection is lost</p>')
    });
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

function deleteListItems(elem){
    elem.parentElement.classList.toggle('listDelete');
    elem.parentElement.addEventListener('animationend',listenerFunc);
    
    
}
function listenerFunc(event){
    //alert("animation is stopped");
    const key= this.querySelector("input[type=checkbox]").id;
    //alert("key"+key);
    const dataObj = window.localStorage;
    dataObj.removeItem(key);
    //alert(this.parentNode.id)
    const parent = this.parentElement;
    parent.removeChild(this);

    //this.remove();
    //const elem = document.querySelector(".list")
    
}

linkFuncToButton();
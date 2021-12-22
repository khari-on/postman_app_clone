console.log("project cloning post man");

let parameterBox = document.getElementById("parameterBox");
let jsonBox = document.getElementById("jsonBox");

// selecting parameter json or coustom perameter
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
    parameterBox.style.display = "none";
    jsonBox.style.display = "block";
});

let paramsRadio = document.getElementById("paramsRadio");
parameterBox.style.display = "none";
paramsRadio.addEventListener("click", () => {
    parameterBox.style.display = "block";
    jsonBox.style.display = "none";
});


let addcountParams = 0;
// adding more custom parameter
function add(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let addParams = document.getElementById("addParams");
addParams.addEventListener("click", () => {
    let params = document.getElementById("params");
    let string = `<div class="row my-2">
               <label for="urlField" class="col-sm-2 col-form-label">Parameter ${addcountParams + 2}</label>
               <div class="col-md-4">
                   <input type="text" class="form-control" id="parameterKey${addcountParams + 2}" placeholder="Enter parameterKey${addcountParams + 2}" >
               </div>
               <div class="col-md-4">
                   <input type="text" class="form-control" id="parameterValue${addcountParams + 2}" placeholder="Enter parameterValue${addcountParams + 2}" >
               </div>
               <button id="addParams" class="btn btn-primary deleteBtn col-sm-1">-</button>
           </div>
        `

    let paramsElm = add(string);
    params.appendChild(paramsElm);

    //deleteing the unwanted parameters
    let deleteParam = document.getElementsByClassName("deleteBtn");
    for (items of deleteParam) {
        items.addEventListener("click", (e) => {

            if (confirm("Do you really whant this parameter")) {
                e.target.parentElement.remove();
            }
            else {
                return false;
            };
        })
    }
    addcountParams++;
});


let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    let responseJsonText = document.getElementById("responseJsonText");
    responseJsonText.innerHTML = `we are fetching response.....Please wait for until Done`;


    let url = document.getElementById("urlField").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    if (contentType == "params") {
        data = {};
        for (let i = 0; i < addcountParams + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById("responseSend").value;
    }

    console.log('URL is ', url);
    console.log('requestType is ', requestType);
    console.log('contentType is ', contentType);
    console.log('data is ', data);

    if (requestType == 'get') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById("responseJsonText").value = text;
            });
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text;

            });
    }
});




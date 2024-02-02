const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://api.escuelajs.co/api/v1';

function fetchData(urlApi, callback){
    let xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlApi, true);

    xhttp.onreadystatechange = function (event){
        if(xhttp.readyState === 4){
            //0 no se ha inicializado
            //1 loading (no se ha ejecutado sent)
            //2 se ha ejecutado el sent
            //3 interactuando
            //4 completado
            if(xhttp.status === 200){
                callback(null, JSON.parse(xhttp.responseText))
            }else {
                const error = new Error('Error' + urlApi);
                return callback(error, null);
            } 
        }
    }

    xhttp.send();
}

fetchData(`${API}/products`,  function(error1, data1){
    if(error1) return console.error(error1);
    fetchData(`${API}/products/${data1[0].id}`, function(error2,data2){
        if(error2) return console.error(error2);
        fetchData(`${API}/categories/${data2?.category?.id}`, function(error3,data3){
            if (error3) return console.error(error3);
            console.log(data1[0]);
            console.log(data2.title);
            console.log(data3.name);
        });
    });
});

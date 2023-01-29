async function messageGet(id) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch("http://localhost:8000/api/messages/"+id, requestOptions)
        .catch(error => { 
            console.error("fetch error : ", error);
            return error 
        });

    const result = await response.json();
    return result;
}

export default messageGet;
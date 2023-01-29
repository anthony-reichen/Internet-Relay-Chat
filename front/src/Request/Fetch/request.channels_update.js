async function channelsUpdate(id, body) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"channel_name": body});

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch("http://localhost:8000/api/channels/" + id, requestOptions)
        .catch(error => {return error});
    
    const result = await response.json()
    return result
}

export default channelsUpdate;
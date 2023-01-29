async function channelsPost(channel_name) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ 
        "channel_name": channel_name,
        "messages": []
     });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch("http://localhost:8000/api/channels", requestOptions)
        .catch(error => { 
            console.error("fetch error : ", error);
            return error 
        });

    const result = await response.json();
    return result;
}

export default channelsPost;
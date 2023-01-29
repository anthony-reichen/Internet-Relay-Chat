async function channelsDelete(id) {
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch("http://localhost:8000/api/channels/" + id, requestOptions)
        .then(response => response.json())
        .then(result => {return result})
        .catch(error => {return error});
}

export default channelsDelete;
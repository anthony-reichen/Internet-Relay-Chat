async function updateChannel(id, body){
    const result = await fetch(id, body);
    return result
}
export default updateChannel
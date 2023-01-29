function commandsControl(message) {
    const commands = ["/nick", "/list", "/create", "/delete", "/join", "/quit", "/users", "/msg"]
    const find = commands.find(element => element === message)
    if (find === undefined) return false
    return true
}

export default commandsControl
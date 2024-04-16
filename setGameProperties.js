const setGameProperties = (data, gameProperties) => {
    let updatedGameProperties = gameProperties;
    for (const [key, value] of Object.entries(data)) {
        updatedGameProperties[key] = value;
    }
    return updatedGameProperties
}
module.exports = setGameProperties;
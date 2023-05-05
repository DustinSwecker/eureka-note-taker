const createUniqueID = () => {
    const uuid = Math.floor(Math.random()*100000);
    const uuid2 = uuid.toString(16);
    const uuid3 = uuid.toString(12);
    const constructedUUID = `${uuid}-${uuid2}-${uuid3}`
    return constructedUUID;
}

module.exports = createUniqueID;
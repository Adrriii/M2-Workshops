let inMemoryWorkshop = []


function getWorkshopList() {
    return new Promise((resolve, ) => {
        resolve(inMemoryWorkshop)
    })
}

function getWorkshopByName(name) {
    return new Promise((resolve, reject) => {
        if (!name) {
            reject(new Error("name parameter is required"))
        }
        resolve(inMemoryWorkshop.find(workshop => workshop.name === name))
    })
}

function addWorkshop(name, description) {
    return new Promise((resolve, reject) => {
        if (!name) {
            reject(new Error("Workshop name required"))
        }
        if (!description) {
            reject(new Error("Workshop description required"))
        }
        inMemoryWorkshop.push({
            name,
            description
        })
        resolve()
    })
}

function removeWorkshopByName(name) {
    return new Promise((resolve, reject) => {
        if (!name) {
            reject(new Error("Workshop name required"))
        }
        inMemoryWorkshop.splice(inMemoryWorkshop.findIndex(workshop => workshop.name === name), 1);
        resolve();
    })
}

function updateWorkshop(name_old, name, description) {
    return new Promise((resolve, reject) => {
        if (!name_old) {
            reject(new Error("Workshop name required"))
        }
        if (!name) {
            reject(new Error("New Workshop name required"))
        }
        if (!description) {
            reject(new Error("New Workshop description required"))
        }
        getWorkshopByName(name_old).then( workshop => { 
            workshop.name = name; 
            workshop.description = description 
            resolve()
        });
    })
}

module.exports = {
    getWorkshopList,
    getWorkshopByName,
    addWorkshop,
    removeWorkshopByName,
    updateWorkshop
}
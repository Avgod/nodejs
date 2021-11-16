const checkListRepo = require('../repositories/checkListRepository')
const auditService = require('./auditService')

const GenerateDynamicCheckList = async (ColumnHeader, sendData, obj, tableName) => {
    let checkListId, flag = false;
    if (tableName) {
        checkListId = tableName;
        flag = true
    }
    else {
        checkListId = await idGeneratorFunc(obj)
    }
    let arr = []
    const filtered = ColumnHeader.filter(ele => {
        arr.push(ele.trim().replace(/\s/g, "_").replace(/[.]/g, "_"))
    })
    const TableQuery = await checkListRepo.createCheckListTableName(tableCreationQuery(checkListId, arr)) //Table Create query
    const InsertdataQuery = await InsertChecklistQuery(sendData, checkListId)                                     //insert Query
    const excuteQuery = await checkListRepo.InsertCheckListData(InsertdataQuery)
    let insertToMasterCheckList;
    if (flag == false) {
        insertToMasterCheckList = await checkListRepo.insertToMaster(obj, checkListId)
    }
    if (excuteQuery || insertToMasterCheckList) {
        return true
    } else {
        return false
    }
}


const idGeneratorFunc = async (obj) => {
    let startNumber = "0001", uniqueNumber;
    const lastChecklist = await checkListRepo.getLastCheckList()
    if (lastChecklist.length > 0) {
        uniqueNumber = parseInt(lastChecklist[0].checklist_id.match(/\d+/)) + 1;
    } else {
        uniqueNumber = startNumber
    }
    const uniqueChecklistName = "cl" + "_" + parseInt(uniqueNumber) + "_" + obj.name
    return uniqueChecklistName;
}


const tableCreationQuery = (tableName, arr) => {
    //checkListId is used as tableName
    let count = 0
    let query = `CREATE TABLE IF NOT EXISTS ${tableName} (`;
    for (let key of arr) {
        let comma = ","
        if (arr.length - 1 == count) {
            comma = ""
        }
        query += `${key} VARCHAR${comma} `;
        count++
    }
    query += ")";
    return query
}

const InsertChecklistQuery = async (sendData, tableName) => {
    //checkListId is used as tableName
    let arrayOfFiltered = []
    let keyValues = []
    sendData.forEach(element => {
        let cleanedObject = {}    //object key names with "." & " " are replaced with "_"(underScore)
        let keys = Object.keys(element);
        keyValues = (keys.length) > keyValues ? keys : keyValues
        keys.forEach((objData, index) => {
            let key = keys[index];
            cleanedObject[key.toLowerCase().trim().replace(/\s/g, "_").replace(/[.]/g, "_")] = element[key] //replace dot and space with underScore and convert to lowerCase
        })
        arrayOfFiltered.push(cleanedObject)
    });

    let FilterArrayStringified = JSON.stringify(arrayOfFiltered)
    const columnArray = keyValues.map(keyValue => {
        return keyValue.trim().replace(/\s/g, "_").replace(/[.]/g, "_")
    }).toString()
    let insertQuery = `INSERT INTO ${tableName} SELECT * FROM json_populate_recordset(null::${tableName},'${FilterArrayStringified}');`
    return insertQuery
}

// get all checklists
const getCheckLists = async () => {
    return await checkListRepo.get();
}

//get checklist by  checklist name
const getCheckListByName = async (checkListName) => {
    return await checkListRepo.getOne(checkListName.checklist_name);
}

module.exports = {
    getCheckLists,
    getCheckListByName,
    GenerateDynamicCheckList
}
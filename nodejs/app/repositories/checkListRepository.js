const dbInstance = require("../models")
const { sequelize } = require('../models');

// get all checklists 
const get = async () => {
    return await dbInstance.masterCheckList.findAll()
}

// get checklist by name 
const getOne = async (checkListName) => {
    const query = `select * from ${checkListName}`;
    return await sequelize.query(query)
}


const createCheckListTableName = async (query) => {
    return await sequelize.query(query);
}

const InsertCheckListData = async (InsertdataQuery) => {
    return await sequelize.query(InsertdataQuery);
}
const getLastCheckList = async () => {
    return await dbInstance.masterCheckList.findAll({
        raw: true,
        limit: 1,
        attributes: ["checklist_id"],
        order: [['createdAt', 'DESC']]
    })
}

const insertToMaster = async (obj, checkListId) => {
    const { name, type } = obj;
    const checklistIdModified = checkListId.toString().replace(`_${name}`, "")
    const checklistTablename = checkListId;
    return await dbInstance.masterCheckList.create({ checklist_id: checklistIdModified, checklist_name: name, type: type, checklist_tablename: checklistTablename })
}


module.exports = {
    get,
    getOne,
    insertToMaster,
    getLastCheckList,
    createCheckListTableName,
    InsertCheckListData
}


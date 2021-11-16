//package import
const httpStatus = require('http-status');
const checkListService = require("../services/checkListService");
const constants = require("../utlis/constants");
const asyncHandler = require("../middlewares/asyncHandler")

const checkListToDb = asyncHandler(async (req, res) => {
    // --TODO--
    //should Differentiate how much Data Stored
    const { ColumnHeader, sendData, obj } = (req.body)
    const checklistTable = await checkListService.GenerateDynamicCheckList(ColumnHeader, sendData, obj)
    if (checklistTable === true) {
        return res.status(200).send({ code: httpStatus.OK, message: constants.INSERTED_SUCCESSULLY })
    } else {
        return res.status(206).send({ code: httpStatus.OK, message: constants.NOT_INSERTED })
    }
}
)

//get CheckList On click On checklist dropdown
const getCheckLists = asyncHandler(async (req, res) => {

    const data = await checkListService.getCheckLists()
    if (data) {
        return res.status(200).send({ code: httpStatus.OK, message: constants.SUCCESSULLY_FETECHED, data: data })
    }
    else {
        return res.status(400).send({ code: httpStatus.OK, message: constants.CANNOT_FETCH })
    }

})

//get CheckList On click On checklist dropdown
const getCheckListByName = asyncHandler(async (req, res) => {
    const checkListName = req.body;
    const data = await checkListService.getCheckListByName(checkListName)
    if (data) {
        return res.status(200).send({ code: httpStatus.OK, message: constants.SUCCESSULLY_FETECHED, data: data })
    }
    else {
        return res.status(400).send({ code: httpStatus.OK, message: constants.CANNOT_FETCH })
    }

}
)

module.exports = {
    checkListToDb,
    getCheckLists,
    getCheckListByName
}







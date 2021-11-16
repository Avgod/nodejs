module.exports = Object.freeze({
  FOUND: "Found",
  NO_REQUEST_BODY: "Request Body",
  DUPLICATE_ENTRIES: "Duplicate Entries",
  DUPLICATE_RECORD: "Duplicate Record",
  SEND_PROPER_REQUEST: "Send Proper Request Body",
  DUPLICATE_ACTIVE_MSG: "Already item is available in the list",
  DUPLICATE_IN_ACTIVE_MSG:
    "This item is Inactive! Please contact administrator",
  NO_RECORD_FOUND: "No Record Found",
  DELETE_SUCCESSFUL: "Deleted Successfully",
  USER_CREATED:"User Created Successfully",
  LOGGED_ID:"Logged in successfully",
  INVALID_CREDENTIALS:"password is incorrect",
  INVALID_INPUT:"Invalid,please provide a Valid input",

  CANNOT_FETCH:"Cannot fetch Data",
  NOT_INSERTED:"Data Not inserted Properly",
  UPDATE_FAIL:"failed to updated Data",

  INSERTED_SUCCESSULLY:"Data inserted successfully",
  SUCCESSULLY_FETECHED:"successfully fetced Data",
  DATA_UPDATED:"data updated successfully",
  GetpleaseProvideMsg: function (columnname) {
    let returnProvideMsg = "Please provide";
    switch (columnname) {
      case "project_id":
        return `${returnProvideMsg} project_id`;
      case "emp_id":
        return `${returnProvideMsg} employee Id`;
    }
  },



  GetMinimumMessage: function (columnname) {
    let lengthMessage = "must be greater than 0";
    switch (columnname) {
      case "type":
        return `type ${lengthMessage}`;
      case "password":
        return `password ${lengthMessage}`;
      default:
        return `Value ${lengthMessage}`;
    }
  },



  GetZeroValidationMessage: function (columnname) {
    let validationMessage = "must be greater than or equal to 0";
    switch (columnname) {
      case "id":
        return `Encounter Id ${validationMessage}`;
      case "phone_number":
        return `Doctor Id ${validationMessage}`;
      default:
        return `Value ${validationMessage}`;
    }
  },
});
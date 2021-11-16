
const dayDifference = (finalDate) => {
    let currentDate = new Date();
    let difference = parseInt((finalDate - currentDate) / (1000 * 60 * 60 * 24), 10);
    return difference; //send Back the remaining days
}


const differenceCal = (expiry_date) => {
    let currentDate=new Date()
    let difference = parseInt((expiry_date - currentDate) / (1000 * 60 * 60 * 24), 10)
    return difference;
  }


const AuditExpiryDate = (Auditdetails) => {
    const empIds = Auditdetails.reduce((result, ele) => {  //use reduce method to remove null values
        const dayDiff = dayDifference(ele.audit_end_date) //Calculate how many Days remaining
        if (dayDiff <= 2) { result.push(ele.emp_id) }
        return result
    }, []);
    return empIds;
}

module.exports = {
    AuditExpiryDate,
    differenceCal
}
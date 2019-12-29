// Your code here
function createEmployeeRecord(arr) {
    return { firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: new Array(),
        timeOutEvents: new Array()
    }
}

function createEmployeeRecords(arrays) {
    let records = new Array()
    
    arrays.forEach(function(arr) {
        records.push(createEmployeeRecord(arr))
    })

    return records
}

const createTimeInEvent = function(employeeRecord, datestamp) {
    const newTimeIn = {type: "TimeIn",
        hour: parseInt(datestamp.split(' ')[1]),
        date: datestamp.split(' ')[0]
    }

    if (!!grabRecordOnDate(employeeRecord.timeOutEvents, newTimeIn.date)) {
        new Error("No corresponding TimeOut value found for this date")
    }

    employeeRecord.timeInEvents.push(newTimeIn)
    return employeeRecord
}

const createTimeOutEvent = function(employeeRecord, datestamp) {
    let newTimeOut = {type: "TimeOut",
        hour: parseInt(datestamp.split(' ')[1]),
        date: datestamp.split(' ')[0]
    }

    employeeRecord.timeOutEvents.push(newTimeOut)
    return employeeRecord
}

const grabRecordOnDate = function(timingEvents, date) {
    return timingEvents.find(function(timingEvent) {
        return timingEvent.date === date
    })
}

const hoursWorkedOnDate = function(employeeRecord, date) {
    const timeOutOnDate = grabRecordOnDate(employeeRecord.timeOutEvents, date).hour
    const timeInOnDate = grabRecordOnDate(employeeRecord.timeInEvents, date).hour

    return (timeOutOnDate - timeInOnDate) / 100
}

const wagesEarnedOnDate = function(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

const allWagesFor = function(employeeRecord) {
    return employeeRecord.timeOutEvents.reduce(function(memo, event) {
        return memo + wagesEarnedOnDate(employeeRecord, event.date)
    }, 0)
}

const calculatePayroll = function(employeeRecords) {
    return employeeRecords.reduce(function(memo, record) {
        return memo + allWagesFor(record)
    }, 0)
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(employeeRecord) {
        return employeeRecord.firstName === firstName
    })
}
// Your code here

function createEmployeeRecord(array) {
	let record = {
					firstName: array[0],
					familyName: array[1],
					title: array[2],
					payPerHour: array[3],
					timeInEvents: [],
					timeOutEvents: []
				}

	return record
}

function createEmployeeRecords(arrayOfArrays) {
	let records  = []

	arrayOfArrays.forEach(array => {
		records.push(createEmployeeRecord(array))
	})
	
	return records
}

function createTimeInEvent(record, stamp) {

	let splitStamp = stamp.split(' ')

	record.timeInEvents.push({
		type: 'TimeIn',
		hour: parseInt(splitStamp[1]),
		date: splitStamp[0]
	})

	return record
}

function createTimeOutEvent(record, stamp) {

	let splitStamp = stamp.split(' ')

	record.timeOutEvents.push({
		type: 'TimeOut',
		hour: parseInt(splitStamp[1]),
		date: splitStamp[0]
	})


	return record
}

function hoursWorkedOnDate(record, date) {
	let timeIn = record.timeInEvents

	let timeOut = record.timeOutEvents

	const timeInObj = timeIn.find(obj => obj.date === date)
	//return the object

	const timeOutObj = timeOut.find(obj => obj.date === date)

	let hoursWorked = (timeOutObj.hour - timeInObj.hour)/100

	return hoursWorked
}

function wagesEarnedOnDate(record, date) {
	const payRate = record.payPerHour

	const hours = hoursWorkedOnDate(record, date)

	return hours*payRate
}

function allWagesFor(record) {
	const allDates = record.timeInEvents.map(obj => obj.date)

	let wages = []

	allDates.forEach(date => wages.push(wagesEarnedOnDate(record, date)))

	let reducer = (accumulator, currentValue) => accumulator + currentValue;

	return wages.reduce((accumulator, currentValue) => accumulator + currentValue)

}

function findEmployeeByFirstName(srcArray, firstName) {
	let findRecord = srcArray.find(record => record.firstName === firstName)

	return findRecord
}


function calculatePayroll(arrayOfRecords) {
	let arrayOfWages = []

	arrayOfRecords.forEach(record => arrayOfWages.push(allWagesFor(record)))

	return arrayOfWages.reduce((accumulator, currentValue) => accumulator + currentValue)

}





















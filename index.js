let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
        let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

        let sTimeData = [
          ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
          ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
        ]

        let rTimeData = [
          ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
          ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
        ]

        sTimeData.forEach(function (d) {
          let [dIn, dOut] = d
          sRecord = createTimeInEvent(sRecord, dIn)
          sRecord = createTimeOutEvent(sRecord, dOut)
        })

        rTimeData.forEach(function (d, i) {
          let [dIn, dOut] = d
          rRecord = createTimeInEvent(rRecord, dIn)
          rRecord = createTimeOutEvent(rRecord, dOut)
        })

        let employees = [sRecord, rRecord]
        let grandTotalOwed = employees.reduce((m, e) => m + allWagesFor(e), 0)

document.addEventListener('DOMContentLoaded', ()=>{
	console.log('connected')
})


function createEmployeeRecord(input) {
	return {
		firstName: input[0],
		familyName: input[1],
		title: input[2],
		payPerHour: input[3],
		timeInEvents: [],
		timeOutEvents: []
	}
}

function createEmployeeRecords(array){
	return array.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(employeeRecord, datetime) {
	const event = {
		type: 'TimeIn',
		date: datetime.split(' ')[0],
		hour: parseInt(datetime.split(' ')[1])
	}
	employeeRecord.timeInEvents.push(event)
	return employeeRecord
}

function createTimeOutEvent(employeeRecord, datetime) {
	const event = {
		type: 'TimeOut',
		date: datetime.split(' ')[0],
		hour: parseInt(datetime.split(' ')[1])
	}
	employeeRecord.timeOutEvents.push(event)
	return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
	let validTimecard = true

	const timeIn = employeeRecord.timeInEvents.find(timeLog => timeLog.date === date)
	const timeOut = employeeRecord.timeOutEvents.find(timeLog => timeLog.date === date)
	
	if (!timeOut) {
		validTimecard = false
		console.log(`${employeeRecord.firstName} ${employeeRecord.familyName} did not clock out on ${date}`)
	} else if (timeOut.hour === timeIn.hour) {
		validTimecard = false
		console.log(`${employeeRecord.firstName} ${employeeRecord.familyName} did not work any hours on ${date}`)
	} 

	if (validTimecard) {
		const hoursWorked = (timeOut.hour - timeIn.hour) / 100
		return hoursWorked
	}
}

function wagesEarnedOnDate(employeeRecord, date) {
	return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
	let totalWages = 0
	employeeRecord.timeInEvents.forEach(event => {
		totalWages += wagesEarnedOnDate(employeeRecord, event.date)
	})
	return totalWages
}

function calculatePayroll(employees_array) {
	let payroll = 0
	employees_array.forEach(employee => payroll += allWagesFor(employee))
	return payroll
}

function findEmployeeByFirstName(employees, firstName) {
	return employees.find(record => record.firstName === firstName)
}
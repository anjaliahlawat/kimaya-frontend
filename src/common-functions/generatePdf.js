import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePdf = (student, schoolData) => {
    const doc = new jsPDF()
    
    doc.addImage(getDataUrl(), 'PNG', 10, 10, 45, 40)
    doc.setFontSize(10)
    doc.text(schoolData.name, 145, 20)
    doc.text(schoolData.address, 145, 25)
    doc.text('U.P-'+schoolData.pincode, 145, 30)
    doc.text('Mob: +'+schoolData.contactNum+', 9990599024', 145, 35)
    doc.text('Email: '+schoolData.email, 145, 40)

    doc.text('Date: '+setDate(student), 160, 60)

    doc.text(`Name ................... ${'Anjali'} ............................................... S/o/D/o .................${'Mahesh'}.........................................`, 20, 80)
    doc.text(`Fee for the month or quarter of .................................. ${student.month} ............................................................`, 20, 90)

    const tableColumn = ["Particulars", "Amount"]
    const tableRows = []
    tableRows.push(['Registration Fee', student.registrationFee])
    tableRows.push(['Admission Fee', student.admissionFee])
    tableRows.push(['Development Charges', student.developmentCharges])
    tableRows.push(['Annual Charges', student.annualCharges])
    tableRows.push(['Tuition Fee', student.tuitionFee])
    tableRows.push(['Activity Charges', student.activityCharges])
    tableRows.push(['Meal', student.meal])
    tableRows.push(['Transport', student.transport])
    tableRows.push(['Miscellaneous', student.misc])
    tableRows.push(['Uniform', student.uniform])
    tableRows.push(['Books & Bag', student.bookNbag])
    tableRows.push(['Day Care', student.dayCare])
    doc.autoTable(tableColumn, tableRows, { startY: 110 })

    doc.text(`Received Amount Rs.....................${convertToWords(student.totalFees)}......................................................................`, 15, 220)

    doc.text(`Mode of Payment (Online/Cheque/Cash)...................${student.modeOfPayment}...................................................................`, 15, 230)

    doc.text('Director ', 15, 250)
    doc.text('Dr. Sadhna Chandana ', 15, 255)
    doc.text(schoolData.name, 15, 260)
    doc.save('fee-receipt.pdf')
}

function getDataUrl() {
  return document.querySelector('#logo')
}

function setDate(val){
  let d1 = new Date(val.paymentDate)
  return d1.getDate() +" "+ val.month +" "+ d1.getFullYear()
}

function convertToWords(num){
  num = num+''
  let len = num.length
  
	let single_digits = ["zero", "One",	"Two", "Three", "Four",	"Five", "Six", "Seven", "Eight", "Nine"]

	let two_digits = ["", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen",	"Fifteen", "Sixteen",       "Seventeen", "Eighteen", "Nineteen"]

	let tens_multiple =["", "", "Twenty", "Thirty", "Forty", "Fifty","Sixty", "Seventy", "Eighty", "Ninety"]

  let tens_power =["Hundred", "Thousand"]

  let finalStr = ''
  
	if (len === 1){
		finalStr = single_digits[num[0] - '0']
	}

	let x = 0
	while (x < num.length){
		if (len >= 3){
      
			if (num[x]-'0' !== 0)
			{
				finalStr= finalStr+ single_digits[num[x] - '0']+" " +tens_power[len - 3]+" "
			}
			--len
		}
		else
		{
			/* Need to explicitly handle 
			10-19. Sum of the two digits
			is used as index of "two_digits"
			array of strings */
			if (num[x] - '0' === 1) 
			{
				let sum = num[x] - '0' + 
					num[x] - '0'
				finalStr= finalStr+ two_digits[sum]
			}

			/* Need to explicitely handle 20 */
			else if (num[x] - '0' === 2 && 
					num[x + 1] - '0' === 0)
			{
				finalStr= finalStr + "Twenty"
			}
			else
			{
				let i = (num[x] - '0');
				if(i > 0)
				    finalStr = finalStr + tens_multiple[i]+" "
				else
        finalStr = finalStr+ ""
        ++x
        
				if (num[x] - '0' !== 0)
				    finalStr = finalStr + single_digits[num[x] - '0']
			}
		}
		++x;
  }
  return finalStr
}


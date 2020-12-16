import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePdf = (student, schoolData, admissionNum) => {
  console.log(student)
  const doc = new jsPDF()

  doc.addImage(getDataUrl(), 'PNG', 10, 15, 45, 40)
  doc.setFontSize(10)
  doc.text(schoolData.name, 145, 20)
  doc.text(schoolData.address, 145, 25)
  doc.text('U.P-' + schoolData.pincode, 145, 30)
  doc.text(`Mob: ${schoolData.contactNum}, 9990599024`, 145, 35)
  doc.text('Email: ' + schoolData.email, 145, 40)

  doc.text('Date: ' + setDate(student), 160, 50)
  doc.text(`Admission No. #....${admissionNum}....... `, 15, 65)
  doc.text(`Reference No. #....${student.referenceNo}`, 135, 65)

  const tableRows0 = []
  tableRows0.push([`Name ................... ${student.studentName} ............................................... S/o/D/o .................${student.parentName}................................`])
  tableRows0.push([`Fee for the month or quarter of .................................. ${student.month} .......................................................................`])

  doc.autoTable([[]], tableRows0, {
    startY: 80,
    theme: 'plain',
    styles: {
      cellPadding: 2,
      tableWidth : 100,
    },
  },
)


  // doc.text(`Name ................... ${student.studentName} ............................................... S/o/D/o .................${student.parentName}.........................................`, 15, 80)
  // doc.text(`Fee for the month or quarter of .................................. ${student.month} ............................................................`, 15, 90)

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
  tableRows.push(['Total Fees', student.totalFees])
  doc.autoTable(tableColumn, tableRows, {
    startY: 105
  })

  let finalY = doc.previousAutoTable.finalY

  let tableRows2 = []

  tableRows2.push([`Received Amount Rs..................................................${convertToWords(student.totalFees)}..........................................................`])
  tableRows2.push([`Mode of Payment (Online/Cheque/Cash)...................${student.modeOfPayment}................................................................................`])

  doc.autoTable([[]], tableRows2, {
      startY: finalY+10,
      theme: 'plain',
      styles: {
        cellPadding: 2,
        cellWidth : 200,
      },
    },
  )

  doc.text('Director ', 15, 250)
  doc.text('Dr. Sadhna Chandana ', 15, 255)
  doc.text(schoolData.name, 15, 260)
  doc.save('fee-receipt.pdf')
}

function getDataUrl() {
  return document.querySelector('#logo')
}

function setDate(val) {
  let d1 = new Date(val.paymentDate)
  return d1.getDate() + " " + val.month + " " + d1.getFullYear()
}

function convertToWords(num) {
  num = num + ''
  let len = num.length

  let single_digits = ["zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"]

  let two_digits = ["", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"]

  let tens_multiple = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]

  let tens_power = ["Hundred", "Thousand"]

  let finalStr = ''

  if (len === 1) {
    finalStr = single_digits[num[0] - '0']
  }

  let x = 0
  while (x < num.length) {
    if (len >= 3) {

      if (num[x] - '0' !== 0) {
        finalStr = finalStr + single_digits[num[x] - '0'] + " " + tens_power[len - 3] + " "
      }
      --len
    } else {
      /* Need to explicitly handle 
      10-19. Sum of the two digits
      is used as index of "two_digits"
      array of strings */
      if (num[x] - '0' === 1) {
        let sum = num[x] - '0' +
          num[x] - '0'
        finalStr = finalStr + two_digits[sum]
      }

      /* Need to explicitely handle 20 */
      else if (num[x] - '0' === 2 &&
        num[x + 1] - '0' === 0) {
        finalStr = finalStr + "Twenty"
      } else {
        let i = (num[x] - '0');
        if (i > 0)
          finalStr = finalStr + tens_multiple[i] + " "
        else
          finalStr = finalStr + ""
          ++x

        if (num[x] - '0' !== 0)
          finalStr = finalStr + single_digits[num[x] - '0']
      }
    }
    ++x;
  }
  return finalStr
}
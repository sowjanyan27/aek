export const Common = {
  allowNumbersOnPaste,
  preventInitialSpace,
  allowOnlyNumbers,
  validateEmail,
  validatePwd,
  preventSpace,
  allowdecimal,
  getNumericValue,
  mobileNumberFormat,
  formatDate
};

function allowNumbersOnPaste(e) {
  const str = e.clipboardData.getData("Text");
  let re = /^[0-9\b]+$/;
  const newStr = re.test(str);
  if (newStr === false) {
    return false;
  } else {
    return true;
  }
}

function preventInitialSpace(e) {
  if (e.which === 32 && !e.target.value.length) {
    return false;
  } else {
    return true;
  }
}
function allowOnlyNumbers(e) {
  var charCode = e.which || e.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  } else {
    return true;
  }
}
function validateEmail(email) {
  var re =
    /^[a-zA-Z0-9._]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,4}$/;
  let result = re.test(email);
  if (result === false) {
    return false;
  } else {
    return true;
  }
}

function validatePwd(pwd) {
  var reg_exp =
    /^(?=.*[0-9])(?=.*[- ?!@#$%^&*\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\\]{8,30}$/;
  let result = reg_exp.test(pwd);
  if (result === false) {
    return false;
  } else {
    return true;
  }
}

function preventSpace(e) {
  if (e.which === 32) {
    return false;
  } else {
    return true;
  }
}
//to allow decimals
function allowdecimal(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  if (charCode == 46) {
    if (evt.target.value.indexOf(".") === -1) {
      return true;
    } else {
      return false;
    }
  } else {
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  }
  return true;
}
function getNumericValue(input) {
  return input.replace(/\D/g, ''); // for allowing only the numeric
}

function mobileNumberFormat(input) {
  let numericValue = getNumericValue(input);
  if (numericValue === '' || /^[6-9]\d{0,9}$/.test(numericValue)) {  // for allowing the mobile format start from above 5 values
    return numericValue; // reurn the valid number
  }
  return null; // Return null if the input is invalid
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  const [day, month, year] = date.toLocaleDateString('en-GB', options).split('/');
  return `${day}-${month}-${year}`;
}




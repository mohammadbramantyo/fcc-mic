function ConvertHandler() {

  // listed units, the order matters as we iterate through the list
  // 'l' will be considered in a 'gal' units. careful.
  const units = ['gal', 'lbs', 'mi', 'kg', 'km', 'l'];

  const unitPairsReturn = {
    gal: 'L',
    lbs: 'kg',
    mi: 'km',
    l: 'gal',
    kg: 'lbs',
    km: 'mi'
  };

  const unitPairsSpellOut = {
    gal: 'gallons',
    lbs: 'pounds',
    mi: 'miles',
    l: 'liters',
    kg: 'kilograms',
    km: 'kilometers'
  }


  this.getNum = function (input) {
    let resultStr = "";
    let resultNum = 1;

    // const unitStr = this.getUnit(input);
    
    for (let index = 0; index < input.length; index++) {
      const element = input[index];
      if ((/[a-zA-Z]/).test(element)) {
        break;
      }
      resultStr += element;
    }

    // resultStr = input.substring(0, input.length - unitStr.length);

    if (resultStr == "") {
      return resultNum;
    }

    // Invalid input number Handling
    const wholeNumberRegex = /^\d+$/;
    const decimalRegex = /^\d*\.\d+$/;
    const fractionRegex = /^\d+(\.\d+)?\/\d+(\.\d+)?$/;

    if (!wholeNumberRegex.test(resultStr) &&
      !decimalRegex.test(resultStr) &&
      !fractionRegex.test(resultStr)) {

      throw new TypeError("invalid number");

    }


    // convert fraction to number
    if (fractionRegex.test(resultStr)) {
      const [numerator, denominator] = resultStr.split('/');
      resultNum = Number(numerator) / Number(denominator);
    } else {
      // convert result to num
      resultNum = Number(resultStr);

    }


    return resultNum;
  };

  this.getUnit = function (input) {
    let result;
    let unitlength = 0;
    let unitString = "";
    const lowerInput = input.toLowerCase();

    // const num = this.getNum(input);
    for (let index = 0; index < units.length; index++) {
      const element = units[index];
      if (lowerInput.includes(element)) {
        unitlength = element.length;
        unitString = element;
        break;
      }

    }


    result = input.toLowerCase().substring(input.length - unitlength, input.length)


    // invalid unit
    if (!(units.includes(result.toLowerCase()))) {

      throw new TypeError("invalid unit");

    }

    if(result == 'l'){
      return 'L';
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result = unitPairsReturn[initUnit.toLowerCase()];

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result = unitPairsSpellOut[unit.toLowerCase()];

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = 0;

    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break

      case "lbs":
        result = initNum * lbsToKg;
        break;

      case "kg":
        result = initNum / lbsToKg;
        break;

      case "mi":
        result = initNum * miToKm;
        break;

      case "km":
        result = initNum / miToKm;
        break

      default:
        break;
    }


    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    let result = `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;

    return result;
  };

}

module.exports = ConvertHandler;

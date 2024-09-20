function ConvertHandler() {

  const unitPairsReturn = {
    gal: 'L',
    lbs: 'kg',
    mi: 'km',
    L: 'gal',
    kg: 'lbs',
    km: 'mi'
  };

  const unitPairsSpellOut = {
    gal: 'gallons',
    lbs: 'pounds',
    mi: 'miles',
    L: 'liters',
    kg: 'kilograms',
    km: 'kilometers'
  }


  this.getNum = function (input) {
    let result = "";
    for (let index = 0; index < input.length; index++) {
      const element = input[index];
      if ((/[a-zA-Z]/).test(element)) {
        break;
      }
      result += element;
    }

    return result;
  };

  this.getUnit = function (input) {
    let result;

    const num = this.getNum(input);
    result = input.substring(num.length, input.length)

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result = unitPairsReturn[initUnit];  

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result = unitPairsSpellOut[unit];

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

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


    return result.toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const returnUnitString = this.spellOutUnit(returnUnit)
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnitString}`;

    return result;
  };

}

module.exports = ConvertHandler;

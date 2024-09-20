'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    let initNum;
    let isNumValid = true;
    let initUnit;
    let isUnitValid = true;

    // Check input validity
    try {
      initNum = convertHandler.getNum(input);
    } catch (error) {
      isNumValid = false;
    }

    try {
      initUnit = convertHandler.getUnit(input);
    } catch (error) {
      isUnitValid = false;
    }

    // Hanlde error
    if (!isNumValid && !isUnitValid) {
      res.send("invalid number and unit")
    } else if (!isNumValid) {
      res.send("invalid number");
    } else if (!isUnitValid) {
      res.send("invalid unit")
    } else {

      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const returnNum = convertHandler.convert(initNum, initUnit);


      const response = {
        "initNum": initNum,
        "initUnit": initUnit,
        "returnNum": returnNum,
        "returnUnit": returnUnit,
        "string": convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
      }

      res.json(response)

    }

  })
};

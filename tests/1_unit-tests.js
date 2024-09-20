const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

    test('read whole number input', function () {
        assert.equal(convertHandler.getNum('1L'), '1');
        assert.equal(convertHandler.getNum('5mi'), '5');
    });

    test('read a decimal nummber input', function () {
        assert.equal(convertHandler.getNum('3.1gal'),'3.1');
    });

    test('read a fractional input',function () {
        assert.equal(convertHandler.getNum('3/2kg'),'3/2');
        
    });

    test('read fractional input with decimal', function(){
        assert.equal(convertHandler.getNum('2.5/2L'), '2.5/2');
    });

    test('return error on double fraction', function(){
       
        assert.throws(()=>convertHandler.getNum('3/2/5L'), TypeError, 'invalid number');
    });

    test('default number to one', function () {
        assert.equal(convertHandler.getNum('L'),'1');
    });

    test('read valid input unit', function(){
        assert.equal(convertHandler.getUnit('3gal'), 'gal');
        assert.equal(convertHandler.getUnit('3L'),'L');
        assert.equal(convertHandler.getUnit('3mi'),'mi');
        assert.equal(convertHandler.getUnit('3km'),'km');
        assert.equal(convertHandler.getUnit('3lbs'),'lbs');
        assert.equal(convertHandler.getUnit('3.1kg'),'kg');
    });

});
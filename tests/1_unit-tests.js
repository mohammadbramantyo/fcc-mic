const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

    test('read whole number input', function () {
        assert.equal(convertHandler.getNum('1L'), 1);
        assert.equal(convertHandler.getNum('5mi'), 5);
    });

    test('read a decimal nummber input', function () {
        assert.equal(convertHandler.getNum('3.1gal'),'3.1');
    });

    test('read a fractional input',function () {
        assert.equal(convertHandler.getNum('3/2kg'),1.5);
        
    });

    test('read fractional input with decimal', function(){
        assert.equal(convertHandler.getNum('2.5/2L'), 1.25);
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

    test('return error on invalid input unit', function(){
        assert.throws(()=>convertHandler.getUnit('3ha'), TypeError, 'invalid unit');
    });

    test('return correct return unit',function(){
        assert.equal(convertHandler.getReturnUnit('gal'), 'L');
        assert.equal(convertHandler.getReturnUnit('L'),'gal');
        assert.equal(convertHandler.getReturnUnit('mi'),'km');
        assert.equal(convertHandler.getReturnUnit('km'),'mi');
        assert.equal(convertHandler.getReturnUnit('lbs'),'kg');
        assert.equal(convertHandler.getReturnUnit('kg'),'lbs');
    });

    test('return spelled out unit', function(){
        assert.equal(convertHandler.spellOutUnit('gal'),'gallons');
        assert.equal(convertHandler.spellOutUnit('L'),'liters');
        assert.equal(convertHandler.spellOutUnit('mi'),'miles');
        assert.equal(convertHandler.spellOutUnit('km'),'kilometers');
        assert.equal(convertHandler.spellOutUnit('lbs'),'pounds');
        assert.equal(convertHandler.spellOutUnit('kg'),'kilograms');
    });


    test('test convert gal to L',function(){
        assert.equal(convertHandler.convert(3.2,'gal'),12.11331);
    });
    test('test convert L to gal',function(){
        assert.equal(convertHandler.convert(5,'L'),1.32086 );
    });
    test('test convert mi to km',function(){
        assert.equal(convertHandler.convert(3.1,'mi'),4.98895 );
        
    });
    test('test convert km to mi',function(){
        assert.equal(convertHandler.convert(2,'km'),1.24275 );
    });
    test('test convert lbs to kg',function(){
        assert.equal(convertHandler.convert(5,'lbs'),2.26796 );
        
    });
    test('test convert kg to lbs',function(){
        assert.equal(convertHandler.convert(10,'kg'),22.04624 );
    });



});
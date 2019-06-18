"use strict";
/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */
Object.defineProperty(exports, "__esModule", { value: true });
var chaiInstance = require('chai');
var assert = chaiInstance.assert;
const convertController_1 = require("../controllers/convertController");
var convertHandler = new convertController_1.default();
suite('Unit Tests', function () {
    suite('Function convertHandler.getNum(input)', function () {
        test('Whole number input', function (done) {
            var input = '32L';
            assert.equal(convertHandler.getNum(input), 32);
            done();
        });
        test('Decimal Input', function (done) {
            var input = '3.2L';
            assert.equal(convertHandler.getNum(input), 3.2);
            done();
        });
        test('Fractional Input', function (done) {
            var input = '3/2L';
            assert.equal(convertHandler.getNum(input), 1.5);
            done();
        });
        test('Fractional Input w/ Decimal', function (done) {
            var input = '3.5/2.3L';
            assert.equal(convertHandler.getNum(input), eval('3.5/2.3'));
            done();
        });
        test('Invalid Input (double fraction)', function (done) {
            var input = '3.5/2.3/2L';
            assert.equal(convertHandler.getNum(input), null);
            done();
        });
        test('No Numerical Input', function (done) {
            var input = 'kg';
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });
    });
    suite('Function convertHandler.getUnit(input)', function () {
        test('For Each Valid Unit Inputs', function (done) {
            var input = [
                'gal',
                'l',
                'mi',
                'km',
                'lbs',
                'kg',
                'GAL',
                'L',
                'MI',
                'KM',
                'LBS',
                'KG'
            ];
            const returnUnits = {
                l: 'gal',
                gal: 'L',
                lbs: 'kg',
                kg: 'lbs',
                mi: 'km',
                km: 'mi'
            };
            input.forEach(function (ele) {
                const el = ele.toLowerCase();
                assert.equal(convertHandler.getReturnUnit(ele), returnUnits[el]);
            });
            done();
        });
        test('Unknown Unit Input', function (done) {
            const ele = 'kmi';
            assert.equal(convertHandler.getReturnUnit(ele), null);
            done();
        });
    });
    suite('Function convertHandler.getReturnUnit(initUnit)', function () {
        test('For Each Valid Unit Inputs', function (done) {
            var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
            var expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs']; // capital L based from instructions
            input.forEach(function (ele, i) {
                assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
            });
            done();
        });
    });
    suite('Function convertHandler.spellOutUnit(unit, num)', function () {
        test('For Each Valid Unit Inputs', function (done) {
            var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
            var expect = [
                'gallon',
                'liter',
                'mile',
                'kilometer',
                'pound',
                'kilogram'
            ];
            input.forEach(function (ele, i) {
                assert.equal(convertHandler.spellOutUnit(ele, 1), expect[i]);
            });
            done();
        });
    });
    suite('Function convertHandler.convert(num, unit)', function () {
        test('Gal to L', function (done) {
            var input = [5, 'gal'];
            var expected = 18.9271;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });
        test('L to Gal', function (done) {
            var input = [1, 'l'];
            var expected = 0.264172;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });
        test('Mi to Km', function (done) {
            var input = [1, 'mi'];
            var expected = 1.60934;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });
        test('Km to Mi', function (done) {
            var input = [1, 'km'];
            var expected = 0.621371;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });
        test('Lbs to Kg', function (done) {
            var input = [1, 'lbs'];
            var expected = 0.453592;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });
        test('Kg to Lbs', function (done) {
            var input = [1, 'kg'];
            var expected = 2.20462;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });
    });
});
//# sourceMappingURL=1_unit-tests.js.map
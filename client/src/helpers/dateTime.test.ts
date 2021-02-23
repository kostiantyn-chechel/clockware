import { dateToString, todayPlus, today, nowTimeString, hoursToWords } from './dateTime';

describe('Test dateTime helper', () => {

    const testDate: Date = new Date(1578300000000); // 06/01/2020 10:40 GMT+2
    Date.now = jest.fn(() => 1578300000000);

    describe('dayToString function', () => {

        test('should defined', () => {
            expect(dateToString).toBeDefined()
        });

        test('should return 2020-01-06', () => {
            expect(dateToString(testDate)).toBe('2020-01-06')
        });

    });

    describe('hoursToWords function', () => {

        test('should defined', () => {
            expect(hoursToWords).toBeDefined()
        });

        test('should return "несколько часов" if arg != "1","2","3" ', () => {
            expect(hoursToWords('0')).toBe('несколько часов');
            expect(hoursToWords('5')).toBe('несколько часов');
            expect(hoursToWords('-3')).toBe('несколько часов');
            expect(hoursToWords('2.5')).toBe('несколько часов');
        });

        test('should return "один час", "два часа", "три час" if arg = "1","2","3" ', () => {
            expect(hoursToWords('1')).toBe('один час');
            expect(hoursToWords('2')).toBe('два часа');
            expect(hoursToWords('3')).toBe('три часа');
        });

    });

    describe('today function', () => {

        test('should defined', () => {
            expect(today).toBeDefined()
        });

        test('should return 2020-04-06', () => {
            expect(today()).toBe('2020-01-06');
        });

    });

    describe('todayPlus function', () => {

        test('should defined', () => {
            expect(todayPlus).toBeDefined()
        });

        test('should return 2020-04-06 when shift = 3', () => {
            expect(todayPlus(3)).toBe('2020-04-06');
        });

        test('should return 2020-04-06 when shift = 0', () => {
            expect(todayPlus(0)).toBe('2020-01-06')
        });

        test('should return 2020-04-06 when shift = -3', () => {
            expect(todayPlus(-3)).toBe('2019-10-06')
        });

    });

    describe('nowTimeString function', () => {

        test('should defined', () => {
            expect(nowTimeString).toBeDefined()
        });

        test('should return 2020-01-06 11:00', () => {
            expect(nowTimeString()).toBe('11:00')
        });
    });

});
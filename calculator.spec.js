describe('Calculator.js', function () {

    describe('Calculator', function () {
        let calculator;

        beforeEach(function () {
            calculator = new Calculator();
        })
        it('should initialize total', function () {
            expect(calculator.total).toBeFalsy();
            expect(calculator.total).toBe(0);
        })
        it('should initialize the constructor', function () {
            let calc1 = new Calculator();
            let calc2 = new Calculator();
            expect(calc1).toBeTruthy();
            expect(calc2).toBeTruthy();
            expect(calc1).toEqual(calc2);
        })

        it('should have unique calculator object', function () {
            let calc1 = new Calculator();
            let calc2 = new Calculator();
            expect(calc1).not.toBe(calc2);
        })

        it('should have common methods', function () {
            expect(calculator.add).toBeDefined();
            expect(calculator.subtract).toBeDefined();
            expect(calculator.multiply).not.toBeUndefined();
            expect(calculator.divide).not.toBeUndefined();
        })

        it('should overwrite total value', function () {
            calculator.total = null;
            expect(calculator.total).toBeNull();
        });

        it('should have calculator constructor', function () {
            let arr = [1, 2, 3, 4, 5];
            expect(arr).toContain(3);
            expect(calculator.constructor.name).toContain('Calc');
        });
        it('should return total as a number', function () {
            calculator.total = 0;
            expect(calculator.add(5)).toBe(5);
            expect(calculator.total).toMatch(/-?\d+/);
            expect(typeof calculator.total).toMatch('number');
            expect(typeof calculator.total).toMatch('ber');
        });

        it('should return total as a value', function () {
            calculator.total = 10;
            expect(calculator.total).toEqual(jasmine.anything());
        })

        it('should be an instance', function () {
            calculator.total = 10;
            expect(calculator).toEqual(jasmine.any(Object));
            expect(calculator.total).toEqual(jasmine.any(Number));
        })

        it('should contain total as a key', function () {
            calculator.total = 10;
            expect(calculator).toEqual(jasmine.objectContaining({
                total: 10
            }));

            expect(typeof calculator.total).toEqual(jasmine.stringContaining('number'));
        })

        it('should be an instance of Calculator', function () {
            jasmine.addMatchers(CustomMatcher);
            expect(calculator).toBeCalculator();
        })

        // done is callback used for async functions
        it('should fetch version from external sources', function (done) {
            spyOn(window, 'fetch').and.returnValue(Promise.resolve(new Response('{"version":"0.4"}')))
            calculator.version.then(function (version) {
                expect(version).toBe('0.4');
                done();
            })
        })
    })

    describe('Arithmetic Operations', function () {
        it('should add number to total', function () {
            const calculator = new Calculator();
            calculator.total = 0;
            expect(calculator.add(5)).toBe(5);
        });

        it('should subract number from total', function () {
            const calculator = new Calculator();
            calculator.total = 5;
            expect(calculator.subtract(2)).toBe(3);
        })

        it('should multiply number to total', function () {
            const calculator = new Calculator();
            calculator.total = 5;
            expect(calculator.multiply(2)).toBe(10);
        })

        it('should divide number from total', function () {
            const calculator = new Calculator();
            calculator.total = 10;
            expect(calculator.divide(5)).toBe(2);
        })
        it('does not handle NaN for multiply', function () {
            const calculator = new Calculator();
            calculator.total = 5;
            expect(calculator.multiply('a')).toBeNaN();
        })

        it('should throw error when divide by zero', function () {
            const calculator = new Calculator();
            calculator.total = 10;
            expect(function () { calculator.divide(0) }).toThrow();
            expect(function () { calculator.divide(0) }).toThrow(new Error('number cannot be zero'));
        })

        it('should throw error with message when divide by zero', function () {
            const calculator = new Calculator();
            calculator.total = 10;
            expect(function () { calculator.divide(0) }).toThrowError();
            expect(function () { calculator.divide(0) }).toThrowError('number cannot be zero');
            expect(function () { calculator.divide(0) }).toThrowError(ArithmeticError, ('number cannot be zero'));
        })
    })
});
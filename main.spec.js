describe('Main.js', function () {
    describe('calculate', function () {
        it('should validate if the first number is invalid', function () {
            spyOn(window, 'updateResult');
            calculate('a+3');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });
        it('should validate if the second number is invalid', function () {
            spyOn(window, 'updateResult');
            calculate('3+a');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });
        it('should validate if the operation is invalid', function () {
            spyOn(window, 'updateResult');
            calculate('3_3');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });

        it('should call add', function () {
            const spy = Calculator.prototype
            spyOn(spy, 'add');
            calculate('2+3');
            expect(spy.add).toHaveBeenCalled();
            expect(spy.add).toHaveBeenCalledWith(2);
            expect(spy.add).toHaveBeenCalledWith(3);
            expect(spy.add).toHaveBeenCalledTimes(2);
        })

        it('should call subtract', function () {
            const spy = Calculator.prototype
            spyOn(spy, 'subtract');
            calculate('3-2');
            expect(spy.subtract).toHaveBeenCalled();
            expect(spy.subtract).toHaveBeenCalledWith(2);
            expect(spy.subtract).not.toHaveBeenCalledWith(3);
            expect(spy.subtract).toHaveBeenCalledTimes(1);
        })

        it('should call multiply', function () {
            const spy = Calculator.prototype
            spyOn(spy, 'multiply');
            calculate('2*3');
            expect(spy.multiply).toHaveBeenCalled();
            expect(spy.multiply).not.toHaveBeenCalledWith(2);
            expect(spy.multiply).toHaveBeenCalledWith(3);
            expect(spy.multiply).toHaveBeenCalledTimes(1);
        })

        it('should call divide', function () {
            const spy = Calculator.prototype
            spyOn(spy, 'divide');
            calculate('6/2');
            expect(spy.divide).toHaveBeenCalled();
            expect(spy.divide).toHaveBeenCalledWith(2);
            expect(spy.divide).not.toHaveBeenCalledWith(6);
            expect(spy.divide).toHaveBeenCalledTimes(1);
        })

        it('should call updateResult [Example for callThrough]', function () {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.callThrough();
            calculate('3*3');
            expect(window.updateResult).toHaveBeenCalled();
            expect(Calculator.prototype.multiply).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith(9);
        })

        it('should call updateResult [Example for callFake]', function () {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.callFake(function () {
                return 'Fake Call';
            });
            calculate('3*3');
            expect(window.updateResult).toHaveBeenCalled();
            expect(Calculator.prototype.multiply).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Fake Call');
        })

        it('should call updateResult [Example for returnValue]', function () {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.returnValue('returns a value');
            calculate('3*3');
            expect(window.updateResult).toHaveBeenCalled();
            expect(Calculator.prototype.multiply).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('returns a value');
        })

        it('should call updateResult [Example for returnValues]', function () {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'add').and.returnValues(null, 'second call');
            calculate('3+3');
            expect(window.updateResult).toHaveBeenCalled();
            expect(Calculator.prototype.add).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('second call');
        })

        it('does not handle errors [Example of throwError]', function () {
            spyOn(Calculator.prototype, 'multiply').and.throwError('Some Error');
            // calculate(3*3);
            expect(function () {
                calculate('3 * 3')
            }).toThrowError('Some Error');
        })
    })

    describe('updateResult', function () {
        let element;
        beforeAll(function () {
            element = document.createElement('div');
            element.setAttribute('id', 'result');
            document.body.appendChild(element);
        });
        it('should add result to dom', function () {
            updateResult(5);
            expect(element.innerText).toBe('5');
        });
        afterAll(function () {
            document.body.removeChild(element);
        })
    })

    describe('showVersion', function () {
        it('should call the showVersion method', function (done) {
            const element = spyOn(document, 'getElementById').and.returnValue({
                innerText: null
            });
            const spy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(Promise.resolve('0.9'));
            showVersion();
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1);
            // expect(spy()).toEqual('0.1');
            spy().then(function (version) {
                expect(element().innerText).toBe(version);
                done();
            })

        })
    })
})
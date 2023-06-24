require('../zAlert');

function getContainer() {
    return document.querySelector('div.zAlert');
}

describe('zAlert', () => {
    describe('initialization', () => {
        test('should initialize class zAlert and set its instance as a property of window global object', () => {
            expect(zAlert).not.toBe(null);
            expect(window.zAlert).toBe(zAlert);
        });

        test('should inject css into html', () => {
            const styles = document.querySelector('style');

            expect(styles).not.toBe(null);
            expect(styles.innerHTML.includes('.zAlert')).toBe(true);
        });

        test('should create a div container and inject it into html', () => {
            const container = getContainer();

            expect(container).not.toBe(null);
        });
    });

    describe('show() method', () => {
        const renderedArea = getContainer('div.zAlert_container');
        test('should render strings', (done) => {
            const text_A = 'example text';
            const text_B = 'second example text';
            const text_C = 'third example text';

            (async () => {
                await zAlert.show(text_A);
                expect(renderedArea.textContent.includes(text_A)).toBe(true);
                await zAlert.show(text_B);
                expect(renderedArea.textContent.includes(text_B)).toBe(true);
                await zAlert.show(text_C);
                expect(renderedArea.textContent.includes(text_C)).toBe(true);
                done();
            })();
        });

        test('should render numbers', (done) => {
            const num_A = 123456;
            const num_B = 654321;

            (async () => {
                await zAlert.show(num_A);
                expect(renderedArea.textContent.includes(num_A)).toBe(true);
                await zAlert.show(num_B);
                expect(renderedArea.textContent.includes(num_B)).toBe(true);
                done();
            })();
        });

        test('should render HTMLElement', (done) => {
            const element_A = document.createElement('div');
            const element_B = document.createElement('input');
            element_A.setAttribute('data-testid', 'rendered-div');
            const inputValue = 'example value';
            element_B.value = inputValue;
            element_A.appendChild(element_B);

            (async () => {
                await zAlert.show(element_A);

                const renderedInput = getContainer().querySelector('[data-testid=rendered-div] input');
                expect(renderedInput).not.toBe(true);
                expect(renderedInput.value).toBe(inputValue);
                done();
            })();
        });
    });

    test('show() method should make alert visible, whereas hide() method should hide it and clear the alert', (done) => {
        (async () => {
            await zAlert.show('');
            expect(getContainer().style.opacity).toBe('1');
            expect(getContainer().style.display).not.toBe('none');
            await zAlert.hide();
            expect(getContainer().style.opacity).toBe('0');
            expect(getContainer().style.display).toBe('none');
            expect(getContainer().textContent).toBe('')
            done();
        })();
    });
});

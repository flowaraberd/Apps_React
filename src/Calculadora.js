import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './Stylecalc.css'

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

function Calculadora(props) {
    const [display, setDisplay] = useState({
        numberInput: '0',
        isPrincipal: true,
        hasSigno: false,
        hasPoint: false,
        greaterZero: false
    });

    function clickNumber(number) {
        let numberBefore = ''

        if (display.isPrincipal) {
            setDisplay({ numberInput: number, isPrincipal: false, hasSigno: display.hasSigno, hasPoint: false, greaterZero: display.greaterZero });
            numberBefore = number;
            return 0;
        }
        numberBefore = display.numberInput;
        let numberAfter = numberBefore;

        if(parseInt(number) > 0){
            if(display.hasSigno && numberAfter.endsWith('0')) return 0;
            console.log(11);
            if(display.hasPoint){
                numberAfter += number;
                
                if(display.hasSigno){
                    setDisplay({ numberInput: numberAfter, isPrincipal: display.isPrincipal, hasSigno: display.hasSigno, hasPoint: display.hasPoint, greaterZero: true });
                    
                }
                setDisplay({ numberInput: numberAfter, isPrincipal: display.isPrincipal, hasSigno: display.hasSigno, hasPoint: display.hasPoint, greaterZero: true });
                return 0;
            }
            if(display.hasSigno){
                numberAfter += number;
            }
            setDisplay({ numberInput: numberAfter, isPrincipal: display.isPrincipal, hasSigno: display.hasSigno, hasPoint: false, greaterZero: true });
            return 0;
        }else{
            console.log(display.numberInput.endsWith('0'));
            console.log(numberAfter.endsWith('0'));
            console.log(display);
            if(numberAfter.endsWith('0') && !display.hasPoint && !display.greaterZero){
                console.log(333);
                return 0;
            }
            numberAfter += number;
            if(display.hasSigno){
                setDisplay({ numberInput: numberAfter, isPrincipal: display.isPrincipal, hasSigno: false, hasPoint: false, greaterZero: display.greaterZero ? true : false });
                return 0;
            }
            setDisplay({ numberInput: numberAfter, isPrincipal: display.isPrincipal, hasSigno: display.hasSigno, hasPoint: true, greaterZero: false });
        }
    }

    function doOperation(str) {
        let numbers = Array.isArray(str) ? str : [];
        let numTemp = '';
        let signo = '';
        try {
            if (!str.includes('**') && !str.includes('*') && !str.includes('/')) {
                // console.log("Yeah: " + str);
                return str.join('').toString();
            }
            if (!Array.isArray(str)) {
                for (let i = 0; i < str.length; i++) {
                    if (!isNaN(str[i])) {
                        if (signo.length > 0) {
                            numbers.push(signo);
                        }
                        numTemp += str[i];
                        signo = '';
                    } else {
                        if (numTemp.length > 0) {
                            numbers.push(numTemp);
                        }
                        signo += str[i];
                        numTemp = '';
                    }
                    if (i == str.length - 1) {
                        numbers.push(numTemp);
                    }
                }
            }

            let indexFinded = '';
            if (numbers.includes('**')) {
                indexFinded = numbers.indexOf('**');
                let numOperation = eval((numbers.slice(indexFinded - 1, indexFinded + 2).toString().replaceAll(',', '')));
                numbers[indexFinded - 1] = numOperation;
                numbers.splice(indexFinded, 2);
                

            } else if (numbers.includes('*')) {
                indexFinded = numbers.indexOf('*');
                // console.log(numbers.splice(indexFinded-1, 3));
                let numOperation = eval((numbers.slice(indexFinded - 1, indexFinded + 2).toString().replaceAll(',', '')));
                numbers[indexFinded - 1] = numOperation;
                numbers.splice(indexFinded, 2);
                // console.log(numbers);

            } else if (numbers.includes('/')) {
                indexFinded = numbers.indexOf('/');
                let numOperation = eval((numbers.slice(indexFinded - 1, indexFinded + 2).toString().replaceAll(',', '')));
                numbers[indexFinded - 1] = numOperation;
                numbers.splice(indexFinded, 2);
                // console.log(numbers);
            } else {
                console.log(222);
                return 0;
            }
            doOperation(numbers);

        } catch (error) {
            // console.log(error);
        }
        return numbers.join('').toString();
    }

    function clickOperator(operator) {
        let numberToString = display.numberInput.toString();
        switch (operator) {
            case '.':
                Operation(display, setDisplay, numberToString, '.')
                break;
            case '=':
                let regexp = /[\-\+\/x\^]$/g
                if (!display.isPrincipal && !regexp.test(numberToString)) {
                    //Error al calcular la potencia y otros numeros, se calcula de derecha a izquierda
                    //lo que hace que una operacion 2^2^0 sea igual 2 donde tendría que ser 1.
                    //Y tener en cuenta la jerarquía de la operacion
                    // let resultado = (Math.floor(eval(display.numberInput.replaceAll('^', '**')) * 100000) / 100000).toString();
                    // let resultado = (Math.floor(eval(await doOperation("2*5*5*5**5/78125+1")) * 100000) / 100000).toString();
                    let resultado = (Math.floor(eval(doOperation(display.numberInput.replaceAll('^', '**'))) * 100000) / 100000).toString();
                    // console.log("Y: " + display.numberInput.replaceAll('^', '**'));
                    let isError = resultado == 'NaN' ? 'Error' : resultado == 'Infinity' ? 'Error división' : resultado;
                    setDisplay({ numberInput: resultado == 'NaN' ? 'Error' : resultado == 'Infinity' ? 'Error división' : resultado, isPrincipal: false, hasSigno: false, hasPoint: (isError.includes('.')) ? true : false, greaterZero: (isError === '0') ? false : true });
                    if (isNaN(isError)) {
                        setTimeout(() => {
                            setDisplay({ numberInput: '0', isPrincipal: true, hasSigno: false, hasPoint: false, greaterZero: false });
                        }, 1000);
                    }
                }
                break;
            case '/':
                Operation(display, setDisplay, numberToString, '/')
                break;
            case 'x':
                Operation(display, setDisplay, numberToString, '*')
                break;
            case '-':
                Operation(display, setDisplay, numberToString, '-')
                break;
            case '+':
                Operation(display, setDisplay, numberToString, '+')
                break;
            case 'pow':
                Operation(display, setDisplay, numberToString, '^')
                break;
            case 'ce':
                setDisplay({ numberInput: '0', isPrincipal: true, hasSigno: false, hasPoint: false, greaterZero: false });
                break;
            case 'c':
                let reg = /[\-\+\/\*\^]$/g
                if (display.numberInput.length == 1 || reg.test(display.numberInput)) {
                    setDisplay({ numberInput: '0', isPrincipal: false, hasSigno: false, hasPoint: false, greaterZero: false });
                    return 0;
                }
                setDisplay({ numberInput: display.numberInput.slice(0, display.numberInput.length - 1), isPrincipal: false, hasSigno: reg.test(display.numberInput) ? true : false, hasPoint: display.hasPoint, greaterZero: display.greaterZero });
                break;
            default:
                console.log('Not found!');
        }
    }

    function Operation(display, setDisplay, numberToString, signo) {
        if(numberToString.endsWith(signo)) return 0;
        if(signo === '.' && display.hasPoint) return 0;

        if(signo === '.' && !display.hasPoint && !display.hasSigno){
            console.log(1);
            setDisplay({ numberInput: numberToString.concat(signo), isPrincipal: false, hasSigno: display.hasSigno, hasPoint: true, greaterZero: display.greaterZero });
            console.log(display);
            return 0;
        }

        let regexp = /[\-\+\/\*\^]$/g
            if (!regexp.test(numberToString)) {
                setDisplay({ numberInput: numberToString.concat(signo), isPrincipal: false, hasSigno: true, hasPoint: false, greaterZero: false });
                console.log(2);
                console.log(display);
            }
        }

        return (
            <div className='container-calc'>
                <div className='text-output'>
                    <input type='text' readOnly={true} value={display.numberInput} />
                </div>
                <div className='content-input'>

                    <div className='number'>
                        <ButtonCalc value='7' clases='item7' clic={() => { clickNumber('7') }} />
                        <ButtonCalc value='8' clases='item8' clic={() => { clickNumber('8') }} />
                        <ButtonCalc value='9' clases='item9' clic={() => { clickNumber('9') }} />

                        <ButtonCalc value='4' clases='item4' clic={() => { clickNumber('4') }} />
                        <ButtonCalc value='5' clases='item5' clic={() => { clickNumber('5') }} />
                        <ButtonCalc value='6' clases='item6' clic={() => { clickNumber('6') }} />

                        <ButtonCalc value='1' clases='item1' clic={() => { clickNumber('1') }} />
                        <ButtonCalc value='2' clases='item2' clic={() => { clickNumber('2') }} />
                        <ButtonCalc value='3' clases='item3' clic={() => { clickNumber('3') }} />

                        <ButtonCalc value='.' clases='itemdo' clic={() => { clickOperator('.') }} />
                        <ButtonCalc value='0' clases='item0' clic={() => { clickNumber('0') }} />
                        <ButtonCalc value='=' clases='itemequal' clic={() => { clickOperator('=') }} />

                        <ButtonCalc value='CE' clases='itemece' clic={() => { clickOperator('ce') }} />
                        <ButtonSpecial value='clear' clases='itemc' clic={() => { clickOperator('c') }}>
                            <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.169 9.585L13.6654 7.08138L16.169 4.57771L14.8648 3.27352L12.3612 5.77719L9.85751 3.27352L8.55332 4.57771L11.057 7.08138L8.55332 9.585L9.85751 10.8892L12.3612 8.38557L14.8648 10.8892L16.169 9.585ZM1.24074 8.86968L5.76771 13.3967C6.32598 13.9549 6.79724 14.1628 7.80887 14.1628H18.4309C19.8277 14.1628 20.96 13.0304 20.96 11.6337V2.52906C20.96 1.13231 19.8277 0 18.4309 0H7.80887C6.79724 0 6.32598 0.208041 5.76771 0.766256L1.24074 5.29308C0.253087 6.28073 0.253087 7.88203 1.24074 8.86968V8.86968ZM7.80887 12.6453C7.30306 12.6453 7.10316 12.586 6.84074 12.3237L2.31377 7.7967C1.91868 7.40166 1.91868 6.76115 2.31377 6.36606L6.84074 1.83924C7.10316 1.57687 7.30306 1.51744 7.80887 1.51749H18.4309C18.9897 1.51749 19.4426 1.97039 19.4426 2.52911V11.6337C19.4426 12.1924 18.9897 12.6454 18.4309 12.6454L7.80887 12.6453Z" fill="black" />
                            </svg>
                        </ButtonSpecial>
                    </div>

                    <div className='operator'>
                        <ButtonSpecial value='pow' clases='itemplus' clic={() => { clickOperator('pow') }}>
                            <span>
                                x
                                <sup>x</sup>
                            </span>
                        </ButtonSpecial>
                        <ButtonCalc value='/' clases='itemdiv' clic={() => { clickOperator('/') }} />
                        <ButtonCalc value='x' clases='itemmul' clic={() => { clickOperator('x') }} />
                        <ButtonCalc value='-' clases='itemminus' clic={() => { clickOperator('-') }} />
                        <ButtonCalc value='+' clases='itemplus' clic={() => { clickOperator('+') }} />

                    </div>

                </div>
            </div>
        )
    }

    function ButtonCalc(props) {
        return (
            <button type='button' className={props.clases} onClick={props.clic}>{props.value}</button>
        )
    }
    function ButtonSpecial(props) {
        return (
            <button type='button' className={props.clases} onClick={props.clic}>{props.children}</button>
        )
    }

    root.render(<Calculadora />);
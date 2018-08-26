import React, { Component } from 'react';
import './Calculator.css';
import Display from '../Display/Display'
import ButtonGrid from '../ButtonGrid/ButtonGrid';
import { isNumber, symbols} from '../../helpers';
import {
    addNumber,
    addDecimal,
    addOperator,
    calcAnswer,
    clear,
    handleBackSpace,
    reverseNumber
} from '../../services';

export default class Calculator extends Component {
    constructor() {
        super()
        this.state = {
            formula: ['0'],
            isAnswer: false
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleInput);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleInput);
    }

    // Sets state by calling appropriate function based on given input.
    // Accepts event objects and single character strings.
    handleInput = (e) => {
        const { formula, isAnswer} = this.state;
        const key = (e.key) ? e.key : (typeof e === 'string') ? e : null;

        if (!key) { return };
        
        if (isNumber(key)) { 
            this.setState(addNumber(key, formula, isAnswer));
        } 
        else if (key === symbols.decimal) { 
            this.setState(addDecimal(formula, isAnswer)); 
        }
        else if (key === symbols.times || key === '*') { 
            this.setState(addOperator(symbols.times, formula, isAnswer)); 
        }
        else if (key === symbols.divide || key === '/') { 
            this.setState(addOperator(symbols.divide, formula, isAnswer)); 
        }
        else if (key === symbols.plus || key === '+') { 
            this.setState(addOperator(symbols.plus, formula, isAnswer)); 
        }
        else if (key === symbols.minus || key === '-') { 
            this.setState(addOperator(symbols.minus, formula, isAnswer)); 
        }
        else if (key === 'Backspace') { 
            this.setState(handleBackSpace(formula, isAnswer)); 
        }
        else if (key === 'Escape' || key === symbols.clear) { 
            this.setState(clear(formula, isAnswer)); 
        }
        else if (key === 'Enter' || key === symbols.equals) { 
            this.setState(calcAnswer(formula, isAnswer)); 
        } 
        else if (key === symbols.plusMinus || key === '_') { 
            this.setState(reverseNumber(formula, isAnswer)); 
        }
    };

    render() {
        return (
            <div className='Calculator'>
                <Display isAnswer={this.state.isAnswer} formula={this.state.formula}/>
                <ButtonGrid handleInput={this.handleInput}/>
            </div>
        );
    }
}

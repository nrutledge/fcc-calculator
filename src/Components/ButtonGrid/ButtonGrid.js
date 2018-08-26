import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button'
import { symbols } from '../../helpers/';
import './Button.css';

const ButtonGrid = (props) => {
    return (
        <div className='grid-outer' style={{ width: '100%', height: '360px' }}>
            <div className='grid-inner' style={{ width: '100%', height: '20%' }}>
                <Button 
                    id='clear' 
                    value={symbols.clear} 
                    width='50%' 
                    height='100%'
                    bgColor='rgb(149, 223, 255)' 
                    action={props.handleInput} 
                />              
                <Button 
                    id='divide' 
                    value={symbols.divide} 
                    width='25%' 
                    height='100%'
                    bgColor='rgb(149, 223, 255)' 
                    action={props.handleInput}
                />
                <Button 
                    id='multiply' 
                    value={symbols.times} 
                    width='25%' 
                    height='100%'
                    bgColor='rgb(149, 223, 255)' 
                    action={props.handleInput}
                />
            </div>
            <div className='grid-inner' style={{ width: '75%', height: '80%' }}>
                <Button id='one' value={'1'} width='33.3333%' height='25%' action={props.handleInput}/>
                <Button id='two' value={'2'} width='33.3333%' height='25%' action={props.handleInput}/>
                <Button id='three' value={'3'} width='33.3333%' height='25%' action={props.handleInput}/>
                <Button id='four' value={'4'} width='33.3333%' height='25%' action={props.handleInput}/>
                <Button id='five' value={'5'} width='33.3333%' height='25%' action={props.handleInput}/>
                <Button id='six' value={'6'} width='33.3333%' height='25%' action={props.handleInput}/>
                <Button id='seven' value={'7'} width='33.3333%' height='25%' action={props.handleInput}/>
                <Button id='eight' value={'8'} width='33.3333%' height='25%' action={props.handleInput}/>
                <Button id='nine' value={'9'} width='33.3333%' height='25%' action={props.handleInput}/>
                <Button id='reverse' value='&plusmn;' width='33.3333%' height='25%' action={props.handleInput}/>  
                <Button id='zero' value={'0'} width='33.3333%' height='25%' action={props.handleInput}/>
                <Button id='decimal' value={symbols.decimal} width='33.3333%' height='25%' action={props.handleInput}/>
            </div>
            <div className='grid-inner' style={{ width: '25%', height: '80%' }}>
                <Button 
                    id='subtract' 
                    value={symbols.minus} 
                    width='100%' 
                    height='25%'
                    bgColor='rgb(149, 223, 255)' 
                    action={props.handleInput}/>
                <Button 
                    id='add' 
                    value={symbols.plus} 
                    width='100%' 
                    height='25%'
                    bgColor='rgb(149, 223, 255)' 
                    action={props.handleInput}/>
                <Button 
                    id='equals' 
                    value={symbols.equals} 
                    width='100%' 
                    height='50%'
                    bgColor='rgb(149, 223, 255)' 
                    action={props.handleInput}
                />
            </div>
        </div>
    )
}

ButtonGrid.propTypes = {
    handleInput: PropTypes.func
}

export default ButtonGrid;
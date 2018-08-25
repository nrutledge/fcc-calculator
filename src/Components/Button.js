import React from 'react';
import './Button.css';

const Button = (props) => {
    const { id, value, action, type } = props;

    return (
        <div id={id} role="button" className={'button ' + type} onClick={() => action(value)}>{value}</div>
    );
}

export default Button;
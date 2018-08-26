import React from 'react';
import PropTypes from 'prop-types'
import './Button.css';

const Button = ({ id, value, action, type }) => {
    return (
        <div id={id} role="button" className={'button ' + type} onClick={() => action(value)}>{value}</div>
    );
}

Button.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    action: PropTypes.func,
    type: PropTypes.string
}

export default Button;
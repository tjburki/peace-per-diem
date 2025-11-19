import React from 'react';

const Icon = ({type, pulse = false, spin = false}) => 
    <i className={`fa fa-${type} ${pulse ? 'fa-pulse' : ''} ${spin ? 'fa-spin' : ''}`}></i>;

export default Icon;
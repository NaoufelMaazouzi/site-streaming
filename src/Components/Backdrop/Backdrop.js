import React from 'react';
import './Backdrop.css';

const backdrop = ({ click }) => (
    <div className="backdrop" onClick={click}></div>
);

export default backdrop;
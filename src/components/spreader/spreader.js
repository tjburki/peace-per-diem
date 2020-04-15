import React from 'react';
import axios from 'axios';
import styles from './spreader.module.scss';

export default class Spreader extends React.Component {
    state = {
        newPeace: ''
    };

    setPeace = (e) => {
        const value = e.target.value;
        this.setState({newPeace: value});
    };

    createPeace = () => {
        debugger;
        const { newPeace } = this.state;
        axios.post('http://localhost:3001/peaces', { user_id: 1, text: newPeace });
    };


    render() {
        const { createPeace, setPeace } = this;
        const { newPeace } = this.state;

        return (
            <form className={styles.spreader} onSubmit={e => {e.preventDefault(); createPeace();}}>
                <textarea required maxlength='255' value={newPeace} onChange={setPeace} className='form-control' placeholder='Something that has inspired you or given you hope today'></textarea>
                <button type="submit" className='btn btn-outline-dark'>Speak Your Peace</button>
            </form>
        );
    }
};
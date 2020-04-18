import React from 'react';
import axios from 'axios';
import styles from './spreader.module.scss';
import Peace from '../peace/peace';
import { apiUrl } from '../../constants';

export default class Spreader extends React.Component {
    state = {
        newPeace: '',
        todaysPeace: null,
        peaces: [],
        loading: true
    };

    setPeace = (e) => {
        const value = e.target.value;
        this.setState({newPeace: value});
    };

    createPeace = () => {
        const { newPeace } = this.state;
        axios.post(`${apiUrl}/peaces`, { user_id: this.props.userId, text: newPeace })
            .then(response => {
                this.getPeacesForUser();
            });
    };

    getPeacesForUser = () => {
        axios.get(`${apiUrl}/user/${this.props.userId}/peaces`)
            .then(response => {
                debugger;
                let data = response.data;
                let todaysPeace = null;
                const today = new Date();
                const latestPeaceDate = data[0] ? new Date(data[0].created) : false;

                if (
                    latestPeaceDate && 
                    latestPeaceDate.getDate() === today.getDate() &&
                    latestPeaceDate.getMonth() === today.getMonth() &&
                    latestPeaceDate.getFullYear() === today.getFullYear()
                ) {
                    todaysPeace = data.shift();
                }

                this.setState({newPeace: '', todaysPeace, peaces: data, loading: false});
            });
    };

    componentDidMount() {
        this.getPeacesForUser();
    }

    render() {
        const { createPeace, setPeace } = this;
        const { newPeace, todaysPeace, peaces, loading } = this.state;

        if (loading) return <div>Loading...</div>;

        return (
            <div>
                {
                    !todaysPeace
                        ?   <form className={styles.spreader} onSubmit={e => {e.preventDefault(); createPeace();}}>
                                <textarea rows='6' required maxLength={255} value={newPeace} onChange={setPeace} className='form-control' placeholder='Something that has inspired you or given you hope today'></textarea>
                                <button type="submit" className='btn btn-outline-dark'>Speak Your Peace</button>
                            </form>
                        :   <div className={styles.todayspeace}>
                                <div className={styles.todayspeacetitle}>Today's Peace</div>
                                <Peace text={todaysPeace.text} />
                            </div>
                }
                {
                    peaces.length
                        ?   <div className={styles.peaces}>
                                {
                                    peaces.map(peace => <Peace key={peace.peace_id} text={peace.text} date={peace.created} />)
                                }
                            </div>
                        :   null
                }
            </div>
        );
    }
};
import React from 'react';
import axios from 'axios';
import Peace from '../../components/peace/peace';

export default class Home extends React.Component {
    state = {
        peaces: []
    };

    componentDidMount() {
        axios.get('http://localhost:3001/peaces')
            .then(response => {
                const peaces = response.data;
                this.setState({ peaces });
            });
    }

    render() {
        const { peaces } = this.state;

        return (
            <React.Fragment>
                {
                    peaces.length
                        ?   peaces.map(peace => <Peace key={peace.peace_id} text={peace.text} author={peace.username} date={peace.created} />)
                        :   null
                }
            </React.Fragment>
        );
    }
}
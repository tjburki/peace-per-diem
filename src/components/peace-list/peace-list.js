import React from 'react';
import Peace from '../peace/peace';

const PeaceList = ({peaces}) =>
    <React.Fragment>
        {
            peaces && peaces.length
                ?   peaces.map(peace => <Peace key={peace.peace_id} id={peace.peace_id} userId={peace.user_id} text={peace.text} author={peace.username} date={peace.created} loves={peace.loves} />)
                :   <i>No peaces have been made yet</i>
        }
    </React.Fragment>;

export default PeaceList;
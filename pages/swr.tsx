import React from 'react';
import PropTypes from 'prop-types';
import { StudentDetail } from '@/components/swr/StudentDetail';

function SWRPage() {
    const [detailList, setDetailList] = React.useState([1, 2, 3]);
    const handleAddClick = () => {
        setDetailList((prevList) => [...prevList, 1]);
    };
    return (
        <div>
            <h1>SWR Playground</h1>
            <button onClick={handleAddClick}>Add detail</button>
            <ul>
                {detailList.map((x, i) => (
                    <li key={i}>
                        <StudentDetail studentId="sktwi1cgkkuif36f3" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SWRPage;

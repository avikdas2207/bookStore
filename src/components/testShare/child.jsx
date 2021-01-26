import react from 'react';
import TestParent from './parent';
import { useState } from 'react';

const TestChild = (props) => {
    console.log(props);
    return(
        <div onClick={()=>props.share("hello")} >
            <h1 > from child {props.para} </h1>
        </div>
    )
}
export default TestChild;
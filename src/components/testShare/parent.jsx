import react, { useState } from 'react';
import TestChild from './child';



const TestParent = () => {
    const [ para , setPara ] = useState("");

    const share = (data) => {
        setPara("hello");
        console.log("get child");
        console.log(data);
    }

    return(
        <div >
            <h1 onClick={share }> Hello </h1> 
            <TestChild para={para} share={share} />
        </div>
    )
}
export default TestParent;
import react, {useState , useEffect } from 'react';
import './orderPlaced.scss';
import Order from '../../assets/Order.JPG';

const OrderPlaced = () => {
    const [ random , setRandom ] = useState("");

    useEffect(() => {
        generate();
      }, [])

    const  generate = () => {
        let randomValue = Math.floor(Math.random() * 90000) + 10000;
        console.log(randomValue);
        setRandom(randomValue);
  }

    return(
        <div id="orderContainer">
            <div id="orderImage">
                <img src={Order} alt="orderImage" id="orderPlaced" />
            </div>
            <div id="orderPara">
                <p id="orderText" >hurray! your order is confirmed the order id is {random} save the order id for further communication...</p>
            </div>
            <div id="addTable">
                <table>
                    <tr id="tableHead">
                        <th>Email Us</th>
                        <th>Contact Us</th>
                        <th>Address</th>
                    </tr>
                    <tr id="tableData">
                        <td>admin@bookstore.com</td>
                        <td>+91-9547809716</td>
                        <td>16/16 Ranapratap Road, A-zone , Durgapur</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
export default OrderPlaced;
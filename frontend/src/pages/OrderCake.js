import { useParams, Link } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const OrderCake = () => {
    const { id } = useParams();
    const { user, dispatch } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [address, setAddress] = useState('');
    const [amt, setAmt] = useState(price);
    const [wt, setWt] = useState('1');
    const [url, setUrl] = useState('');

    useEffect(() => {
        try {
            const cur_user = JSON.parse(localStorage.getItem('user'));
            console.log(cur_user);
            if (cur_user) {
                dispatch({ type: 'LOGIN', payload: cur_user });
            }
        } catch (error) {
            // Handle error when parsing or retrieving user from local storage
            console.error('Error retrieving user from local storage:', error);
        }
    }, []);

    useEffect(() => {
        const fetchCake = async () => {
            const response = await fetch('/api/cakes/' + id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();
            if (response.ok) {
                setTitle(json.title);
                setPrice(json.price);
                setImage(json.image);
                console.log(typeof (price));
            }
        }
        if (user) {
            fetchCake();
        }
    }, [user, id]);

    useEffect(() => {
        let new_amt = parseFloat(wt) * parseInt(price)
        setAmt(new_amt.toString());
    }, [wt, price]);

    useEffect(()=>{
        if(user)
        setUrl(
            "https://wa.me/917016506608?text=" + "Name: " + user.name +  "%0a" + "%0a" + "Address: " + address + "%0a" + "%0a" + "Cake: " +  title + "%0a" + "%0a" + "Weight: " + wt + "kg"
        );
    },[title,address,wt]);

    return (
        <div className="container">
            <div className="cake-desc text-center my-4">
                <img src={image} height="150" width="150" />
                <div className="my-2 font-weight-bold">{title}</div>
            </div>
            <form className="order-form">
                <label>Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={user ? user.name : ""}
                    name="title"
                    required
                />

                <label>Address</label>
                <textarea
                    id="address"
                    placeholder="Address"
                    value={address}
                    name="title"
                    required
                    onChange={(e) => {
                        setAddress(e.target.value);
                    }}
                />

                <label>Weight</label>
                <select className="form-select form-select-lg mb-2" aria-label=".form-select-sm example" id="wt" onChange={(e) => setWt(e.target.value)}>
                    <option value="1">1 kg</option>
                    <option value="0.5">0.5 kg</option>
                    <option value="1.5">1.5 kg</option>
                    <option value="2">2 kg</option>
                    <option value="2.5">2.5 kg</option>
                </select>

                <div className="total-amt text-center my-4">
                    <div className="font-weight-bold">Total amount to be paid</div>
                    <span>{amt}</span>
                </div>
                <div className="container text-center">
                    <Link to={url} target="_blank" rel="noopener noreferrer">
                        <button className="btn primary-btn mx-4 my-4"
                        onClick={(e)=>{
                            e.preventDefault();
                            window.open(url,"_blank");
                            window.location.href='/';
                        }}
                        >Order</button>
                    </Link>
                    <Link to='/'>
                        <button className="btn primary-btn mx-4 my-4">Cancel</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
export default OrderCake;
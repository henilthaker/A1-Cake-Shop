import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
const EditCake = () => {
    const { id } = useParams();
    const { user, dispatch } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [req_body, setReqBody] = useState({});
    const [title_changed, setTitleChanged] = useState(false);
    const [image_changed, setImageChanged] = useState(false);
    const [price_changed, setPriceChanged] = useState(false);
    const [is_changed, setIsChanged] = useState(false);
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
            }
        }
        if (user)
            fetchCake();
    }, [user, id])

    const changeToBase64 = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
            setImageChanged(true);
            setIsChanged(true);
        }
        reader.onerror = (error) => {
            console.log(error);
        }
    }

    // to update the req_body to make patch request
    useEffect(() => {
        if (title_changed)
            setReqBody({ ...req_body, title });

        if (price_changed)
            setReqBody({ ...req_body, price });

        if (image_changed)
            setReqBody({ ...req_body, image });
    }, [title, price, image]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/cakes/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(req_body)
        })
        const json = await response.json();
        if (response.ok) {
            setImage('');
            setTitle('');
            setPrice('');
            window.location.href = '/';
        }
        else {
            const error_div = document.body.createElement('div');
            error_div.innerHTML = json.error;
            document.body.appendChild(error_div);
        }

    }
    return (
        < div className="add-cake-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Name"
                        value={title}
                        name="title"
                        required
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setTitleChanged(true);
                            setIsChanged(true);
                        }}
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        type="text"
                        name="price"
                        value={price}
                        placeholder="price"
                        required
                        onChange={(e) => {
                            setPrice(e.target.value);
                            setPriceChanged(true);
                            setIsChanged(true);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="image">Upload Image</label>
                    <input type="file"
                        accept=".png, .jpg, .jpeg"
                        name="image"
                        onChange={changeToBase64}
                    />
                    {image === "" || image == null ? "" : <img src={image} height="120" widht="120" className="my-4" />}
                </div>
                <div>
                    <button type="submit" className="mx-4 my-4" disabled={!is_changed}>Save</button>
                    <button className="mx-4 my-4" type='reset' onClick={() => window.location.href = '/'}>Cancel</button>
                </div>
            </form>
        </div >
    )
}
export default EditCake
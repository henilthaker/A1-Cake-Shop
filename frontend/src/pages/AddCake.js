import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const AddCake = () => {
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
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

    const changeToBase64 = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        }
        reader.onerror = (error) => {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const form = e.currentTarget;
        // const url = form.action;
        // try {
        //     let data = new FormData(form);
        //     let form_data_object = Object.fromEntries(data.entries());
        //     let json_string = JSON.stringify(form_data_object);
        //     const response = await fetch('/api/cakes', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${user.token}`
        //         },
        //         body: json_string
        //     })
        //     const json = await response.json();
        // } catch (error) {
        //     console.error('Error submitting form:', error);
        // }

        const response = await fetch('/api/cakes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ title, price, image })
        })
        const json = await response.json();
        if (response.ok) {
            setImage('');
            setTitle('');
            setPrice('');
            navigate('/');
        }
        else {
            const error_div = document.body.createElement('div');
            error_div.innerHTML = json.error;
            document.body.appendChild(error_div);
        }

    }
    return (
        < div className="add-cake-form">
            <form action="/api/cakes" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Name"
                        value={title}
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
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
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="image">Upload Image</label>
                    <input type="file"
                        accept=".png, .jpg, .jpeg"
                        name="image"
                        onChange={changeToBase64}
                    />
                    {image === "" || image == null ? "" :
                        <div className="text-center">
                            <img src={image} height="140" widht="140" className="my-2" />
                        </div>
                    }
                </div>
                <div className="container text-center">
                    <button type="submit" className="mx-4 my-4">Submit</button>
                    <Link to='/'>
                        <button className="mx-4 my-4">Cancel</button>
                    </Link>
                </div>
            </form>
        </div >
    )
}
export default AddCake
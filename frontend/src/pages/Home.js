import { useContext, useEffect, useState } from 'react';
import CakeCard from '../components/cakeCard';
import { CakeContext } from '../contexts/CakeContext';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
/*
NOTE:
    name by which you import a component must start with capital letters
    if I write cakeCard it won't work
*/

const Home = () => {
    const { cakes, dispatch } = useContext(CakeContext);
    const { user } = useContext(AuthContext);
    const [min_price, setMinPrice] = useState('');
    const [max_price, setMaxPrice] = useState('');

    const fetchCakes = async (min_price = 0, max_price = 1000) => {
        const url = `/api/cakes?min_price=${min_price}&max_price=${max_price}`;
        console.log(url);
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        if (response.ok)
            dispatch({ type: 'SET_CAKE', payload: json });
    }

    useEffect(() => {
        if (user)
            fetchCakes();
    }, [dispatch, user]);
    // used user.token as I was getting warning that useEffect has a missing dependency: 'user.token' so either include it or remove dependency array
    return (
        <div className="home">
            <div className="container">
                <div className="mx-4 my-4">
                    <form className="price-filter" onSubmit={(e) => {
                        e.preventDefault();
                        console.log(min_price, max_price);
                        fetchCakes(min_price, max_price);
                    }}>
                        <input type="text" value={min_price} id="min" placeholder="min price"
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input type="text" value={max_price} id="max" placeholder="max price"
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                        <button>Apply</button>
                    </form>
                </div>
                <div className="allCakes">
                    {
                        cakes && cakes.map(cake => {
                            return (
                                <CakeCard key={cake._id} cake={cake} user={user} />
                            )
                        })
                    }
                </div>
            </div>
            {
                user.role === 'admin' &&
                (<div className="add-btn-container">
                    <div className="add-btn">
                        <Link to='/add-cake'>
                            <i className="fa fa-plus"></i>
                        </Link>
                    </div>
                </div>)
            }
        </div>
    )
}
export default Home;
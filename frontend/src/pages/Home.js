import { useContext, useEffect, useState } from 'react';
import CakeCard from '../components/cakeCard';
import { CakeContext } from '../contexts/CakeContext';
import { AuthContext } from '../contexts/AuthContext';
/*
NOTE:
    name by which you import a component must start with capital letters
    if I write cakeCard it won't work
*/

const Home = () => {
    const { cakes, dispatch } = useContext(CakeContext);
    const { user } = useContext(AuthContext);
    console.log(user);
    useEffect(() => {
        const fetchCakes = async () => {
            const response = await fetch('/api/cakes', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok)
                dispatch({ type: 'SET_CAKE', payload: json });
        }
        fetchCakes();

    }, [dispatch, user.token]);
    // used user.token as I was getting warning that useEffect has a missing dependency: 'user.token' so either include it or remove dependency array
    return (
        <div className="home">
            <div className="allCakes">
                {
                    cakes && cakes.map(cake => {
                        return (
                            <CakeCard key={cake._id} cake={cake} />
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Home;
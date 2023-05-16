import { useContext, useEffect, useState } from 'react';
import CakeCard from '../components/cakeCard';
import { CakeContext } from '../contexts/CakeContext';
/*
NOTE:
    name by which you import a component must start with capital letters
    if I write cakeCard it won't work
*/

const Home = () => {
    const {cakes,dispatch} = useContext(CakeContext);
    useEffect(() => {
        const fetchCakes = async () => {
            const response = await fetch('/api/cakes');
            const json = await response.json();
            if (response.ok)
                dispatch({type:'SET_CAKE', payload:json});
        }
        fetchCakes();

    }, [dispatch]);
    console.log(cakes);
    return (
        <div className="home">
            <div className="allCakes">
                {
                    cakes && cakes.map(cake => {
                        return(
                            <CakeCard key = {cake._id} cake={cake} />
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Home;
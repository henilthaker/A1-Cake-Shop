import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { CakeContext } from '../contexts/CakeContext';
const CakeCard = ({ cake }) => {
    const { dispatch } = useContext(CakeContext);
    const { user } = useContext(AuthContext);

   const confirmAsync = (message)=>{
    return new Promise((resolve,reject)=>{
        const cnf_msg = window.confirm(message);
        resolve(cnf_msg);
        // don't use just confirm, use window.confirm
    });
   }
    const requestDelete = async () => {
        // const cnf_del = confirm('Do you want to delete this cake?');

        // NOTE: confirm does not work in async function as it is synchronous in nature so we use below function returning a promise

        const cnf_del = await confirmAsync('Do you want to delete this cake?');

        if (cnf_del) {
            const response = await fetch(`/api/cakes/${cake._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }
            )
            const json = await response.json();

            if (!response.ok)
                console.log(json.error);
            else {
                console.log(json);
                dispatch({ type: 'DELETE_CAKE', payload: json });
            }
        }
    }
    return (
        <div className="card">
            <img src={cake.image} className="card-img-top" alt="" />
            <div className="card-body">
                <h5 className="card-title">{cake.title}</h5>
                <div className="price-and-comment">
                    <span className="card-text">&#8377; {cake.price}</span>
                    <Link to={`/comments/${cake._id}`}>
                        <i className="fa fa-comment-o comment-icon">
                            <div className="review-text">Reviews</div>
                        </i>
                    </Link>

                </div>
                {user.role === 'customer' &&
                    <Link to="/" className="btn btn-primary">Buy</Link>}
                {
                    user.role === 'admin' &&
                    (
                        <div className="btn-container">
                            <Link to={`/edit-cake/${cake._id}`} className="btn btn-primary">Edit</Link>
                            <button className="btn primary-btn delete-btn" onClick={requestDelete}>Delete</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default CakeCard;
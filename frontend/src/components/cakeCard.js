import { Link } from 'react-router-dom';
const cakeCard = ({ cake }) => {
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
                <Link to="/" className="btn btn-primary">Buy</Link>
            </div>
        </div>
    )
}
export default cakeCard;
import { Link } from 'react-router-dom';
const cakeCard = ({ cake }) => {
    return (
        <div className="card">
            {/* <img src={`data:image/${cake.img.contentType};base64,cake.img.data.toString('base64')`} className="card-img-top" alt="" /> */}
            <div className="card-body">
                <h5 className="card-title">{cake.title}</h5>
                <div className="comments">
                    <Link to={`/comments/${cake._id}`}>
                        <i className="fa fa-comment-o comment-icon"></i>
                    </Link>
                </div>
                <p className="card-text">{cake.price}</p>
                <Link to="/" className="btn btn-primary">Buy</Link>
            </div>
        </div>
    )
}
export default cakeCard;
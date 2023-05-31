import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
const CommentPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [all_comments, setAllComments] = useState(null);
    const [message, setMessage] = useState('');
    // console.log(user);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/cakes/comments/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ 'description': message })
        })
        const json = await response.json();
        if (response.ok)
            window.location.reload(false);
        console.log(json.error);
    };

    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch('/api/cakes/' + id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();
            if (response.ok) {
                // dispatch({ type: 'SET_CAKE', payload: json });
                // above line will set cakes to the array of single cake but then if we go to home page, we will not get all cakes, so we do not do this and instead use 'json' which will be that single cake itself
                setAllComments(json.comments);
            }
        }
        // when refreshing the comments page, user becomes null and then is set by the reducer function so if user is not null then only fetch the comments and so I am also specifying user as a dependency
        if (user)
            fetchComments();
    }, [user, id]);
    return (
        <div className="comment-list">
            <h2>Reviews</h2>
            {
                all_comments && all_comments.map(comment => {
                    return (
                        <div className="comment" key={comment._id}>
                            <span>{comment.username}: {comment.description}</span>
                        </div>
                    )
                })
            }
            <form onSubmit={handleSubmit}>
                <div className="form-floating">
                    <textarea placeholder="Your Review" value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                    }} />
                    <button className="my-4" disabled={user !== null && user.role === 'admin'}>Submit</button>
                </div>
            </form>
        </div>
    )
}
export default CommentPage;
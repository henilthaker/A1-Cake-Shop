import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
const CommentPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [all_comments, setAllComments] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await fetch('/api/cakes/comments/'+id,{
            method:'PATCH',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({'description': message})
        })
    }

    useEffect(() => {
        const fetchSingleCake = async () => {
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
        fetchSingleCake();
    },[])
    return (
        <div className="comment-list">
            <h2>Comments</h2>
            {
                all_comments && all_comments.map(comment => {
                    return (
                        <div className="comment" key={comment._id}>
                            <span>{comment.username}: {comment.description}</span>
                        </div>
                    )
                })
            }
            <form onSubmit = {handleSubmit}>
                <div className="form-floating">
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" value = {message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }} />
                    <label htmlFor="floatingTextarea">Comments</label>
                    <button className="my-4">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default CommentPage;
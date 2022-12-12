import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {db} from "../firebase-config";
import {
    collection, deleteDoc, doc, onSnapshot
} from "firebase/firestore";
import {useAuth} from "../contexts/auth-context";
import {Button, Col, Row, Table} from "react-bootstrap";

const Favourite = () => {
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    let [likes, setLikes] = useState([]);

    console.log(currentUser.email)

    if (!currentUser.email) {
        navigate("/login")
    }

    useEffect(() => {
        onSnapshot(collection(db, "likes"), (snapshot) => {
            setLikes((snapshot.docs.map(((doc) => ({...doc.data(), id: doc.id})))))
        })
    }, []);


    likes = likes.filter((like) =>
            like.email === currentUser.email)

    const deleteLike = async (id) => {
        const likeDoc = doc(db,"likes",id)
        await deleteDoc(likeDoc);
    }

    return (
        <div >
            <h1>My Favourites</h1>

            <Table striped className="mt-2">
                <thead>
                <tr>
                    <th>Drink Name</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>

            <tbody>
            {likes?.map((like) => (
                <tr className="mt-2">
                    <td className="fw-bold">
                    {like.drinkName}
                    </td>
                    <td>
                        <Button  variant="secondary "
                                 onClick={()=> deleteLike(like.id)}>Delete</Button>
                    </td>
                    <td>
                        <Link to={`/detail/${like.drinkId}`} >
                            <Button>
                                See Detail
                            </Button>
                        </Link>
                    </td>

                </tr>

            ))}
            </tbody>
            </Table>
        </div>
    )
}
export default Favourite;
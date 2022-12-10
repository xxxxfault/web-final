import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {db} from "../firebase-config";
import {
    addDoc,
    collection, deleteDoc, doc, onSnapshot
} from "firebase/firestore";
import {useAuth} from "../contexts/auth-context";
import {Button, Col, Row} from "react-bootstrap";

const Order = () => {
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    let [orders, setOrders] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const ordersCollectionRef = collection(db, "orders");

    console.log(currentUser.email)

    if (!currentUser.email) {
        navigate("/login")
    }

    useEffect(() => {
        onSnapshot(collection(db, "orders"), (snapshot) => {
            setOrders((snapshot.docs.map(((doc) => ({...doc.data(), id: doc.id})))))
        })

    }, []);

    useEffect(() => {
        onSnapshot(collection(db, "staffs"), (snapshot) => {
            setStaffs((snapshot.docs.map(((doc) => ({...doc.data(), id: doc.id})))))
        })
    }, []);

const staff = staffs.filter((staff)=>staff.email===currentUser.email)
    if(staff.length===0) {
        orders = orders.filter((order) =>
            order.email === currentUser.email
        )
    }

    const [newOrder, setNewOrder] = useState("");

    const createOrder = async () => {
        await addDoc(ordersCollectionRef, {email: currentUser.email, detail: newOrder});
    }

    const deleteOrder = async (id) => {
        const orderDoc = doc(db,"orders",id)
        await deleteDoc(orderDoc);
    }

    return (
        <div >
            <h1>Orders</h1>
            <Row className="mt-2">
                <Col className="fw-bold ">

            <input placeholder="New Order" onChange={(event) => {
                setNewOrder(event.target.value)
            }}/>
                </Col>

                <Col>
            <Button className="m-lg-2" onClick={createOrder}>Add New Order</Button>
            </Col>
            </Row>
            <h3>Orders History</h3>
                {orders?.map((order) => (

                    <Row className="mt-2">
                        <Col className="fw-bold">
                            Order Detail: {order.detail}
                        </Col>
                        <Col>
                            <Button  variant="secondary "
                                     onClick={()=> deleteOrder(order.id)}>Delete Order</Button>
                        </Col>
                    </Row>

                ))}
        </div>
    )
}
export default Order;
import {Link, useLocation} from "react-router-dom";
import {useAuth} from "../contexts/auth-context";
import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase-config";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from "react-bootstrap";

function NavHead() {
    const [staffs, setStaffs] = useState([]);
    const location = useLocation();

    const staffsCollectionRef = collection(db, "admin");

    useEffect(() => {
        const getStaffs = async () => {
            const data = await getDocs(staffsCollectionRef);
            console.log(data);
            setStaffs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        return () => { getStaffs()};
    }, []);
    return (
        <>
                <Navbar bg="light" variant="light" expand="lg">
                    <Navbar.Brand className="d-inline-block align-top" href="/">Online Order</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Nav  activeKey={location.pathname} className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/signup">Sign up</Nav.Link>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                            <Nav.Link href="/myorder">Order</Nav.Link>
                            <Nav.Link href="/favourite">Favourite</Nav.Link>
                            <Nav.Link href="/search">Search</Nav.Link>
                            <Nav.Link href="/staff">Staff</Nav.Link>
                        </Nav>
            </Navbar>
        </>

    );
}

export default NavHead;
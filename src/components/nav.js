import {Link} from "react-router-dom";
import {useAuth} from "../contexts/auth-context";
import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase-config";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from "react-bootstrap";

function NavHead() {
    const [ifAdmin, setIfAdmin] = useState(true);
    // const currentUser = useAuth();
    //
    const [staffs, setStaffs] = useState([]);

    const staffsCollectionRef = collection(db, "admin");

    useEffect(() => {
        const getStaffs = async () => {
            const data = await getDocs(staffsCollectionRef);
            console.log(data);
            setStaffs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        return () => { getStaffs()};
    }, []);

    // const adminEmail=Array.from(staffs,(staff)=>(staff.email));
    // console.log(adminEmail)
    // // const ifAdmin=adminEmail.some(currentUser?.email);
    //
    // adminEmail?.forEach(email =>{
    //     if(email==currentUser?.email) {
    //     setIfAdmin(true);}
    //  }
    // )
    // console.log(ifAdmin);
    // console.log(currentUser);



    return (

        <>
                <Navbar bg="light" variant="light" expand="lg">
                    <Navbar.Brand className="d-inline-block align-top" href="home">Online Order</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Nav className="m-lg-1">
                           <Nav.Link href="staff">Staff</Nav.Link>
                            <Nav.Link href="home">Menu</Nav.Link>
                            <Nav.Link href="login">Login</Nav.Link>
                            <Nav.Link href="signup">Sign up</Nav.Link>
                            <Nav.Link href="profile">Profile</Nav.Link>
                            <Nav.Link href="myorder">Order</Nav.Link>
                            <Nav.Link href="search">Search</Nav.Link>
                        </Nav>
            </Navbar>
        </>


    );
}

export default NavHead;
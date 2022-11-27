import {Link} from "react-router-dom";
import {useAuth} from "../contexts/auth-context";
import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase-config";

function Nav() {
    const [ifAdmin, setIfAdmin] = useState(true);
    // const currentUser = useAuth();
    //
    // const [staffs, setStaffs] = useState([]);
    //
    // const staffsCollectionRef = collection(db, "admin");
    //
    // useEffect(() => {
    //     const getStaffs = async () => {
    //         const data = await getDocs(staffsCollectionRef);
    //         console.log(data);
    //         setStaffs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     };
    //     getStaffs();
    // }, []);
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
        <div>
            { ifAdmin && <Link to="/staff">Staff</Link>} |
            <Link to="/home">Home</Link> |
            <Link to="/login">Login</Link> |
            <Link to="/signup">Sign up</Link> |
            <Link to="/profile">Profile</Link>
        </div>
    );
}

export default Nav;
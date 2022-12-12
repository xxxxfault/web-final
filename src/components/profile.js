import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/auth-context";
import {Button} from "react-bootstrap";

const Profile = () => {
    const [error, setError] = useState()
    const {currentUser, signout} = useAuth()
    const navigate = useNavigate()
    const handleSignout = async () => {
        try {
            await signout()
            navigate("/")
        } catch(e) {
            setError(e.message)
        }
    }
    return (
        <div>
            <h1>Profile</h1>
            { error &&
                <div className="alert-danger mb-2 p-2">
                    {error}
                </div>
            }
            <br/>

            <div>
                <h4>My Email: {currentUser?.email}</h4>

            </div>
            <Link to={`/myorder`} >
                <Button className="mt-2" >
                    See Order
                </Button>
            </Link>
            <br/>
            <Link to={`/favourite`} >
                <Button className="mt-2" >
                    See My Favourite
                </Button>
            </Link>
<br/>
            <Button className="btn btn-danger mt-2"
                    onClick={handleSignout}>
                Sign Out
            </Button>
        </div>
    );
};

export default Profile;
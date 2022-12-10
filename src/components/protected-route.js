import {Navigate} from "react-router";
import {useAuth} from "../contexts/auth-context";


const ProtectedRoute=({children})=>{
    const {currentUser} = useAuth()

    if (!currentUser){
        return <Navigate to ='/login'/>
    }

    return children;

}

export default  ProtectedRoute
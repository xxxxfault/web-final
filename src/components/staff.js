
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
    collection,
    getDocs,
} from "firebase/firestore";

const Staff =() =>{
    const [staffs, setStaffs] = useState([]);
    const staffsCollectionRef = collection(db, "staffs");

    useEffect(() => {
        const getStaffs = async () => {
            const data = await getDocs(staffsCollectionRef);
            console.log(data);
            setStaffs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getStaffs()
    }, []);

    return (

        <div>
            <h1>Current Staff</h1>
            {staffs?.map((staff)=> (
                <h3>
                    Email:{staff.email}
                </h3>
                ))}
        </div>
    )


}
export default Staff;
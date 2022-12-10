import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {db} from "../firebase-config";
import {
    addDoc,
    collection, deleteDoc, doc, getDoc,
    getDocs, onSnapshot, query, updateDoc, where,
} from "firebase/firestore";
import {useAuth} from "../contexts/auth-context";
import {Button, Table} from "react-bootstrap";

const Staff = () => {
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    const [staffs, setStaffs] = useState([]);
    const staffsCollectionRef = collection(db, "staffs");

    console.log(currentUser.email)

    if (!currentUser.email || currentUser.email !== 'admin@gmail.com') {
        navigate("/home")
    }

    useEffect(() => {
        onSnapshot(collection(db, "staffs"), (snapshot) => {
            setStaffs((snapshot.docs.map(((doc) => ({...doc.data(), id: doc.id})))))
        })
    }, []);


    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newAge, setNewAge] = useState("");
    const [newPhone, setNewPhone] = useState("");

    const createStaff = async () => {
        await addDoc(staffsCollectionRef, {name: newName, age: newAge, email: newEmail, phone: newPhone});
    }
    const deleteStaff = async (id) => {
        const staffDoc = doc(db, "staffs", id)
        await deleteDoc(staffDoc);
    }
    const updateStaff = async (id, age) => {
        const userDoc = doc(db, "staffs", id);
        const newFields = {age: age + 1};
        await updateDoc(userDoc, newFields);
    };


    return (
        <div className="">
            <h1>Manage Staff</h1>
            <Table striped>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Phone</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <input  onChange={(event) => {
                            setNewName(event.target.value)
                        }}/>
                    </td>
                    <td>              <input  onChange={(event) => {
                        setNewEmail(event.target.value)
                    }}/> </td>
                    <td>            <input type="number"  onChange={(event) => {
                        setNewAge(event.target.value)
                    }}/></td>
                    <td>            <input  onChange={(event) => {
                        setNewPhone(event.target.value)
                    }}/></td>
                    <td>     <Button onClick={createStaff}>Add Staff</Button> </td>
                    <td> </td>

                </tr>



            {staffs?.map((staff) => (
                <tr>
                    <td>
                        Name: {staff.name}
                    </td>
                <td>  Email: {staff.email} </td>
                 <td>Age: {staff.age}</td>
                <td>Phone: {staff.phone}</td>
                    <td><Button onClick={() => updateStaff(staff.id, staff.age)} variant="info">Increase Age</Button>  </td>
                        <td><Button onClick={() => deleteStaff(staff.id)} variant="secondary"> Delete Staff</Button>  </td>
                </tr>
            ))}
                </tbody>
            </Table>
        </div>
    )


}
export default Staff;
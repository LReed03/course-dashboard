import { reload } from "firebase/auth";
import { auth } from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function VerifyPage(){
    const navigate = useNavigate();
    const [errorMessgae, setErrorMessage] = useState('')
    const handleIHaveVerified = async () => {
        if (!auth.currentUser) return;
        await reload(auth.currentUser);
        if (auth.currentUser.emailVerified) {
            navigate("/"); 
        } else {
            setErrorMessage("Still not verified. Try again in a moment.");
  }
};
    return(
        <div>
            <button onClick={handleIHaveVerified}>I have verified</button>
        </div>
    )
}

export default VerifyPage;
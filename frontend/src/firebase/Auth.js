import { auth } from "./Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, updatePassword, sendEmailVerification, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink} from "firebase/auth";
import { signup } from "../api/AuthAPI";


export const doCreateUserWithEmailAndPassword = async (email, password) => {
    const result = createUserWithEmailAndPassword(auth, email, password);
    return result;
}

export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const doSignInWithGoogle = async() => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    await signup();
    return result;
}

export const doSignOut = () => {
    return auth.signOut();
}

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
}

// export const doPasswordChange = (password) => {
//     return updatePassword(auth.currentUser, password);
// }
export const doSendEmailVerification = () =>{
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/`,
        handleCodeInApp: true
    })
}



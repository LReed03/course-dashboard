import React from "react";
import LoginComp from "../components/auth/LoginComp";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Login(){
    return(
        <div>
            <Header/>
            <LoginComp/>
            <Footer/>
        </div>
    )
}

export default Login;
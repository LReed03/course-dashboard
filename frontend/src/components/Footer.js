import React from "react";
import "../styles/Footer.css";
import { doSignOut } from "../firebase/Auth";
import { useAuth } from "../contexts/authcontext";

function Footer() {
  const {userLoggedIn} = useAuth();
  function signOut(){
    doSignOut();
    window.location.reload();
  }
  return (
    <footer className="footer">
      <p>Landon Reed • © 2025</p>
    </footer>
  );
}

export default Footer;
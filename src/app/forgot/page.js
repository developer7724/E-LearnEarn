'use client'; // using client side rendering

import Image from "next/image"; // Importing Image component from next/image package
import styles from "./page.module.css"; // Importing styles from css module file
import { useState, useEffect } from 'react'; // Importing Hooks from React to handle state management
import Footer from "../components/footer"; // Importing footer component from another module
import Link from 'next/link'; // Importing Link component to allow for smooth navigation between pages
import { set } from "lodash";

export default function forgotPassword() {
    const [show, setShow] = useState('translateX(-100%)'); // State variable to hide and show the dropdown menu in mobile view
    const [showPassword, setShowPassword] = useState(false); // State variable to store the state of password input and determine whether to hide it or show it

    // This function is used to set the new state of the showPassword variable either from true to false or vice-versa 
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const [display, setDisplay] = useState('none'); //  State variable to show or hide alert boxes that display the error messages
    const [success, setSuccess] = useState('none'); // State variable to show or hide alert boxes that displays a success message on signup
    const [error, setError] = useState(''); 

    const handleChange = (e) => {
        const { name, value } = e.target;

        if(name === "email"){
            setEmail(value);
        }
        if(name === "phone_number"){
            setPhoneNumber(value);
        }
        if(name === "newPassword"){
            setNewPassword(value);
        }
        if(name === "confirm") {
            setConfirm(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const queryParams = new URLSearchParams({
            email,
            phone_number: phoneNumber,
            newPassword,
        });
    
        const url = `http://192.168.29.134:1030/forget_password?${queryParams}`;

        if(!email || !phoneNumber || !newPassword || !confirm) {
            setError("All fields are Required!"); // Set the error messag
            setDisplay('flex'); // Set display to flex to show the alert box
            return; // Terminate execution of function
        }

        if(newPassword != confirm) {
            setError("Passwords do not match!"); // Set the error messag
            setDisplay('flex'); // Set display to flex to show the alert box
            return; // Terminate execution of function
        }
    
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                // No body required for PUT request with query parameters
            });
    
            if (response.ok) {
                console.log('Password updated successfully!');
                setDisplay('none'); // Hide the alert box
                setSuccess('grid'); // Show the success message
            } else {
                console.error('Failed to update password:', response.statusText);
                // Handle the error, display an error message, or take appropriate action
            }
        } catch (error) {
            console.error('Error updating password:', error.message);
            // Handle network errors or other exceptions
        }
    };

    return (
        <main className={styles.main}>

    {/* dropdown menu for mobile view */}
    <div className={styles.dropdown} style={{ transform: `${show}` }}>
    <Image
        className={styles.cross}
        src="/cross.svg"
        alt="logo"
        width={24}
        height={24}
        onClick={() => setShow('translateX(-100%)')}
    /> {/* Cross button sets the show variable to translate(-100%) along the x axis to move out of the screen again  */}
    {/* contains list of links to different pages using static routing */}
    <ul className={styles.mobile_link}>
        <li className={`${styles.link}`}><Link href="/">Home</Link></li>
        <li className={styles.link}><Link href="/courses">Courses</Link></li>
        <li className={styles.link}>Packages</li>
        <li className={`${styles.link}`}><Link href="/about">About Us</Link></li>
        {/* <li style={{ float: 'left', margin: '0px 12px' }}>
            <button className={styles.btn}><Link href="/signup">Signup/Login</Link></button>
        </li> */}
    </ul>  
    </div>
    {/* Navigation bar */}
    <nav className={styles.nav}>
        <Image
        className={styles.logo}
        src="/logo.png"
        alt="logo"
        width={200}
        height={54}
        />
        {/* contains list of links to different pages using static routing */}
        <ul className={styles.desktop_link}>
        <li className={`${styles.link}`}><Link href="/">Home</Link></li>
        <li className={styles.link}><Link href="/courses">Courses</Link></li>
        <li className={styles.link}>Packages</li>
        <li className={`${styles.link}`}><Link href="/about">About Us</Link></li>
        {/* <li style={{ float: 'left', margin: '0px 12px' }}>
            <button className={`${styles.btn}`}><Link href="/signup">Signup/Login</Link></button>
        </li> */}
        </ul>
        <Image className={styles.menu}
        src="/hamburger.svg"
        alt="menu"
        width={34}
        height={34}
        onClick={() => setShow('translateX(0)')}
        /> {/* Hamburger menu is only visible in mobile view and when clicked, It sets the show variable to translate 0px along the x-axis so that the dropdown menu comes into view */}
    </nav>

    <div className={styles.home}>
        <div className={styles.left}>
            <h1 className={styles.h1}>Welcome</h1>
            <p className={styles.para}>Congratulations! You're just one step away from securing your account even further.</p>
            <Link href="/login"><button className={styles.button}>Login</button></Link>
        </div>
        <div className={styles.right}>
            {/* Form heading */}
            <h1 style={{ color: 'rgba(12, 29, 44, 0.75)' }}>Reset Password</h1> 
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.alert} style={{ display: `${display}` }}>{error && error}</div>
                {/* Display of the alert message is set to the current state of the display variable */}
                <div className={styles.alert_success} style={{ display: `${success}` }}>Successfully Registered!</div>
                <input name="email" type="email" className={styles.input} spellCheck="false" placeholder="Enter your Email" style={{ marginBottom: '12px' }} value={email} onChange={handleChange} />
                <input name="phone_number" type="number" className={styles.input} spellCheck="false" placeholder="Enter your mobile Number" style={{ marginBottom: '12px' }} value={phoneNumber} onChange={handleChange} />
                <div className={styles.div} style={{ position: 'relative' }}>
                        {/* Set input type to text if showPassword is true and to password if it is false */}
                        <input name="newPassword" type={showPassword ? 'text' : 'password'} className={styles.input} spellCheck="false" placeholder="Enter your Password" value={newPassword} onChange={handleChange} />
                        <Image
                        className={styles.open}
                        src="/open.png"
                        alt="open"
                        width={20}
                        height={20}
                        style={{ display: showPassword ? 'block' : 'none' }}
                        onClick={togglePasswordVisibility}
                        /> {/* Set the Display of open-eye icon to none if the showPassword is false which means the toggle function was triggered ny onclick event from closed-eye icon */}
                        <Image
                        className={styles.closed}
                        src="/closed.png"
                        alt="closed"
                        width={20}
                        height={20}
                        style={{ display: showPassword ? 'none' : 'block' }}
                        onClick={togglePasswordVisibility}
                        /> {/* Set the Display of closed-eye icon to none if the showPassword is true which means the toggle function was triggered ny onclick event from open-eye icon */}
                </div>
                {/* Confirm Password has an input type text to allow the user to easily check for equity between password and confirm password  */}
                <input type="text" name="confirm" value={confirm} onChange={handleChange} className={styles.input} placeholder="Re-enter Password" style={{ marginTop: '8px' }} />
                <div className={styles.btn_div}>
                <button className={styles.login}>Reset</button>
                </div>
            </form>
        </div>
    </div>

        </main>
    );
}
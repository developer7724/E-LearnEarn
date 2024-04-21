'use client'; // using client side rendering

import Image from "next/image"; // Importing Image component from next/image package
import styles from "./page.module.css"; // Importing styles from css module file
import { useState, useEffect } from 'react'; // Importing Hooks from React to handle state management
import Footer from "../components/footer"; // Importing footer component from another module
import Link from 'next/link'; // Importing Link component to allow for smooth navigation between pages
import { useRouter } from 'next/navigation'; // Importing a routing hook to allow for routing features

export default function Signup() {
    const [show, setShow] = useState('translateX(-100%)'); // State variable to hide and show the dropdown menu in mobile view
    const [showPassword, setShowPassword] = useState(false); // State variable to store the state of password input and determine whether to hide it or show it
    const [display, setDisplay] = useState('none'); //  State variable to show or hide alert boxes that display the error messages
    const [error, setError] = useState(''); // State variable that sets the error message
    const [success, setSuccess] = useState('none'); // State variable to show or hide alert boxes that displays a success message on signup
    const [confirm, setConfirm] = useState(''); // State variable to store the confirm password value 

    // This function is used to set the new state of the showPassword variable either from true to false or vice-versa 
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Object to initialize state Variable 
    const initialFormData = {
        first_name: '',
        last_name: '',
        country: '',
        state: '',
        age: '',
        gender: '',
        phone_number: '',
        email: '',
        password: ''
      };
    
      const [formData, setFormData] = useState(initialFormData); // State variable to store form data 
      const [isChecked, setIsChecked] = useState(false); // State variable to store the current value of checkbox, i.e, if the checkbox is cliked or not

      // Function to handle change in state of the isChecked variable and set it to the new state
      const handleCheckbox = (e) => {
        setIsChecked(e.target.checked);
      };
    
      // Function to handle change in input data of form and set the new data to each of the attribute of the initial object
      const handleChange = (e) => {
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value })); // Rest and Spread operators are used to include previous changes to these attributes as well
      }; 
    
      // This function is responsible for making and handling API request
      const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any of the field is empty 
        if (!formData.first_name || !formData.last_name || !formData.country || !formData.state || !formData.age || !formData.gender || !formData.phone_number || !formData.email || !formData.password) {
            setError("All fields are Required!"); // Set the error message
            setDisplay('flex'); // Set display to flex to show the alert box
            return; // Terminate execution of function
        }

        // Check if password and confirm password entered are the same 
        if (formData.password != confirm) {
            setError("Passwords do not match!"); // Set the error message
            setDisplay('flex'); // Set display to flex to show the alert box
            return; // Terminate execution of function
        }

        // Check is the checkbox is checked 
        if (!isChecked) {
            setError("Accept the terms & conditions."); // Set the error messag
            setDisplay('flex'); // Set display to flex to show the alert box
            return; // Terminate execution of function
        }

        try {
            // Convert form data to URLSearchParams format
            const queryParams = new URLSearchParams(formData);
            // Send a POST request to the specified URL with the form data as query parameters
            const response = await fetch(`http://192.168.29.134:1030/register?${queryParams}`, {
                method: 'POST', // Specify the request method as POST
            });
        
            // If the response is successful (status code 2xx)
            if (response.ok) {
                console.log('Entry submitted successfully!');
                setDisplay('none'); // Hide the alert box
                setSuccess('grid'); // Show the success message
                // Reset the form data to its initial state
                setFormData(initialFormData);
            } else {
                console.error('Failed to submit entry:', response.status, response.statusText); // Log an error if the response is not successful
            }
        } catch (error) {
            console.error('Error submitting entry:', error); // Log any errors that occur during the request or response handling
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
            {/* Form Heading */}
            <h1 className={styles.h1}>Sign Up</h1>
                {/* Call the handleSubmit function on submitting the form */}
                <form className={styles.form} onSubmit={handleSubmit}>
                {/* Display of the alert message is set to the current state of the display variable */}
                <div className={styles.alert} style={{ display: `${display}` }}>{error && error}</div>
                {/* Display of the alert message is set to the current state of the display variable */}
                <div className={styles.alert_success} style={{ display: `${success}` }}>Successfully Registered!</div>
                    {/* Set the value of each input to it's state variable and to reflect the changes while typing create a onChange function that trigger the handleChange function */}
                    {/* The name of each input should be same as the name of the parameters passed to the API endpoint */}
                    <div className={styles.input_div}>
                        <div className={styles.div} style={{ display: 'grid' }}>
                            <label className={styles.label}>First Name*</label>
                            <input type="text" className={styles.input} spellCheck="false" value={formData.first_name} name="first_name" onChange={handleChange} />
                        </div>
                        <div className={styles.div} style={{ display: 'grid' }}>
                            <label className={styles.label}>Last Name*</label>
                            <input type="text" className={styles.input} spellCheck="false" value={formData.last_name} name="last_name" onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles.input_div}>
                        <div className={styles.div} style={{ display: 'grid' }}>
                            <label className={styles.label}>Country*</label>
                            <input type="text" className={styles.input} spellCheck="false" value={formData.country} name="country" onChange={handleChange} />
                        </div>
                        <div className={styles.div} style={{ display: 'grid' }}>
                            <label className={styles.label}>State*</label>
                            <input type="text" className={styles.input} spellCheck="false" value={formData.state} name="state" onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles.input_div}>
                        <div className={styles.div} style={{ display: 'grid' }}>
                            <label className={styles.label}>Age*</label>
                            <input type="number" className={styles.input} spellCheck="false" value={formData.age} name="age" onChange={handleChange} />
                        </div>
                        <div className={styles.div} style={{ display: 'grid' }}>
                            <label className={styles.label}>Gender*</label>
                            <input type="text" className={styles.input} spellCheck="false" value={formData.gender} name="gender" onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles.input_div}>
                        <div className={styles.div} style={{ display: 'grid' }}>
                            <label className={styles.label}>Phone Number*</label>
                            <input type="number" className={styles.input} spellCheck="false" value={formData.phone_number} name="phone_number" onChange={handleChange} />
                        </div>
                        <div className={styles.div} style={{ display: 'grid' }}>
                            <label className={styles.label}>E-Mail*</label>
                            <input type="email" className={styles.input} spellCheck="false" value={formData.email} name="email" onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles.input_div}>
                        <div className={styles.div} style={{ display: 'grid', position: 'relative' }}>
                            {/* Set input type to text if showPassword is true and to password if it is false */}
                            <label className={styles.label}>Password*</label>
                            <input type={showPassword ? 'text' : 'password'} className={styles.input} spellCheck="false" name="password" value={formData.password} onChange={handleChange} />
                            <Image className={styles.open}
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
                        <div className={styles.div} style={{ display: 'grid' }}>
                            <label className={styles.label}>Confirm Password*</label>
                            <input type="text" className={styles.input} spellCheck="false" onChange={(e) => setConfirm(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.info}>Your details will be used to process your order, support your experience throughout this website, and for other purposes described in our terms & conditions.</div>
                    <ul style={{ margin: '28px 0px' }} className={styles.ul}>
                        {/* Set the value of checked to the current state of isChecked variable */}
                        <li style={{ float: 'left', marginRight: '10px' }}><input type="checkbox" className={styles.input_check} checked={isChecked} onChange={handleCheckbox} /></li>
                        <li style={{ float: 'right',  }} className={styles.checkbox}>I have read and agree to the <span className={styles.green} style={{ textDecoration: 'underline' }}> website terms and conditions*</span></li>
                    </ul>
                    <button className={styles.button}>Sign Up</button>
                    <div className={styles.link_}>Already have an account? <Link href="/login" className={styles.a}> Sign In</Link></div>
                </form>
            </div>
            <div className={styles.right}></div>
        </div>
        </main>
    );
}

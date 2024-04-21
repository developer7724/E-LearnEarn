'use client'; // using client side rendering

import Image from "next/image"; // Importing Image component from next/image package
import styles from "./page.module.css"; // Importing styles from css module file
import { useState, useEffect } from 'react'; // Importing Hooks from React to handle state management
import Link from 'next/link'; // Importing Link component to allow for smooth navigation between pages
import { useRouter } from 'next/navigation'; // Importing a routing hook to allow for routing features

export default function Login() {
    const router = useRouter(); // Call the useRouter hook and store it in a variable named router

    const [show, setShow] = useState('translateX(-100%)'); // State variable to hide and show the dropdown menu in mobile view
    const [showPassword, setShowPassword] = useState(false); // State variable to store the state of password input and determine whether to hide it or show it
    const [display, setDisplay] = useState('none'); //  State variable to show or hide alert boxes that display the error messages
    const [error, setError] = useState(''); // State variable that sets the error message

    // This function is used to set the new state of the showPassword variable either from true to false or vice-versa 
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const [email, setEmail] = useState(''); // State variable to store email entered by the user in the form
    const [password, setPassword] = useState(''); // State variable to store password entered by the user in the form
  
    // This function is triggered by onChange event in the input 
    const handleChange = (e) => {
      const { name, value } = e.target; // Use destructuring to extract name and value attribute from the input
  
      if (name === 'email') {
        setEmail(value); // If name is email set the state of email to the value provided by the user
      } else if (name === 'password') {
        setPassword(value); // If name is password set the state of password to the value provided by the user
      }
    };
  
    // This function is responsible for making and handling API request
    const handleSubmit = async (e) => {
      e.preventDefault();

      // Check if email or password is empty
      if (!email || !password) {
        setError('All fields are Required!'); // Set the error message
        setDisplay('flex'); // Set display to flex to show the alert box
        return; // Terminate execution of function
      }
  
      try {
        const response = await fetch(`http://192.168.29.134:1030/login?email=${email}&password=${password}`); // Creating a GET Method with query parameters as email and passowrd
        const result = await response.json(); // Convert the response to JSON format

        // If the response is successful, handle the data
        if (response.ok) {
          sessionStorage.setItem('Email', JSON.stringify(result));
          console.log(result);
          // router.push('/student');
          // Second api calling
          try {
            const findMailResponse = await fetch(`http://192.168.29.134:1030/findmail?email=${result}`);
            const findMailResult = await findMailResponse.json();
    
            if (findMailResponse.ok) {
              // Handle data from /findmail endpoint
              console.log(findMailResult[0]);
              if(findMailResult[0].role === 'student') {
                router.push('/student');
              } else if(findMailResult[0].role === 'admin') {
                router.push('/admin');
              }
            } else {
              setError(findMailResult); // Set the error message to the response 
              setDisplay('flex'); // Display the alert box to show error message
            }
          } catch (findMailError) {
            console.error('Error fetching data from /findmail endpoint:', findMailError);
            setError('An error occurred while fetching additional data.');
          }
        } else {
          setError(result); // Set the error message to the response 
          setDisplay('flex'); // Display the alert box to show error message
        }
      }catch (error) {
        console.error('Error logging in:', error); // Log error into the console for debugging purposes
        setError('An error occurred. Please try again later.');
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
            <p className={styles.para}>You are just one step away from experiencing the brilliance of personal development.</p>
            <Link href="/signup"><button className={styles.button}>Sign Up</button></Link>
        </div>
        <div className={styles.right}>
            {/* Form Heading */}
            <h1 style={{ color: 'rgba(12, 29, 44, 0.75)' }}>Sign In</h1>
            {/* Call the handleSubmit function on submitting the form */}
            <form className={styles.form} onSubmit={handleSubmit}>
            {/* Display of the alert message is set to the current state of the display variable */}
            <div className={styles.alert} style={{ display: `${display}` }}>{error && error}</div>
                {/* Set the value of each input to it's state variable and to reflect the changes while typing create a onChange function that trigger the handleChange function */}
                {/* The name of each input should be same as the name of the parameters passed to the API endpoint */}
                <input type="email" className={styles.input} spellCheck="false" placeholder="Enter your E-Mail" style={{ marginBottom: '12px' }} name="email" value={email} onChange={handleChange} />
                <div className={styles.div} style={{ position: 'relative' }}>
                        {/* Set input type to text if showPassword is true and to password if it is false */}
                        <input type={showPassword ? 'text' : 'password'} className={styles.input} spellCheck="false" placeholder="Enter your Password" name="password" value={password} onChange={handleChange} />
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
                    <Link href="/forgot" className={styles.link_}>forgot password?</Link>
                </div>
                <div className={styles.btn_div}>
                <button className={styles.login}>Login</button>
                </div>
            </form>
        </div>
    </div>

        </main>
    );
}
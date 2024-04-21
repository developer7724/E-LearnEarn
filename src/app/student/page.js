'use client'; // using client side rendering

import Image from "next/image"; // Importing Image component from next/image package
import styles from "./page.module.css"; // Importing styles from css module file
import { useState, useEffect } from 'react'; // Importing Hooks from React to handle state management
import Footer from "../components/footer"; // Importing footer component from another module
import Link from 'next/link'; // Importing Link component to allow for smooth navigation between pages
import _debounce from 'lodash/debounce'; // Importing _debounce function from lodash utility library
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const [show, setShow] = useState('translateX(-100%)'); // State variable to hide and show the dropdown menu in mobile view
    const [username, setUsername] = useState('');

    // useEffect hook to trigger data fetching when the route changes
useEffect(() => {
    // Triggering the debounced data fetching function when the route changes
    getDataDebounced();

    // Cleanup function to cancel the debounced data fetching on component unmount
    return () => getDataDebounced.cancel();
}, [router.asPath]); // Watching for changes in the route using router.asPath

    const getData = async () => {
        try {
          // Check if session variable 'Email' exists
          const emailSession = sessionStorage.getItem('Email');
      
          if (emailSession) {
            const email = JSON.parse(emailSession);
      
            // Make GET request using the email from the session variable
            const response = await fetch(`http://192.168.29.134:1030/findmail?email=${email}`);
            const result = await response.json();
      
            console.log(result[0].first_name);
            setUsername(result[0].first_name);
          } else {
            // If session variable 'Email' does not exist, redirect user to login page
            router.push('/login');
          }
        } catch (error) {
          console.error(error);
        }
      };

// Creating a debounced version of the getData function using lodash's debounce function,
// with a delay of 300 milliseconds to limit the frequency of data fetching calls.
const getDataDebounced = _debounce(getData, 300);

const handleLogout = () => {
    // Remove 'Email' session variable
    sessionStorage.removeItem('Email');
  
    // Redirect user to the login page
    router.push('/login');
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
        <li className={`${styles.link}`}>Welcome {username}</li>
        <li className={`${styles.link} ${styles.red} ${styles.current_link}`}><Link href="/about">Dashboard</Link></li>
        <li className={`${styles.link}`}><Link href="/">Home</Link></li>
        <li className={styles.link}><Link href="/courses">Courses</Link></li>
        <li style={{ margin: '0px 12px' }}>
            <button className={`${styles.btn}`} onClick={handleLogout}>Logout</button>
        </li>
        <li className={styles.link}><Link href="/update"><button className={styles.update}>Update Password</button></Link></li>
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
        <li className={`${styles.link}`}>Welcome {username}</li>
        <li className={`${styles.link} ${styles.red} ${styles.current_link}`}><Link href="/about">Dashboard</Link></li>
        <li className={`${styles.link}`}><Link href="/">Home</Link></li>
        <li className={styles.link}><Link href="/courses">Courses</Link></li>
        <li style={{ float: 'left', margin: '0px 12px' }}>
            <button className={`${styles.btn}`} onClick={handleLogout}>Logout</button>
        </li>
        <li className={styles.link}><Link href="/update"><button className={styles.update}>Update Password</button></Link></li>
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
            <div className={styles.background}></div>
        </div>

        {/* Courses section to show buttons to allow users to see all courses or courses they have enrolled in */}
        <button className={styles.btn_div}>
            <Link href="/courses"><div className={styles.button}>All Courses</div></Link>
            <div className={styles.button_1}>My Courses</div>
        </button>

        {/* Reusable UI Component that is imported from another file */}
        <Footer />

        </main>
    );
}
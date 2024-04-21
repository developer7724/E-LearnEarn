'use client'; // using client side rendering

import Image from "next/image"; // Importing Image component from next/image package
import styles from "./page.module.css"; // Importing styles from css module file
import { useState, useEffect } from 'react'; // Importing Hooks from React to handle state management
import Link from 'next/link'; // Importing Link component from  
import { useRouter } from 'next/navigation'; // Importing useRouter Hook to use routing functionalities
import _debounce from 'lodash/debounce'; // Importing _debounce function from lodash utility library

export default function Admin() {
const router = useRouter(); // Initializing router hook
const [show, setShow] = useState('translateX(-100%)'); // State variable to show and hide navigation panel
const [verified, setVerified] = useState([]); // State variable to store verified user data from API response
const [unverified, setUnverified] = useState([]); // State variable to store unverified user data from API response
const [all, setAll] = useState([]); // State variable to store all user data ( both verified & unverified )

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

        if(emailSession) {
        // Fetch data from the first API endpoint for verified users
        const verifiedResponse = await fetch(`http://192.168.29.134:1030/approved-data-count`);
        const verifiedData = await verifiedResponse.json(); // Convert the response to JSON format
        console.log(verifiedData);
        setVerified(verifiedData); // Set the state of the verified variable to the response recieved

        // Fetch data from the second API endpoint for unverified users
        const unverifiedResponse = await fetch(`http://192.168.29.134:1030/not-approved-data-count`);
        const unverifiedData = await unverifiedResponse.json(); // Convert the response to JSON format
        console.log(unverifiedData);
        setUnverified(unverifiedData); // Set the state of the verified variable to the response recieved
        
        // Fetch data from the third API endpoint for all users
        const allResponse = await fetch(`http://192.168.29.134:1030/all-data`);
        const allData = await allResponse.json(); // Convert the response to JSON format
        console.log(allData);
        setAll(allData); // Set the state of the all variable to the response recieved     
        } else {
            router.push('/login');
        }
 
    } catch (error) {
        console.error('Error fetching data:', error); // Console errors for debugging
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
        {/* Navigation panel for mobile view */}
        <div className={`${styles.sidenav}`} style={{ transform: `${show}` }}>
            <Image
            className={styles.cross}
            src="/cross.svg"
            alt="logo"
            width={18}
            height={18}
            onClick={() => setShow('translateX(-100%)')}
            /> {/* Onclick function sets the state of the show variable to translate -100% along the X-axis to hide it */}
            <div className={styles.logo}></div>
            <ul className={styles.pages}>
                <li className={`${styles.link} ${styles.current}`}><Link href="/admin">Dashboard</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/plans">Plans</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/category">Category</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/products">Products</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/orders">Orders</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/users">Manage Users</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/notice">Notice</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/settings">Settings</Link></li>
            </ul>
        </div>
        {/* Navigation panel for desktop/tablet view */}
        <div className={styles.sidebar}>
            <div className={styles.logo}></div>
            <ul className={styles.pages}>
                <li className={`${styles.link} ${styles.current}`}><Link href="/admin">Dashboard</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/plans">Plans</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/category">Category</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/products">Products</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/orders">Orders</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/users">Manage Users</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/notice">Notice</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/settings">Settings</Link></li>
            </ul>
        </div>

        <div className={styles.body}>
            <nav className={styles.nav}>
                {/* Hamburger Menu for mobile view */}
                <Image className={styles.menu}
                src="/menu.svg"
                alt="menu"
                width={34}
                height={34}
                onClick={() => setShow('translateX(0)')}
                />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className={styles.user}>
                    <Image className={styles.pf}
                    src="/pf.svg"
                    alt=""
                    width={44}
                    height={44}
                    />
                    <p className={styles.name}>Admin</p>
                </div>

                <div className={styles.logout} style={{ cursor: 'pointer' }}>
                    <Image className={styles.log_out}
                    src="/logout.svg"
                    alt=""
                    width={19}
                    height={19}
                    onClick={handleLogout}
                    />
                </div>
                </div>
            </nav>

            <div className={styles.container}>
                <div className={styles.box}>
                    {/* Render the all users  count  */}
                    <p className={styles.num}>{all}</p>
                    <p className={styles.descrip}>Total Users</p>
                    <button className={styles.btn}><Link href="/admin/users">View All</Link></button>
                </div>
                <div className={styles.box} style={{ backgroundColor: '#00BCD4' }}>
                    {/* Render the verfied users count  */}
                    <p className={styles.num}>{verified}</p>
                    <p className={styles.descrip}>Total Verfified Users</p>
                    <button className={styles.btn}><Link href="/admin/users">View All</Link></button>
                </div>
                <div className={styles.box} style={{ backgroundColor: '#FF9800' }}>
                    {/* Render the unverfied users count  */}
                    <p className={styles.num}>{unverified}</p>
                    <p className={styles.descrip}>Total Unverified Users</p>
                    <button className={styles.btn}><Link href="/admin/users">View All</Link></button>
                </div>
                <div className={styles.box} style={{ backgroundColor: '#E91E63' }}>
                    <p className={styles.num}>556</p>
                    <p className={styles.descrip}>Total SMS Users</p>
                    <button className={styles.btn}><Link href="/admin/users">View All</Link></button>
                </div>
            </div>

            {/* Analytics part need to update dynamically */}

            <div className={styles.contain}>
                <div className={styles.left}></div>
                <div className={styles.right}>
                    <div className={styles.card}>
                        <p className={styles.num} style={{ fontSize: '24px' }}>10.00 INR</p>
                        <p className={styles.descrip}>Total Withdrawal</p>
                        <p className={styles.num} style={{ fontSize: '24px' }}>10.00 INR</p>
                        <p className={styles.descrip} style={{ marginBottom: '0px' }}>Total Withdrawal Charge</p>
                    </div>
                    <div className={styles.card} style={{ backgroundColor: '#EA5455' }}>
                        <p className={styles.num} style={{ fontSize: '24px' }}>10.00 INR</p>
                        <p className={styles.descrip}>Total Withdrawal</p>
                        <p className={styles.num} style={{ fontSize: '24px' }}>10.00 INR</p>
                        <p className={styles.descrip} style={{ marginBottom: '0px' }}>Total Withdrawal Charge</p>
                    </div>
                    <div className={styles.card} style={{ backgroundColor: '#ffff' }}>
                        <Image className={styles.img}
                        src="/download.png"
                        alt=""
                        width={121}
                        height={109}
                        />
                        <p className={styles.descrip} style={{ marginBottom: '0px', color: '#000' }}>Pending Deposits</p>
                    </div>
                    <div className={styles.card} style={{ backgroundColor: '#ffff' }}>
                        <Image className={styles.img}
                        src="/door.png"
                        alt=""
                        width={95}
                        height={95}
                        />
                        <p className={styles.descrip} style={{ marginBottom: '0px', color: '#000' }}>Pending Withdrawals</p>
                    </div>
                </div>
            </div>

            <div className={styles.container} style={{ margin: '24px 0px' }}>
                <div className={styles.box} style={{ backgroundColor: '#342EAD' }}>
                    <p className={styles.num}>1000</p>
                    <p className={styles.descrip}>Demo Data</p>
                    <button className={styles.btn}>View All</button>
                </div>
                <div className={styles.box} style={{ backgroundColor: '#10375C' }}>
                    <p className={styles.num}>1000</p>
                    <p className={styles.descrip}>Demo Data</p>
                    <button className={styles.btn}>View All</button>
                </div>
                <div className={styles.box} style={{ backgroundColor: '#5C2A9D' }}>
                    <p className={styles.num}>1000</p>
                    <p className={styles.descrip}>Demo Data</p>
                    <button className={styles.btn}>View All</button>
                </div>
                <div className={styles.box} style={{ backgroundColor: '#FF9234' }}>
                    <p className={styles.num}>1000</p>
                    <p className={styles.descrip}>Demo Data</p>
                    <button className={styles.btn}>View All</button>
                </div>
            </div>

            <div className={styles.c_}>
                <div className={styles.left}></div>
                <div className={styles.left}></div>
            </div>

            <div className={styles.bottom}>
                <div className={styles.card}>
                    <h3 className={styles.h3}>Login by Browser</h3>
                    <div className={styles.chart}></div>
                </div>
                <div className={styles.card}>
                    <h3 className={styles.h3}>Login by Desktop</h3>
                    <div className={styles.chart}></div>
                </div>
                <div className={styles.card}>
                    <h3 className={styles.h3}>Login by Country</h3>
                    <div className={styles.chart}></div>
                </div>
            </div>

        </div>

        </main>
    );
}
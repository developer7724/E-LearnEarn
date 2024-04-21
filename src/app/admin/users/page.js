'use client'; // using client side rendering

import Image from "next/image"; // Importing Image component from next/image package
import styles from "./page.module.css"; // Importing styles from css module file
import { useState, useEffect } from 'react'; // Importing Hooks from React to handle state management
import Link from 'next/link'; // Importing Link component from  
import { useRouter } from 'next/navigation'; // Importing useRouter Hook to use routing functionalities
import _debounce from 'lodash/debounce'; // Importing _debounce function from lodash utility library

export default function manageUsers() {
const router = useRouter(); // Initializing router hook
const [show, setShow] = useState('translateX(-100%)'); // State variable to show and hide navigation panel

const [data, setData] = useState([]); // State variable to store user data from API response
const [searchQuery, setSearchQuery] = useState(''); // State variable to store the user's searched query
const [foundUsers, setFoundUsers] = useState([]); // state variable to store the searched users data

const handleSearch = () => {
  // Filter out users with role 'admin'
  const nonAdminUsers = data.filter((user) => user.role !== 'admin');
  // Perform search on non-admin users based on their first name
  const usersFound = nonAdminUsers.filter((user) =>
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Set the found users state
  setFoundUsers(usersFound);
};

// useEffect hook to trigger data fetching when the route changes
useEffect(() => {
  // Triggering the debounced data fetching function when the route changes
  getDataDebounced();

  // Cleanup function to cancel the debounced data fetching on component unmount
  return () => getDataDebounced.cancel();
}, [router.asPath]); // Watching for changes in the route using router.asPath

// Function to approve a user by making a PUT request to the server
const approveUser = async (email) => {
  // Accessing the router instance from Next.js
  const router = useRouter();
  // Constructing the URL for the API endpoint to approve the user
  const url = `http://192.168.29.134:1030/approveUser?email=${encodeURIComponent(email)}`;

  try {
      // Sending a PUT request to the server to approve the user
      const response = await fetch(url, {
          method: 'PUT',
      });

      // Handling response status
      if (!response.ok) {
          throw new Error(`Failed to approve user with email ${email}`);
      }

      // Logging success message upon successful approval
      console.log(`User with email ${email} has been approved successfully.`);

      // Reloading the page to reflect the changes after approval
      // router.reload();
  } catch (error) {
      // Logging and handling errors that occur during the approval process
      console.error('Error approving user:', error);
  }
};

// Function to fetch all data from the server
const getData = async () => {
  try {
      // Fetching data from the server
      const response = await fetch(`http://192.168.29.134:1030/all-data-print`);
      const result = await response.json();

      // Extracting approved and unapproved data from the response
      const approvedData = result.approveddata;
      const unApprovedData = result.notapproveddata1;

      // Combining approved and unapproved data into a single array
      const pushData = [...approvedData, ...unApprovedData];

      // Logging the combined data
      console.log(pushData);

      // Setting the combined data into the component state
      setData(pushData);
  } catch (error) {
      // Logging and handling errors that occur during the data fetching process
      console.error('Error fetching data:', error);
  }
};

// Creating a debounced version of the getData function using lodash's debounce function,
// with a delay of 300 milliseconds to limit the frequency of data fetching calls.
const getDataDebounced = _debounce(getData, 300);

// Set render data to found Users if any user was user was found based on the search query otherwise set it to just the original data
const renderData = foundUsers.length > 0 ? foundUsers : data;

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
                <li className={`${styles.link}`}><Link href="/admin">Dashboard</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/plans">Plans</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/category">Category</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/products">Products</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/orders">Orders</Link></li>
                <li className={`${styles.link}  ${styles.current}`}><Link href="/admin/users">Manage Users</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/notice">Notice</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/settings">Settings</Link></li>
            </ul>
        </div>
        {/* Navigation panel for desktop/tablet view */}
        <div className={styles.sidebar}>
            <div className={styles.logo}></div>
            <ul className={styles.pages}>
                <li className={`${styles.link}`}><Link href="/admin">Dashboard</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/plans">Plans</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/category">Category</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/products">Products</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/orders">Orders</Link></li>
                <li className={`${styles.link}  ${styles.current}`}><Link href="/admin/users">Manage Users</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/notice">Notice</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/settings">Settings</Link></li>
            </ul>
        </div>

        <div className={styles.body}>

            <nav className={styles.nav}>
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

                <div className={styles.logout}>
                    <Image className={styles.log_out}
                    src="/logout.svg"
                    alt=""
                    width={19}
                    height={19}
                    />
                </div>
                </div>
            </nav>

            <div className={styles.heading}>
              <p className={styles.w_100}>Manage Users</p>
              <div className={styles.input_div}>
                {/* Set the value of search bar to the current state of the searchQuery variable and to reflect any changes while typing create a onChange function to set the searchQuery variable */}
                <input type="text" placeholder="Search" className={styles.searchbar} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoComplete="off" spellCheck="false" />
                {/* Click the button to call the handleSearch function for performing search operation */}
                <button className={styles.search_btn} onClick={handleSearch}>
                  <Image className={styles.icon}
                  src="/search.svg"
                  alt=""
                  width={20}
                  height={20}
                  />
                </button>
              </div>
            </div>

    <div className={styles.container}>
    <table className={styles.table} cellspacing="0">
      {/* Define table header */}
      <thead>
        <tr className={styles.headerRow}>
          <th className={styles.th}>First Name</th>
          <th className={styles.th}>Last Name</th>
          <th className={styles.th}>Role</th>
          <th className={styles.th}>Country</th>
          <th className={styles.th}>State</th>
          <th className={styles.th}>Age</th>
          <th className={styles.th}>Gender</th>
          <th className={styles.th}>Email</th>
          <th className={styles.th}>Phone Number</th>
          <th className={styles.th}>Verified</th>
        </tr>
      </thead>
      <tbody>
      {/* Check if renderData is not empty and then renders the data using map function */}
      {/* First filter out the non-admin data from the renderData and then proceed to extract each attribute from the objects stored in the array */}
      {renderData && renderData
      .filter((user) => user.role !== "admin")
      .map((user) => (
      // Key is used to uniquely identify each row with user id
      <tr key={user.id}>
      <td className={styles.td}>{user.first_name ? user.first_name : 'null'}</td>
      <td className={styles.td}>{user.last_name ? user.last_name : 'null'}</td>
      <td className={styles.td}>{user.role ? user.role : 'null'}</td>
      <td className={styles.td}>{user.country ? user.country : 'null'}</td>
      <td className={styles.td}>{user.state ? user.state : 'null'}</td>
      <td className={styles.td}>{user.age ? user.age : 'null'}</td>
      <td className={styles.td}>{user.gender ? user.gender : 'null'}</td>
      <td className={styles.td}>{user.email ? user.email : 'null'}</td>
      <td className={styles.td}>{user.phone_number ? user.phone_number : 'null'}</td>
      {/* check if the status is approved or not and then only add respective classes */}
      {/* Check if user status is approved and if not then only call the approveUser function with user email as parameter  */}
      <td className={`${styles.td} ${user.status === 'approved' ? styles.green : styles.red}`} onClick={user.status !== 'approved' && ( () => { approveUser(user.email); window.location.reload(); } )}>{user.status ? user.status : 'null'}</td>
      </tr>
      ))}

      </tbody>
    </table>
    </div>

        </div>

        </main>   
    );
}
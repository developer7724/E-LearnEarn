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
const [visible, setVisible] = useState('none');

const handleSearch = () => {
  const usersFound = data.filter((user) =>
    user.CourseName.toLowerCase().includes(searchQuery.toLowerCase())
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

// Function to fetch all data from the server
const getData = async () => {
  try {
      // Fetching data from the server
      const response = await fetch(`http://192.168.29.134:1030/readAllCourse`);
      const result = await response.json();

      // Logging the data
      console.log(result);
      setData(result);
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

    const [showPassword, setShowPassword] = useState(false);
    const [display, setDisplay] = useState('none');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('none');

    const initialFormData = {
        Course_Name: '',
        Course_Duration: '',
        Course_Description: '',
        Course_Objective: '',
        Course_price: ''
      };
    
      const [formData, setFormData] = useState(initialFormData);
    
      const handleChange = (e) => {
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.Course_Name || !formData.Course_Duration || !formData.Course_Description || !formData.Course_Duration || !formData.Course_price) {
            setError("All fields are Required!");
            setDisplay('flex');
            return; 
        }

        try {
          const queryParams = new URLSearchParams(formData);
          const response = await fetch(`http://192.168.29.134:1030/newCourse?${queryParams}`, {
            method: 'POST',
          });
      
          if (response.ok) {
            console.log('Entry submitted successfully!');
            setDisplay('none');
            setSuccess('grid');
            setFormData(initialFormData);
          } else {
            console.error('Failed to submit entry:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error submitting entry:', error);
        }
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
                <li className={`${styles.link}`}><Link href="/admin">Dashboard</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/plans">Plans</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/category">Category</Link></li>
                <li className={`${styles.link} ${styles.current}`}><Link href="/admin/products">Products</Link></li>
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
                <li className={`${styles.link}`}><Link href="/admin">Dashboard</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/plans">Plans</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/category">Category</Link></li>
                <li className={`${styles.link} ${styles.current}`}><Link href="/admin/products">Products</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/orders">Orders</Link></li>
                <li className={`${styles.link}`}><Link href="/admin/users">Manage Users</Link></li>
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
                    <p className={styles.admin_name}>Admin</p>
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
              <p className={styles.btn_add}>
                <button className={styles.add} onClick={() => setVisible('flex')}>Add New</button>
              </p>
              <div className={styles.input_div_}>
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
            {renderData && renderData.map((course) => (
                <Link href={`/admin/products/${course.course_id}`}>
                <div className={styles.card} key={course.id}>
                <div className={styles.top}>
                    <p className={styles.name}>{course.CourseName}</p>
                    <p className={styles.objective}>{course.CourseObjective}</p>
                    <ul>
                    <li style={{ float: 'left' }} className={styles.duration}>{course.CourseDuration}</li>
                    <li style={{ float: 'left', marginLeft: '6px' }} className={styles.price}>{course.CoursePrice} INR</li>
                    </ul>
                </div>
                <div className={styles.description}>
                    {course.CourseDescription}
                </div>
                </div>
                </Link>
            ))}
</div>



<form className={styles.form} onSubmit={handleSubmit} style={{ display: `${visible}` }}>
  <Image
    className={styles.cross} style={{ cursor: 'pointer' }}
    src="/cross1.svg"
    alt=""
    width={16}
    height={16}
    onClick={() => setVisible('none')}
  />
  <h1 className={styles.h1}>Upload Now!</h1>
  <div className={styles.alert} style={{ display: `${display}` }}>
    {error && error}
  </div>
  <div className={styles.alert_success} style={{ display: `${success}` }}>
    Successfully Registered!
  </div>
  <div className={styles.input_div}>
    <div className={styles.div} style={{ display: 'grid' }}>
      <label className={styles.label}>Course Name*</label>
      <input
        type="text"
        className={styles.input}
        spellCheck="false"
        value={formData.Course_Name}
        name="Course_Name"
        onChange={handleChange}
      />
    </div>
    <div className={styles.div} style={{ display: 'grid' }}>
      <label className={styles.label}>Duration*</label>
      <input
        type="text"
        className={styles.input}
        spellCheck="false"
        value={formData.Course_Duration}
        name="Course_Duration"
        onChange={handleChange}
      />
    </div>
  </div>
  <div className={styles.input_div}>
    <div className={styles.div} style={{ display: 'grid' }}>
      <label className={styles.label}>Objective*</label>
      <input
        type="text"
        className={styles.input}
        spellCheck="false"
        value={formData.Course_Objective}
        name="Course_Objective"
        onChange={handleChange}
      />
    </div>
    <div className={styles.div} style={{ display: 'grid' }}>
      <label className={styles.label}>Price*</label>
      <input
        type="text"
        className={styles.input}
        spellCheck="false"
        value={formData.Course_price}
        name="Course_price"
        onChange={handleChange}
      />
    </div>
  </div>
  <div className={styles.input_div} style={{ width: '100%' }}>
    <div className={styles.div} style={{ display: 'grid', width: '100%' }}>
      <label className={styles.label}>Description*</label>
      <textarea
        style={{ width: '100%', height: '84px', padding: '8px' }}
        type="text"
        className={styles.input}
        spellCheck="false"
        value={formData.Course_Description}
        name="Course_Description"
        onChange={handleChange}
      />
    </div>
  </div>
  <button
    className={styles.button}
    onClick={() => window.location.reload()}
  >
    Upload Course
  </button>
    </form>

    </div>

        </main>   
    );
}
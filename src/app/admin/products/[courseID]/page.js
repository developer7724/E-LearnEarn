'use client'; // using client side rendering

import Image from "next/image"; // Importing Image component from next/image package
import styles from "./page.module.css"; // Importing styles from css module file
import { useState, useEffect } from 'react'; // Importing Hooks from React to handle state management
import Link from 'next/link'; // Importing Link component from  
import { useRouter } from 'next/navigation'; // Importing useRouter Hook to use routing functionalities
import _debounce from 'lodash/debounce'; // Importing _debounce function from lodash utility library

export default function Videos({ params }) {
const router = useRouter(); // Initializing router hook
const [show, setShow] = useState('translateX(-100%)'); // State variable to show and hide navigation panel

const [data, setData] = useState({}); // State variable to store user data from API response
const [video, setVideo] = useState();
const [visible, setVisible] = useState('none');

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
      // Convert params.courseID to match the data type of course_id in your data
      const courseId = parseInt(params.courseID); // Assuming course_id is a number

      // Filter data based on params.courseID
      const filteredData = result.filter((item) => item.course_id === courseId);

      // Logging the filtered data
      console.log(filteredData[0]);
      setData(filteredData[0]);
      console.log(filteredData[0].video_id);
      setVideo(filteredData[0].video_id);

  } catch (error) {
      // Logging and handling errors that occur during the data fetching process
      console.error('Error fetching data:', error);
  }
};

// Creating a debounced version of the getData function using lodash's debounce function,
// with a delay of 300 milliseconds to limit the frequency of data fetching calls.
const getDataDebounced = _debounce(getData, 300);

const [videoData, setVideoData] = useState([]);

const fetchVideoData = async () => {
  try {
    const newData = [];
    for (const videoId of video) {
      const response = await fetch(`http://192.168.29.134:1030/getvideo?VideoID=${videoId}`);
      const result = await response.json();
      
      // console.log(result[0].video_file);
      // Process the video data here (e.g., store it in state or perform any other action)
      if(result[0].video_file !== undefined) {
        newData.push(result[0].video_file);
      }
    }

    // Update the videoData state by spreading the previous state and adding the new data
    setVideoData(newData);

  } catch (error) {
    console.error('Error fetching video data:', error);
  }
};

    const [display, setDisplay] = useState('none');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('none');

    const initialFormData = {
      name: '',
      description: '',
      video: null,
      course_id: '',
    };
    
    const [formData, setFormData] = useState(initialFormData);
    
    const handleChange = (e) => {
      const { name, value, type, files } = e.target;
      const updatedValue = type === 'file' ? files[0] : value; // If the input type is file, get the file object
      
      setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
    };
    
    const handleVideoChange = (e) => {
      const videoFile = e.target.files[0];
      setFormData((prevData) => ({ ...prevData, video: videoFile }));
    };


    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (!formData.name || !formData.description || !formData.course_id || !formData.video) {
        setError("All fields are Required!");
        setDisplay('flex');
        return; 
      }
    
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('course_id', formData.course_id);
        formDataToSend.append('video', formData.video);
    
        const response = await fetch(`http://192.168.29.134:1030/uploadVideo`, {
          method: 'POST',
          body: formDataToSend,
        });
    
        if (response.ok) {
          console.log('Video uploaded successfully!');
          setDisplay('none');
          setSuccess('grid');
          setFormData(initialFormData);
        } else {
          console.error('Failed to upload video:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error uploading video:', error);
      }
    };    

      const [isDesktopView, setIsDesktopView] = useState(false);

      useEffect(() => {
          const handleResize = () => {
              setIsDesktopView(window.innerWidth > 600); // Adjust the breakpoint as needed
          };
  
          handleResize(); // Check initial view
          window.addEventListener('resize', handleResize); // Listen for resize events
  
          return () => {
              window.removeEventListener('resize', handleResize); // Clean up event listener
          };
      }, []);

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

        {isDesktopView ? ( <div className={styles.info}>
            <div className={styles.box}>
            <h1 className={styles.h1}>{data.CourseName}</h1>
            <p className={styles.obj}>{data.CourseObjective}</p>
            <p className={styles.descrip}>{data.CourseDescription}</p>
            <ul style={{ margin: '20px 0px' }}>
                <li className={styles.items}>Duration: <span className={styles.span}>{data.CourseDuration}</span></li>
                <li className={styles.items} style={{ marginLeft: '16px' }}>Price: <span className={styles.span}>{data.CoursePrice} INR</span></li>
            </ul>
            {/* Clicking this button will fetch all the video links using the previously set video array and populate the videoData state variable ( array ) */}
            <ul>
              <li style={{ float: 'left' }}><button className={styles.get} onClick={() => {fetchVideoData();} }>Get videos</button></li>
              <li style={{ float: 'left', marginLeft: '16px' }}><button className={styles.get} onClick={() => setVisible('flex')}>Upload videos</button></li>
            </ul>
            </div>
        </div> ) : (
            <div className={styles.default}>
            <h1 className={styles.h1}>{data.CourseName}</h1>
            <p className={styles.obj}>{data.CourseObjective}</p>
            <p className={styles.descrip}>{data.CourseDescription}</p>
            <ul style={{ margin: '20px 0px' }}>
                <li className={styles.items}>Duration: <span className={styles.span}>{data.CourseDuration}</span></li>
                <li className={styles.items} style={{ marginLeft: '16px' }}>Price: <span className={styles.span}>{data.CoursePrice} INR</span></li>
            </ul>
            <ul>
              <li style={{ float: 'left' }}><button className={styles.get} onClick={() => {fetchVideoData();} }>Get videos</button></li>
              <li style={{ float: 'left', marginLeft: '16px' }}><button className={styles.get} onClick={() => setVisible('flex')}>Upload videos</button></li>
            </ul>
            </div>
        )}

        <div className={styles.heading}></div>

        <div className={styles.container_}>
        {/* Render video based on the link Property passing it as a src prop to the video tag */}
        {videoData && videoData.map((videoLink, index) => (
          <video key={index} className={styles.video} controls>
            <source src={videoLink} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
  <h1 className={styles.h1} style={{ color: '#000' }}>Upload Now!</h1>
  <div className={styles.alert} style={{ display: `${display}` }}>
    {error && error}
  </div>
  <div className={styles.alert_success} style={{ display: `${success}` }}>
    Successfully Uploaded!
  </div>
  <div className={styles.input_div}>
    <div className={styles.div} style={{ display: 'grid' }}>
      <label className={styles.label}>Name*</label>
      <input
        type="text"
        className={styles.input}
        spellCheck="false"
        value={formData.name}
        name="name"
        onChange={handleChange}
      />
    </div>
    <div className={styles.div} style={{ display: 'grid' }}>
      <label className={styles.label}>Description*</label>
      <input
        type="text"
        className={styles.input}
        spellCheck="false"
        value={formData.description}
        name="description"
        onChange={handleChange}
      />
    </div>
  </div>
  <div className={styles.input_div}>
    <div className={styles.div} style={{ display: 'grid' }}>
      <label className={styles.label}>Course ID*</label>
      <input
        type="text"
        className={styles.input}
        spellCheck="false"
        value={formData.course_id}
        name="course_id"
        onChange={handleChange}
      />
    </div>
    <div className={styles.div} style={{ display: 'grid' }}>
      <label className={styles.label}>Upload Video*</label>
      <input
        type="file"
        spellCheck="false"
        name="video"
        onChange={handleVideoChange}
      />
    </div>
  </div>
  <button
    className={styles.button}
  >
    Upload Video
  </button>
    </form>

    </div>

        </main>   
    );
}
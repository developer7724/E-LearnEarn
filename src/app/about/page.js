'use client'; // using client side rendering

import Image from "next/image"; // Importing Image component from next/image package
import styles from "./page.module.css"; // Importing styles from css module file
import { useState, useEffect } from 'react'; // Importing Hooks from React to handle state management
import Footer from "../components/footer"; // Importing footer component from another module
import Link from 'next/link'; // Importing Link component to allow for smooth navigation between pages

export default function About() {
    const [isDesktop, setIsDesktop] = useState(false); // State variable to store true or false based on whether the user is in desktop view or mobile view
    const [show, setShow] = useState('translateX(-100%)'); // State variable to hide and show the dropdown menu in mobile view

    useEffect(() => {
        // Check if viewport width is greater than 600 to see if the current view is in desktop view
        const handleResize = () => {
          setIsDesktop(window.innerWidth > 600); // sets the isDesktop state variable to true or false based on the condition
        };
    
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize); // Add event listener for window resize

        return () => window.removeEventListener('resize', handleResize); // Clean up on component unmount
      }, []); // An empty dependency array ensures this runs only once when the component mounts

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
        <li className={`${styles.link} ${styles.red} ${styles.current_link}`}><Link href="/about">About Us</Link></li>
        <li style={{ float: 'left', margin: '0px 12px' }}>
        {sessionStorage.getItem('Email') ? (
            <p className={styles.link}><Link href="/student">Dashboard</Link></p>
          ) : (
          <Link href="/signup"><button className={styles.btn}>Signup/Login</button></Link>
          )}
        </li>
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
        <li className={`${styles.link} ${styles.red} ${styles.current_link}`}><Link href="/about">About Us</Link></li>
        <li style={{ float: 'left', margin: '0px 12px' }}>
        {sessionStorage.getItem('Email') ? (
            <p className={styles.link}><Link href="/student">Dashboard</Link></p>
          ) : (
          <Link href="/signup"><button className={styles.btn}>Signup/Login</button></Link>
          )}
        </li>
        </ul>
        <Image className={styles.menu}
        src="/hamburger.svg"
        alt="menu"
        width={34}
        height={34}
        onClick={() => setShow('translateX(0)')}
        /> {/* Hamburger menu is only visible in mobile view and when clicked, It sets the show variable to translate 0px along the x-axis so that the dropdown menu comes into view */}
    </nav>
    {/* Gallery of images */}
    <div className={styles.gallery}>
        <h1 className={styles.heading}>About Us</h1>
        <p className={styles.para}>A little insight about India's Fastest Growing Ed-Tech Platform.</p>
        {/* conditional rendering to check if us is in mobile view or desktop/tablet view */}
        { isDesktop ? (
        <div className={styles.container}>
        <div className={styles.div1}>
            <p className={styles.text}>A place where possibilities are redefined and recreated.</p>
            <div className={styles.pic_1}></div>
        </div>
        <div className={styles.div2}></div>
        <div className={styles.main_pic}></div>
        <div className={styles.div3}></div>
        <div className={styles.div1}>
            <div className={styles.pic_1} style={{ marginBottom: '22px' }}></div>
            <p className={styles.text} style={{ textAlign: 'right' }}>Your step towards a new world to Learn, Implement, Grow. A place where possibilities are redefined and recreated.</p>
        </div>
    </div>
        ) : (
            <>
            <div className={styles.mob_pic}></div>
            </>
        ) }
        {/* if the user is in mobile view then render a different background image for less complexity in design */}
    </div>
    {/* Features section */}
    <div className={styles.features}>
        <h1 className={styles.heading}>Key Features</h1>
        <div className={styles.boxes}>
            <div className={styles.box}>
                <Image className={styles.logo}
                src="/Frame 128.png"
                alt="logo"
                width={138}
                height={138}
                />
                <p className={styles.name}>Cater-To-All Training Systems</p>
            </div>
            <div className={`${styles.box} ${styles.dark_bg}`}>
                <Image className={styles.logo}
                src="/2.png"
                alt="logo"
                width={138}
                height={138}
                />
                <p className={styles.name}>Cater-To-All Training Systems</p>
            </div>
            <div className={styles.box}>
                <Image className={styles.logo}
                src="/3.png"
                alt="logo"
                width={138}
                height={138}
                />
                <p className={styles.name}>Cater-To-All Training Systems</p>
            </div>
            <div className={`${styles.box} ${styles.dark_bg}`}>
                <Image className={styles.logo}
                src="/4.png"
                alt="logo"
                width={138}
                height={138}
                />
                <p className={styles.name}>Cater-To-All Training Systems</p>
            </div>
        </div>
    </div>
    {/* A section to potray unique elements of the website */}
    <div className={styles.display}>
        <h1 className={styles.heading}>The Stand-Out Elements</h1>
        <div className={styles.div}>
            <div className={styles.left}>
                <p className={styles.h}>E-LEARNEARN, our quality sets us apart.</p>
                <p className={styles.para} style={{ textAlign: 'left', fontSize: '16px', margin: '28px 0px 0px 0px' }}>The fastest growing ed-tech in the country. IDIGITALPRENEUR promises holistic growth to each and every individual in our community. By providing them an exposure way beyond the world of marketing also. We work on helping you improve your knowledge, Implementation, Personality and Presentation.</p>
            </div>
            <div className={styles.middle}></div>
            <div className={styles.right}>
            <p className={styles.h}>Direct Mentorships by Industry Experts.</p>
                <p className={styles.para} style={{ textAlign: 'left', fontSize: '16px', margin: '28px 0px 16px 0px' }}>We invite top notch industry experts to train our students on trending and relevant topics changing with time. We help you learn everything from podcasting to book writing. From Modelling to Mental Well-Being. We got it all covered for you.</p>
            <p className={styles.h}>After Sales Support</p>
                <p className={styles.para} style={{ textAlign: 'left', fontSize: '16px', margin: '28px 0px 16px 0px' }}>We guarantee the most smooth customer support service. We don't give the problems second chances. Your Convenience, Our Priority.</p>
            <p className={styles.h}>Offline Trainings and Mentorships</p>
                <p className={styles.para} style={{ textAlign: 'left', fontSize: '16px', margin: '28px 0px 16px 0px' }}>We make sure that you get the physical exposure that you always keep looking for. Also, we are the only ones in the industry to conduct customized mentorships exclusively for beginners as well. Each one gets a fair chance to learn it all.</p>
            </div>
        </div>
        <div className={styles.overlay_img}></div>
    </div>
    {/* The Footer component is a reusable UI component that is defined elsewhere but can be imported easily in any other file */}
    <Footer /> 

    </main>
    );
}
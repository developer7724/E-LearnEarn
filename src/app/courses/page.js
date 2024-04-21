'use client'; // using client side rendering

import Image from "next/image"; // Importing Image component from next/image package
import styles from "./page.module.css"; // Importing styles from css module file
import { useState, useEffect } from 'react'; // Importing Hooks from React to handle state management
import Footer from "../components/footer"; // Importing footer component from another module
import Link from 'next/link'; // Importing Link component to allow for smooth navigation between pages

export default function Courses() {
    const [show, setShow] = useState('translateX(-100%)'); // State variable to hide and show the dropdown menu in mobile view
    const [category, setCategory] = useState('All'); // State variable to store the currently clicked category in the courses section

    // Function to handle category click
    const handleCategoryClick = (category) => {
        setCategory(category); // Set the new state of the category to what is clicked on
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
        <li className={`${styles.link} ${styles.red} ${styles.current_link}`}><Link href="/courses">Courses</Link></li>
        <li className={styles.link}>Packages</li>
        <li className={`${styles.link}`}><Link href="/about">About Us</Link></li>
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
      <Image className={styles.logo}
      src="/logo.png"
      alt="logo"
      width={200}
      height={54}
      />
      {/* contains list of links to different pages using static routing */}
      <ul className={styles.desktop_link}>
        <li className={`${styles.link}`}><Link href="/">Home</Link></li>
        <li className={`${styles.link} ${styles.red} ${styles.current_link}`}><Link href="/courses">Courses</Link></li>
        <li className={styles.link}>Packages</li>
        <li className={styles.link}><Link href="/about">About Us</Link></li>
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
        {/* Home section that contains search bar to search from courses */}
        <div className={styles.home}>
            <h1 className={styles.h1}>Our Courses</h1>
            <p className={styles.p}>Unleash Your Potential with Our Inspiring Online Courses.</p>
            <div className={styles.div}>
                <input type="text" className={styles.input} placeholder="Search" autoComplete="off" spellCheck="false" />
                <button className={styles.search}>
                    <Image className={styles.icon}
                    src="/search.svg"
                    alt="icon"
                    width={20}
                    height={20}
                    />
                </button>
            </div>
        </div>
        {/* Courses section to display courses based on category */}
        <div className={styles.courses}>
            <div className={styles.header}></div>
            {/* Each li element has it's class set dynamically based on the current state of the category variable */}
            {/* The onClick function is used to send the category as a parameter to the handleCategoryClick function which sets the state of the category variable */}
            <ul className={styles.category}>
                <li className={`${styles.name} ${category === 'All' && styles.current}`} onClick={() => handleCategoryClick('All')}>All</li>
                <li className={`${styles.name} ${category === 'Marketing' && styles.current}`} onClick={() => handleCategoryClick('Marketing')}>Marketing</li>
                <li className={`${styles.name} ${category === 'Sales' && styles.current}`} onClick={() => handleCategoryClick('Sales')}>Sales</li>
                <li className={`${styles.name} ${category === 'Editing' && styles.current}`} onClick={() => handleCategoryClick('Editing')}>Editing</li>
                <li className={`${styles.name} ${category === 'Finance' && styles.current}`} onClick={() => handleCategoryClick('Finance')}>Finance</li>
                <li className={`${styles.name} ${category === 'Management' && styles.current}`} onClick={() => handleCategoryClick('Management')}>Management</li>
                <li className={`${styles.name} ${category === 'Digital Marketing' && styles.current}`} onClick={() => handleCategoryClick('Digital Marketing')}>Digital Marketing</li>
                <li className={`${styles.name} ${category === 'Animation' && styles.current}`} onClick={() => handleCategoryClick('Animation')}>Animation</li>
                <li className={`${styles.name} ${category === 'Technology' && styles.current}`} onClick={() => handleCategoryClick('Technology')}>Technology</li>
            </ul>
            {/* Display cards that contains Course details */}
            <div className={styles.display}>
                <div className={styles.card}>
                    <Image className={styles.img}
                    src="/course.png"
                    alt="pic"
                    width={310}
                    height={169}
                    />
                    <div className={styles.content}>
                        <p className={styles.title}>Ace the Interviews</p>
                        <div className={styles.section}>
                            <Image className={styles.faculty}
                            src="/faculty.png"
                            alt="faculty"
                            width={46}
                            height={46}
                            />
                            <p className={styles.faculty_name}>Dr. Sneha Sharma</p>
                        </div>
                    </div>
                    <div className={styles.play}>
                        <Image className={styles.play_btn}
                        src="/play.png"
                        alt="play"
                        width={24}
                        height={24}
                        />
                    </div>
                </div>
                <div className={styles.card}>
                    <Image className={styles.img}
                    src="/course.png"
                    alt="pic"
                    width={310}
                    height={169}
                    />
                    <div className={styles.content}>
                        <p className={styles.title}>Ace the Interviews</p>
                        <div className={styles.section}>
                            <Image className={styles.faculty}
                            src="/faculty.png"
                            alt="faculty"
                            width={46}
                            height={46}
                            />
                            <p className={styles.faculty_name}>Dr. Sneha Sharma</p>
                        </div>
                    </div>
                    <div className={styles.play}>
                        <Image className={styles.play_btn}
                        src="/play.png"
                        alt="play"
                        width={24}
                        height={24}
                        />
                    </div>
                </div>
                <div className={styles.card}>
                    <Image className={styles.img}
                    src="/course.png"
                    alt="pic"
                    width={310}
                    height={169}
                    />
                    <div className={styles.content}>
                        <p className={styles.title}>Ace the Interviews</p>
                        <div className={styles.section}>
                            <Image className={styles.faculty}
                            src="/faculty.png"
                            alt="faculty"
                            width={46}
                            height={46}
                            />
                            <p className={styles.faculty_name}>Dr. Sneha Sharma</p>
                        </div>
                    </div>
                    <div className={styles.play}>
                        <Image className={styles.play_btn}
                        src="/play.png"
                        alt="play"
                        width={24}
                        height={24}
                        />
                    </div>
                </div>
                <div className={styles.card}>
                    <Image className={styles.img}
                    src="/course.png"
                    alt="pic"
                    width={310}
                    height={169}
                    />
                    <div className={styles.content}>
                        <p className={styles.title}>Ace the Interviews</p>
                        <div className={styles.section}>
                            <Image className={styles.faculty}
                            src="/faculty.png"
                            alt="faculty"
                            width={46}
                            height={46}
                            />
                            <p className={styles.faculty_name}>Dr. Sneha Sharma</p>
                        </div>
                    </div>
                    <div className={styles.play}>
                        <Image className={styles.play_btn}
                        src="/play.png"
                        alt="play"
                        width={24}
                        height={24}
                        />
                    </div>
                </div>
                <div className={styles.card}>
                    <Image className={styles.img}
                    src="/course.png"
                    alt="pic"
                    width={310}
                    height={169}
                    />
                    <div className={styles.content}>
                        <p className={styles.title}>Ace the Interviews</p>
                        <div className={styles.section}>
                            <Image className={styles.faculty}
                            src="/faculty.png"
                            alt="faculty"
                            width={46}
                            height={46}
                            />
                            <p className={styles.faculty_name}>Dr. Sneha Sharma</p>
                        </div>
                    </div>
                    <div className={styles.play}>
                        <Image className={styles.play_btn}
                        src="/play.png"
                        alt="play"
                        width={24}
                        height={24}
                        />
                    </div>
                </div>
                <div className={styles.card}>
                    <Image className={styles.img}
                    src="/course.png"
                    alt="pic"
                    width={310}
                    height={169}
                    />
                    <div className={styles.content}>
                        <p className={styles.title}>Ace the Interviews</p>
                        <div className={styles.section}>
                            <Image className={styles.faculty}
                            src="/faculty.png"
                            alt="faculty"
                            width={46}
                            height={46}
                            />
                            <p className={styles.faculty_name}>Dr. Sneha Sharma</p>
                        </div>
                    </div>
                    <div className={styles.play}>
                        <Image className={styles.play_btn}
                        src="/play.png"
                        alt="play"
                        width={24}
                        height={24}
                        />
                    </div>
                </div>
                <div className={styles.card}>
                    <Image className={styles.img}
                    src="/course.png"
                    alt="pic"
                    width={310}
                    height={169}
                    />
                    <div className={styles.content}>
                        <p className={styles.title}>Ace the Interviews</p>
                        <div className={styles.section}>
                            <Image className={styles.faculty}
                            src="/faculty.png"
                            alt="faculty"
                            width={46}
                            height={46}
                            />
                            <p className={styles.faculty_name}>Dr. Sneha Sharma</p>
                        </div>
                    </div>
                    <div className={styles.play}>
                        <Image className={styles.play_btn}
                        src="/play.png"
                        alt="play"
                        width={24}
                        height={24}
                        />
                    </div>
                </div>
            </div>
        </div>
        {/* The Footer component is a reusable UI component that is defined elsewhere but can be imported easily in any other file */}
        <Footer />

        </main>
    );
}
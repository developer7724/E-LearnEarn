'use client'; // using client side rendering

import Image from "next/image"; // Importing Image component from next/image package
import styles from "./page.module.css"; // Importing styles from css module file
import { useState, useEffect } from 'react'; // Importing Hooks from React to handle state management
import Footer from "./components/footer"; // Importing footer component from another module
import Link from 'next/link'; // Importing Link component to allow for smooth navigation between pages

export default function Home() {
// State for controlling the visibility of answers for each question
const [showAnswers, setShowAnswers] = useState({});
// State for tracking the current slide number
const [num, setNum] = useState(1);
// State for controlling the direction of horizontal carousal
const [flag, setFlag] = useState('forward');
// State for controlling the visibility of a component
const [show, setShow] = useState('translateX(-100%)');
// State for tracking whether the viewport is desktop-sized
const [isDesktop, setIsDesktop] = useState(false);
// State for tracking the width of the carousal container
const [width, setWidth] = useState(1150);
// State for tracking whether the viewport is mobile-sized
const [isMobile, setIsMobile] = useState(false);

// Side Effect for updating states based on viewport size
useEffect(() => {
  const handleResize = () => {
    // Update isDesktop state based on viewport width
    setIsDesktop(window.innerWidth > 1024);
    // Update width state based on viewport width
    setWidth(window.innerWidth > 600 && window.innerWidth <= 1024 ? 752 : 1150);
    // Update isMobile state based on viewport width
    setIsMobile(window.innerWidth <= 600); 
  };

  // Initial resize check
  handleResize();
  // Add event listener for window resize
  window.addEventListener('resize', handleResize);

  // Cleanup on component unmount
  return () => window.removeEventListener('resize', handleResize);
}, []);

// Additional state for controlling the vertical navigation
const [no, setNo] = useState(1);
const [fl, setFl] = useState('down');

// Function to toggle the visibility of answers for a specific question
const toggleAnswer = (questionId) => {
  // Update showAnswers state based on the previous state
  setShowAnswers(prevState => ({
    ...prevState, // Spread previous state to avoid mutation
    [questionId]: !prevState[questionId] // Toggle the visibility of the specified question
  }));
};

// Height variable declaration for vertical carousal
let height = 400;

  // Function to trigger forward motion in horizontal carousal
  function forward() {
    if (num >= 1 && num < 3) {
      setNum(num + 1); // Increase the current num or set the next slide for moving forward
    } else if (num === 3) {
      setFlag('backward'); // When we reach the end of slides, set motion to backwards to go back again creating an infinite motion
    }
  }

  // Function to trigger downward motion in vertical carousal
  function down() {
    if (num >= 1 && num < 3) {
      setNo(num + 1); // Increase the current num or set the next slide for moving down
    } else if (num === 3) {
      setFl('up'); // When we reach the end of slides, set motion to upwards to go back again creating an infinite motion
    }
  }

  // Function to trigger backward motion in horizontal carousal
  function backward() {
    if (num > 1) {
      setNum(num - 1); // Decrease the current num or set the prev slide for moving forward
    } else if (num === 1) {
      setFlag('forward');// When e reach the first slide, set motion to forwards to go back again creating an infinite motion
    }
  }

  // Function to trigger upward motion in vertical carousal
  function up() {
    if (num > 1) {
      setNo(num - 1); // Decrease the current num or set the next slide for moving up
    } else if (num === 1) {
      setFlag('down'); // When we reach the end of slides, set motion to downwards to go back again creating an infinite motion
    }
  }

// Effect to automatically trigger horizontal carousel motion
useEffect(() => {
  const interval = setInterval(() => {
    // Check the direction flag to determine whether to move forward or backward
    if (flag === "forward") {
      forward(); // Trigger forward motion
    } else if (flag === "backward") {
      backward(); // Trigger backward motion
    }
  }, 3000);
  
  // Cleanup interval on component unmount or state change
  return () => clearInterval(interval);
}, [num, flag]); // Re-run effect when num or flag state changes

// Effect to automatically trigger vertical carousel motion
useEffect(() => {
  const interval = setInterval(() => {
    // Check the direction flag to determine whether to move down or up
    if (fl === "down") {
      down(); // Trigger downward motion
    } else if (fl === "up") {
      up(); // Trigger upward motion
    }
  }, 3000);
  
  // Cleanup interval on component unmount or state change
  return () => clearInterval(interval);
}, [no, fl]); // Re-run effect when no or fl state changes

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
        <li className={`${styles.link} ${styles.red} ${styles.current_link}`}><Link href="/">Home</Link></li>
        <li className={styles.link}><Link href="/courses">Courses</Link></li>
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
        <li className={`${styles.link} ${styles.red} ${styles.current_link}`}><Link href="/">Home</Link></li>
        <li className={styles.link}><Link href="/courses">Courses</Link></li>
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

    {/* Check if the user is in desktop-viewor mobile render a different background image for home */}
    { isDesktop ? (
    <div className={styles.home}>
    <p className={styles.heading}>Unlock your Digital Potential</p>
    <p className={`${styles.heading} ${styles.m_}`}>with <span className={styles.h_big}><span className={styles.light_green}>E-Learn</span><span className={styles.light_blue}>Earn</span></span></p>
    <p className={styles.para}>Unlock your potential with our comprehensive e-learning resources and master the skills to Learn, Implement & Grow.</p>
    <div className={styles.btn_div}>
      <Link href="/signup"><button className={styles.btn1}>Register Now</button></Link>
      <Link href="/courses"><button className={styles.btn2}>Find Courses</button></Link>
    </div>
    <ul className={styles.ul}>
      <li style={{ float: 'left' }}><Image src="/medal.svg" alt="medal" width={40} height={40} /></li>
      <li style={{ float: 'left' }} className={styles.li}>High Valued Certification</li>
      <li style={{ float: 'left' }}><Image src="/hourglass.svg" alt="medal" width={40} height={40} /></li>
      <li style={{ float: 'left' }} className={styles.li}>LifeTime Access</li>
    </ul>
  </div>
    ):(
    <div className={styles.home_}>
    <p className={`${styles.heading} ${styles.h_}`}>Unlock your Digital Potential</p>
    <p className={`${styles.heading} ${styles.m_} ${styles.h_}`}>with <span className={styles.h_big}><span className={styles.light_green}>E-Learn</span><span className={styles.light_blue}>Earn</span></span></p>
    <p className={styles.para}>Unlock your potential with our comprehensive e-learning resources and master the skills to Learn, Implement & Grow.</p>
    <div className={styles.btn_div}>
      <Link href="/signup"><button className={styles.btn1}>Register Now</button></Link>
      <Link href="/courses"><button className={styles.btn2}>Find Courses</button></Link>
    </div>
    <ul className={styles.ul} style={{ overflow: 'hidden', listStyle: 'none' }}>
  <li style={{ float: 'left' }}>
    <Image src="/medal.svg" alt="medal" width={40} height={40} />
  </li>
  <li style={{ float: 'left' }} className={styles.li}>
    High Valued Certification
  </li>
  <li style={{ clear: 'both' }}></li>
  <li style={{ float: 'left' }}>
    <Image src="/hourglass.svg" alt="medal" width={40} height={40} />
  </li>
  <li style={{ float: 'left' }} className={styles.li}>
    LifeTime Access
  </li>
  </ul>
      </div>
    )}

    {/* Banner Section */}
    <div className={styles.banners}>
      <div className={styles.box}>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
      </div>
    </div>

    {/* News section */}
    <div className={styles.news}>
      <h1 className={styles.heading} style={{ color: '#000' }}>Latest News & Media Coverage</h1>
      <div className={styles.container}>
        <div className={styles.text}>
        E-LearnEarn, the leading e-learning platform, gains recognition from reputable news media, marking its presence across television, radio, digital, and print media.<br /><br />
        Highlighted as a transformative force in online learning, our commitment to excellence and innovation creates abundant opportunities within one brand. With high-quality courses, offline and online presence, and a culture of continuous learning, E-LearnEarn is a trusted name in e-learning.<br /><br />
        Positive coverage from renowned news media strengthens our mission to redefine skill development, career opportunities, and financial freedom in India. Grateful for learner and partner support.<br /><br />
        </div>
        <div className={styles.partners}></div>
      </div>
    </div>

    {/* Packages section */}
    <div className={styles.packages}>
      <h1 className={styles.heading} style={{ color: '#000' }}>Educational Packages</h1>
      <p className={styles.para} style={{ color: '#284B50', textAlign: 'center', width: '100%' }}>Unlock Your Potential with Our Educational Packages - Enroll Today!</p>
      <div className={styles.card_container}>
        <div className={styles.card1}>
          <div className={styles.header}>Elite</div>
          <ul className={styles.feature_ul}>
            <li className={styles.feature}>&#10003; Get access to 12 Trainings</li>
            <li className={styles.feature}>&#10003; Free Training</li>
            <li className={styles.feature}>&#10003; Can avail 5 bonuses</li>
            <li className={styles.feature}>&#10003; Learning from Leaders</li>
            <li className={styles.feature}>&#10003; Whatsapp Support</li>
            <li className={styles.feature}>&#10003; Special Training on different fields</li>
          </ul>
          <button className={styles.buy}>Buy Now</button>
        </div>
        <div className={styles.card1}>
          <div className={styles.header}>Pro</div>
          <ul className={styles.feature_ul}>
            <li className={styles.feature}>&#10003; Get access to 12 Trainings</li>
            <li className={styles.feature}>&#10003; Free Training</li>
            <li className={styles.feature}>&#10003; Can avail 5 bonuses</li>
            <li className={styles.feature}>&#10003; Learning from Leaders</li>
            <li className={styles.feature}>&#10003; Whatsapp Support</li>
            <li className={styles.feature}>&#10003; Special Training on different fields</li>
          </ul>
          <button className={styles.buy}>Buy Now</button>
        </div>
        <div className={styles.card1}>
          <div className={styles.header}>Supreme</div>
          <ul className={styles.feature_ul}>
            <li className={styles.feature}>&#10003; Get access to 12 Trainings</li>
            <li className={styles.feature}>&#10003; Free Training</li>
            <li className={styles.feature}>&#10003; Can avail 5 bonuses</li>
            <li className={styles.feature}>&#10003; Learning from Leaders</li>
            <li className={styles.feature}>&#10003; Whatsapp Support</li>
            <li className={styles.feature}>&#10003; Special Training on different fields</li>
          </ul>
          <button className={styles.buy}>Buy Now</button>
          <div className={styles.recomm}>Recommended</div>
        </div>
        <div className={styles.card1}>
          <div className={styles.header}>Premium</div>
          <ul className={styles.feature_ul}>
            <li className={styles.feature}>&#10003; Get access to 12 Trainings</li>
            <li className={styles.feature}>&#10003; Free Training</li>
            <li className={styles.feature}>&#10003; Can avail 5 bonuses</li>
            <li className={styles.feature}>&#10003; Learning from Leaders</li>
            <li className={styles.feature}>&#10003; Whatsapp Support</li>
            <li className={styles.feature}>&#10003; Special Training on different fields</li>
          </ul>
          <button className={styles.buy}>Buy Now</button>
          <div className={styles.recomm}>Recommended</div>
        </div>
      </div>
    </div>

    {/* Events section */}
    <div className={styles.events}>
      <h1 className={styles.heading} style={{ color: '#000', fontSize: '48px' }}>BlockBuster Sunday</h1>
      <div className={styles.events_container}>
        <div className={styles.frame}>
          <Image className={styles.event_pic}
          src="/event.svg"
          alt="event"
          width={415}
          height={382}
          />
        </div>
        <div className={styles.event_right}>
          <p className={styles.h_medium}>To be Announced Soon!</p>
          <p className={styles.h_small}>Date - will be updated</p>
          <p className={`${styles.para} ${styles.p}`} style={{ color: '#000' }}>As you know we have conducted multiple sunday blockbusters sessions in multiple different domains like content creation, marketing, video editing, finance etc. Next one will be announced soon.Let us know on what topic you want Next Session?</p>
          <button className={styles.feedback_btn}>Give Feedback</button>
        </div>
      </div>
    </div>

    {/* Why Us section */}
    <div className={styles.why}>
      <h1 className={styles.heading} style={{ color: '#000', fontSize: '48px' }}>Why E-LearnEarn</h1>
      <p className={styles.h_small} style={{ fontWeight: '300' }}>Your gateway to lifelong learning & Success</p>
      <div className={styles.stats}>
        <ul className={styles.list}>
          <li className={styles.big}>100+</li>
          <li className={styles.small}>Experienced Trainers</li>
        </ul>
        <ul className={styles.list}>
          <li className={styles.big}>35+</li>
          <li className={styles.small}>Courses Rolling Out</li>
        </ul>
        <ul className={styles.list}>
          <li className={styles.big}>120K+</li>
          <li className={styles.small}>Trained Students</li>
        </ul>
        <ul className={styles.list}>
          <li className={styles.big}>15Cr+</li>
          <li className={styles.small}>Community Earning</li>
        </ul>
      </div>
    </div>

    <div className={styles.download}>
      {/* Check if the user is in desktop view or mobile view to render images based on viewport */}
      {isDesktop ? (
      <>
      <h1 className={styles.heading} style={{ color: '#ffff', fontSize: '64px' }}>Download</h1>
      <p className={styles.para} style={{ color: 'rgba(255,255,255,0.67)' }}>Get Your Hands on the Ultimate Learning Companion. Download the E-LearnEarn App Today!</p>
      <div className={styles.pic_div}>
        <Image className={styles.android}
        src="/gplay.svg"
        alt="playstore"
        width={210}
        height={67}
        />
        <Image className={styles.apple}
        src="/appstore.svg"
        alt="playstore"
        width={210}
        height={67}
        />
      </div>
      <div className={styles.phone}></div>
      </>
      ):(
        <>
        <div className={styles.phone}></div>
        <h1 className={styles.heading} style={{ color: '#ffff', fontSize: '64px' }}>Download</h1>
      <p className={`${styles.para} ${styles.p_}`} style={{ color: 'rgba(255,255,255,0.67)' }}>Get Your Hands on the Ultimate Learning Companion. Download the E-LearnEarn App Today!</p>
      <div className={styles.pic_div}>
        <Image className={styles.android}
        src="/gplay.svg"
        alt="playstore"
        width={210}
        height={67}
        />
        <Image className={styles.apple}
        src="/appstore.svg"
        alt="playstore"
        width={210}
        height={67}
        />
      </div>
        </>
      )}
    </div>

    <div className={styles.experts}>
      {/* Check if the user is in desktop view or mobile view to render either an Owl Carousal(in Desktop) or cards Interface(in mobile) based on viewport */}
      {isMobile ? (
        <>
          <h1 className={styles.heading} style={{ color: '#000'}}>Meet our Experts</h1>
          <p className={styles.para} style={{ color: '#0E6557', width: '100%', textAlign: 'center', margin: '16px 0px 38px 0px' }}>Unlock Your Potential with Our Team of Expert Instructors - Meet the Masters of Their Craft.</p>
          {/* Single card Interface */}
          <div className={styles.card}>
          <Image className={styles.trainer}
          src="/t1.svg"
          alt="t1"
          width={265}
          height={245}
          />
          <h1 className={styles.trainer_name}>Donovan Blake</h1>
          <p className={styles.designation}>Instructor</p>
        </div>
        <div className={styles.card}>
          <Image className={styles.trainer}
          src="/jenny.png"
          alt="t1"
          width={265}
          height={245}
          />
          <h1 className={styles.trainer_name}>Jennifer Beverly</h1>
          <p className={styles.designation}>Instructor</p>
        </div>
        <div className={styles.card}>
          <Image className={styles.trainer}
          src="/t3.png"
          alt="t1"
          width={265}
          height={245}
          />
          <h1 className={styles.trainer_name}>John Doe</h1>
          <p className={styles.designation}>Instructor</p>
        </div>
        <div className={styles.card}>
          <Image className={styles.trainer}
          src="/t4.svg"
          alt="t1"
          width={265}
          height={245}
          />
          <h1 className={styles.trainer_name}>Rosa Parks</h1>
          <p className={styles.designation}>Instructor</p>
        </div>
        </>
      ):(
        <>
      <h1 className={styles.heading} style={{ color: '#000'}}>Meet our Experts</h1>
      <p className={styles.para} style={{ color: '#0E6557', width: '100%', textAlign: 'center', margin: '16px 0px 38px 0px' }}>Unlock Your Potential with Our Team of Expert Instructors - Meet the Masters of Their Craft.</p>
      <div className={styles.gallery}>
        {/* Using the current slide number translate the wrapper inside the gallery to display the corresponding slides */}
        <div className={styles.wrapper} style={{ transform: `translateX(-${(num - 1) * width}px)` }}>
          <div className={styles.slide}>
          {/* Each slide contains 4 cards */}
          <div className={styles.card}>
          <Image className={styles.trainer}
          src="/t1.svg"
          alt="t1"
          width={265}
          height={245}
          />
          <h1 className={styles.trainer_name}>Donovan Blake</h1>
          <p className={styles.designation}>Instructor</p>
        </div>
        <div className={styles.card}>
          <Image className={styles.trainer}
          src="/jenny.png"
          alt="t1"
          width={265}
          height={245}
          />
          <h1 className={styles.trainer_name}>Jennifer Beverly</h1>
          <p className={styles.designation}>Instructor</p>
        </div>
        <div className={styles.card}>
          <Image className={styles.trainer}
          src="/t3.png"
          alt="t1"
          width={265}
          height={245}
          />
          <h1 className={styles.trainer_name}>John Doe</h1>
          <p className={styles.designation}>Instructor</p>
        </div>
        <div className={styles.card}>
          <Image className={styles.trainer}
          src="/t4.svg"
          alt="t1"
          width={265}
          height={245}
          />
          <h1 className={styles.trainer_name}>Rosa Parks</h1>
          <p className={styles.designation}>Instructor</p>
        </div>
          </div>
          <div className={styles.slide}>
          <div className={styles.card}>
          <Image className={styles.trainer}
          src="/t1.svg"
          alt="t1"
          width={265}
          height={245}
          />
          <h1 className={styles.trainer_name}>Donovan Blake</h1>
          <p className={styles.designation}>Instructor</p>
        </div>
        <div className={styles.card}>
          <Image className={styles.trainer}
          src="/jenny.png"
          alt="t1"
          width={265}
          height={245}
          />
          <h1 className={styles.trainer_name}>Jennifer Beverly</h1>
          <p className={styles.designation}>Instructor</p>
        </div>
        <div className={styles.card}>
          <Image className={styles.trainer}
          src="/t3.png"
          alt="t1"
          width={265}
          height={245}
          />
          <h1 className={styles.trainer_name}>John Doe</h1>
          <p className={styles.designation}>Instructor</p>
        </div>
        <div className={styles.card}>
          <Image className={styles.trainer}
          src="/t4.svg"
          alt="t1"
          width={265}
          height={245}
          />
          <h1 className={styles.trainer_name}>Rosa Parks</h1>
          <p className={styles.designation}>Instructor</p>
        </div>
          </div>
          <div className={styles.slide}>
          <div className={styles.card}>
          <Image className={styles.trainer}
          src="/t1.svg"
          alt="t1"
          width={265}
          height={245}
          />
          <h1 className={styles.trainer_name}>Donovan Blake</h1>
          <p className={styles.designation}>Instructor</p>
        </div>
        <div className={styles.card}>
          <Image className={styles.trainer}
          src="/jenny.png"
          alt="t1"
          width={265}
          height={245}
          />
          <h1 className={styles.trainer_name}>Jennifer Beverly</h1>
          <p className={styles.designation}>Instructor</p>
        </div>
        <div className={styles.card}>
          <Image className={styles.trainer}
          src="/t3.png"
          alt="t1"
          width={265}
          height={245}
          />
          <h1 className={styles.trainer_name}>John Doe</h1>
          <p className={styles.designation}>Instructor</p>
        </div>
        <div className={styles.card}>
          <Image className={styles.trainer}
          src="/t4.svg"
          alt="t1"
          width={265}
          height={245}
          />
          <h1 className={styles.trainer_name}>Rosa Parks</h1>
          <p className={styles.designation}>Instructor</p>
        </div>
          </div>
        </div>
      </div>
        </>
      )}
    </div>

    {/* Reviews section */}
    <div className={styles.reviews}>
      <div className={styles.side}></div>
      <h1 className={`${styles.heading} ${styles.Z_}`} style={{ color: '#0C1D2C' }}>Students Review</h1>
      <p className={`${styles.para} ${styles.X_}`} style={{ color: '#0E6557', width: '100%', textAlign: 'center', margin: '8px 0px 54px 0px' }}>Find out what our students have to say about their learning experience</p>
      <div className={styles.review_container}>
      <video className={styles.video} controls>
        <source src="/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.gallery_top}>
        {/* Using the current slide number translate the wrapper inside the gallery_top to display the corresponding slides */}
        <div className={styles.wrapper_top} style={{ transform: `translateY(-${(num - 1) * height}px)` }}>
          <div className={styles.slide_top}>
            {/* Each slide contains two tabs of testimonials */}
            <div className={styles.tab}>
              <Image className={styles.pf}
              src="/profile.svg"
              alt="pf"
              width={74}
              height={74}
              />
              <div className={styles.review}>
                <p className={styles.h_medium} style={{ color: '#000', fontSize: '18px', fontWeight: '600' }}>Paridhi Agarwal</p>
                <p className={styles.para} style={{ color: '#000', width: '380px', fontSize: '14px', margin: '8px 0px 0px 0px' }}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
            </div>
            <div className={styles.tab}>
              <Image className={styles.pf}
              src="/profile.svg"
              alt="pf"
              width={74}
              height={74}
              />
              <div className={styles.review}>
                <p className={styles.h_medium} style={{ color: '#000', fontSize: '18px', fontWeight: '600' }}>Paridhi Agarwal</p>
                <p className={styles.para} style={{ color: '#000', width: '380px', fontSize: '14px', margin: '8px 0px 0px 0px' }}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
            </div>
          </div>
          <div className={styles.slide_top}>
            <div className={styles.tab}>
              <Image className={styles.pf}
              src="/profile.svg"
              alt="pf"
              width={74}
              height={74}
              />
              <div className={styles.review}>
                <p className={styles.h_medium} style={{ color: '#000', fontSize: '18px', fontWeight: '600' }}>Paridhi Agarwal</p>
                <p className={styles.para} style={{ color: '#000', width: '380px', fontSize: '14px', margin: '8px 0px 0px 0px' }}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
            </div>
            <div className={styles.tab}>
              <Image className={styles.pf}
              src="/profile.svg"
              alt="pf"
              width={74}
              height={74}
              />
              <div className={styles.review}>
                <p className={styles.h_medium} style={{ color: '#000', fontSize: '18px', fontWeight: '600' }}>Paridhi Agarwal</p>
                <p className={styles.para} style={{ color: '#000', width: '380px', fontSize: '14px', margin: '8px 0px 0px 0px' }}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
            </div>
          </div>
          <div className={styles.slide_top}>
            <div className={styles.tab}>
              <Image className={styles.pf}
              src="/profile.svg"
              alt="pf"
              width={74}
              height={74}
              />
              <div className={styles.review}>
                <p className={styles.h_medium} style={{ color: '#000', fontSize: '18px', fontWeight: '600' }}>Paridhi Agarwal</p>
                <p className={styles.para} style={{ color: '#000', width: '380px', fontSize: '14px', margin: '8px 0px 0px 0px' }}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
            </div>
            <div className={styles.tab}>
              <Image className={styles.pf}
              src="/profile.svg"
              alt="pf"
              width={74}
              height={74}
              />
              <div className={styles.review}>
                <p className={styles.h_medium} style={{ color: '#000', fontSize: '18px', fontWeight: '600' }}>Paridhi Agarwal</p>
                <p className={styles.para} style={{ color: '#000', width: '380px', fontSize: '14px', margin: '8px 0px 0px 0px' }}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

    {/* FAQ section */}
    <div className={styles.questions}>
      <h1 className={styles.heading} style={{ color: '#000'}}>FAQ - Curious Minds wants to know</h1>
      <p className={styles.para} style={{ color: '#0E6557', width: '100%', textAlign: 'center', margin: '16px 0px 28px 0px' }}>Here are answers to your burning questions</p>
      <div className={styles.section}>
        <div className={styles.ques}>
          <span>What is E-LearnEarn ?</span>
          <Image className={styles.drop_btn} style={{ float: 'right' }} onClick={() => toggleAnswer("1")}
          src="/Frame 89.svg"
          alt="drop"
          width={24}
          height={24}
          />
        </div>
        {/* Conditionally render the answer component if showAnswers["1"] is true */}
        {showAnswers["1"] && (
        <div className={styles.answer}>
          <p>E-LearnEarn is an online platform that offers a wide range of digital courses and skill based trainings to help individuals enhance their skills and knowledge in all the fields relevant in today's time.</p>
        </div>
        )}
        <div className={styles.ques}>
          <span>What is E-LearnEarn ?</span>
          <Image className={styles.drop_btn} style={{ float: 'right' }} onClick={() => toggleAnswer("2")}
          src="/Frame 89.svg"
          alt="drop"
          width={24}
          height={24}
          />
        </div>
        {/* Conditionally render the answer component if showAnswers["2"] is true */}
        {showAnswers["2"] && (
        <div className={styles.answer}>
          <p>E-LearnEarn is an online platform that offers a wide range of digital courses and skill based trainings to help individuals enhance their skills and knowledge in all the fields relevant in today's time.</p>
        </div>
        )}
        <div className={styles.ques}>
          <span>What is E-LearnEarn ?</span>
          <Image className={styles.drop_btn} style={{ float: 'right' }} onClick={() => toggleAnswer("3")}
          src="/Frame 89.svg"
          alt="drop"
          width={24}
          height={24}
          />
        </div>
        {/* Conditionally render the answer component if showAnswers["3"] is true */}
        {showAnswers["3"] && (
        <div className={styles.answer}>
          <p>E-LearnEarn is an online platform that offers a wide range of digital courses and skill based trainings to help individuals enhance their skills and knowledge in all the fields relevant in today's time.</p>
        </div>
        )}
        <div className={styles.ques}>
          <span>What is E-LearnEarn ?</span>
          <Image className={styles.drop_btn} style={{ float: 'right' }} onClick={() => toggleAnswer("4")}
          src="/Frame 89.svg"
          alt="drop"
          width={24}
          height={24}
          />
        </div>
        {/* Conditionally render the answer component if showAnswers["4"] is true */}
        {showAnswers["4"] && (
        <div className={styles.answer}>
          <p>E-LearnEarn is an online platform that offers a wide range of digital courses and skill based trainings to help individuals enhance their skills and knowledge in all the fields relevant in today's time.</p>
        </div>
        )}
        <div className={styles.ques}>
          <span>What is E-LearnEarn ?</span>
          <Image className={styles.drop_btn} style={{ float: 'right' }} onClick={() => toggleAnswer("5")}
          src="/Frame 89.svg"
          alt="drop"
          width={24}
          height={24}
          />
        </div>
        {/* Conditionally render the answer component if showAnswers["5"] is true */}
        {showAnswers["5"] && (
        <div className={styles.answer}>
          <p>E-LearnEarn is an online platform that offers a wide range of digital courses and skill based trainings to help individuals enhance their skills and knowledge in all the fields relevant in today's time.</p>
        </div>
        )}
        <div className={styles.ques}>
          <span>What is E-LearnEarn ?</span>
          <Image className={styles.drop_btn} style={{ float: 'right' }} onClick={() => toggleAnswer("6")}
          src="/Frame 89.svg"
          alt="drop"
          width={24}
          height={24}
          />
        </div>
        {/* Conditionally render the answer component if showAnswers["6"] is true */}
        {showAnswers["6"] && (
        <div className={styles.answer}>
          <p>E-LearnEarn is an online platform that offers a wide range of digital courses and skill based trainings to help individuals enhance their skills and knowledge in all the fields relevant in today's time.</p>
        </div>
        )}
        <div className={styles.ques}>
          <span>What is E-LearnEarn ?</span>
          <Image className={styles.drop_btn} style={{ float: 'right' }} onClick={() => toggleAnswer("7")}
          src="/Frame 89.svg"
          alt="drop"
          width={24}
          height={24}
          />
        </div>
        {/* Conditionally render the answer component if showAnswers["7"] is true */}
        {showAnswers["7"] && (
        <div className={styles.answer}>
          <p>E-LearnEarn is an online platform that offers a wide range of digital courses and skill based trainings to help individuals enhance their skills and knowledge in all the fields relevant in today's time.</p>
        </div>
        )}
      </div>
      <div className={styles.heading} style={{ color: '#0C1D2C', marginTop: '28px' }}>E-learnEarn Customer Support</div>
      <p className={styles.para} style={{ color: '#0E6557', width: '100%', textAlign: 'center', marginBottom: '16px' }}>(We are available on Monday to Saturday 9:15am to 5pm)</p>
      <div className={styles.div}>
        <div className={styles.details}>
          <Image className={styles.ph_icon}
          src="/phone_icon.svg"
          alt="icon"
          width={22}
          height={22}
          />
          <span style={{ marginLeft: '6px' }}>+91- 9051852553</span>
        </div>
        <div className={styles.details}>
          <Image className={styles.wh_icon}
          src="/wh_icon.png"
          alt="icon"
          width={22}
          height={22}
          />
          <span style={{ marginLeft: '6px' }}>+91- 9051852553</span>
        </div>
      </div>
    </div>

    {/* Reusable UI Component that is imported from another file */}
    <Footer />

    </main>
  );
}

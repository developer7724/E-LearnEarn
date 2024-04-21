'use client'; // using client side rendering

import Image from "next/image"; // Importing Image component from next/image package
import styles from "./page.module.css"; // Importing styles from css module file
import { useState, useEffect } from 'react'; // Importing Hooks from React to handle state management
import Link from 'next/link'; // Importing Link component to allow for smooth navigation between pages

// This is a resuable UI Component that can be easily imported in any other file just like a module
export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.container}>
                {/* Info section */}
                <div className={styles.div}>
                <Image className={styles.logo}
                src="/logo.png"
                alt="logo"
                width={266}
                height={76}
                />
                <p className={styles.para}>Rather than chasing opportunities, build multiple skillsets and let them come to you. With E-LearnEarn's courses, you can discover the best version of yourself through a beautiful learning system.</p>
                </div>
                {/* Footer links */}
                <div className={styles.footer_div}>
                <ul classsName={styles.footer_ul}>
                    <li className={`${styles.li} ${styles.heading}`}>Support</li>
                    <li className={styles.li}>Contact Us</li>
                    <li className={styles.li}>Disclaimer</li>
                    <li className={styles.li}>Privacy Policy</li>
                    <li className={styles.li}>Terms & Conditions</li>
                </ul>
                <ul classsName={styles.footer_ul}>
                    <li className={`${styles.li} ${styles.heading}`}>Useful Links</li>
                    <li className={styles.li}><Link href="./about">About Us</Link></li>
                    <li className={styles.li}><Link href="./courses">Courses</Link></li>
                    <li className={styles.li}><Link href="./packages">Packages</Link></li>
                </ul>
                <ul classsName={styles.footer_ul}>
                    <li className={`${styles.li} ${styles.heading}`}>Educational Packages</li>
                    <li className={styles.li}>Standard</li>
                    <li className={styles.li}>Elite</li>
                    <li className={styles.li}>Pro</li>
                    <li className={styles.li}>Supreme</li>
                    <li className={styles.li}>Premium</li>
                </ul>
                </div>
            </div>
            <div className={styles.copyright}>@2024. All Rights Reserved By E-LearnEarn Private Limited. Copyright</div>
        </div>
    );
}
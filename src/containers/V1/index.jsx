'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import "../../styles/v1.style.css";

export default function ResumeV1() {
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
    }, [activeSection]);


    return (
        <div>
            <header className="main-header">
                <div className="main-header__logo-container">
                    <div className="main-header__logo-img-cont">
                        <Image
                            src="https://d33wubrfki0l68.cloudfront.net/32c48e23e828c42a99a37db81e2a91d7c8eed4de/d134a/assets/png/ram-maheshwari.png"
                            alt="logo Image" className="main-header__logo-img" height={20} width="20" />
                    </div>
                    <h4 className="main-header__logo-text">Raja Dubey</h4>
                </div>
                <nav className="main-header__navigation">
                    <ul className="main-header__navigation-links">
                        <li className="main-header__navigation-link"><a> Home </a></li>
                        <li className="main-header__navigation-link"><a > About </a></li>
                        <li className="main-header__navigation-link">
                            <a> Projects </a>
                        </li>
                        <li className="main-header__navigation-link"><a> Contact </a></li>
                    </ul>
                </nav>
                <div className="main-header__sm-scr-nav-btn">
                    <div className="main-header__sm-scr-nav-btn-line"></div>
                    <div className="main-header__sm-scr-nav-btn-line"></div>
                </div>
                <div className="main-header__sm-menu">
                    <div className="main-header__sm-menu-close">

                    </div>
                    <ul className="main-header__sm-menu-links">
                        <li>
                            <a className="main-header__sm-menu-link main-header__sm-menu-link--1" name="home-hero">Home</a>
                        </li>

                        <li>
                            <a className="main-header__sm-menu-link main-header__sm-menu-link--2" name="about">About</a>
                        </li>
                        <li>
                            <a className="main-header__sm-menu-link main-header__sm-menu-link--3" name="projects">Projects</a>
                        </li>
                        <li>
                            <a className="main-header__sm-menu-link main-header__sm-menu-link--4" name="contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </header>

            <div className="themeClrSelector">
                <input placeholder="Color Selector" type="color" value="#1DA1F2" className="themeClrSelector__input" />
                <img alt="theme color tester" src="https://img.icons8.com/fluent/48/000000/rgb-circle-1.png"
                    className="themeClrSelector__img" />
            </div>

            <section id="home-hero" className="home-hero">
                <div className="home-hero__content">
                    <div className="home-hero__info">
                        <h1 className="heading-primary home-hero__heading-primary">
                            <span className="heading-primary__sm"> Hello 👋</span>
                            <span className="heading-primary__main">
                                I&apos;m Raja Dubey! A Web Developer Building Awesome Webapps And Websites That Powers The Internet
                            </span>
                        </h1>
                        <button className="btn btn-theme home-hero__btn-theme">Projects</button>
                        <button className="btn btn-inv home-hero__btn-theme">Contact</button>
                    </div>
                </div>
            </section>
            <section id="about" className="about main-section">
                <div className="main-container">
                    <h2 className="heading-secondary projects__heading-secondary">
                        <span className="heading-secondary__sm"> About 🦄</span>
                        <span className="heading-secondary__main">
                            Here you will find more information about me, what I do, and list of my current skills in programming </span>
                    </h2>
                    <div className="main-section__content">
                        <div className="about__info">
                            <div className="about__main-info">
                                <h3 className="heading-quaternary about__heading-quaternary">
                                    My Story
                                </h3>
                                <p className="text-primary about__text-primary">
                                    <span>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Error, aliquid! Itaque corrupti magnam fugiat mollitia labore
                                        magni saepe veritatis voluptatum alias fugit. Explicabo
                                        ducimus sequi aut corporis odio repellendus? Lorem ipsum dolor
                                        sit amet
                                    </span>
                                    <span>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Error, aliquid! Itaque corrupti magnam fugiat mollitia labore
                                        magni saepe veritatis voluptatum alias fugit. Explicabo
                                        ducimus sequi aut corporis odio repellendus? Lorem ipsum dolor
                                        sit amet
                                    </span>
                                    <span>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Error, aliquid! Itaque corrupti magnam fugiat mollitia labore
                                        magni saepe veritatis voluptatum alias fugit. Explicabo
                                        ducimus sequi aut corporis odio repellendus? Lorem ipsum dolor
                                        sit amet
                                    </span>
                                </p>
                                <button className="btn btn-theme about__btn-theme">Projects</button>
                            </div>
                            <div className="about__skill-info">
                                <h3 className="heading-quaternary about__heading-quaternary">
                                    My Skills
                                </h3>
                                <ul className="about__skills">
                                    <li className="about__skill">html</li>
                                    <li className="about__skill">css</li>
                                    <li className="about__skill">javascript</li>
                                    <li className="about__skill">react</li>
                                    <li className="about__skill">node</li>
                                    <li className="about__skill">git</li>
                                    <li className="about__skill">vscode</li>
                                    <li className="about__skill">linux</li>
                                    <li className="about__skill">react</li>
                                    <li className="about__skill">node</li>
                                    <li className="about__skill">git</li>
                                    <li className="about__skill">vscode</li>
                                    <li className="about__skill">linux</li>
                                    <li className="about__skill">javascript</li>
                                    <li className="about__skill">react</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="skills-showcase">
                <ul className="skills-showcase__list">
                    <li className="skills-showcase__list-item">
                        <i className="devicon-html5-plain"></i>
                    </li>
                    <li className="skills-showcase__list-item">
                        <i className="devicon-css3-plain"></i>
                    </li>
                    <li className="skills-showcase__list-item">
                        <i className="devicon-javascript-plain"></i>
                    </li>
                    <li className="skills-showcase__list-item">
                        <i className="devicon-react-original"></i>
                    </li>
                    <li className="skills-showcase__list-item">
                        <i className="devicon-sass-original"></i>
                    </li>
                    <li className="skills-showcase__list-item">
                        <i className="devicon-nodejs-plain"></i>
                    </li>
                    <li className="skills-showcase__list-item">
                        <i className="devicon-git-plain"></i>
                    </li>

                    <li className="skills-showcase__list-item">
                        <i className="devicon-android-plain"></i>
                    </li>
                    <li className="skills-showcase__list-item">
                        <i className="devicon-python-plain"></i>
                    </li>
                </ul>
            </section>
            <section id="projects" className="projects main-section">
                <div className="main-container">
                    <h2 className="heading-secondary projects__heading-secondary">
                        <span className="heading-secondary__sm"> Projects 🛠️</span>
                        <span className="heading-secondary__main">
                            Here you will find some of the personal and clients projects that I created with the project details
                        </span>
                    </h2>
                    <div className="main-section__content">
                        <div className="projects__list">
                            <div className="projects__list-item">
                                <div className="projects__list-item-count">
                                    <span className="projects__list-item-count-num"> 1 </span>
                                    <span className="projects__list-item-count-line"> </span>
                                    <span className="projects__list-item-count-end-dot"> </span>
                                </div>
                                <div className="projects__list-item-details">
                                    <div className="projects__list-item-img-cont">
                                        <img src="/mock.png" alt="Project Image" className="projects__list-item-img" />
                                    </div>
                                    <h3 className="heading-tertiary projects__list-item-heading-tertiary">
                                        Project Name
                                    </h3>

                                    <p className="text-primary projects__list-item-text-primary">
                                        <span>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Error, aliquid! Itaque corrupti magnam fugiat mollitia
                                            labore magni saepe veritatis voluptatum alias fugit.
                                            Explicabo ducimus
                                        </span>
                                        <span>
                                            sapiente aut corporis odio repellendus? Lorem ipsum dolor
                                            sit amet, consectetur adipisicing elit
                                        </span>
                                    </p>
                                    <button className="btn btn-theme projects__btn-theme">
                                        Live Link
                                    </button>
                                    <button className="btn btn-inv projects__btn-inv">Code Link</button>
                                </div>
                            </div>
                            <div className="projects__list-item projects__list-item--inv">
                                <div className="projects__list-item-details">
                                    <div className="projects__list-item-img-cont">
                                        <img src="/mock.png" alt="Project Image" className="projects__list-item-img" />
                                    </div>
                                    <h3 className="heading-tertiary projects__list-item-heading-tertiary">
                                        Project Name
                                    </h3>

                                    <p className="text-primary projects__list-item-text-primary">
                                        <span>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Error, aliquid! Itaque corrupti magnam fugiat mollitia
                                            labore magni saepe veritatis voluptatum alias fugit.
                                            Explicabo ducimus
                                        </span>
                                        <span>
                                            sapiente aut corporis odio repellendus? Lorem ipsum dolor
                                            sit amet, consectetur adipisicing elit
                                        </span>
                                    </p>
                                    <button className="btn btn-theme projects__btn-theme">
                                        Live Link
                                    </button>
                                    <button className="btn btn-inv projects__btn-inv">Code Link</button>
                                </div>
                                <div className="projects__list-item-count">
                                    <span className="projects__list-item-count-num"> 2 </span>
                                    <span className="projects__list-item-count-line"> </span>
                                    <span className="projects__list-item-count-end-dot"> </span>
                                </div>
                            </div>
                            <div className="projects__list-item">
                                <div className="projects__list-item-count">
                                    <span className="projects__list-item-count-num"> 3 </span>
                                    <span className="projects__list-item-count-line"> </span>
                                    <span className="projects__list-item-count-end-dot"> </span>
                                </div>
                                <div className="projects__list-item-details">
                                    <div className="projects__list-item-img-cont">
                                        <img src="/mock.png" alt="Project Image" className="projects__list-item-img" />
                                    </div>
                                    <h3 className="heading-tertiary projects__list-item-heading-tertiary">
                                        Project Name
                                    </h3>

                                    <p className="text-primary projects__list-item-text-primary">
                                        <span>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Error, aliquid! Itaque corrupti magnam fugiat mollitia
                                            labore magni saepe veritatis voluptatum alias fugit.
                                            Explicabo ducimus
                                        </span>
                                        <span>
                                            sapiente aut corporis odio repellendus? Lorem ipsum dolor
                                            sit amet, consectetur adipisicing elit
                                        </span>
                                    </p>
                                    <button className="btn btn-theme projects__btn-theme">
                                        Live Link
                                    </button>
                                    <button className="btn btn-inv projects__btn-inv">Code Link</button>
                                </div>
                            </div>
                            <div className="projects__list-item projects__list-item--inv">
                                <div className="projects__list-item-details">
                                    <div className="projects__list-item-img-cont">
                                        <img src="/mock.png" alt="Project Image" className="projects__list-item-img" />
                                    </div>
                                    <h3 className="heading-tertiary projects__list-item-heading-tertiary">
                                        Project Name
                                    </h3>

                                    <p className="text-primary projects__list-item-text-primary">
                                        <span>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Error, aliquid! Itaque corrupti magnam fugiat mollitia
                                            labore magni saepe veritatis voluptatum alias fugit.
                                            Explicabo ducimus
                                        </span>
                                        <span>
                                            sapiente aut corporis odio repellendus? Lorem ipsum dolor
                                            sit amet, consectetur adipisicing elit
                                        </span>
                                    </p>
                                    <button className="btn btn-theme projects__btn-theme">
                                        Live Link
                                    </button>
                                    <button className="btn btn-inv projects__btn-inv">Code Link</button>
                                </div>
                                <div className="projects__list-item-count">
                                    <span className="projects__list-item-count-num"> 4 </span>
                                    <span className="projects__list-item-count-line"> </span>
                                    <span className="projects__list-item-count-end-dot"> </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="contact" className="contact main-section">
                <div className="main-container">
                    <h2 className="heading-secondary">
                        <span className="heading-secondary__sm"> Contact 📞</span>
                        <span className="heading-secondary__main">
                            Feel free to Contact me by submitting the form below and I will get back to you as soon as possible
                        </span>
                    </h2>
                    <div className="main-section__content">
                        <div className="contact__form-cont">
                            <form className="contact__form">
                                <div className="contact__form-field">
                                    <label htmlFor="name" className="contact__form-field-label">Name</label>
                                    <input placeholder="Enter Your Name" type="text" className="contact__form-field-input" />
                                </div>
                                <div className="contact__form-field">
                                    <label htmlFor="name" className="contact__form-field-label">Email</label>
                                    <input placeholder="Enter Your Email" type="text" className="contact__form-field-input" />
                                </div>
                                <div className="contact__form-field">
                                    <label htmlFor="name" className="contact__form-field-label">Message</label>
                                    <textarea placeholder="Enter Your Message" name="message" id="" cols="30" rows="10"
                                        className="contact__form-field-input"></textarea>
                                </div>
                                <button type="submit" className="contact__form-submit">Submit</button>
                            </form>
                            <div className="contact__form-visual"></div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="main-footer">
                <div className="main-footer__upper">
                    <div className="main-container">
                        <ul className="main-footer__links">
                            <li className="main-footer__link">
                                <a>Home</a>
                            </li>
                            <li className="main-footer__link">
                                <a>About</a>
                            </li>
                            <li className="main-footer__link">
                                <a>Projects</a>
                            </li>
                            <li className="main-footer__link">
                                <a>Contact</a>
                            </li>
                        </ul>
                        <div className="main-footer__mid-line"></div>
                        <div className="main-footer__socials">
                            <a href="#" className="main-footer__social-link">
                                <img
                                    src="/github-ico.png"
                                    alt="" className="main-footer__social-link-icon" />
                            </a>
                            <a href="#" className="main-footer__social-link">
                                <img src="/icons8-instagram-48.png" alt="" className="main-footer__social-link-icon" />
                            </a>
                            <a href="#" className="main-footer__social-link">
                                <img src="/icons8-twitter-50.png" alt="" className="main-footer__social-link-icon" />
                            </a>
                            <a href="#" className="main-footer__social-link">
                                <img
                                    src="/linkedin-ico.png"
                                    alt="" className="main-footer__social-link-icon" />
                            </a>
                            <a href="#" className="main-footer__social-link">
                                <img src="/icons8-pinterest-64.png" alt="" className="main-footer__social-link-icon" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="main-footer__bottom">
                    <div className="main-container">
                        <p className="main-footer__bottom-txt">
                            <a target="_blank" href="https://github.com/rammcodes/wowfolio">WowFolio</a> Open-Source Template
                            <script>document.write(new Date().getFullYear())</script>. Made by
                            <a target="_blank" href="https://rammaheshwari.com">Ram Maheshwari</a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import '../Styles/Footer.css';

const Footer = () => {
  const typedEl = useRef(null);

  useEffect(() => {
    const strings = ['#YouTube', '#Instagram', '#Twitter', '#LinkedIn'];
    const colors = ['youtube', 'instagram', 'twitter', 'linkedin'];

    const typed = new Typed(typedEl.current, {
      strings: strings.map((string, index) => `<span class="${colors[index]}">${string}</span>`),
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <section className="footer-cosmic">
        <div className="footer-container">
          <h1 className="footer-title">Join us on</h1>
          <div className="footer-typed-wrapper">
            <span ref={typedEl} className="footer-typed"></span>
          </div>

          <div className="footer-social">
            <a href="https://www.youtube.com/@SpectoV" target="_blank" rel="noopener noreferrer" className="social-orb youtube-orb">
              <img src="https://img.icons8.com/wired/64/000000/youtube.png" alt="YouTube" />
              <span>YouTube</span>
            </a>
            <a href="https://www.instagram.com/spectov_official/" target="_blank" rel="noopener noreferrer" className="social-orb instagram-orb">
              <img src="https://img.icons8.com/dotty/64/000000/instagram.png" alt="Instagram" />
              <span>Instagram</span>
            </a>
            <a href="https://wa.me/917042860263" target="_blank" rel="noopener noreferrer" className="social-orb whatsapp-orb">
              <img src="https://img.icons8.com/wired/64/000000/whatsapp.png" alt="Whatsapp" />
              <span>Whatsapp</span>
            </a>
            <a href="https://www.linkedin.com/company/specto-v/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="social-orb linkedin-orb">
              <img src="https://img.icons8.com/ios/64/000000/linkedin.png" alt="LinkedIn" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer-cosmic-copyright">
        <div className="copyright-content">
          © 2026 Copyright: <a href="https://mdbootstrap.com/education/bootstrap/">SpectoV, Inc. All Rights Reserved</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
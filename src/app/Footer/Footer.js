import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerCollumn}>
          <div className={styles.footerLogoWrapper}>
            <img
              className={styles.footerLogo}
              src="/logo.png"
              alt="UpTalk Studio"
            />
          </div>
          <div>
            <p className={styles.footerParagraph}>
              Transforming customer support with intelligent AI solutions that
              elevate business success.
            </p>
          </div>
          {/* Social media links/icons
            <div className={styles.footerSocial}>
              <img
                className={styles.footerLogo}
                src="/logo.png"
                alt="UpTalk Studio"
              />{" "}
              <img
                className={styles.footerLogo}
                src="/logo.png"
                alt="UpTalk Studio"
              />{" "}
              <img
                className={styles.footerLogo}
                src="/logo.png"
                alt="UpTalk Studio"
              />
            </div> */}
        </div>
        <div className={styles.footerCollumn}>
          <div>
            <h3>Product</h3>
          </div>
          <div>
            <ul>
              <li className={styles.footerList}>
                <Link className={styles.footerLinks} href="#features">
                  Features
                </Link>
              </li>
              <li className={styles.footerList}>
                <Link className={styles.footerLinks} href="#pricing">
                  Pricing
                </Link>
              </li>
              {/* <li className={styles.footerList}>
                <Link className={styles.footerLinks} href="#features">
                  Documentation
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
        <div className={styles.footerCollumn}>
          <div>
            <h3>Company</h3>
          </div>
          <div>
            <ul>
              <li className={styles.footerList}>
                <Link className={styles.footerLinks} href="#features">
                  About
                </Link>
              </li>

              {/* <li className={styles.footerList}>
                <Link className={styles.footerLinks} href="#features">
                  Blog
                </Link>
              </li> */}

              <li className={styles.footerList}>
                <Link className={styles.footerLinks} href="#contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footerCollumn}>
          <div>
            <h3>Contact</h3>
          </div>
          <div>
            <ul>
              <li className={styles.footerList}>
                <Link
                  className={styles.footerLinks}
                  href="mailto:team@uptalkstudio.com"
                >
                  team@uptalkstudio.com
                </Link>
              </li>
              {/* <li className={styles.footerList}>
                  <Link className={styles.footerLinks} href="#features">
                    0915212344
                  </Link>
                </li> */}
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2024 UpTalk Studio. All rights reserved.</p>
      </div>
    </footer>
  );
}

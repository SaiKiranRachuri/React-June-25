import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p> Cities </p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by Worldwise.
        </p>
      </footer>
    </div>
  );
}

export default SideBar;

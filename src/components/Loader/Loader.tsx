import styles from "./Loader.module.scss";

interface LoaderProps {}

function Loader({}: LoaderProps) {
  return <div className={styles.loader} />;
}

export default Loader;

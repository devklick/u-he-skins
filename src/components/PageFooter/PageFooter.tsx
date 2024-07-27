interface PageFooterProps {}

import styles from "./PageFooter.module.scss";

function PageFooter({}: PageFooterProps) {
  return <div className={styles.pageFooter} />;
}

export default PageFooter;

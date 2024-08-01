import { forwardRef } from "react";
import styles from "./PageFooter.module.scss";

interface PageFooterProps {}

const PageFooter = forwardRef<HTMLDivElement, PageFooterProps>((_, ref) => {
  return <div ref={ref} className={styles.pageFooter} />;
});

export default PageFooter;

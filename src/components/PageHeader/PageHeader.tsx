import ThemeToggle from "../ThemeToggle/ThemeToggle";
import styles from "./PageHeader.module.scss";

interface PageHeaderProps {}

function PageHeader({}: PageHeaderProps) {
  return (
    <div className={styles["page-header"]}>
      <ThemeToggle />
      <h1>u-he skins</h1>
      <p>
        A filterable adaptation of the{" "}
        <a href="https://u-he.com/PatchLib/skins.html">original page</a> listing
        themes for the virtual synthesizers and effects created by{" "}
        <a href="https://u-he.com/">u-he</a>.
      </p>
    </div>
  );
}

export default PageHeader;

import { useTheme } from "~/common/hooks/useTheme";

import styles from "./ThemeToggle.module.scss";
import clsx from "clsx";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function ThemeToggle() {
  const [theme, { toggle: toggleTheme }] = useTheme();
  const isDark = theme === "dark";
  console.log("theme toggle", theme);
  return (
    <button
      className={clsx(styles.themeToggle, {
        [styles["themeToggle--dark"]]: isDark,
      })}
    >
      <IconSun className={styles["themeToggle__icon"]} />

      <div className={styles["themeToggle__track"]} onClick={toggleTheme}>
        <div className={styles["themeToggle__thumb"]} />
      </div>

      <IconMoon className={styles["themeToggle__icon"]} />
    </button>
  );
}

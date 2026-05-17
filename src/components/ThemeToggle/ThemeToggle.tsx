import { useTheme } from "~/common/hooks/useTheme";

import styles from "./ThemeToggle.module.scss";
import clsx from "clsx";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function ThemeToggle() {
  const [theme, { toggle: toggleTheme }] = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      className={clsx(styles["theme-toggle"], {
        [styles["theme-toggle--dark"]]: isDark,
      })}
    >
      <IconSun className={styles["theme-toggle__icon"]} />

      <div className={styles["theme-toggle__track"]} onClick={toggleTheme}>
        <div className={styles["theme-toggle__thumb"]} />
      </div>

      <IconMoon className={styles["theme-toggle__icon"]} />
    </button>
  );
}

import clsx from "clsx";
import styles from "./ActionButton.module.scss";

type ClassNames = Partial<{ container: string; button: string }>;

function isClassNames(value: unknown): value is ClassNames {
  return (
    !!value &&
    typeof value === "object" &&
    "container" in value &&
    "button" in value
  );
}
interface ActionButtonProps {
  handleClick?(): void;
  className?: string | ClassNames;
  withBorder?: boolean;
}

function ActionButton({
  handleClick,
  children,
  className,
  withBorder,
}: React.PropsWithChildren<ActionButtonProps>) {
  const getClass = (type: keyof ClassNames) =>
    isClassNames(className) ? className[type] : className;

  const containerClass = getClass("container");
  const buttonClass = getClass("button");

  return (
    <div className={clsx(styles["action-button__container"], containerClass)}>
      <button
        className={clsx(styles["action-button"], buttonClass, {
          [styles["action-button--bordered"]]: withBorder,
        })}
        onClick={handleClick}
      >
        {children}
      </button>
    </div>
  );
}

export default ActionButton;

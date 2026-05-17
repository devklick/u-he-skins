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
  const getClassName = (type: keyof ClassNames) => {
    if (isClassNames(className)) {
      return className[type];
    }
    return className;
  };

  const containerClass = getClassName("container");
  const buttonClass = getClassName("button");

  return (
    <div className={clsx(styles.actionButtonContainer, containerClass)}>
      <button
        className={clsx(styles.actionButton, buttonClass, {
          [styles["actionButton--bordered"]]: withBorder,
        })}
        onClick={handleClick}
      >
        {children}
      </button>
    </div>
  );
}

export default ActionButton;

import styles from "./ActionButton.module.scss";

interface ActionButtonProps {
  handleClick(): void;
  className?: string;
  withBorder?: boolean;
}

function ActionButton({
  handleClick,
  children,
  className,
  withBorder = true,
}: React.PropsWithChildren<ActionButtonProps>) {
  const classNames = [styles.actionButton];
  if (className) classNames.push(className);
  if (withBorder) classNames.push(styles["actionButton--bordered"]);
  return (
    <button className={classNames.join(" ")} onClick={handleClick}>
      {children}
    </button>
  );
}

export default ActionButton;

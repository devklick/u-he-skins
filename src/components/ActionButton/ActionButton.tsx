import styles from "./ActionButton.module.scss";

interface ActionButtonProps {
  handleClick(): void;
  className?: string;
}

function ActionButton({
  handleClick,
  children,
  className,
}: React.PropsWithChildren<ActionButtonProps>) {
  return (
    <button
      className={[styles.actionButton, className].join(" ")}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default ActionButton;

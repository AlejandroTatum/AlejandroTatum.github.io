type TerminalWindowProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** Set to opt into the clip-path wipe reveal driven by bindTerminalReveals. */
  animated?: boolean;
};

/** Bordered TUI panel: title bar with pixel-square dots + content body. */
export function TerminalWindow({ title, children, className, animated }: TerminalWindowProps) {
  return (
    <div className={className ? `tui-window ${className}` : "tui-window"} data-window={animated ? "" : undefined}>
      <div className="tui-titlebar">
        <div className="tui-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="tui-title">{title}</span>
      </div>
      {children}
    </div>
  );
}

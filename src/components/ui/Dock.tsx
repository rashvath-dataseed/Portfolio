import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  type MotionValue,
} from 'motion/react';
import {
  useRef,
  type ReactNode,
} from 'react';

import './Dock.css';

export type DockItemData = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
};

type DockItemProps = {
  icon: ReactNode;
  label: string;
  className?: string;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  magnification: number;
  baseItemSize: number;
  alwaysShowLabels: boolean;
};

function DockItem({
  icon,
  label,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  alwaysShowLabels,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetScale = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [1, magnification / baseItemSize, 1],
  );
  const scale = useSpring(targetScale, spring);

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      onClick={onClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      <DockIcon>{icon}</DockIcon>
      <span className="dock-item-text">{label}</span>
    </motion.div>
  );
}

type DockIconProps = {
  children: ReactNode;
  className?: string;
};

function DockIcon({ children, className = '' }: DockIconProps) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

type DockProps = {
  items: DockItemData[];
  logo?: ReactNode;
  className?: string;
  spring?: SpringOptions;
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  dockHeight?: number;
  baseItemSize?: number;
  alwaysShowLabels?: boolean;
};

export default function Dock({
  items,
  logo,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  baseItemSize = 50,
  alwaysShowLabels = true,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div style={{ height: panelHeight, scrollbarWidth: 'none' }} className="dock-outer">
      <motion.div
        onMouseMove={({ pageX }) => {
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
        }}
        className={`dock-panel ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {logo && <div className="dock-logo">{logo}</div>}

        <div className="dock-items">
          {items.map((item, index) => (
            <DockItem
              key={`${item.label}-${index}`}
              icon={item.icon}
              label={item.label}
              onClick={item.onClick}
              className={item.className}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
              alwaysShowLabels={alwaysShowLabels}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

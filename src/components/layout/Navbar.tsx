import { useScrollSpy } from '../../hooks/useScrollSpy';
import { navLinks, siteConfig } from '../../config/data';
import PillNav from '../ui/PillNav';

const sectionIds = navLinks.map((l) => l.href.replace('#', ''));

export default function Navbar() {
  const activeId = useScrollSpy(sectionIds);

  /* Map nav links to PillNav items */
  const pillItems = navLinks.map((link) => ({
    label: link.label,
    href: link.href,
  }));

  return (
    <PillNav
      items={pillItems}
      logo={
        <span
          className="font-display text-sm font-bold tracking-tight"
          style={{ color: '#fff' }}
        >
          {siteConfig.name.split(' ')[0]}
          <span style={{ color: '#3b82f6' }}>.</span>
        </span>
      }
      baseColor="#000"
      pillBg="#ffffff"
      pillTextColor="#000000"
      hoverTextColor="#ffffff"
      activeItem={activeId}
    />
  );
}

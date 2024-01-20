
import { NavArrow } from '@/icons/NavArrow';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


interface NavLinkProps {
  active: boolean;
  icon?: JSX.Element;
  subLink?: boolean;
  dropdown?: boolean;
  label: string;
  route: string;
}
export const NavLink = ({
  active,
  icon,
  label,
  route,
  subLink,
  dropdown,
}: NavLinkProps) => {

  const pathname = usePathname()

  return (
    <Link
      href={route}
      className={clsx({
        'w-full py-4 flex hover:bg-blue-100 transition-all ease-in-out duration-300 text-xs':
          true,
        'hover:text-black text-theme-green': active,
        'h-10 text-sm text-gray-600': subLink && !active,
        'hover:text-gray-600 text-sm text-theme-green h-full':
          active && subLink,
        'h-12': !subLink,
      })}
    >
      <div className="flex gap-9  items-center">
        <div
          className={clsx({ 'h-full w-1': true, 'bg-current': active })}
        ></div>
        <div className={clsx('flex items-center gap-3', { 'ml-4': subLink })}>
          {icon}
          {label}
          {dropdown && (
            <NavArrow
              className={clsx({
                'ml-2 transition-all ease-in-out duration-500': true,
                '-rotate-90': pathname.startsWith(route),
              })}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Menu.module.scss';

const Menu = (): React.ReactElement => {
  const pathname = usePathname ();
  return (
    <nav className={styles.Menu}>
      <div className={pathname === '/' ? styles.linkActive : ''}>
        <Link href="/">Главная</Link>
      </div>
      <div className={pathname === '/groups' ? styles.linkActive : ''}>
        <Link href="/groups">Группы</Link>
      </div>
<<<<<<< HEAD
       <div className={pathname === '/students' ? styles.linkActive : ''}>
=======
      <div className={pathname === '/students' ? styles.linkActive : ''}>
>>>>>>> 32326f3665f87d153f5724e9b61a5c05c281b8e4
        <Link href="/students">Студенты</Link>
      </div>
    </nav>
  );
};

export default Menu;

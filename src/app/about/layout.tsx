import Link from 'next/link';
import styles from './style.module.css';

type Props = {
  children: React.ReactNode;   
}

export default function AboutLayout({ children }: Props) {
  return (
    <div className={styles.container}>
      <nav>
        <Link href="/about">About</Link> |{' '}
        <Link href="/about/info">Information</Link> |{' '}
        <Link href="/about/setting">Settings</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}

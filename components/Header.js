import { useRouter } from 'next/router';
import styles from './Header.module.css';

export default function Header() {
    const router = useRouter();
    return (
        <div className={styles.header}>
            <a onClick={()=>{router.back()}}><span className="back-logo"> &lt; Back</span></a>
        </div>
    )
}

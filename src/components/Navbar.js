import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  
  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #ddd',
    marginBottom: '2rem'
  };

  const linkStyle = (path) => ({
    textDecoration: 'none',
    color: router.pathname === path ? '#0070f3' : '#333',
    fontWeight: router.pathname === path ? 'bold' : 'normal',
    fontSize: '1.1rem'
  });

  return (
    <nav style={navStyle}>
      <Link href="/" style={linkStyle('/')}>
        Energy Mix
      </Link>
      <Link href="/charging-window" style={linkStyle('/charging-window')}>
        Charging Window
      </Link>
    </nav>
  );
}

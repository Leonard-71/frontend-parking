import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { NAVBAR_TEXTS } from '../../translations/navbar/navbar';
import { setGlobalUserId } from '../../hooks/userIdStore';
import { useUserContext } from '../../hooks/user/useUserContext';

interface NavbarProps {
    className?: string;
}

function Navbar({ className }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, loading, error } = useUserContext();
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (user?.id) {
        setGlobalUserId(user.id);
    }

    return (
        <nav className={`bg-gray-950 p-4 ${className}`}>
            <div className="flex justify-between items-center w-full px-4">
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/homepage" className="text-white">{NAVBAR_TEXTS.home}</Link>
                    </li>
                    <li>
                        <Link to="/subscription" className="text-white">{NAVBAR_TEXTS.subscriptions}</Link>
                    </li>
                </ul>
                <div className="relative" ref={menuRef}>
                    <button onClick={toggleMenu} className="flex items-center text-white">
                        <FaUserCircle className="text-2xl mr-2" />
                        <span>
                            {loading
                                ? NAVBAR_TEXTS.loading
                                : error
                                    ? NAVBAR_TEXTS.error
                                    : `${user?.lastName || NAVBAR_TEXTS.noName} ${user?.firstName || ''}`}
                        </span>
                    </button>
                    {isMenuOpen && (
                        <ul className="absolute right-0 mt-2 bg-gray-700 text-white rounded shadow-lg">
                            <li>
                                <Link to="/profile" className="block px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                                    {NAVBAR_TEXTS.viewProfile}
                                </Link>
                            </li>
                            <li>
                                <Link to="/vehicles" className="block px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                                    {NAVBAR_TEXTS.vehicles}
                                </Link>
                            </li>
                            <li>
                                <Link to="/subscription-history" className="block px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                                    {NAVBAR_TEXTS.subscriptions}
                                </Link>
                            </li>
                            <li>
                                <Link to="/logout" className="block px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                                    {NAVBAR_TEXTS.logout}
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

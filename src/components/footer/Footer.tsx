interface FooterProps {
    className?: string;
}

function Footer({ className }: FooterProps) {
    return (
        <footer className={`bg-gray-950 text-white p-4 text-center ${className}`}>
            <p>&copy; {new Date().getFullYear()} Aplicația Mea. Toate drepturile rezervate.</p>
        </footer>
    );
}

export default Footer; 
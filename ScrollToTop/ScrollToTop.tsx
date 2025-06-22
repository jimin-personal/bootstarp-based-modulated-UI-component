import Link from 'next/link';
import React from 'react';

const ScrollToTop: React.FC = () => {
    return (
        <Link href="/" className="scrollToTop zindex999">
            <i className="fa-solid fa-arrow-up-from-bracket" />
        </Link>
    );
};

export default ScrollToTop;

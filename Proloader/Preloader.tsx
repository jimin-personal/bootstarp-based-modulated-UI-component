import React from 'react';

const Preloader: React.FC<{ isVisible?: boolean }> = ({ isVisible = true }) => {
    return (
        <div className="preloader" style={isVisible ? { visibility: 'visible' } : { visibility: 'hidden' }}>
            <div className="preloader__inner">
                <div className="preloader__icon">
                    <span />
                    <span />
                </div>
            </div>
        </div>
    );
};

export default Preloader;

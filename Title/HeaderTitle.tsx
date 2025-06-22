import React from 'react';
import Link from 'next/link';

interface HeaderTitleProps {
    title: string;
    subTitle?: string;
    href?: string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, subTitle, href }) => {
    return (
        <div className="section-header section-header--middle padding-top">
            <div className="section-header__content">
                <div className="section-header__titlebar">
                    {!!subTitle && <p className="section-header__subtitle">{subTitle}</p>}
                    <h2 className="section__header__title">
                        {title}
                        {!!href && (
                            <Link href={href} target="_blank">
                                <i className="fa-solid fa-circle-info" />
                            </Link>
                        )}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default HeaderTitle;

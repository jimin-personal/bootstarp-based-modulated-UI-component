import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CustomCarouselProps {
    children: React.ReactNode;
    showArrow?: boolean;
    slidesToShow: number;
    slidesToScroll: number;
    centerMode?: boolean;
    className?: string;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
    children,
    showArrow = true,
    slidesToShow,
    slidesToScroll,
    centerMode = false,
    className,
}) => {
    return (
        <Slider
            infinite
            dots
            arrows={showArrow}
            swipeToSlide
            slidesToShow={slidesToShow}
            slidesToScroll={slidesToScroll}
            accessibility
            centerMode={centerMode}
            centerPadding="40px"
            className={className}
            nextArrow={
                <div>
                    <i className="fa-solid fa-chevron-right slick-custom-arrow" />
                </div>
            }
            prevArrow={
                <div>
                    <i className="fa-solid fa-chevron-left slick-custom-arrow" />
                </div>
            }
        >
            {children}
        </Slider>
    );
};

export default CustomCarousel;

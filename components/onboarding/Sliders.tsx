import React from 'react';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { OnboardingCalendarIcon, OnboardingClassListIcon, OnboardingMoneyIcon, KakaoIcon } from 'asset';

const Sliders = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    variableWidth: true,
  };
  return (
    <SliderContainer>
      <StyledSlider {...settings}>
        <SliderWrapper>
          <OnboardingCalendarIcon alt="달력온보딩" width={375} height={500} />
        </SliderWrapper>
        <SliderWrapper>
          <OnboardingClassListIcon alt="달력온보딩" width={375} height={500} />
        </SliderWrapper>
        <SliderWrapper>
          <OnboardingMoneyIcon alt="달력온보딩" width={375} height={500} />
        </SliderWrapper>
      </StyledSlider>
    </SliderContainer>
  );
};
export default Sliders;

const SliderContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;
const StyledSlider = styled(Slider)`
  cursor: pointer;
  .slick-slide {
    outline: none;
    width: 33.5rem;
    margin-right: 1.2rem;
  }
  .slick-dots {
    width: 37.5rem;
    display: flex;
    justify-content: center;
    bottom: 0rem;
    & > li {
      margin: 0 0rem; /* Adjust the margin between dots as needed */
    }
    & > li button:before {
      font-size: 0.8rem;
      opacity: 1;
      color: ${theme.colors.gray};
    }
    & > li.slick-active button:before {
      color: ${theme.colors.mainColor};
    }
  }
`;

const SliderWrapper = styled.div`
  width: 37.5rem;
  overflow: hidden;
`;

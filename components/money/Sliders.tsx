import React, { useEffect } from 'react';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
interface dataProps {
  school: string;
  name: string;
  turn: string;
  date: string;
  state: string;
  won: string;
}
const Sliders = ({ dummydata }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    variableWidth: true,
  };
  return (
    <Section>
      <StudentInfoContainer>
        <Color></Color>
        <StudentInfoBox>
          <SchoolInfo>서강고 2학년</SchoolInfo>
          <StudentInfo>김기철 학생 | 수학</StudentInfo>
        </StudentInfoBox>
      </StudentInfoContainer>
      <SliderContainer>
        {JSON.stringify(dummydata) !== JSON.stringify([{}]) ? (
          <StyledSlider {...settings}>
            {dummydata.map((data) => (
              <MoneyInfoBox>
                <DetailInfo>
                  <Turn>{data.turn}</Turn>
                  <TurnDetail>
                    <div>{data.date}</div>
                    <div>{data.date}</div>
                  </TurnDetail>
                  <ConfirmButton>입금 확인</ConfirmButton>
                </DetailInfo>
                <Divider />
                <StateInfo>
                  <State>{data.state}</State>
                  <MoneyInfo>{data.won}</MoneyInfo>
                </StateInfo>
              </MoneyInfoBox>
            ))}
          </StyledSlider>
        ) : (
          <CompleteInfoBox>과외비 입금이 완료되었습니다.</CompleteInfoBox>
        )}
      </SliderContainer>
    </Section>
  );
};

export default Sliders;
const Section = styled.div`
  width: 33.5rem;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow-x: hidden;
  border-radius: 1rem;
  background-color: ${theme.colors.lightGray};
`;
const SliderContainer = styled.div`
  width: 100%; // or any specific width you desire
  margin-left: 3rem;
  margin-bottom: 1rem;
`;
const StyledSlider = styled(Slider)`
  cursor: pointer;
  .slick-slide {
    outline: none;
    width: 30.5rem;
    /* height: 13.6rem; */
    margin-right: 1.2rem;
  }
  .slick-dots {
    width: 30.5rem;
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
const StudentInfoContainer = styled.div`
  width: 30.5rem;
  height: 7.5rem;
  padding: 1.8rem 1.5rem;
  display: flex;

  align-items: center;
`;
const Color = styled.div`
  width: 4rem;
  height: 4rem;
  margin-right: 1rem;
  background-color: ${theme.colors.kakao};
  border-radius: 5rem;
`;
const StudentInfoBox = styled.div``;
const SchoolInfo = styled.h3`
  ${theme.fonts.text02_regular};
`;
const StudentInfo = styled.h2`
  ${theme.fonts.text01_medium};
`;
const MoneyInfoBox = styled.div`
  width: 30.5rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  padding: 2.6rem 2.3rem 1.6rem 2.3rem;
  border-radius: 1rem;
  background-color: ${theme.colors.white};
`;
const DetailInfo = styled.div`
  width: 25.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;
const StateInfo = styled.div`
  width: 25.6rem;
  display: flex;
  justify-content: space-between;

  align-items: center;
  ${theme.fonts.text01_medium};
`;
const Turn = styled.h2`
  ${theme.fonts.text01_medium};
`;
const TurnDetail = styled.h3`
  ${theme.fonts.text02_medium};
`;
const ConfirmButton = styled.button`
  width: 5.6rem;
  padding: 0.7rem;
  border-radius: 0.8rem;
  background-color: ${theme.colors.lightGray};
  ${theme.fonts.text03_medium};
  color: ${theme.colors.darkGray};
`;
const State = styled.h2`
  color: ${theme.colors.red};
`;
const MoneyInfo = styled.h2``;
const Divider = styled.div`
  width: 28rem;
  height: 0.1rem;
  margin-bottom: 1.5rem;
  background-color: ${theme.colors.lightGray};
`;
const CompleteInfoBox = styled.div`
  width: 30.5rem;
  height: 8.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  border-radius: 0.8rem;
  background-color: ${theme.colors.white};
  ${theme.fonts.text01_medium};
  color: ${theme.colors.darkGray};
`;
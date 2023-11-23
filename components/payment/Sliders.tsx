import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { paymentInfo } from './Payment';
import Modal from 'react-modal';
import ReactModal from 'react-modal';
import axios from 'axios';
import { useRouter } from 'next/router';

const Sliders: React.FC<{ data: paymentInfo }> = ({ data }) => {
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
  const confirmModalStyle: ReactModal.Styles = {
    overlay: {
      backgroundColor: ' rgba(0, 0, 0, 0.4)',
      width: '100%',
      height: '100vh',
      zIndex: '10',
      position: 'fixed',
      top: '0',
      left: '0',
    },
    content: {
      width: '27rem',
      height: '11.8rem',
      zIndex: '150',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
      borderRadius: '10px',
      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
      backgroundColor: 'white',
      overflow: 'auto',
    },
  };

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const router = useRouter();
  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirm = async (id: number) => {
    try {
      const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/payment/${id}/complete`;
      const userToken = localStorage.getItem('userToken');
      const response = await axios.put(
        URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      console.log(response.data);
      closeConfirmModal();
      router.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const ParsedDate: React.FC<{ date: string }> = (data) => {
    const date = new Date(data.date);
    const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

    return <span>{formattedDate}</span>;
  };

  const renderSlides = () => {
    const slides = [];
    const size = data.noPaymentCount;
    for (let i = size - 1; i >= 0; i--) {
      slides.push(
        <MoneyInfoBox>
          <DetailInfo>
            <TurnDetail>
              <span style={{ letterSpacing: `0.17rem` }}>1회차</span> | <ParsedDate date={data.dates[i]} />
              <br />
              <span>과외비 | {data.coursePayment.toLocaleString()}원</span>
            </TurnDetail>
          </DetailInfo>
          <Divider />
          <StateInfo>
            <State>과외비 입금 받으셨나요?</State>
            <ConfirmButton type="submit" onClick={openConfirmModal}>
              받았습니다
            </ConfirmButton>
            <Modal
              isOpen={isConfirmModalOpen}
              onRequestClose={closeConfirmModal}
              contentLabel="Check Confirm"
              style={confirmModalStyle}>
              <ConfirmWrapper>
                <ConfirmContainer>
                  <ConfirmTitle>입금 확인</ConfirmTitle>
                  <ConfirmContent>입금 정보를 저장하시겠습니까?</ConfirmContent>
                </ConfirmContainer>
                <ConfirmButtonWrapper>
                  <ConfirmOkButton type="submit" onClick={() => handleConfirm(data.courseId)}>
                    네
                  </ConfirmOkButton>
                  <ConfirmNoButton type="button" onClick={closeConfirmModal}>
                    아니오
                  </ConfirmNoButton>
                </ConfirmButtonWrapper>
              </ConfirmWrapper>
            </Modal>
          </StateInfo>
        </MoneyInfoBox>,
      );
    }
    return slides;
  };

  return (
    <SliderContainer>
      {data.noPaymentCount > 0 ? (
        <StyledSlider {...settings}>{renderSlides()}</StyledSlider>
      ) : (
        <CompleteInfoBox>과외비 입금이 완료되었습니다.</CompleteInfoBox>
      )}
    </SliderContainer>
  );
};

export default Sliders;

const SliderContainer = styled.div`
  width: 100%;
  margin-left: 3rem;
  margin-bottom: 1rem;
`;
const StyledSlider = styled(Slider)`
  cursor: pointer;
  .slick-slide {
    outline: none;
    width: 30.5rem;
    margin-right: 1.2rem;
  }
  .slick-dots {
    width: 30.5rem;
    display: flex;
    justify-content: center;
    bottom: 0rem;
    & > li {
      margin: 0 0rem;
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
const TurnDetail = styled.h3`
  ${theme.fonts.text01_medium};
`;
const ConfirmButton = styled.button`
  width: 6.6rem;
  padding: 0.7rem;
  border-radius: 0.8rem;
  background-color: ${theme.colors.mainColor};
  ${theme.fonts.text03_medium};
  color: ${theme.colors.white};
`;
const State = styled.h2`
  color: ${theme.colors.mainColor};
`;
const MoneyInfo = styled.h2``;
const Divider = styled.div`
  width: 26rem;
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

const ConfirmWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
  width: 100%;
  height: 100%;
`;

const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  width: 100%;
  margin-top: 1.6rem;
  text-align: center;
`;

const ConfirmTitle = styled.div`
  ${theme.fonts.title_regular};
`;

const ConfirmContent = styled.div`
  ${theme.fonts.text02_regular}
`;

const ConfirmButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: solid 0.1rem ${theme.colors.gray};
`;

const ConfirmOkButton = styled.button`
  width: 13.3rem;
  height: 4rem;
  border-right: solid 0.1rem ${theme.colors.gray};
  ${theme.fonts.title_regular};
  color: ${theme.colors.mainColor};

  &:hover {
    background-color: ${theme.colors.mainColor};
    color: ${theme.colors.white};
  }
`;

const ConfirmNoButton = styled.button`
  width: 13.3rem;
  height: 4rem;
  ${theme.fonts.title_regular};
  color: ${theme.colors.mainColor};

  &:hover {
    background-color: ${theme.colors.mainColor};
    color: ${theme.colors.white};
  }
`;

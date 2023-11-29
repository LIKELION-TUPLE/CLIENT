import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import Sliders from './Sliders';
import axios from 'axios';

export interface paymentInfo {
  color: string;
  courseId: number;
  coursePayment: number;
  dates: string[];
  noPaymentCount: number;
  paymentCycle: number;
  studentGrade: number;
  studentName: string;
  studentSchool: string;
  subject: string;
}

type NullablePaymentInfo = paymentInfo | null;

const Payment = () => {
  const [paymentList, setPaymentList] = useState<NullablePaymentInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/payment`;
        const userToken = localStorage.getItem('userToken');
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        console.log(response.data);
        setPaymentList(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Wrapper>
      <Title>입금관리</Title>
      {paymentList.map((payment) =>
        payment !== null ? (
          <Section>
            <StudentInfoContainer>
              <Color style={{ backgroundColor: payment.color }}></Color>
              <StudentInfoBox>
                <SchoolInfo>
                  {payment.studentSchool} {payment.studentGrade}학년
                </SchoolInfo>
                <StudentInfo>
                  {payment.studentName} 학생 | {payment.subject}
                </StudentInfo>
              </StudentInfoBox>
            </StudentInfoContainer>

            <Sliders data={payment} />
          </Section>
        ) : null,
      )}
    </Wrapper>
  );
};

export default Payment;

const Wrapper = styled.div`
  height: 145rem;
`;
const Title = styled.h1`
  margin-top: 7.3rem;
  margin-left: 3rem;
  ${theme.fonts.headline}
`;

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
  border-radius: 5rem;
`;
const StudentInfoBox = styled.div``;
const SchoolInfo = styled.h3`
  ${theme.fonts.text02_regular};
`;
const StudentInfo = styled.h2`
  ${theme.fonts.text01_medium};
`;

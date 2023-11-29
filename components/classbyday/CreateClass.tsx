import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { studentList } from 'data/dummy';
import theme from '@src/styles/theme';
import Header from 'components/common/Header';
import ClassDropdown from './ClassDropdown';
import { PlusIcon } from 'asset/index';
import axios from 'axios';
import * as moment from 'moment';
import 'moment/locale/ko';
import { useRouter } from 'next/router';
interface colorProps {
  color: string;
}
const CreateClass = () => {
  const router = useRouter();
  const [nextHW, setNextHW] = useState<any[]>([]);
  const [nextHWContent, setNextHWContent] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [dow, setDow] = useState<string>('');
  const [stime, setStime] = useState('');
  const [etime, setEtime] = useState('');
  const [place, setPlace] = useState('');
  const [progress, setProgress] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [studentList, setStudentList] = useState([]); // 담당하는 수업 정보 리스트
  const [studentInfo, setStudentInfo] = useState<number>(0); // 드롭다운에서 선택된 course의 id
  const [selectedStudentInfo, setSelectedStudentInfo] = useState([]); // 드롭다운에서 선택된 학생 정보
  const handleNextHW = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNextHWContent([...nextHWContent, e.target.value]);
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    const updateDate = date;
    setDate(date);
    if (date[8] === '0') {
      let day = parseInt(date[9]) + 14;
      let updatedDate = date.slice(0, 8) + ('0' + day).slice(-2);
    }

    switch (moment(updateDate).day()) {
      case 0:
        setDow('SUN');
        break;
      case 1:
        setDow('MON');
        break;
      case 3:
        setDow('TUE');
        break;
      case 4:
        setDow('WED');
        break;
      case 5:
        setDow('THU');
        break;
      case 6:
        setDow('FRI');
        break;
      case 6:
        setDow('SAT');
        break;
      default:
        setDow('');
    }
  };
  const handleSTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

    if (regex.test(inputValue) || inputValue === '') {
      setStime(inputValue);
    }
  };
  const handleETimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

    if (regex.test(inputValue) || inputValue === '') {
      setEtime(inputValue);
    }
  };
  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
  };
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(e.target.value);
  };

  const handlePlusOnClick = () => {
    setNextHW(
      nextHW.concat(
        <NextHWInputContainer>
          -
          <NextHWInput
            placeholder="숙제를 입력해주세요"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNextHW(e)}
          />
        </NextHWInputContainer>,
      ),
    );
  };

  // 드롭다운을 위한 학생 정보
  const fetchStudentInfo = async () => {
    try {
      const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/course/course-list-for-create`;
      const userToken = localStorage.getItem('userToken');
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setStudentList(response.data);
    } catch (err) {
      console.error('Err:', err);
    }
  };

  // 오늘까지 숙제를 불러오는 부분
  const fetchLatestClass = async (course_id) => {
    try {
      const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/lessons/homeworks/last-homeworks-list/${course_id}`;
      const userToken = localStorage.getItem('userToken');
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(response.data);
    } catch (err) {
      console.error('Err:', err);
    }
  };

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  // 선택된 학생은 임의로 첫번째로 저장
  useEffect(() => {
    setSelectedStudentInfo(studentList[0]);
    setStudentInfo(studentList[0]?.course_id);
    // fetchLatestClass(studentList[0]?.course_id);
  }, [studentList]);

  //
  // useEffect(() => {
  //   fetchLatestClass(studentInfo);
  // }, [studentInfo]);

  //드롭다운에 따라 선택된 학생 정보 넘김
  useEffect(() => {
    studentList.map((student) => {
      if (student?.course_id === studentInfo) {
        setSelectedStudentInfo(student);
      }
    });
  }, [dropDown]);

  // 폼에 입력값이 잘 들어갔는지
  useEffect(() => {
    nextHWContent && date && stime && etime && place && progress && studentInfo
      ? setIsFormValid(true)
      : setIsFormValid(false);
  }, [nextHWContent, date, stime, etime, place, progress, studentInfo]);

  // 폼 완료시 수업 추가를 요청
  const postClassData = async (course_id) => {
    try {
      const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/lessons/${course_id}`;
      const userToken = localStorage.getItem('userToken');
      const response = await axios.post(
        URL,
        {
          date: moment(date).format('YYYY-MM-DD'),
          startTime: stime,
          endTime: etime,
          dow: dow,
          place: place,
          studyContent: progress,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      console.log(response.data);
    } catch (err) {
      console.error('Err:', err);
    }
  };
  const handleSaveClick = () => {
    router.replace(`/calendar`);
    postClassData(studentInfo);
  };

  return (
    <ClassWrapper>
      <Header path={'calendar'} />
      <Title>수업일지</Title>
      <MainInfoSection>
        <StudentContainer
          onClick={() => {
            setDropDown(!dropDown);
          }}>
          <ProfileBox color={selectedStudentInfo?.color} />
          <ClassInfoBox>
            <SubInfo>{selectedStudentInfo?.studentSchool}</SubInfo>
            <MainInfo>
              {selectedStudentInfo?.studentName} 학생 | {selectedStudentInfo?.subject}
            </MainInfo>
          </ClassInfoBox>
          <TurnInfoBox>{selectedStudentInfo?.currentLessonTime}회차</TurnInfoBox>
          {/* <Image src={DownButton} alt="드롭다운" width={24} height={24} /> */}
        </StudentContainer>
        <DropDownWrapper>
          {dropDown && (
            <ClassDropdown
              studentList={studentList}
              giveStudentInfo={(giveStudentInfo: number) => setStudentInfo(giveStudentInfo)}
              giveSelected={(giveSelected: boolean) => setDropDown(giveSelected)}
            />
          )}
        </DropDownWrapper>

        <DateContainer>
          <DateBox>
            <DateTitle>날짜</DateTitle>
            <DateInput
              type="date"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDateChange(e)}></DateInput>
          </DateBox>
          <TimeBox>
            <TimeTitle>시간</TimeTitle>
            <TimeInput
              placeholder="HH:MM"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSTimeChange(e)}></TimeInput>
            ~
            <TimeInput
              placeholder="HH:MM"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleETimeChange(e)}></TimeInput>
          </TimeBox>
        </DateContainer>
        <PlaceContainer>
          <PlaceTitle>장소</PlaceTitle>
          <PlaceInput onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePlaceChange(e)}></PlaceInput>
        </PlaceContainer>
      </MainInfoSection>
      <ClassInfoSection>
        <TitleContainer>
          <InfoTitle>오늘까지 숙제</InfoTitle>
          <UnderLine></UnderLine>
        </TitleContainer>
        <TodayHWContainer></TodayHWContainer>
        <TitleContainer>
          <InfoTitle>오늘 나간 진도</InfoTitle>
          <UnderLine></UnderLine>
        </TitleContainer>
        <ProgressContainer>
          <ProgressInput
            placeholder="오늘의 진도를 입력해 주세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProgressChange(e)}></ProgressInput>
        </ProgressContainer>

        <TitleContainer>
          <InfoTitle>다음 시간까지 숙제</InfoTitle>
          <UnderLine></UnderLine>
        </TitleContainer>
        <NextHWContainer>
          <div>{nextHW}</div>
          <PlusIconSvg onClick={handlePlusOnClick} />
        </NextHWContainer>
      </ClassInfoSection>
      {isFormValid ? (
        <CompleteButton onClick={handleSaveClick}>저장</CompleteButton>
      ) : (
        <UnCompleteButton>저장</UnCompleteButton>
      )}
    </ClassWrapper>
  );
};

export default CreateClass;

const ClassWrapper = styled.div``;

const Title = styled.h1`
  margin-top: 7.3rem;
  margin-left: 3rem;
  ${theme.fonts.headline};
`;
const MainInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3rem;
  margin-left: 3.5rem;
`;
const ProfileBox = styled.div<colorProps>`
  width: 4rem;
  height: 4rem;
  margin-right: 1.8rem;
  border-radius: 10rem;
  background-color: ${(props) => props.color};
`;
const ClassInfoBox = styled.div`
  width: 18rem;
`;
const TurnInfoBox = styled.div`
  ${theme.fonts.text01_regular}
`;
const SubInfo = styled.div`
  ${theme.fonts.text02_regular};
  color: ${theme.colors.black};
`;
const MainInfo = styled.div`
  ${theme.fonts.text01_medium};
`;
const StudentContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30.5rem;
  height: 7.5rem;
  margin-bottom: 0.9rem;
  padding: 1.1rem 1.5rem;
  background-color: ${theme.colors.lightGray};
  border-radius: 1rem;
  cursor: pointer;
`;
const DateContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;
const DateBox = styled.div`
  display: flex;
  align-items: center;
  width: 14.5rem;
  height: 3.7rem;
  padding: 0rem 1rem;
  gap: 0.7rem;
  background-color: ${theme.colors.lightGray};
  border-radius: 1rem;
`;
const DateTitle = styled.p`
  /* margin-left: 1rem; */
  /* margin-right: 1.4rem; */
  ${theme.fonts.text01_medium}
`;
const DateInput = styled.input`
  width: 9rem;
  border: none;
  background-color: ${theme.colors.lightGray};
  ${theme.fonts.text02_regular};

  color: ${theme.colors.darkGray};
  &[type='date'] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 0.5rem 0.7rem; /* 조절 가능한 패딩 값 */
    border-radius: 4px;
    outline: none;

    &::-webkit-calendar-picker-indicator {
      display: none;
    }
  }
`;
const TimeBox = styled.div`
  display: flex;
  align-items: center;
  width: 15rem;
  height: 3.7rem;
  padding: 0rem 1rem;
  gap: 0.5rem;
  background-color: ${theme.colors.lightGray};
  border-radius: 1rem;
`;
const TimeTitle = styled.p`
  /* margin-left: 1rem;
  margin-right: 1.4rem; */
  width: 4.5rem;
  ${theme.fonts.text01_medium}
`;
const TimeInput = styled.input`
  width: 4rem;
  border: none;
  background-color: ${theme.colors.lightGray};
  color: ${theme.colors.darkGray};
  ${theme.fonts.text02_regular}

  border-radius: 4px;
  outline: none;

  &::-webkit-calendar-picker-indicator {
    display: none; /* This will hide the calendar picker indicator */
  }
`;
const PlaceContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30.5rem;
  height: 3.7rem;
  padding: 0rem 1rem;
  gap: 1.4rem;
  background-color: ${theme.colors.lightGray};
  border-radius: 1rem;
`;
const PlaceTitle = styled.p`
  ${theme.fonts.text01_medium}
`;
const PlaceInput = styled.input`
  width: 24rem;
  border: none;
  outline: none;
  color: ${theme.colors.darkGray};
  background-color: ${theme.colors.lightGray};
  ${theme.fonts.text02_regular}
`;
const ClassInfoSection = styled.section`
  width: 30.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
  margin-left: 3.5rem;
  padding: 1.2rem;
  background-color: ${theme.colors.white};
  border-radius: 1.25rem;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.3rem;
`;
const InfoTitle = styled.h2`
  width: 100%;
  padding-left: 0.8rem;
  ${theme.fonts.text01_medium};
  margin-bottom: 0.2rem;
`;
const UnderLine = styled.div`
  width: 28rem;
  height: 0.05rem;
  margin-bottom: 1rem;
  background-color: ${theme.colors.darkGray};
`;
const TodayHWContainer = styled.div`
  margin-bottom: 4.6rem;
`;
const ProgressContainer = styled.div`
  width: 100%;
  min-height: 8rem;
  padding: 0.7rem 1.4rem;
  margin-bottom: 4.6rem;
  background-color: ${theme.colors.backgroundColor};
  ${theme.fonts.text02_regular};
  border-radius: 1rem;
`;
const ProgressInput = styled.input`
  width: 100%;
  background-color: ${theme.colors.backgroundColor};
  outline: none;
  border: none;
`;
const NextHWContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;
const PlusIconSvg = styled(PlusIcon)`
  margin: 1.5rem 0rem 1.5rem 12.5rem;
  cursor: pointer;
`;
const NextHWInputContainer = styled.div`
  margin-left: 1rem;
`;
const NextHWInput = styled.input`
  width: 23.4rem;
  margin-left: 0.8rem;
  margin-top: 0.5rem;
  outline: none;
  border: none;
  /* border-bottom: 0.1rem ${theme.colors.gray} solid; */
  ${theme.fonts.text02_regular};
`;
const CompleteButton = styled.div`
  width: 30rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 3.5rem;
  margin-top: 3rem;
  ${theme.fonts.title_medium};
  background-color: ${theme.colors.mainColor};
  color: ${theme.colors.white};
  border-radius: 3rem;
  cursor: pointer;
`;
const UnCompleteButton = styled.div`
  width: 30rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 3.5rem;
  margin-top: 3rem;
  ${theme.fonts.title_medium};
  background-color: ${theme.colors.lightGray};
  color: ${theme.colors.white};
  border-radius: 3rem;
`;
const DropDownWrapper = styled.div`
  position: absolute;
  top: 13.8rem;
  z-index: 3;
`;
const StudentDropDown = styled.div``;

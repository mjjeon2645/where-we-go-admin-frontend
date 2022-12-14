/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import { useForm } from 'react-hook-form';

import styled from 'styled-components';

const Wrapper = styled.div`
 width: 100%;
 text-align: center;
 padding-inline: calc((100% - 400px) / 2);
 margin-top: 10em;
`;

const Title = styled.h2`
  font-size: 2em;
  color: #1D5C84;
  font-weight: bold;
  border-bottom: 1px solid #1D5C84;
  margin-bottom: 1.5em;
  padding-bottom: .3em;
`;

const Field = styled.div`
  margin-bottom: 2em;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding-block: 1em;
  padding-inline: 1em;
  margin-bottom: .7em;
  border: 1px #DDD solid;

  :focus {
    outline: 1px solid #1D5C84;
    }
`;

const Label = styled.label`
  font-weight: 400;
  color: #A0A0A0;
  display: block;
  text-align: left;
  margin-bottom: .5em;
`;

const Message = styled.p`
  font-size: .9em;
  text-align: left;
  color: #A0A0A0;
`;

const Error = styled.p`
  font-size: .9em;
  text-align: left;
  color: #ff0000;
`;

const Button = styled.button`
  border: none;
  border-radius: 4px;
  width: 100%;
  padding: 1.2em 2.8em;
  margin-top: 1em;
`;

export default function SignUpForm({
  submit, isAdminAlreadyExist, isAdminIdDuplicated, errorMessage,
  goPrevPage, uploadProfileImage, profileImageUrl,
}) {
  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = async (data) => {
    await submit(data);
  };

  const handleCancelClick = () => {
    goPrevPage();
  };

  const handleProfileImageChange = (event) => {
    uploadProfileImage(event);
  };

  return (
    <Wrapper>
      <Title>SIGN UP</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Label htmlFor="input-name">이름 :</Label>
          <Input
            id="input-name"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register(
              'name',
              {
                required: { value: true, message: '이름을 입력해주세요' },
                pattern: { value: /^[ㄱ-ㅎ|가-힣]{2,7}$/, message: '이름을 다시 확인해주세요' },
              },
            )}
            error={errors.name}
          />
          {errors.name ? (
            <Error>{errors.name.message}</Error>
          )
            : <Message>2~7자까지 한글만 사용 가능</Message>}
        </Field>
        <Field>
          <Label htmlFor="input-employee-number">사번 :</Label>
          <Input
            id="input-employee-number"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register(
              'employeeIdentificationNumber',
              {
                required: { value: true, message: '사번 4자리를 입력해주세요' },
                pattern: { value: /^[0-9]{4}$/, message: '사번을 다시 확인해주세요' },
              },
            )}
            error={errors.employeeIdentificationNumber}
          />
          {errors.employeeIdentificationNumber ? (
            <Error>{errors.employeeIdentificationNumber.message}</Error>
          ) : isAdminAlreadyExist ? (
            <Error>{errorMessage}</Error>
          )
            : <Message>숫자 4자리로 구성된 사번 입력</Message>}
        </Field>
        <Field>
          <Label htmlFor="input-id">아이디 :</Label>
          <Input
            id="input-id"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register(
              'adminId',
              {
                required: { value: true, message: '아이디를 입력해주세요' },
                pattern: { value: /^[a-z0-9]{4,16}$/, message: '아이디를 다시 확인해주세요' },
              },
            )}
            error={errors.adminId}
          />
          {errors.adminId ? (
            <Error>{errors.adminId.message}</Error>
          ) : isAdminIdDuplicated ? (
            <Error>{errorMessage}</Error>
          ) : <Message>영문 소문자/숫자, 4~16자만 사용 가능</Message>}
        </Field>
        <Field>
          <Label htmlFor="input-password">비밀번호 :</Label>
          <Input
            id="input-password"
            type="password"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register(
              'password',
              {
                required: { value: true, message: '비밀번호를 입력해주세요' },
                pattern: {
                  value: /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
                  message: '비밀번호를 다시 확인해주세요',
                },
              },
            )}
            error={errors.password}
          />
          {errors.password ? (
            <Error>{errors.password.message}</Error>
          )
            : <Message>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</Message>}
        </Field>
        <Field>
          <Label htmlFor="input-check-password">비밀번호 확인 :</Label>
          <Input
            id="input-check-password"
            type="password"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register(
              'checkPassword',
              {
                required: { value: true, message: '비밀번호를 입력해주세요' },
                validate: (value) => value === watch('password'),
              },
            )}
            error={errors.checkPassword}
          />
          {errors.checkPassword
            ? (errors.checkPassword.message === '비밀번호를 입력해주세요'
              ? (<Error>{errors.checkPassword.message}</Error>)
              : (<Error>비밀번호가 일치하지 않습니다</Error>)) : null}
        </Field>
        <Field>
          <Label htmlFor="profile-image">프로필 이미지</Label>
          <Input
            {...register(
              'profileImage',
              {
                required: { value: true, message: '프로필 이미지를 업로드 해주세요' },
              },
            )}
            error={errors.profileImage}
            type="file"
            accept="image/*"
            id="profile-image"
            onChange={handleProfileImageChange}
          />
          <img src={profileImageUrl} alt="" />
          {errors.profileImage && (
            <Error>{errors.profileImage.message}</Error>
          )}
        </Field>
        <Button type="submit">어드민 계정 생성하기</Button>
        <Button type="button" onClick={handleCancelClick}>취소</Button>
      </form>
    </Wrapper>
  );
}

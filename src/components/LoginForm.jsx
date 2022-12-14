/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
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

const Input = styled.input`
  display: block;
  width: 100%;
  padding-block: 1em;
  padding-inline: 1em;
  margin-bottom: .7em;

  ::placeholder {
    color: #CBCBCB;
  }

  :focus {
    outline: 1px solid #1D5C84;
  }
`;

const Error = styled.p`
  font-size: 0.9em;
  text-align: left;
  color: #ff0000;
  margin-top: 1.5em;
`;

const Login = styled.button`
  border: none;
  border-radius: 4px;
  width: 100%;
  padding: 1.2em 2.8em;
  margin-top: 1em;
`;

const SignUp = styled.button`
  border: none;
  border-radius: 4px;
  width: 100%;
  padding: 1.2em 2.8em;
  margin-top: 1em;
`;

export default function LoginForm({
  submit, errorMessage, goSignUp,
}) {
  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const handleSignUpClick = () => {
    goSignUp();
  };

  const onSubmit = async (data) => {
    submit(data);
  };

  return (
    <Wrapper>
      <Title>Admin Login</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="input-admin-id"
          name="admin-id"
          placeholder="아이디"
          {...register(
            'adminId',
            { required: { value: true, message: '아이디를 입력해주세요' } },
          )}
          error={errors.adminId}
        />
        <Input
          id="input-password"
          name="password"
          type="password"
          placeholder="비밀번호"
          {...register(
            'password',
            { required: { value: true, message: '비밀번호를 입력해주세요' } },
          )}
          error={errors.password}
        />
        {errors.adminId ? (
          <Error>{errors.adminId.message}</Error>
        )
          : errors.password ? (
            <Error>{errors.password.message}</Error>
          ) : errorMessage ? (
            <Error>{errorMessage}</Error>
          ) : ''}
        <Login type="submit">로그인</Login>
      </form>
      {/* TODO. 추후 super admin 계정 생성 시 사이드메뉴에 별도로 부여
      <SignUp type="button" onClick={handleSignUpClick}>어드민 계정 생성하기</SignUp> */}
    </Wrapper>
  );
}

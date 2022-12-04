/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

const Wrapper = styled.div`
 width: 100%;
 text-align: center;
 padding-inline: calc((100% - 400px) / 2);
 margin-top: 10em;
`;

const Title = styled.h2`
  font-size: 2em;
  font-weight: bold;
  border-bottom: 1px solid #83e8ca;
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
  
  :focus {
    outline: 1px solid #42deb6;
    }
`;

const Label = styled.label`
  font-weight: bold;
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
  font-size: 0.9em;
  text-align: left;
  color: #ff0000;
`;

const Signup = styled.button`
  border: none;
  border-radius: 4px;
  width: 100%;
  padding: 1.2em 2.8em;
  margin-top: 1em;
`;

export default function SignUpForm({
  register, watch, handleSubmit, errors, onSubmit, isAdminIdDuplicated, errorMessage,
}) {
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
                pattern: { value: /^[ㄱ-ㅎ|가-힣]{3,7}$/, message: '이름을 다시 확인해주세요' },
              },
            )}
            error={errors.name}
          />
          {errors.name ? (
            <Error>{errors.name.message}</Error>
          )
            : <Message>3~7자까지 한글만 사용 가능</Message>}
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
              },
            )}
            error={errors.employeeIdentificationNumber}
          />
          {errors.employeeIdentificationNumber ? (
            <Error>{errors.employeeIdentificationNumber.message}</Error>
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
            error={errors.userId}
          />
          {isAdminIdDuplicated ? (
            <Error>{errorMessage}</Error>
          ) : errors.userId ? (
            <Error>{errors.adminId.message}</Error>
          )
            : <Message>영문 소문자/숫자, 4~16자만 사용 가능</Message>}
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
        <Signup type="submit">어드민 계정 생성하기</Signup>
      </form>
    </Wrapper>
  );
}

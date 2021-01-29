import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import {
  loginMutation,
  loginMutationVariables,
} from '../__generated__/loginMutation';
import { isLoggedInVar, authToken } from '../apollo';
import { AccountButton } from '../components/button';
import { EMAIL_REGEX, LOCALSTORAGE_TOKEN } from '../constants';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AccountFiller } from '../components/account-filler';

interface ILoginForm {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

export const Login = () => {
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ILoginForm>({ mode: 'onChange' }); // 나중에 handleSubmit 제외 하고 test 해보자
  const onCompleted = (data: loginMutation) => {
    const {
      login: { error, ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authToken(token);
      isLoggedInVar(true);
    } else {
      console.log(error);
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, { onCompleted });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        // useMutation() hooks로 부터 얻은 mutation function, mutation을 실제로 서버로 전송
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div
      style={{ height: '70vh' }}
      className="flex max-w-screen-2xl m-auto h-full"
    >
      <Helmet>
        <title>Login | Podcast</title>
      </Helmet>

      <AccountFiller />
      <section className="text-center px-5 w-full max-w-screen-sm">
        <h3 className="font-bold text-left text-3xl text-yellow-200 mt">
          Log in
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-10 text-white"
        >
          <div className="text-left font-semibold">Email</div>
          <input
            ref={register({
              required: 'Email is required',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Please enter a valid email',
              },
            })}
            className="input"
            placeholder="Email"
            type="email"
            name="email"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email.message} />
          )}
          <div className="text-left font-semibold">Password</div>
          <input
            ref={register({ required: 'Password is required' })}
            className="input"
            placeholder="Password"
            type="password"
            name="password"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          <AccountButton
            canClick={formState.isValid}
            loading={loading}
            actionText="Log in"
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div className="text-white mt-4">
          New to Podcast?{' '}
          <Link to="/create-account" className="text-green-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </section>
    </div>
  );
};

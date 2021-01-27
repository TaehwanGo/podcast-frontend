import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import {
  loginMutation,
  loginMutationVariables,
} from '../__generated__/loginMutation';
import { isLoggedInVar, authToken } from '../apollo';
import { Button } from '../components/button';
import { EMAIL_REGEX, LOCALSTORAGE_TOKEN } from '../constants';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

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
    <div className="h-screen flex items-center flex-col bg-gray-800">
      <Helmet>
        <title>Login | Podcast</title>
      </Helmet>
      <div className="bg-gray-800 text-center container max-w-screen-sm">
        <h3 className="font-bold text-left text-3xl text-yellow-200">Log in</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-10">
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
          <input
            ref={register({ required: 'Password is required' })}
            className="input mb-1"
            placeholder="Password"
            type="password"
            name="password"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          <Button
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
      </div>
    </div>
  );
};

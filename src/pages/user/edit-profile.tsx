import { gql, useApolloClient, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { AccountButton } from '../../components/button';
import { useMe } from '../../hooks/useMe';
import {
  editProfile,
  editProfileVariables,
} from '../../__generated__/editProfile';
import { EMAIL_REGEX } from '../../constants';
import { SidePage } from '../../components/side-page';
import { FormError } from '../../components/form-error';

interface IFormProps {
  email?: string;
  password?: string;
}

export const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

export const EditProfile = () => {
  const { data: userData, refetch } = useMe();
  const {
    register,
    handleSubmit,
    getValues,
    formState,
    errors,
  } = useForm<IFormProps>({
    defaultValues: {
      email: userData?.me.email,
    },
    mode: 'onChange',
  });
  const client = useApolloClient();
  const onCompleted = async (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      //update cache
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
            }
          `,
          data: {
            email: newEmail,
          },
        });
      }
      //   await refetch();
    }
  };
  const [editProfile, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, { onCompleted });

  const onSubmit = () => {
    // getValues 후 edit profile mutation을 call
    // 그리고 cache도 update : 나중에 다른 스크린에 필요할 수도 있으므로
    const { email, password } = getValues();
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== '' && { password }), // 아무것도 입력안해서 password에 ""들어간 경우 password 항목자체가 없게 해서 ""으로 password가 변경되는 것을 막아줌
        },
      },
    });
  };
  return (
    <div>
      <Helmet>
        <title>Edit Profile | Podcast</title>
      </Helmet>
      <div className="page-container">
        <SidePage />
        <section className="login-mobile-screen">
          <h1 className="login-h1">Edit Profile</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="login-input-label">Email</div>
            <input
              ref={register({
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Please enter a valid email',
                },
              })}
              name="email"
              className="input"
              type="email"
              placeholder="Email"
            />
            {errors.email?.message && (
              <FormError errorMessage={errors.email?.message} />
            )}
            <div className="login-input-label">Password</div>
            <input
              ref={register}
              name="password"
              className="input"
              type="password"
              placeholder="Password"
            />
            <AccountButton
              loading={loading}
              canClick={formState.isValid}
              actionText="Save Profile"
            />
          </form>
        </section>
      </div>
    </div>
  );
};

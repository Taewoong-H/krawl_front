import type { NextPage } from 'next';
import { InputField } from '../components/login/inputField';
import axios from 'axios';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { setToken } from './api/tokenManger';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login: NextPage = () => {
  const router = useRouter();
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-form">
          <div className="login-title">
            Login
            <Link href="/#">
              <h2 className="logo">끌올</h2>
            </Link>
          </div>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Email is invalid').required('Email is required'),
              password: Yup.string().min(1, 'Password must be at least 1 characters').required('Password is required'),
            })}
            onSubmit={async (values) => {
              values.username = values.email;
              try {
                const response = await axios.post('/api/login', values);
                const token = response.data;
                const nickName = response.data.nickname;
                const profileImage = response.data.profile_img;
                const userId = response.data.user_id;
                if (token) {
                  setToken(token, token);
                  alert('로그인 성공');
                  localStorage.setItem('nickname', nickName);
                  localStorage.setItem('profileImage', profileImage);
                  localStorage.setItem('userId', userId);
                  router.push('/');
                } else {
                  alert('이메일 또는 비밀번호를 확인해주세요.');
                }
              } catch (error) {
                console.error(error);
              }
            }}
          >
            {({ errors, status, touched }) => (
              <Form>
                {/* <Field
                  id='username'
                  name='username'
                  type='username'
                  label='ID'
                  placeholder='username'
                  className={
                    'form-control' +
                    (errors.username && touched.username ? ' is-invalid' : '')
                  }
                  component={InputField}
                />
                <ErrorMessage
                  name='username'
                  component='div'
                  className='invalid-feedback'
                /> */}
                <Field
                  id="email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="email"
                  className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                  component={InputField}
                />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                <Field
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="password"
                  type="password"
                  component={InputField}
                />
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                <button className="login-button" type="submit">
                  LOGIN
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="link-container">
          <Link href="/register">
            <a>
              <p>Create new account</p>
            </a>
          </Link>
          <Link href="#">
            <a>
              <p>Forgot password</p>
            </a>
          </Link>
        </div>
      </div>
      <style jsx>
        {`
          .login-container {
            /* background-image: linear-gradient(to top, #5227ff, #7409fc); */
            display: flex;
            justify-content: center;
            align-items: flex-start;
            margin-top: 10%;
            min-height: 100vh;
            width: 100%;
          }
          .login-wrapper {
            width: 550px;
            height: 550px;
            background-color: #fff;
            color: rgb(255, 255, 255);
            transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            border-radius: 16px;
            box-shadow: rgb(0 0 0 / 70%) 0px 0px 1px 0px, rgb(0 0 0 / 50%) 0px 3px 4px -2px;
            background-image: none;
            overflow: hidden;
            padding: 65px 55px 55px 55px;
          }
          .login-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-family: Roboto;
            font-size: 39px;
            color: #333;
            line-height: 1.2;
            text-align: center;
            font-weight: bold;
            margin: 10px 0;
          }
          .logo {
            cursor: pointer;
          }
          .login-button {
            font-family: Roboto;
            font-size: 16px;
            margin-bottom: 20px;
            color: #fff;
            cursor: pointer;
            text-transform: uppercase;
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 20px;
            width: 100%;
            height: 50px;
            outline: none !important;
            border: none;
            background-image: linear-gradient(to top, #5227ff, #7409fc);
          }
          .login-button:hover {
            background-image: linear-gradient(to top, #7409fc, #5227ff);
            opacity: 0.8;
          }
          .link-container {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }
        `}
      </style>
    </div>
  );
};

export default Login;

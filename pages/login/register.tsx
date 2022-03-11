import type { NextPage } from 'next';
import Link from 'next/link';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { InputField } from '../../components/login/inputField';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Values {
  email: string;
  name: string;
  password: string;
}

const Register: NextPage = () => {
  const router = useRouter();
  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-title">
          Sign Up
          <Link href="/home">
            <h2 className="logo">끌올</h2>
          </Link>
        </div>
        <Formik
          initialValues={{
            email: '',
            username: '',
            password: '',
          }}
          validationSchema={Yup.object().shape({
            // name: Yup.string().required(' Name is required'),
            email: Yup.string()
              .email('Email is invalid')
              .required('Email is required'),
            password: Yup.string()
              .min(6, 'Password must be at least 6 characters')
              .required('Password is required'),
          })}
          onSubmit={async (values) => {
            values.username = values.email;
            try {
              const response = await axios.post('/api/register', values);
              if (response.data.rescode === 1) {
                alert('회원가입이 완료되었습니다.')
                router.push('/login');
              } else {
                alert('회원가입에 실패했습니다.')
              }
              console.log(response);
            } catch (error) {
              alert('회원가입에 실패했습니다.')
              console.error(error);
            }
          }}
        >
          {({ errors, status, touched }) => (
            <Form>
              <Field
                id='email'
                name='email'
                type='email'
                label='Email Address'
                placeholder='email'
                className={
                  'form-control' +
                  (errors.email && touched.email ? ' is-invalid' : '')
                }
                component={InputField}
              />
              <ErrorMessage
                name='email'
                component='div'
                className='invalid-feedback'
              />
              {/* <Field
                id='name'
                name='name'
                label='Name'
                placeholder='name'
                component={InputField}
              />
              <ErrorMessage
                name='name'
                component='div'
                className='invalid-feedback'
              /> */}
              <Field
                id='password'
                name='password'
                label='Password'
                placeholder='password'
                type='password'
                component={InputField}
              />
              <ErrorMessage
                name='password'
                component='div'
                className='invalid-feedback'
              />
              <button className="submit-button" type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
      <style jsx>{`
        .register-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          margin-top: 10%;
          min-height: 100vh;
          width: 100%;
        }
        .register-wrapper {
          width: 550px;
          min-height: 550px;
          background-color: #fff;
          color: rgb(255, 255, 255);
          transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          border-radius: 16px;
          box-shadow: rgb(0 0 0 / 70%) 0px 0px 1px 0px,
            rgb(0 0 0 / 50%) 0px 3px 4px -2px;
          background-image: none;
          overflow: hidden;
          padding: 65px 55px 55px 55px;
        }
        .submit-button {
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
        .submit-button:hover {
          background-image: linear-gradient(to top, #7409fc, #5227ff);
          opacity: 0.8;
        }
        .register-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: Roboto;
          font-size: 39px;
          color: #333;
          line-height: 1.2;
          text-align: center;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default Register;
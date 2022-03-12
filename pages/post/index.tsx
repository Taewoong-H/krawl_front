import type { GetStaticProps, GetServerSideProps, NextPage } from 'next';
import ogs from 'open-graph-scraper';
import NavBar from '../../components/navbar';
import Seo from '../../components/seo';
import Competition from '../../components/home/competition';
import { getCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Post: NextPage = (props: any) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ nickname: '', profileImage: '', userId: '' });
  const [url, setUrl] = useState('');
  const [opinion, setOpinion] = useState('');

  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    const profileImage = localStorage.getItem('profileImage');
    const userId = localStorage.getItem('userId');
    const userToken = getCookie('accessToken');
    if (userToken) {
      if (nickname && typeof nickname === 'string' && typeof profileImage === 'string' && typeof userId === 'string') {
        setUserInfo({ nickname: nickname, profileImage: profileImage, userId: userId });
      } else {
        alert('재로그인 하세요.');
        router.push('/login');
      }
    } else {
    }
  }, []);

  // query를 넘김과 동시에 redirect하여 refresh 효과. SSR이지만 CSR과 같이
  const urlCheck = () => {
    router.push(
      {
        pathname: '/post',
        query: {
          url: url,
        },
      },
      '/post'
    );
  };

  const inputValue = (e: any) => {
    const { value } = e.target;
    setUrl(value);
  };

  const postContent = async () => {
    const body = {
      user_id: userInfo.userId,
      competition_id: 1,
      url: props.queryUrl,
      raw_date: props.validate ? props.published : '2999-01-01',
      date_check: props.validate,
      opinion: opinion,
      tag: '이거, 저거, 그거',
    };

    const userToken = getCookie('accessToken');
    if (userToken && typeof userToken === 'string') {
      const tokenSplit = userToken.split('"');
      const token = tokenSplit[3];
      const postRes = await (
        await fetch('/api/contents/post-content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(body),
        })
      ).json();

      if (postRes.user_id) {
        alert('포스팅 완료');
        router.push('/home');
      }
    } else {
      alert('로그인 하세요.');
      router.push('/login');
    }
  };

  return (
    <>
      <Seo title="home"></Seo>
      <header>
        <NavBar userInfo={userInfo}></NavBar>
        <Competition isContent={false}></Competition>
      </header>
      <main>
        <div className="container">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="공유하고자 하는 url"
              onChange={inputValue}
              value={url}
            />
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={urlCheck}>
              추가
            </button>
          </div>
          <div className="row row-cols-auto">
            <span className="col">끌올 가능한 콘텐츠 : YYYY년 MM월 DD일 이전 발행 </span>
            {!props.queryUrl ? (
              <>
                <a
                  className="col"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Image src="/image/question-circle.svg" alt="question" width={24} height={21} />
                </a>
                <div className="dropdown-menu px-2" aria-labelledby="dropdownMenuButton1">
                  <p className="ml-1">
                    3년 이전 컨텐츠만 등록 가능합니다.<br></br> 자동으로 날짜 검증이 되지 않는 컨텐츠는 운영자가 직접
                    보고 판단해서 올라갈 예정입니다.<br></br> 글이 올라가는 시간이 걸릴 수 있습니다.
                  </p>
                </div>
              </>
            ) : (
              <>
                {props.validate ? (
                  <div className="col">
                    <a
                      className="icon"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <Image src="/image/check-circle.svg" alt="question" width={24} height={21} />
                    </a>
                    <div className="dropdown-menu px-2" aria-labelledby="dropdownMenuButton1">
                      <p className="ml-1">검증된 출간 시간: {props.published}</p>
                    </div>
                  </div>
                ) : (
                  <div className="col">
                    <a
                      className="icon"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <Image src="/image/x-circle.svg" alt="question" width={24} height={21} />
                    </a>
                    <div className="dropdown-menu px-2" aria-labelledby="dropdownMenuButton1">
                      <p className="ml-1">
                        검증되지 않음. 운영자가 직접 체크할 예정이므로 포스팅되는데 시간이 걸릴 수 있습니다.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {props.queryUrl ? (
            <>
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img className="img-fluid rounded-start" src={props.ogImage} alt="..." />
                  </div>
                  <div className="col-md-8 card-container">
                    <div className="card-body">
                      <h5 className="card-title">{props.ogTitle}</h5>
                      <p className="card-title">{props.ogDescription}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                  코멘트
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  onChange={(e: any) => setOpinion(e.target.value)}
                ></textarea>
              </div>
              {/* 
              <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Example textarea
            </label>
              <select className="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select> */}
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-primary mt-3" type="button" onClick={postContent}>
                  저장하기
                </button>
              </div>
            </>
          ) : (
            <></>
          )}

          {/* <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Example textarea
            </label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
          </div>
          <select className="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary mt-3" type="button">
              저장하기
            </button>
          </div> */}
        </div>
      </main>
      <style jsx>
        {`
          @media (min-width: 768px) {
            .layout {
              max-width: 960px;
            }
          }
        `}
      </style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const queryUrl = context.query.url ? context.query.url : '';
  const options = { url: queryUrl };

  let ogImage = '';
  let ogTitle = '';
  let ogDescription = '';
  let published = '';
  let validate = false;

  if (queryUrl !== '') {
    await ogs(options, (error: boolean, results: any, response) => {
      if (!error) {
        ogImage = results.ogImage.url;
        ogTitle = results.ogTitle;
        ogDescription = results.ogDescription;

        let keyValue = '';
        const keyArray = Object.keys(results);
        keyArray.forEach((key) => {
          if (key.indexOf('ublish') > -1) {
            keyValue = key;
          }
        });
        if (keyValue !== '') {
          published = results[keyValue].slice(0, 10);
          validate = true;
        }
      }
    });
  }

  return {
    props: { queryUrl, ogImage, ogTitle, ogDescription, published, validate }, // will be passed to the page component as props
  };
};

export default Post;

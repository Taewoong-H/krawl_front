import Link from 'next/link';

const NavBar = (isCookie: any) => {
  return (
    <nav>
      <div className="logo">
        <p>끌올</p>
      </div>
      <div className='user-info'>
        <div className='point'>
          <p>내 포인트 ###점</p>
        </div>
        <div className='login'>
          {isCookie ?
            <p>로그아웃</p> :
            <Link href="/login">
              <a><p>로그인</p></a>
            </Link>
          }
        </div>
      </div>
      <style jsx>
        {`
          nav {
            display: flex;
            padding: 0.5rem;
            align-items: center;
            justify-content: space-between;
          }
          .logo {
            padding: 0.5rem 1rem;
            font-size: 1.25rem;
            font-weight: bold;
            text-decoration: none;
          }
          .user-info {
            display: flex;
          }
          .point {
            padding: 0.5rem 1rem;
          }
          .login {
            padding: 0.5rem 1rem;
          }
        `}
      </style>
    </nav>
  );
}

export default NavBar

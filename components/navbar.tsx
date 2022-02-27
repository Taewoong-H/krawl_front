import Link from 'next/link';

const NavBar = () => {
  return (
    <nav>
      <div>
        <p>끌올</p>
      </div>
      <div>
        <p>내 포인트 ###점</p>
      </div>
      <div>
        <Link href="/login">
          <a>로그인</a>
        </Link>
      </div>
      <style jsx>
        {`
          nav {
            display: flex;
          }
        `}
      </style>
    </nav>
  );
}

export default NavBar

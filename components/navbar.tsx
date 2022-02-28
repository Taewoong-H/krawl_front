import Link from 'next/link';

const NavBar = (isCookie: any) => {
  return (
    <div className="header">
      <nav>
        <ul className="nav nav-pills pull-right">
          <li className="presentation">
            <p>내 포인트 ###점</p>
          </li>
          <li className="presentation">
            {isCookie.isCookie ? (
              <p>로그아웃</p>
            ) : (
              <Link href="/login">
                <a>로그인</a>
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <h3 className="text-muted">
        <Link href="/#">
          <a href="#">끌올</a>
        </Link>
      </h3>
      <style jsx>
        {`
          .header {
            border-bottom: 1px solid #e5e5e5;
          }
          a {
            padding: 0 10px !important;
          }
        `}
      </style>
    </div>
  );
};

export default NavBar;

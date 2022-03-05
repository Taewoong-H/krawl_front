import Link from 'next/link';

const NavBar = ({ userInfo }: any) => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
      <Link href="/#">
        <a className="d-flex align-items-center text-dark text-decoration-none">
          <span className="fs-4">끌올</span>
        </a>
      </Link>
      {userInfo.nickname ? (
        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <a className="me-3 py-2 text-dark text-decoration-none">이름</a>
          <a className="me-3 py-2 text-dark text-decoration-none">내 포인트 ###점</a>
          <a className="py-2 text-dark text-decoration-none">로그아웃</a>
        </nav>
      ) : (
        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <Link href="/login">
            <a className="py-2 text-dark text-decoration-none">로그인</a>
          </Link>
        </nav>
      )}
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

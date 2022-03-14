import Link from 'next/link';
import Image from 'next/image';
import { removeCookies } from 'cookies-next';
import { useRouter } from 'next/router';

const NavBar = ({ userInfo }: any) => {
  const router = useRouter();
  const logout = () => {
    localStorage.clear();
    removeCookies('accessToken');
    router.reload();
  };
  return (
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
      <Link href="/home">
        <a className="d-flex align-items-center text-decoration-none fs-4 text-black bold">
          <Image src="/image/krawl-logo.png" alt="logo-image" className="col" width={40} height={40}></Image>
          끌올
        </a>
      </Link>
      {userInfo.nickname ? (
        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <a className="me-0 py-1 my-auto text-decoration-none">
            <Image
              src={userInfo.profileImage}
              alt="profile-image"
              className="profile-image col"
              width={35}
              height={35}
            ></Image>
          </a>
          <span className="mx-2 py-1 my-auto text-decoration-none navbar-text">{userInfo.nickname}</span>
          <a className="py-2 my-auto text-decoration-none logout navbar-text text-black" onClick={logout}>
            로그아웃
          </a>
        </nav>
      ) : (
        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <Link href="/login">
            <a className="py-2 text-decoration-none navbar-text">로그인</a>
          </Link>
        </nav>
      )}
      <style jsx global>
        {`
          .header {
            border-bottom: 1px solid #e5e5e5;
          }
          .logout {
            cursor: pointer;
          }
          .profile-image {
            border-radius: 50px !important;
          }
        `}
      </style>
    </div>
  );
};

export default NavBar;

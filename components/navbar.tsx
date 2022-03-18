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
    <nav className="navbar navbar-expand-md navbar-light bg-white absolute-top">
      <div className="container">
        <button
          className="navbar-toggler order-2 order-md-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target=".navbar-collapse"
          aria-controls="navbar-left navbar-right"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link href="/home">
          <Image
            src="/image/krawl-logo-new.png"
            alt="logo-image"
            className="navbar-brand mx-auto order-1 order-md-3 logo-link"
            width={50}
            height={50}
          ></Image>
        </Link>
        {userInfo.nickname ? (
          <div className="collapse navbar-collapse order-4 order-md-4">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item text-center">
                <Image
                  src={userInfo.profileImage}
                  alt="profile-image"
                  className="profile-image nav-link text-decoration-none"
                  width={35}
                  height={35}
                ></Image>
              </li>
              <li className="nav-item text-center">
                <span className="nav-link text-decoration-none text-black">{userInfo.nickname}</span>
              </li>
              <li className="nav-item text-center">
                <a className="nav-link text-decoration-none logout text-black" onClick={logout}>
                  로그아웃
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="collapse navbar-collapse order-4 order-md-4" id="navbar-right">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item text-center">
                <Link href="/login">
                  <a className="py-2 text-decoration-none navbar-text text-black">로그인</a>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      <style jsx global>
        {`
          .navbar,
          .navbar * {
            transition: all 0.25s ease-in-out;
          }
          .navbar {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }
          .logo-link {
            cursor: pointer;
          }
          .logout {
            cursor: pointer;
          }
          .profile-image {
            border-radius: 50px !important;
          }
        `}
      </style>
    </nav>
  );
};

export default NavBar;

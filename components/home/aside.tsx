import Link from 'next/link';

const AsideBar = ({ contents }: any) => {
  console.log(contents);
  return (
    <>
      <aside className="sidebar">
        <div className="card mb-4 aside-card">
          <div className="card-body">
            <h4 className="card-title fw-bolder">About</h4>
            <p className="card-text">
              세상에는 새로운 콘텐츠가 (말 그대로) 넘쳐납니다.
              <br />
              새롭게 생겨나는 콘텐츠에 사람들의 시선이 쏠리는 게 당연하지만, 우리는 그로 인해 외면받는 부분을 조명하고자
              합니다. 발행된지는 오래되었지만 그냥 묻히기에는 너무 아까운 콘텐츠들 말입니다. 마치 고전 작품처럼요.
              <br />
              무려 5년이 넘은 콘텐츠들을 소개합니다!
            </p>
          </div>
        </div>
        <div className="card mb-4 aside-card">
          <div className="card-body">
            <h4 className="card-title fw-bolder">인기 컨텐츠</h4>
            {contents.map((content: any) => {
              return (
                <div className="d-inline-block mt-3" key={content.id}>
                  <Link href={`/contents/${content.id}`}>
                    <div className="content-text">
                      <h4 className="h6">{content.ogTitle}</h4>
                      {content.ogImage !== '' ? (
                        <img className="img-fluid rounded-start" src={content.ogImage} alt="..." />
                      ) : (
                        <img className="img-fluid rounded-start" src="/image/default-image.png" alt="..." />
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card mb-4 aside-card">
          <div className="card-body">
            <h4 className="card-title fw-bolder">Tags</h4>
            <p>준비중!</p>
          </div>
        </div>
      </aside>
      <style jsx>{`
        .aside-card {
          border: 0 solid rgba(0, 0, 0, 0.125);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          padding: 10px;
        }
        .content-text {
          cursor: pointer;
        }
        .content-text .img-fluid:hover {
          box-shadow: 1px 1px 20px #ddd;
        }
      `}</style>
    </>
  );
};

export default AsideBar;

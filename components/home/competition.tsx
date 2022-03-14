import Link from 'next/link';

const Competition = ({ isContent }: any) => {
  return (
    <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
      {isContent ? (
        <h3 className="text-muted">
          <Link href="/post">
            <a className="btn btn-primary btn-lg" role="button">
              끌올하기
            </a>
          </Link>
        </h3>
      ) : (
        <div></div>
      )}
      {isContent ? (
        <p className="fs-5 text-muted">만 3세 미만 콘텐츠 출입금지</p>
      ) : (
        <p className="fs-5 text-muted">좋은 콘텐츠들은 휘발되어서 안 된다</p>
      )}
      <style jsx>{`
        .btn {
          background-color: #fbeaeb;
          border-color: #fbeaeb;
          color: #2e3c7e;
        }
      `}</style>
    </div>
  );
};

export default Competition;

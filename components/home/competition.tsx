import Link from 'next/link';

const Competition = ({ isContent }: any) => {
  return (
    <div className="pricing-header p-3 pb-md-2 mx-auto my-3 row align-items-end justify-content-between">
      {isContent ? (
        <div className="col-auto">
          <h1 className="fw-bolder">5년 이상 묵힌 콘텐츠만 취급.</h1>
          <p className="fs-6 text-muted">
            끌올은 따끈따끈한 정보를 좇지 않습니다. 곰팡내도 좀 나고 먼지도 쌓인,
            <br /> 하지만 여전히 번뜩이는 통찰력을 가진 콘텐츠만을 취급합니다.
          </p>
        </div>
      ) : (
        <p className="fs-5 text-muted">좋은 콘텐츠들은 휘발되어서 안 된다</p>
      )}
      {isContent ? (
        <h3 className="text-muted col-auto">
          <Link href="/post">
            <a className="btn btn-primary btn-lg" role="button">
              끌올하기
            </a>
          </Link>
        </h3>
      ) : (
        <div></div>
      )}
      <style jsx>{`
        .pricing-header {
          max-width: 900px;
        }
      `}</style>
    </div>
  );
};

export default Competition;

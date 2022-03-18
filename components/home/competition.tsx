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
        <>
          <h5>5년 이상 묵힌 콘텐츠만 취급</h5>
          <p className="fs-6 text-muted">
            우리는 따끈따끈한 정보를 좆지 않습니다. 곰팡내도 좀 나고 먼지도 쌓인,
            <br /> 하지만 여전히 번뜩이는 통찰력을 가진 콘텐츠만을 취급합니다.
          </p>
        </>
      ) : (
        <p className="fs-5 text-muted">좋은 콘텐츠들은 휘발되어서 안 된다</p>
      )}
      <style jsx>{``}</style>
    </div>
  );
};

export default Competition;

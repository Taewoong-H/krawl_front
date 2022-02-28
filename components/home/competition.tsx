const Competition = () => {
  return (
    <div className="jumbotron">
      <div>
        <div className="detail">
          <p className="left">현재 끌올이 진행 중입니다.</p>
          <p className="right"> - YYYY/MM/DD 까지</p>
        </div>
        <div className="progress">
          <div className="progress-bar">
            <span className="sr-only">60% Complete</span>
          </div>
        </div>
      </div>
      <div>
        <button className="btn btn-warning">끌올하기</button>
      </div>
      <style jsx>
        {`
          .jumbotron {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 40px;
          }
          .detail {
            display: flex;
            align-items: center;
          }
          .detail .left {
            font-size: 18px;
          }
          .detail .right {
            font-size: 14px;
            margin-left: 0.5rem;
          }
          .progress-bar {
            width: 60%;
          }
          .btn {
            padding: 6px 10px;
            font-size: 15px;
          }
        `}
      </style>
    </div>
  );
};

export default Competition;

const Competition = () => {
    return (
      <div className="competition">
        <div>
          <div className="detail">
            <p>현재 끌올이 진행 중입니다.</p>
            <p>- YYYY/MM/DD 까지</p>
          </div>
          <div className="progress-bar"></div>
        </div>
        <div>
          <button>끌올하기</button>
        </div>
        <style jsx>
          {`
            .competition {
              display: flex;
            }
            .detail {
              display: flex;
            }
            .progress-bar {
              width: 300px;
              height: 20px;
              border: 1px solid;
            }
          `}
        </style>
      </div>
    );
  }
  
  export default Competition
  
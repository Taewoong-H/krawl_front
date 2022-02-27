const Competition = () => {
    return (
      <div className="competition">
        <div>
          <div className="detail">
            <p className="left">현재 끌올이 진행 중입니다.</p>
            <p className="right"> - YYYY/MM/DD 까지</p>
          </div>
          <div className="progress-bar"></div>
        </div>
        <div>
          <p className="button">끌올하기</p>
        </div>
        <style jsx>
          {`
            .competition {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 1.25rem;
              padding: 1.25rem;
              border: 1px solid rgba(0,0,0,.125);
              border-radius: 10px;
            }
            .detail {
              display: flex;
              align-items: center;
            }
            .detail .left {
              font-size: 1.2rem;
            }
            .detail .right {
              font-size: 0.8rem;
              margin-left: 0.5rem;
            }
            .progress-bar {
              width: 500px;
              height: 20px;
              border: 1px solid;
            }
            .button {
              background-color: #f4511e;
              border: 1px solid transparent;
              padding: 0.375rem 0.75rem;
              font-weight: bold;
              cursor: pointer;
              opacity: 0.8;
              transition: 0.3s;
            }
            .button:hover {
              opacity: 1.2
            }
          `}
        </style>
      </div>
    );
  }
  
  export default Competition
  
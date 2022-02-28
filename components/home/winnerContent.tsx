const WinnerContent = (winnerContent: any) => {
  return (
    <div className="winner-content-list">
      <p>📌지난 투표 기간에 1위를 한 콘텐츠</p>
      <div>
        <p>{winnerContent.url}</p>
        <p>{winnerContent.raw_date}</p>
      </div>
      <style jsx>
        {`
          .winner-content-list {
            padding: 0.5rem;
          }
        `}
      </style>
    </div>
  );
};

export default WinnerContent;

const WinnerContent = (winnerContent: any) => {
  return (
    <div className="winner-content-list">
      <p>πμ§λ ν¬ν κΈ°κ°μ 1μλ₯Ό ν μ½νμΈ </p>
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

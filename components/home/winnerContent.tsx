const WinnerContent = ({ winnerContent }) => {
    return (
      <div>
        <p>winner content</p>
          <div>
            <p>{winnerContent.url}</p>
            <p>{winnerContent.raw_date}</p>
          </div>
        <style jsx>
          {`
            
          `}
        </style>
      </div>
    );
  }
  
  export default WinnerContent
  
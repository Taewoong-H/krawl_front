const ContentList = ({content}) => {
    return (
      <div>
        {content.list.map(item => {
          return (
            <div key={item.id}>
              <p>{item.url}</p>
              <p>{item.raw_date}</p>
            </div>
          )
        })}
        <style jsx>
          {`
            
          `}
        </style>
      </div>
    );
  }
  
  export default ContentList
  
const ContentList = (content: any) => {
    console.log(content)
    return (
      <div>
        {content.content.map((item: any) => {
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
  
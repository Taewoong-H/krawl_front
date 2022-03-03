const ContentList = ({content}: any) => {
  return (
    <>
      {content.map((item: any) => {
        return (
          <div className="card" key={item.id}>
            <div className="card-body">
              <div className="media">
                <div className="media-left">
                  <a href="#">
                    <img className="media-object" src={item.ogImage} alt="..." width='100' height='100' />
                  </a>
                </div>
                <div className="media-body">
                  <h4 className="media-heading">{item.url}</h4>
                  <p>{item.raw_date}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <style jsx>{``}</style>
    </>
  );
};

export default ContentList;

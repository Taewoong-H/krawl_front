const ContentList = ({ content }: any) => {
  return (
    <>
      {content.map((item: any) => {
        return (
          <div className="card mb-3" key={item.id}>
            <div className="row g-0">
              <div className="col-md-4">
                <img className="img-fluid rounded-start" src={item.ogImage} alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.ogTitle}</h5>
                  <p className="card-text">{item.opinion}</p>
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

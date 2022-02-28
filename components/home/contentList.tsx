const ContentList = (content: any) => {
  return (
    <ul className="list-group">
      {content.content.map((item: any) => {
        return (
          <li className="list-group-item">
            <div className="media" key={item.id}>
              <div className="media-left">
                <a href="#">
                  <img className="media-object" src="..." alt="..." />
                </a>
              </div>
              <div className="media-body">
                <h4 className="media-heading">{item.url}</h4>
                <p>{item.raw_date}</p>
              </div>
            </div>
          </li>
        );
      })}
      <style jsx>{``}</style>
    </ul>
  );
};

export default ContentList;

const ContentList = ({content}: any) => {
  return (
    <ul className="list-group">
      {content.map((item: any) => {
        return (
          <li className="list-group-item" key={item.id}>
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
          </li>
        );
      })}
      <style jsx>{``}</style>
    </ul>
  );
};

export default ContentList;

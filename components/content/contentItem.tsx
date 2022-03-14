import Link from 'next/link';

const ContentItem = ({ item }: any) => {
  const today = new Date();
  const itemDate = new Date(item.raw_date);
  const calcYear = today.getFullYear() - itemDate.getFullYear();

  return (
    <>
      <div className="card mb-3" key={item.id}>
        <Link href={item.url}>
          <div className="row g-0">
            <div className="col-md-4">
              {item.ogImage !== '' ? (
                <img className="img-fluid rounded-start" src={item.ogImage} alt="..." />
              ) : (
                <img className="img-fluid rounded-start" src="/image/krawl-logo.png" alt="..." />
              )}
            </div>
            <div className="col-md-8 card-container">
              <div className="card-body">
                <br />
                <h4 className="card-title">{item.ogTitle}</h4>
                <br />
                <p className="card-text">{item.ogDescription}</p>
              </div>
              {/* <div className="calc-year">무려 {calcYear}년전 발행</div> */}
              <span className="badge bg-secondary calc-year">무려 {calcYear}년전 발행</span>
            </div>
          </div>
        </Link>
      </div>
      <style jsx global>{`
        .img-fluid {
          width: 100%;
          height: 15rem;
        }
        .card:hover {
          box-shadow: 1px 1px 20px #ddd;
        }
        .card-container {
          position: relative;
        }
        .card-title {
          width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .card-text {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          line-height: 1.5em;
          max-height: 3em;
        }
        .calc-year {
          position: absolute;
          top: 1rem;
          right: 10px;
        }
      `}</style>
    </>
  );
};

export default ContentItem;

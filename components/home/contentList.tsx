import Image from 'next/image';

const ContentList = ({ content }: any) => {
  return (
    <>
      {content.map((item: any) => {
        const today = new Date();
        const itemDate = new Date(item.raw_date);
        const calcYear = today.getFullYear() - itemDate.getFullYear();
        return (
          <div className="card mb-3" key={item.id}>
            <div className="row g-0">
              <div className="col-md-4">
                <img className="img-fluid rounded-start" src={item.ogImage} alt="..." />
              </div>
              <div className="col-md-8 card-container">
                <div className="card-body">
                  <h5 className="card-title">{item.ogTitle}</h5>
                  <p className="card-text">{item.opinion}</p>
                  <div className="card-user row ms-1">
                    <Image
                      src={item.current_user.profile_img}
                      alt="profile-image"
                      className="profile-image col"
                      width={35}
                      height={35}
                    ></Image>
                    <p className="col mb-0">{item.current_user.nickname}</p>
                  </div>
                </div>
                <div className="calc-year">무려 {calcYear}년전 발행</div>
              </div>
            </div>
          </div>
        );
      })}
      <style jsx global>{`
        .img-fluid {
          width: 100%;
          height: 15rem;
        }
        .card-container {
          position: relative;
        }
        .card-title {
          width: 80%;
        }
        .calc-year {
          position: absolute;
          top: 5%;
          right: -1%;
          background-color: #fbeaeb;
          color: #2e3c7e;
          padding: 10px;
          border-radius: 5px;
        }
        .profile-image {
          border-radius: 50px !important;
        }
      `}</style>
    </>
  );
};

export default ContentList;

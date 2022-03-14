import Image from 'next/image';

const Comments = ({ comments }: any) => {
  return (
    <>
      {comments.map((comment: any) => {
        return (
          <div className="card-user row ms-1" key={comment.id}>
            <div className="mb-3 row">
              <Image
                src={comment.current_user.profile_img}
                alt="profile-image"
                className="profile-image col"
                width={30}
                height={30}
              ></Image>
              <span className="col-auto me-auto my-auto profile-nickname">{comment.current_user.nickname}</span>
            </div>
            {comment.body.split('\n').map((line: any, index: number) => {
              return <p key={index}>{line}</p>;
            })}
          </div>
        );
      })}
    </>
  );
};

export default Comments;

import Image from 'next/image';

const Comments = ({ comments }: any) => {
  return (
    <>
      {comments.map((comment: any) => {
        return (
          <div className="card-user row ms-1" key={comment.id}>
            <Image
              src={comment.current_user.profile_img}
              alt="profile-image"
              className="profile-image col"
              width={30}
              height={30}
            ></Image>
            <span className="col-auto me-auto profile-nickname">{comment.current_user.nickname}</span>
            <p className="mt-3">{comment.body}</p>
          </div>
        );
      })}
    </>
  );
};

export default Comments;

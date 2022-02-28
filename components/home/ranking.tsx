const UserRanking = (users: any) => {
  return (
    <div>
      <p>랭킹</p>
      {users.users.map((user: any) => {
        return (
          <div key={user.user_id}>
            <p>#{user.user_id}</p>
            <p>{user.profileImage}</p>
            <p>{user.nickname}</p>
          </div>
        );
      })}
      <style jsx>{``}</style>
    </div>
  );
};

export default UserRanking;

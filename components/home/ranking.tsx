const UserRanking = (users: any) => {
  return (
    <div>
      <h4>랭킹</h4>
      <ul className="list-group">
        {users.users.map((user: any, index: any) => {
          return (
            <li className="list-group-item" key={user.user_id}>
              <div>
                <p>{index + 1}등</p>
                <p>{user.profileImage}</p>
                <p>{user.nickname}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <style jsx>{``}</style>
    </div>
  );
};

export default UserRanking;

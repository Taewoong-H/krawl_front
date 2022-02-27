const UserRanking = (users: any) => {
    return (
      <div>
        <p>랭킹</p>
        {users.list ? users.list.map((user: any) => {
          return (
            <div key={user.id}>
              <p>#{user.id}</p>
              <p>{user.profileImage}</p>
              <p>{user.name}</p>
            </div>
          )
        }): ''}
        <style jsx>
          {`
            
          `}
        </style>
      </div>
    );
  }
  
  export default UserRanking
  
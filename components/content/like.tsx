import { HeartOutlined, HeartFilled, ShareAltOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const Like = ({ propBody }: any) => {
  console.log(propBody);

  const clickLike = async () => {
    const userToken = propBody.userToken;
    const body = {
      user_id: propBody.userInfo.userId,
      content_id: propBody.props.contentResult.id,
    };
    if (propBody.isChecked) {
      propBody.setLikeButton(false);
      if (userToken && typeof userToken === 'string') {
        const tokenSplit = userToken.split('"');
        const token = tokenSplit[3];
        const postRes = await (
          await fetch(`/api/contents/likes/${body.content_id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          })
        ).json();
        console.log(postRes);
      }
    } else {
      propBody.setLikeButton(true);

      if (userToken && typeof userToken === 'string') {
        const tokenSplit = userToken.split('"');
        const token = tokenSplit[3];
        const postRes = await (
          await fetch('/api/contents/likes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify(body),
          })
        ).json();
        console.log(postRes);
      }
    }
  };

  return (
    <ul className="nav col-md-4 list-unstyled d-flex align-items-center">
      <li>
        <div>
          {propBody.isChecked ? (
            <HeartFilled className="heart red" style={{ color: 'red', fontSize: '30px' }} onClick={clickLike} />
          ) : (
            <HeartOutlined className="heart" style={{ fontSize: '30px' }} onClick={clickLike} />
          )}
        </div>
      </li>
      <li className="mx-1">
        <div>
          <ShareAltOutlined style={{ fontSize: '30px' }} />
        </div>
      </li>
      <style jsx global>{`
        .heart {
          cursor: pointer;
          transition: transform 300ms ease;
          font-size: 100px;
        }
        .red {
          color: red;
        }
        .heart:hover {
          transform: scale(1.1);
        }
      `}</style>
    </ul>
  );
};

export default Like;

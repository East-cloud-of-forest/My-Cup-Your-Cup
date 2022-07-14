
import "../QnA/PostPage.scss";


// 올린 게시글 조회

import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const PostPage = ({ post }) => {
  const [getpost, setGetpost] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (post !== undefined) {
      setGetpost(post.filter((p) => p.id === params.id));
    }
  }, [post]);

  return (
    <div>
      {getpost.length !== 0 && (
        <>
  <div className="Post_Page">

        <div className="Post_Title">
          <hr />
            <h2>제목: {getpost[0].title}</h2>
          <hr />
        </div>

          <p>{getpost[0].body}</p>
  </div>
        </>
  

      )}
    </div>
  );
};

export default PostPage;

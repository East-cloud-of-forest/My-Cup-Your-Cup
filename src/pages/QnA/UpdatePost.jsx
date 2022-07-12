

import { useState } from 'react'

// 게시글 수정하는 곳

const UpdatePost = (props) => {

  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  const category = props.category
  const date = props.date

  const inputTitle = (e) => {
    setTitle(e.target.value)
}
const inputBody = (e) => {
    setBody(e.target.value)
}

  return (
    <div>
      <h1> UPDATE 페이지 </h1>

      <form
        onSubmit={(e) => {
            alert("게시글 UPDATE 실행")
            e.preventDefault();
          props.update_start(title, body, category, date);
        }}
      >
        <p>
          <input name="title" type="text" value={title} onChange={inputTitle} />
        </p>
        <p>
          <textarea name="body" value={body} onChange={inputBody} />
        </p>
        <p>
          <input type="submit" value="게시글 수정" />
        </p>
      </form>
    </div>
  );
};

export default UpdatePost;

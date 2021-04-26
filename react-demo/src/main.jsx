
import React, { useState, cloneElement, Children, useEffect } from 'react';
import { render } from 'react-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Ticker = props => {

  return Children.map(props.children, child => {
    // console.log(child);
    return cloneElement(child, {onClick: () => {
      console.log('在原来事件handler前增加一些逻辑')
      child.props.onClick();
      console.log('在原来事件handler后增加一些逻辑')
    }})
  });
};

const RichEditer = () => {
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log(value);
  }, [value]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules}/>
  );
};

const str = '<input name="userName" class="textcss" id="userName" type="text" value="abc"/><script>alert("1")</script>"/>';


render((
  <>
    <Ticker>
      <div onClick={() => console.log(111)}>test</div>
    </Ticker>
    <RichEditer/>
    <div dangerouslySetInnerHTML={{__html: str}}></div>
  </>
), document.getElementById('root'));





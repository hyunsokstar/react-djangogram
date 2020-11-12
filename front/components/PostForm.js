import React, { useState, useCallback, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from 'react-redux';
// import { ADD_POST } from '../reducers/post';about:blank#blocked
import { ADD_POST_REQUEST } from '../reducers/post';
import shortId from 'shortid';


const PostForm = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const { addPostLoading, addPostDone } = useSelector((state) => state.post);

    useEffect(() => {
        if (addPostDone) {
            setText('');
        }
    }, [addPostDone]);

    const onChangeText = useCallback((e) => {
        // console.log("text : " + e.target.value);
        setText(e.target.value);
    }, [text]);

    const onSubmitForm = useCallback(() => {
        console.log("게시글 추가 submit click !!");
        console.log("text 확인 : ", text);
        dispatch({
            type: ADD_POST_REQUEST,
            data: {
                text,
                postId: shortId.generate()
            },
        });
    }, [text]);

    return (
        <Form
            style={{ margin: "10px 0 20px" }}
            encType="multipart/form-data"
            onFinish={onSubmitForm}
        >
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="어떤 신기한 일이 있었나요?"
            />
            <div>
                <input type="file" multiple hidden />
                <Button>이미지 업로드</Button>
                {/* <Button
                    type="primary"
                    style={{ float: "right" }}
                    htmlType="submit"
                >
                    짹짹
                </Button> */}
                <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={addPostLoading}>짹짹</Button>
            </div>
        </Form>
    );
}

export default PostForm;

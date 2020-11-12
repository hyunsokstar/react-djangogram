import React, { useState, useCallback } from "react";
import { RetweetOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import CommentForm from './CommentForm';
// import { Card, Avatar, List, Comment } from 'antd';
import { Card, Avatar, List, Comment, Popover, Button } from 'antd';
import PostImages from "./PostImages";
// import { useSelector } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import PostCardContent from "../components/PostCardContent";
import { REMOVE_POST_REQUEST } from '../reducers/post';
import CommentRow from './CommentRow'
import FollowButton from "./FollowButton";


const { Meta } = Card;


const PostCard = ({ post }) => {
    const dispatch = useDispatch();

    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [liked, setLiked] = useState(false);
    const { removePostLoading } = useSelector((state) => state.post);



    const { me } = useSelector((state) => state.user);
    const id = me && me.id;
    console.log("id : ", id);

    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev);
    }, []);

    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);
    // console.log("post : ", post);

    const onRemovePost = useCallback(() => {
        console.log("삭제할 post id : ", post.id);

        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id,
        });
        
    }, []);

    return (
        <>
            <Card
                style={{ width: "100%" }}
                // cover={post.Images[0] && <img alt="example" src={post.Images[0].src} />}
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    liked
                        ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                        : <HeartOutlined key="heart" onClick={onToggleLike} />,
                    <MessageOutlined key="message" onClick={onToggleComment} />,
                    // <EllipsisOutlined />
                    <Popover
                        key="ellipsis"
                        content={(
                            <Button.Group>
                                {id && post.User.id === id
                                    ? (
                                        <>
                                            <Button>수정</Button>
                                            <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                                        </>
                                    )
                                    : <Button>신고</Button>}
                            </Button.Group>
                        )}
                    >
                        <EllipsisOutlined />
                    </Popover>,
                ]}
                extra={<FollowButton post={post} />}
            >
                <Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    // description={post.content}
                    description={<PostCardContent postData={post.content} />}

                />
            </Card>

            {commentFormOpened && (
                <>
                    <CommentForm post = {post}/>
                    <List
                        header={`${post.Comments ? post.Comments.length : 0} 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments || []}
                        renderItem={(item) => (
                            <li>
                                <CommentRow postId={post.id} comment={item} />
                            </li>
                        )}
                    />
                </>
            )}

        </>
    );
};

export default PostCard;


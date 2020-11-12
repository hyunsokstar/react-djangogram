import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useEffect } from 'react';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { useSelector, useDispatch } from 'react-redux';


const Home = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    // const { mainPosts } = useSelector(state => state.post);
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST,
        });
    }, []);

    useEffect(() => {
        function onScroll() {
            // console.log("scroll event 발생");
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                console.log("hasMorePosts : ", hasMorePosts);
                console.log("loadPostsLoading : ", loadPostsLoading);
                if (hasMorePosts && !loadPostsLoading) {
                    console.log("화면이 바닥에 도달 + 포스팅 추가!!");
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        data: mainPosts[mainPosts.length - 1].id,
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [mainPosts, hasMorePosts, loadPostsLoading]);

    return (
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map((c) => {
                return (
                    <PostCard key={c.id} post={c} />
                );
            })}
        </AppLayout>
    );
};

export default Home;

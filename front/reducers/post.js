import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';


export const initialState = {
    mainPosts: [],

    // 게시글 추가 관련 state 변수 추가
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,

    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,

    removePostLoading: false,
    removePostDone: false,
    removePostError: null,

    removeCommentLoading: false,
    removeCommentDone: false,
    removeCommentError: null,

    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,
    hasMorePosts: true,

};

export const generateDummyPost = (number) => Array(number).fill().map(() => ({
    id: shortId.generate(),
    User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
    Images: [{
        src: faker.image.image(),
    }],
    Commeents: [{
        User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
        },
        content: faker.lorem.sentence(),
    }],
}));

initialState.mainPosts = initialState.mainPosts.concat(
    generateDummyPost(10)
)   

// export const ADD_POST = 'ADD_POST';
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'; export const ADD_COMMENT = 'ADD_COMMENT';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

// export const addPost = {
//     type: ADD_POST,
// };
const dummyPost = (data) => {
    console.log("data(redux) : ", data);
    return (
        {
            id: data.id,
            content: data.content, // 리덕스 사가에서 content로 넘김
            User: {
                id: 1,
                nickname: '제로초',
            },
            Images: [],
            Comments: [],
        }
    )
}

const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: "제로초",
    },
});

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ADD_POST_REQUEST:
                // return {
                //     ...state,
                //     addPostLoading: true,
                //     addPostDone: false,
                //     addPostError: null,
                // };
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                // return {
                //     ...state,
                //     mainPosts: [dummyPost(action.data), ...state.mainPosts],
                //     addPostLoading: false,
                //     addPostDone: true,
                // };
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.mainPosts.unshift(dummyPost(action.data));
                break;
            case ADD_POST_FAILURE:
                // return {
                //     ...state,
                //     addPostLoading: false,
                //     addPostError: action.error,
                // };
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;

            case ADD_COMMENT_REQUEST:
                // return {
                //     ...state,
                //     addCommentLoading: true,
                //     addCommentDone: false,
                //     addCommentError: null,
                // };
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:
                // // 사가에서 넘어온 postId를 이용해 원래 게시글 정보 찾기
                // const postIndex = state.mainPosts.findIndex(
                //     (v) => v.id === action.data.postId
                // );
                // const post = { ...state.mainPosts[postIndex] };
                // // 원래 댓글 정보 + 새로운 댓글 정보로 댓글 정보 재구성
                // const Comments = [
                //     dummyComment(action.data.content),
                //     ...post.Comments,
                // ];
                // // 원래 게시글 정보의 게시글과 댓글 정보를 재구성 
                // const mainPosts = [...state.mainPosts]
                // mainPosts[postIndex] = { ...post, Comments };
                // return {
                //     ...state,
                //     mainPosts,
                //     addCommentLoading: false,
                //     addCommentDone: true,
                // };
                // 댓글이 달릴 포스팅 객체 찾기
                const post = draft.mainPosts.find((v) => v.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data.content));
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
            case ADD_COMMENT_FAILURE:
                // return {
                //     ...state,
                //     addCommentLoading: false,
                //     addCommentError: action.error,
                // };
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            

            case REMOVE_POST_REQUEST:
                // return {
                //     ...state,
                //     removePostLoading: true,
                //     removePostDone: false,
                //     removePostError: null,
                // };
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                // return {
                //     ...state,
                //     // filter 의 각각의 요소가 v로 전달 되며 
                //     // v.id !== action.data(=post.id) 인것들로 다시 재구성 
                //     mainPosts: state.mainPosts.filter((v) => {
                //         console.log("삭제할 id : ", action.data);
                //         return v.id !== action.data
                //     }),
                //     removePostLoading: false,
                //     removePostDone: true,
                // };
                draft.removePostLoading = false;
                draft.removePostDone = true;
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
                break;
            case REMOVE_POST_FAILURE:
                // return {
                //     ...state,
                //     removePostLoading: false,
                //     removePostError: action.error,
                // };
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break; 


            case REMOVE_COMMENT_REQUEST:
                return {
                    ...state,
                    removeCommentLoading: true,
                    removeCommentDone: false,
                    removeCommentError: null,
                };
            case REMOVE_COMMENT_SUCCESS: {
                console.log("action.data (at REMOVE_COMMENT_SUCCESS): ", action.data);
                const postIndex = state.mainPosts.findIndex(
                    (v) => v.id === action.data.postId
                );
                console.log("postIndex : ", postIndex);
                const post = { ...state.mainPosts[postIndex] };
                console.log("post : ", post);
                const Comments = post.Comments.filter((v) => {
                    console.log("삭제할 id : " + action.data.commentId);
                    return v.id !== action.data.commentId
                });
                const mainPosts = [...state.mainPosts]
                mainPosts[postIndex] = { ...post, Comments };
                console.log("mainPosts : ", mainPosts);
                return {
                    ...state,
                    mainPosts,
                    removeCommentLoading: false,
                    removeCommentDone: true,
                };
            }

            case REMOVE_COMMENT_FAILURE:
                return {
                    ...state,
                    addCommentLoading: false,
                    addCommentError: action.error,
                };

            case LOAD_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            case LOAD_POSTS_SUCCESS:
                draft.loadPostsLoading = false;
                draft.loadPostsDone = true;
                draft.mainPosts = action.data.concat(draft.mainPosts);
                draft.hasMorePosts = draft.mainPosts.length < 50;
                break;
            case LOAD_POSTS_FAILURE:
                draft.loadPostsLoading = false;
                draft.loadPostsError = action.error;
                break;
                
            default:
                return state;
        }
    });
};

export default reducer;


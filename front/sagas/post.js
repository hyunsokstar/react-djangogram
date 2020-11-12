import { all, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import shortId from 'shortid';
import {
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,

    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAILURE,

    REMOVE_COMMENT_REQUEST,
    REMOVE_COMMENT_SUCCESS,
    REMOVE_COMMENT_FAILURE,

    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    LOAD_POSTS_FAILURE,
    generateDummyPost,

} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';



function addPostAPI(data) {
    return axios.post('/api/post', data);
}
function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        // const id = shortId.generate();
        console.log("saga action.data : ", action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                id: action.data.postId,
                content: action.data.text,
            },
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: action.data.postId,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data,
        });
    }
}

function addCommentAPI(data) {
    return axios.post(`/api/post/${data.postId}/comment`, data);
}
function* addComment(action) {
    console.log("addComent action : ", action.data);
    try {
        // const result = yield call(addCommentAPI, action.data);
        console.log("saga comment action.data : ", action.data);
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        console.log("댓글 에러 : ", err);
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data,
        });
    }
}

function removePostAPI(data) {
    return axios.delete('/api/post', data);
}
function* removePost(action) {
    try {
        // const result = yield call(removePostAPI, action.data);
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data,
        });

        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data,
        });

    } catch (err) {
        console.error(err);
        yield put({
            type: REMOVE_POST_FAILURE,
            data: err.response.data,
        });
    }
}

function removeCommentAPI(data) {
    return axios.delete('/api/post', data);
}
function* removeComment(action) {
    try {
        // const result = yield call(removePostAPI, action.data);
        yield delay(1000);
        yield put({
            type: REMOVE_COMMENT_SUCCESS,
            data: {
                postId: action.data.postId,
                commentId: action.data.commentId
            }
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: REMOVE_COMMENT_FAILURE,
            data: err.response.data,
        });
    }
}

function loadPostsAPI(data) {
    return axios.get('/api/posts', data);
}
function* loadPosts(action) {
    try {
        // const result = yield call(loadPostsAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: generateDummyPost(10),
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_POSTS_FAILURE,
            data: err.response.data,
        });
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchRemoveComment() {
    yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}

function* watchLoadPosts() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchRemovePost),
        fork(watchRemoveComment),
        fork(watchLoadPosts),
    ]);
}

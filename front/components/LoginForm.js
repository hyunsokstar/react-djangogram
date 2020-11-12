import React, { useState, useCallback, useMemo } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
// import { useDispatch } from "react-redux";
import { useDispatch, useSelector } from 'react-redux';
// import { loginAction } from "../reducers/user";
import { LOG_IN_REQUEST } from '../reducers/user';

const FormWrapper = styled(Form)`
    padding: 10px;
`;

const LoginForm = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const { logInLoading } = useSelector((state) => state.user);

    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    }, []);
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const onSubmitForm = useCallback(() => {
        console.log("id,password : ", id, password);
        // setIsLoggedIn(true);
        // dispatch(loginAction({ id, password }));
        dispatch({
            type: LOG_IN_REQUEST,
            data: { id, password },
        });
    }, [id, password]);

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input
                    name="user-id"
                    value={id}
                    onChange={onChangeId}
                    required
                />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input
                    name="uer-password"
                    value={password}
                    onChange={onChangePassword}
                    required
                />
            </div>

            <div style={{ marginTop: "10px" }}>
                {/* <Button type="primary" htmlType="submit" loading={false}>로그인</Button> */}
                <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
                <Link href="/signup">
                    <a>
                        <Button>회원 가입</Button>
                    </a>
                </Link>
            </div>

        </FormWrapper>
    );
};

export default LoginForm;


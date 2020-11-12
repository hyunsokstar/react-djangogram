import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from "react-redux";
import Router from 'next/router';
import { Form, Input, notification } from "antd";


const Profile = () => {
    const { me } = useSelector((state) => state.user);
    const followerList = [
        { nickname: "제로초1" },
        { nickname: "바보" },
        { nickname: "노드버드오피셜" },
    ];
    const followingList = [
        { nickname: "제로초2" },
        { nickname: "바보" },
        { nickname: "노드버드오피셜" },
    ];
    useEffect(() => {
        if (!(me && me.id)) {
            Router.push('/');
        }
    }, [me && me.id]);
    
    if (!me) {
        useEffect(() => {
            notification.open({
                message: '알림',
                description:
                    '로그인 하세요 !!',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        }, []);
        return null;
    }

    return (
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉 목록" data={followingList} />
                <FollowList header="팔로워 목록" data={followerList} />
            </AppLayout>
        </>
    );
};

export default Profile;


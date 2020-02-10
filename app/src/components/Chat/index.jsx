import React, { useState, useEffect } from 'react';

import io from 'socket.io-client';
import { SOCKET_URL } from '../../constants/api';

import FeatherIcon from 'feather-icons-react';

import './index.css';

let socket;

const Component = ({ id }) => {
    const [messages, setMessages] = useState([]);
    const [isOpenChat, setIsOpenChat] = useState(false);

    useEffect(() => {
        socket = io(SOCKET_URL);

        socket.emit('join', { userName: 'Aidan', movieRoom: id }, () => {});
    }, [id]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        };
    }, [messages]);

    const _handleSendMessage = e => {
        e.preventDefault();

        const message = document.chat.message.value;
        if (message) {
            socket.emit('sendMessage', message, () => {
                document.chat.message.value = '';
            });
        }
    };

    const _handleOpenToggle = () => {
        setIsOpenChat(isOpenChat => !isOpenChat);
    };

    return (
        <div className={isOpenChat ? 'chat-active' : 'chat'}>
            <div className='chat-toggle-container'>
                <FeatherIcon
                    icon={isOpenChat ? 'chevron-right' : 'chevron-left'}
                    className='chat-toggle'
                    size='1rem'
                    onClick={_handleOpenToggle}
                />
            </div>
            <div className='chat-content-container'>
                <div className='chat-message-container'>
                    {messages.map((message, index) => (
                        <div className='chat-message' key={index}>
                            <div className='chat-message-name'>
                                {message.userName}
                            </div>
                            <div className='chat-message-message'>
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>
                <form name='chat' onSubmit={_handleSendMessage}>
                    <input
                        className='chat-input'
                        name='message'
                        placeholder='Message ...'
                    />
                    <button className='chat-button' type='submit' />
                </form>
            </div>
        </div>
    );
};

export default Component;

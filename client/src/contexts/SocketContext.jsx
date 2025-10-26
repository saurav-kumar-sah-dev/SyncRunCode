import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import config from '../config/api';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const newSocket = io(config.SOCKET_URL, {
        transports: ['websocket'],
        upgrade: false
      });

      newSocket.on('connect', () => {
        console.log('Socket connected');
        setConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
        setConnected(false);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setConnected(false);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
        setSocket(null);
        setConnected(false);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
        setConnected(false);
      }
    }
  }, [isAuthenticated]);

  const joinRoom = (roomId) => {
    if (socket) {
      socket.emit('join-room', roomId);
    }
  };

  const leaveRoom = (roomId) => {
    if (socket) {
      socket.leave(roomId);
    }
  };

  const sendCodeChange = (roomId, data) => {
    if (socket) {
      socket.emit('code-change', { roomId, ...data });
    }
  };

  const onCodeChange = (callback) => {
    if (socket) {
      socket.on('code-update', callback);
    }
  };

  const offCodeChange = (callback) => {
    if (socket) {
      socket.off('code-update', callback);
    }
  };

  const value = {
    socket,
    connected,
    joinRoom,
    leaveRoom,
    sendCodeChange,
    onCodeChange,
    offCodeChange
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

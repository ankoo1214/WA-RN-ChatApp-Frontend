import React, { createContext } from 'react';
import { socket } from '../utils/socket';
export const SocketContext = createContext(socket);

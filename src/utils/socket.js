import io from 'socket.io-client';
// Replace with your backend server URL
export const socket = io('http://localhost:3000', {
  transports: ['websocket'], // Use websocket for mobile reliability
});

// src/store/websocketStore.ts
import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useWebSocketStore = defineStore('websocket', () => {
    const message = ref('No message received');
    const isConnected = ref(false);
    let ws: WebSocket | null = null;
    let heartbeatInterval: number | undefined;
    let reconnectTimeout: number | undefined;
    const HEARTBEAT_INTERVAL = 30000; // 30 seconds
    const RECONNECT_INTERVAL = 5000;  // 5 seconds

    const connectWebSocket = (url: string, token: string) => {
        ws = new WebSocket(`${url}?token=${encodeURIComponent(token)}`);

        ws.onopen = () => {
            console.log('WebSocket is connected.');
            isConnected.value = true;
            startHeartbeat();
        };

        ws.onmessage = (event) => {
            message.value = event.data;
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket is closed.');
            isConnected.value = false;
            stopHeartbeat();
            scheduleReconnect(url, token);
        };
    };

    const sendMessage = (msg: string) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(msg);
        }
    };

    const closeWebSocket = () => {
        if (ws) {
            ws.close();
        }
    };

    const startHeartbeat = () => {
        heartbeatInterval = setInterval(() => {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({type: 'heartbeat'}));
            }
        }, HEARTBEAT_INTERVAL);
    };

    const stopHeartbeat = () => {
        if (heartbeatInterval) {
            clearInterval(heartbeatInterval);
            heartbeatInterval = undefined;
        }
    };

    const scheduleReconnect = (url: string, token: string) => {
        if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
        }
        reconnectTimeout = setTimeout(() => connectWebSocket(url, token), RECONNECT_INTERVAL);
    };

    return {
        message,
        isConnected,
        connectWebSocket,
        sendMessage,
        closeWebSocket,
    };
});

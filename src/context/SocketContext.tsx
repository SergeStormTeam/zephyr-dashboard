import { createContext, useContext, useEffect, useRef, useState, useCallback} from "react";

type MessageHandler = (payload: any) => void;

interface WebSocketContextType {
    data: Record<string, any>;
    isConnected: boolean;
    send: (type: string, payload?: any) => void;
    subscribe: (type: string, handler: MessageHandler) => () => void;
}

const WebSocketContext = createContext<WebSocketContextType>({
    data: {},
    isConnected: false,
    send: () => {},
    subscribe: () => () => {},
});

const DEBOUNCE_DELAY = 2000;


export const WebSocketProvider = ({ url, children }: { url: string, children: React.ReactNode }) => {
    const [data, setData] = useState<Record<string, any>>({});
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef<WebSocket | null>(null);
    const handlers = useRef<Map<string, Set<MessageHandler>>>(new Map());
    const retryAmount = useRef(0)
    const retryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const stopped   = useRef(false); 
    const connecting = useRef(false);

    const connect = useCallback(() => {
        if (stopped.current) return;
        if (connecting.current) return;

        if (ws.current?.readyState === WebSocket.CONNECTING ||
            ws.current?.readyState === WebSocket.OPEN) return;

        connecting.current = true;
        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
            connecting.current = false;
            setIsConnected(true);
            retryAmount.current = 0
        }

        ws.current.onclose = () => {
            connecting.current = false;
            setIsConnected(false);
            if (stopped.current) return;                   

            retryAmount.current += 1;
            retryTimer.current = setTimeout(connect, DEBOUNCE_DELAY);
        };

        ws.current.onmessage = (event) => {
            const { type, data } = JSON.parse(event.data);

            setData(prev => ({ ...prev, ...data }));

            handlers.current.get(type)?.forEach(h => h(data));
        };

        return () => ws.current?.close();
    }, [url]);

    const send = useCallback((type: string, payload?: any) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ type, ...payload }));
        }
    }, []);

    const subscribe = useCallback((type: string, handler: MessageHandler) => {
        if (!handlers.current.has(type)) {
            handlers.current.set(type, new Set());
        }
        handlers.current.get(type)!.add(handler);

        return () => handlers.current.get(type)?.delete(handler);
    }, []);

    useEffect(() => {
        stopped.current = false;
        connecting.current = false;
        connect();
        return () => {
            stopped.current = true;
            connecting.current = false;
            if (retryTimer.current) clearTimeout(retryTimer.current);
            ws.current?.close();
        };
    }, [connect]);

    return (
        <WebSocketContext.Provider value={{ data, isConnected, send, subscribe }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
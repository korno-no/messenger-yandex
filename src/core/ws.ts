
type MessageType = 'message' | 'ping'| 'get old' ;

export default class WsTransport  {
    private socket: WebSocket;
    private url: string;
    private interval:  ReturnType<typeof setInterval> | undefined;

    constructor(userId: number, chatId: number, token: string) {
        this.url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;
        this.socket = new WebSocket(this.url);
        this.initEventHandlers();
    }

    private initEventHandlers(): void {

        this.socket.addEventListener('open', () => {
            console.log('Connection established');
            this.interval = setInterval(() => this.sendMessage('ping','ping'), 55000)
        });
    
        this.socket.addEventListener('close', (event) => {

            clearInterval(this.interval)

            if (event.wasClean) {
                console.log('Connection closed clear');
            } else {
                console.log('Connection broken');
            }
        
            console.log(`Code: ${event.code} | Reason: ${event.reason}`);
        });
    
        this.socket.addEventListener('message', (event) => {

            console.log('Data received', event.data);
            const data =  JSON.parse(event.data)
            
            if(data.type === 'error' || data.type === 'pong' || data.type ===  'user connected'){
                console.log(data);
            }
            else{
                
                if( Array.isArray(data)){
                    const newMessages = data.reverse();
                    window.store.set({'storeMessages': [...newMessages]})
                }
                else{
                    window.store.set({'storeMessages':[...window.store.getState().storeMessages, data]})
                }
            }

        });
    
        this.socket.addEventListener('error', (event: any) => {
            console.error('Error', event.message);
        });
    }

    waitForConnection(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.socket.readyState === WebSocket.OPEN) {
                resolve();
            } else {
                this.socket.addEventListener('open', () => resolve(), { once: true });
                this.socket.addEventListener('error', (err) => reject(err), { once: true });
            }
        });
    }
    sendMessage(content: string, type: MessageType): void {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(
                JSON.stringify({
                    content,
                    type,
                }));
        } else {
            console.warn('WebSocket is not open. Message not sent.');
        }
    }

    closeConnetion(): void{
        this.socket.close();

        window.store.set({'storeMessages': []})

    }
    
}

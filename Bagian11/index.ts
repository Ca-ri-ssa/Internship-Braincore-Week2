import { v4 as uuidv4 } from 'uuid';

const clientMap = new Map();
let onlineUsers = 0;

const server = Bun.serve<{ username: string }>({
    port: 3000,
    fetch(req, server) {
        if(server.upgrade(req, { 
            data: { username: "User_" + Math.random().toString(16).slice(12) },
         })) {
            return;
        }

        return new Response(Bun.file("./public/index.html"));
    },
    websocket: {
        open(ws) {
            const clientId = uuidv4();
            const username = ws.data.username;

            clientMap.set(ws, { clientId, username });
            console.log(Array.from(clientMap.values()));
            console.log(`Client Connected: ${clientId}`);
            ws.send(`Client Connected: ${username}`);

            onlineUsers++;
            ws.send(`Online Users: ${onlineUsers}`);
            ws.send("Welcome to the server!")

            // ws.subscribe("Welcome");
            // server.publish("Welcome", "Welcome to the server!");

            ws.subscribe("User-Connected");
            server.publish("User-Connected", `${username} - is online`);

            ws.subscribe("broadcastMsg");

            const clientInfoMsg = {
                clientId: clientId,
                username: username,
            };
            ws.send(JSON.stringify(clientInfoMsg));

            const userList = Array.from(clientMap.values()).map(
                (info) => {
                    return {
                        clientId: info.clientId,
                        username: info.username,
                    }
                }
            );
            ws.subscribe("userList");
            server.publish("userList", JSON.stringify(userList));
        },
        close(ws) {
            const clientInfo = clientMap.get(ws) || "unknown";
            const clientId = clientInfo ? clientInfo.clientId: "unknown";
            const username = clientInfo ? clientInfo.username: "unknown";
            console.log(`Client Disconnected: ${clientId}`);
            clientMap.delete(ws);

            onlineUsers--;
            ws.send(`Online Users: ${onlineUsers}`);

            server.publish("User-Connected", `${username} - has left the chat`);

            const userList = Array.from(clientMap.values()).map(
                (info) => info.username
            );
            server.publish("userList", JSON.stringify(userList));
            ws.unsubscribe("See you");
        },
        message(ws, msg) {
            const clientInfo = clientMap.get(ws) || "unknown";
            const clientId = clientInfo ? clientInfo.clientId: "unknown";
            const username = clientInfo ? clientInfo.username: "unknown";
            const ackMsg = ws.send("Message Delivered");

            server.publish("broadcastMsg", JSON.stringify({
                type: "broadcastMsg",
                data: `${username} says: ${msg}`
            }));

            if(ackMsg > 0) {
                console.log(`Acknowledgement sent to client ${clientId}: ${msg}`);
            } else {
                console.error(`Failed to deliver acknowledgement to client ${clientId}: ${msg}`);
            }
        }
    }
})

console.log(`Listening to http://${server.hostname}:${server.port}`);
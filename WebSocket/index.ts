import WebSocket from "ws";
const wss = new WebSocket.Server({ port: 8001 });

//in-memory store of users
interface userType {
  userId: string;
  wsConn: WebSocket;
}

let activeUsers: userType[] = [];
//activeUser = [
//     {
//         userId,
//         wsConn
//     }
// ]

wss.on("connection", async (ws, req) => {
  console.log('connection established');
  ws.on("message", (message: WebSocket.Data) => {
    const data = JSON.parse(message.toString());

    //add new user to server
    if (data.type === "add-new-user") {
      const newUserId = data.userId;
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({
          userId: newUserId,
          wsConn: ws,
        });
        console.log("new user connected", activeUsers);
      }
      //sending response back to the user
      ws.send(JSON.stringify({ type: "get-user", data: activeUsers }));
    } else if (data.type === "disconnect") {
      //remove a user from active users
      activeUsers = activeUsers.filter((user) => user.wsConn !== ws);
      console.log("user-disconnected", activeUsers);
      // send all active users to all users
      broadcast({ type: "get-users", data: activeUsers });
    } else if (data.type === "send-message") {
      // const { recieverId, message } = data;
      const { payload: { message: { recieverId, ...message } } } = data;
      // console.log(recieverId);
      // console.log(message);
      console.log(data);
      console.log('user dhund');

      const user = activeUsers.find((itr) => itr.userId === recieverId);
      console.log('48', user?.userId);

      // console.log("sending message to ", recieverId);
      if (user) {
        console.log('tu kyu ni chlra');
        user.wsConn.send(
          JSON.stringify({ type: "recieve-message", data: message })

        );
      }
    }
  });
});
function broadcast(message: any) {
  activeUsers.forEach((user) => {
    user.wsConn.send(JSON.stringify(message));
  });
}

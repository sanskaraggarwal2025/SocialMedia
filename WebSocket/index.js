const WebSocket = require("ws");
const wss = WebSocket.Server({ port: 8800 });

//in-memory store of users
let activeUsers = [];
//activeUser = [
//     {
//         userId,
//         wsConn
//     }
// ]

wss.on("connection", async (ws, req) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message);

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
      const { recieverId, message } = data;
      const user = activeUsers.find((itr) => itr.userId === recieverId);
      console.log("sending message to ", recieverId);
      if (user) {
        user.wsConn.send(
          JSON.stringify({ type: "recieve-message", data: message })
        );
      }
    }
  });
});
function broadcast(message) {
  activeUsers.forEach((user) => {
    user.wsConn.send(JSON.stringify(message));
  });
}

import React, { forwardRef } from "react";
import "./Message.css";
import { Card, CardContent, Typography, CardActions } from "@material-ui/core";
const Message = forwardRef(({ message, username, timestamp }, ref) => {
  const isUser = username === message.username;
  // const hasTimeStamp = timestamp === message.timestamp.seconds;
  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography
            style={{ color: "rgb(5, 191, 25)" }}
            variant="h6"
            component="p"
            className="text-left"
          >
            {!isUser && `${message.username || "Unknown User"}`}
          </Typography>
          <Typography variant="h6" component="h4">
            {message.message}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography
            variant="subtitle2"
            component="p"
            className="text-right message__timestamp"
          >
            {new Intl.DateTimeFormat("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }).format(
              timestamp === undefined
                ? message.timestamp.seconds * 1000
                : timestamp
            )}
          </Typography>
        </CardActions>
      </Card>
    </div>
  );
});

export function generateColor() {
  return "#" + Math.random().toString(16).substr(-6);
}

export default Message;

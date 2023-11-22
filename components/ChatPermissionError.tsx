import React from "react";
import { Alert, AlertTitle } from "./ui/alert";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const ChatPermissionError = () => {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <p className="font-bold">
        You do not have permission to access this chat
        <hr />
        <span className="font-bold">
          Please contact the admin of this chat to get access to this chat
        </span>
      </p>

      <Link href="/chat" replace>
        <Button className="mt-2" variant="destructive">
          Dismiss
        </Button>
      </Link>
    </Alert>
  );
};

export default ChatPermissionError;

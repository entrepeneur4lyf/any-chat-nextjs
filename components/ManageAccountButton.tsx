import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const ManageAccountButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };
  return isLoading ? (
    <Loader2 className="animate-spin"/>
  ) : (
    <button type="submit" onClick={onClick}>
      Manage Billing
    </button>
  );
};

export default ManageAccountButton;

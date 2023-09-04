import { currentUser, useAuth } from "@clerk/nextjs";
import React from "react";

const HomePage = async () => {
  const user = await currentUser();
  return <div>{user?.id}</div>;
};

export default HomePage;

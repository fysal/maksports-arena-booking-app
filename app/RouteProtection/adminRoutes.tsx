/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useContext, useEffect } from "react";
import { UserContext } from "../lib/context";
import { checkCurrentUserExists } from "../lib/firebase/auth";
import PageLoading from "../components/pageLoading";
import { useRouter } from "next/navigation";

const WithAdminRoutes = (Component: any) => {
  const WithAdminHook = (props: any) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const router = useRouter();
    useEffect(() => {
      if (typeof currentUser === "undefined")
        checkCurrentUserExists(setCurrentUser);
    });

    if (typeof currentUser === "undefined") return <PageLoading />;
    else if (currentUser === null || currentUser?.isAnonymous)
      return router.replace("/");
    else if (currentUser && currentUser.accountType === "customer")
      return router.push("/team-management");
    else if (currentUser && currentUser.accountType === "admin")
      return <Component {...props} />;
    else return router.replace("/");
  };

  return WithAdminHook;
};

export default WithAdminRoutes;

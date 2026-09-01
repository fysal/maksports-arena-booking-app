"use client";

import { useContext, useEffect } from "react";
import { UserContext } from "../lib/context";
import { checkCurrentUserExists } from "../lib/firebase/auth";
import PageLoading from "../components/pageloading";
import { useRouter } from "next/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */

const WithAuthRoutes = (Component: any) => {
  const WithAuthHook = (props: any) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const router = useRouter();

    useEffect(() => {
      if (typeof currentUser === "undefined") {
        checkCurrentUserExists(setCurrentUser);
      }
    });

    if (typeof currentUser === "undefined") return <PageLoading />;

    if (currentUser === null || currentUser.isAnonymous) {
      return <Component {...props} />;
    } else {
      return router.replace("/team-management");
    }
  };

  return WithAuthHook;
};

export default WithAuthRoutes;

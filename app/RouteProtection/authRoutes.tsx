"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext, useEffect } from "react";
import { UserContext } from "../lib/context";
import { useRouter } from "next/navigation";
import { checkCurrentUserExists } from "../lib/firebase/auth";
import PageLoading from "../components/pageLoading";

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
      return router.replace("/");
    }
  };

  return WithAuthHook;
};

export default WithAuthRoutes;

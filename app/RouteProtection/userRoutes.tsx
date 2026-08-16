/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useContext, useEffect } from "react";
import { UserContext } from "../lib/context";
import { checkCurrentUserExists } from "../lib/firebase/auth";
import { useRouter } from "next/navigation";
import PageLoading from "../components/pageLoading";

export default function WithUserRoutes(Component: any) {
  const WithUserHook = (props: any) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const router = useRouter();

    useEffect(() => {
      if (typeof currentUser === "undefined")
        checkCurrentUserExists(setCurrentUser);
    }, []);

    if (typeof currentUser === "undefined") return <PageLoading/>;
    else if (currentUser === null || currentUser.isAnonymous)
      //redirect to login
      router.replace("/auth?act=login");
    else if (currentUser && currentUser.accountType === "admin")
      return router.push("/dashboard");
    else return <Component {...props} />;
  };

  return WithUserHook;
}

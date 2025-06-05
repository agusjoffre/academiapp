import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <div>
      LOGIN PAGE
      <Link href="/">
        <Button>HOME</Button>
      </Link>
      <Link href="/register">
        <Button>REGISTER</Button>
      </Link>
    </div>
  );
};

export default LoginPage;

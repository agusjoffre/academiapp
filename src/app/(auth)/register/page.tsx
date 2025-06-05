import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <div>
      RegisterPage
      <Link href="/">
        <Button>HOME</Button>
      </Link>
      <Link href="/login">
        <Button>LOGIN</Button>
      </Link>
    </div>
  );
};

export default RegisterPage;

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

const WelcomePage = (props: Props) => {
  return (
    <div>
      <Link href="/">
        <Button>Home</Button>
      </Link>
    </div>
  );
};

export default WelcomePage;

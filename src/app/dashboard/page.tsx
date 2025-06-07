import React from "react";
import { Dashboard } from "@/components/dashboard/Dashboard";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Dashboard />
    </div>
  );
};

export default DashboardPage;

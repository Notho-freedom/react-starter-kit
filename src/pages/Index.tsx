import { Navigate } from "react-router-dom";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";

const Index = () => {
  const workflow = useOpenRideWorkflow();

  return <Navigate replace to={workflow.getNextRoute()} />;
};

export default Index;

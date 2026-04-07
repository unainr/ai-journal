import { DashboardView } from "@/modules/dashboard/ui/view/dashboard-view"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const NewPage = async () => {
   const { userId } = await auth();
      if (!userId) redirect("/sign-in");
  return (
    <><DashboardView/></>
  )
}

export default NewPage
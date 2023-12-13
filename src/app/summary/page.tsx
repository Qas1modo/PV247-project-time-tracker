import { type Records } from "@/types/record";
import SummaryPage from "@/components/SummaryPage";
import { Metadata } from "next";
import { getUserRecords } from "@/server/Record/record";
import { getServerAuthSession } from "@/server/auth";
import { Activity, Category } from "@prisma/client";
import { getActivitiesByUser } from "@/server/Activity/activity";
import { getCategories } from "@/server/Category/category";

export const metadata: Metadata = {
  title: 'Summary',
}

const Summary = async () => {
  const status = await getServerAuthSession();
  if (!status) {
    return <div>Not authenitcated!</div>
  }

  let records: Records[] = await getUserRecords({ userId: status.user.id });
  let activities: Activity[] = await getActivitiesByUser({ userId: status.user.id });
  let categories: Category[] = await getCategories();
  return (<SummaryPage records={records} activities={activities} categories={categories}/>);
}

export default Summary;
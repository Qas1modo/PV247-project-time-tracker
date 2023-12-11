import Records from '@/components/Records';
import { getActivityById } from '@/server/Activity/activity';
import { getServerAuthSession } from '@/server/auth';

const ActvityPage = async ({ params }: { params: { id: string } }) => {
    const status = await getServerAuthSession();
    if (!status) {
        return <div>Unauthorized</div>
    }
    let activityId = Number(params.id);
    if (Number.isNaN(activityId)) {
        return <div>Invalid parameter!</div>;
    }
    let activityName = (await getActivityById({id: activityId, userId: status?.user.id }))?.name ??  "";
    return (
        <div>
            <Records activityId={activityId} activityName={activityName}/>
        </div>
    );
};

export default ActvityPage;
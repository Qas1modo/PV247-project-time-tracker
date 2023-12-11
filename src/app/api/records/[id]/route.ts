import { getRecordsByActivityId } from "@/server/Record/record";

import { getServerAuthSession } from "@/server/auth";

export const GET = async ( req: Request,
    { params }: { params: { id: string }}) => {
    let activityId = Number(params.id);
    if (Number.isNaN(activityId)) {
        return new Response(JSON.stringify(null), {
            status: 400,
            statusText: "Bad Request",
        });
    }
    const status = await getServerAuthSession();
    if (!status) {
        return new Response(JSON.stringify(null), {
            status: 403,
            statusText: "Unauthorized",
        });
    }
    let data = null;
    data = await getRecordsByActivityId({ activityId, userId: status.user.id });
    return new Response(JSON.stringify(data), {
        status: 200,
    });
};
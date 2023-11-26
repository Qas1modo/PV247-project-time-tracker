import { getActivityById } from '@/server/Activity/activity';

export const GET = async (
	req: Request,
	{ params }: { params: { id: number } }
) => {
	const data = await getActivityById({ id: params.id });
    if (data === null) {
        return new Response(JSON.stringify(data), {
            status: 400
        });
    }
	return new Response(JSON.stringify(data), {
		status: 200
	});
};

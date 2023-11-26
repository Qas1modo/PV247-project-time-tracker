import { getCategoryById } from '@/server/Category/category';

export const GET = async (
	req: Request,
	{ params }: { params: { id: number } }
) => {
	const data = await getCategoryById({ id: params.id });
    if (data.category === null) {
        return new Response(JSON.stringify(data.category), {
            status: 400
        });
    }
	return new Response(JSON.stringify(data.category), {
		status: 200
	});
};
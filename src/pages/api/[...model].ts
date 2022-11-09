import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../utils/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { model }: any = req.query
    const [entity, operation]: string[] = model

    switch (operation) {
        case 'lst':
            try {
                const response = await (prisma as any)[entity].findMany()
                res.status(200).json(response)

            } catch (error: any) {
                if (error) res.status(error.response.status).send(error.response.data);
            }
            break;
        case 'new':
            try {
                const response = await (prisma as any)[entity].create({
                    data: req.body
                })
                res.status(201).json(response)

            } catch (error: any) {
                if (error) res.status(error.response.status).send(error.response.data);
            }
            break;
        case 'udt':
            try {
                const response = await (prisma as any)[entity].update({
                    where: {
                        id: req.body.id,
                    },
                    data: req.body,
                })
                res.status(200).json(response)

            } catch (error: any) {
                if (error) res.status(error.response.status).send(error.response.data);
            }
            break;
        case 'del':
            try {
                const response = await (prisma as any)[entity].delete({
                    where: {
                        id: req.body.id
                    }
                })
                res.status(200).json(response)

            } catch (error: any) {
                if (error) res.status(error.response.status).send(error.response.data);
            }
            break;

        default:
            try {
                const response = await (prisma as any)[entity].findUnique({
                    where: {
                        id: operation
                    }
                })
                res.status(200).json(response)

            } catch (error: any) {
                if (error) res.status(error.response.status).send(error.response.data);
            }

            break;
    }
}

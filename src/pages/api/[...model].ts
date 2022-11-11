import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../utils/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { model }: any = req.query
    let [entity, operation]: string[] = model

    entity = entity.charAt(0).toUpperCase() + entity.slice(1);

    const handleError = (error: any) => {
        console.log(error, entity, operation)
        // if (error) res.status(error.response.status).send(error.response.data);
    }

    switch (operation) {
        case 'lst':
            try {
                const response = await (prisma as any)[entity].findMany()
                res.status(200).json(response)

            } catch (error) {
                handleError(error)
            }
            break;
        case 'new':
            try {
                const response = await (prisma as any)[entity].create({
                    data: req.body
                })
                res.status(201).json(response)
            } catch (error) {
                handleError(error)
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

            } catch (error) {
                handleError(error)
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

            } catch (error) {
                handleError(error)
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

            } catch (error) {
                handleError(error)
            }
            break;
    }
}

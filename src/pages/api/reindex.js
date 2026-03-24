import { index } from '../../utils/indexer';

export const runtime = 'edge';

export default async function handler(req, res) {
    try {
        const result = await index();
        res.status(200).send({ result });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'failed to fetch data' });
    }
}

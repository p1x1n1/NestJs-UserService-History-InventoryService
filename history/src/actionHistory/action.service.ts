import { ActionHistory } from "./actionHistory.model";
import { AppDataSource } from "../db";
import { Request, Response } from "express";

const actionHistoryRepository = AppDataSource.getRepository(ActionHistory);

class ActionHistoryService {
    async getHistory(req: Request, res: Response) {
        const { shop_id, plu, date_from, date_to, action, page = 1, pageSize = 10 } = req.query;
        const query = actionHistoryRepository.createQueryBuilder('action_history');

        if (shop_id) {
            query.andWhere('action_history.shop_id = :shop_id', { shop_id });
        }
        if (plu) {
            query.andWhere('action_history.plu = :plu', { plu });
        }
        if (date_from && date_to) {
            query.andWhere('action_history.date_ BETWEEN :date_from AND :date_to', { date_from, date_to });
        }
        if (action) {
            query.andWhere('action_history.action = :action', { action });
        }

        const history = await query
        .skip((Number(page) - 1) * Number(pageSize)) // Пропустить записи для предыдущих страниц
        .take(Number(pageSize)) 
        .getMany(); 

        res.json(history);
    };
    async saveActionToHistory(message) {
        const { action, plu, shop_id, date_, details } = JSON.parse(message);
        console.log( JSON.parse(message),'\n',message)

        const actionHistory = actionHistoryRepository.create({
            action,
            plu: plu || null, 
            shop_id: shop_id || null,     
            date_: date_ ? new Date(date_) : new Date(),
            details: details || null
        });

        // Сохраняем объект в базу данных
        await actionHistoryRepository.save(actionHistory);

        console.log(`Action saved to history: ${message}`);
    };
}

export default new ActionHistoryService();
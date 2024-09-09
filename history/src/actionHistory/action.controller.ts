import { Request, Response } from "express";
import ActionHistoryService from "./action.service";
import { consumeMessage } from "../rabbitmq";


class ActionHistoryController {
    async getHistory(req: Request, res: Response) {
        try {
            await ActionHistoryService.getHistory(req, res);
        } catch (error) {
            console.error('Error in controller getHistory:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async saveActionToHistory(message: string) {
        try {
            await ActionHistoryService.saveActionToHistory(message);
        } catch (error) {
            console.error('Error in controller saveActionToHistory:', error);
        }
    }

    async startConsuming() {
        try {
            await consumeMessage('actions-to-history', this.saveActionToHistory);
        } catch (error) {
            console.error('Error in controller startConsuming:', error);
        }
    }
}

export default new ActionHistoryController();

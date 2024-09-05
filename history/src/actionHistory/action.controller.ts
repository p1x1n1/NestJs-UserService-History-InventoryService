import { Request, Response } from "express";
import ActionHistoryService from "./action.service";
import {consumeMessage} from "../rabbitmq";

class ActionHistoryContoller {
    async getHistory(req: Request, res: Response){
        return ActionHistoryService.getHistory(req, res);
    }

    async saveActionToHistory(message) {
        ActionHistoryService.saveActionToHistory(message); 
    };

    startConsuming = async () => {
        await consumeMessage('actions-to-history', this.saveActionToHistory);
    };

}

export default new ActionHistoryContoller();
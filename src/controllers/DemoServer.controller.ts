import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';

@Controller('api/say-hello')
class DemoController {

    public static readonly SUCCESS_MSG = 'hello ';

    @Get(':name')
    private sayHello(req: Request, res: Response) {
        try {
            const { name } = req.params;
            if (name === 'make_it_fail') {
                throw Error('User triggered failure');
            }
            Logger.Info(DemoController.SUCCESS_MSG + name);
            return res.status(200).json({
                message: DemoController.SUCCESS_MSG + name,
            });
        } catch (err) {
            Logger.Err(err, true);
            return res.status(400).json({
                error: err.message,
            });
        }
    }
}

export default DemoController;
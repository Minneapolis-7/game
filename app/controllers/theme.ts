import {Request, Response} from 'express';
import themeService from '../service/themeService';

export class ThemeAPI {
    // @validation({/* rules */}) // Можно использовать декораторы, можно передавать в middlewares
  public static create = async (request: Request, response: Response) => {
        const {body} = request;
        /* Делаем что-то с данными */
        await themeService.create(body); // Можно обернуть в try..catch
  }

  public static find = async (request: Request, response: Response) => {
        const {body} = request;
        /* Делаем что-то с данными */
        await themeService.find(body); // Можно обернуть в try..catch
  }
} 
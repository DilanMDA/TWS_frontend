import { HttpMethods } from '../application/constants/HttpMethods';
import axiosInstance from './AxiosInstance';

export interface BaseFetchModel<T>{
    count:number;
    rows:T[];
}

export default class BaseApi {
    public async getAsync<T>(
        endPoint: string,
        queryStringParameters?: { [key: string]: string | number },
    ): Promise<T> {
        return await this.executeAsync<T>(HttpMethods.Get, endPoint, queryStringParameters, undefined);
    }

    public async postAsync<T>(
        endPoint: string,
        queryStringParameters?: { [key: string]: string | number },
        // eslint-disable-next-line @typescript-eslint/ban-types
        data?: {},
    ): Promise<T> {
        return await this.executeAsync<T>(HttpMethods.Post, endPoint, queryStringParameters, data);
    }

    public async putAsync<T>(
        endPoint: string,
        queryStringParameters?: { [key: string]: string | number },
        // eslint-disable-next-line @typescript-eslint/ban-types
        data?: {},
    ): Promise<T> {
        return await this.executeAsync<T>(HttpMethods.Put, endPoint, queryStringParameters, data);
    }

    public async patchAsync<T>(
        endPoint: string,
        queryStringParameters?: { [key: string]: string | number },
        // eslint-disable-next-line @typescript-eslint/ban-types
        data?: {},
    ): Promise<T> {
        return await this.executeAsync<T>(HttpMethods.Patch, endPoint, queryStringParameters, data)
    }

    public async deleteAsync<T>(
        endPoint: string,
        queryStringParameters?: { [key: string]: string | number },
        // eslint-disable-next-line @typescript-eslint/ban-types
        data?: {},
    ): Promise<T> {
        return await this.executeAsync<T>(HttpMethods.Delete, endPoint, queryStringParameters, data);
    }

    public async executeAsync<T>(
        method: HttpMethods,
        endPoint: string,
        queryStringParameters?: { [key: string]: string | number },
        // eslint-disable-next-line @typescript-eslint/ban-types
        data?: {},
    ): Promise<T> {
        const axiosPromise = await axiosInstance.request<T>({
            method: method,
            url: endPoint,
            params: queryStringParameters,
            data: data,
        });

        return axiosPromise.data;
    }
}

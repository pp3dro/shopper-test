import {AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource} from "axios";
import axios from 'axios';
import {serialize} from "object-to-formdata";
import { httpProduct } from "../index";

type RequestData = {
    sheet: File
}

export type ProductError = {
    type: string
    message: string
}
  
export type ValidatedData = {
    code: number
    name: string
    price: number
    newPrice: number
    errors: ProductError[]
}

export type RequestResponse = {
    status: 'success' | 'error'
    message: string
    data?: {
        isValid: boolean
        products: ValidatedData[]
    }
}

class PricesResource {

    private cancelRequest: CancelTokenSource | null = null;
    protected resource: string = 'prices';

    constructor(protected http: AxiosInstance) {}

    validate(data: RequestData): Promise<AxiosResponse<RequestResponse>> {
        if (this.cancelRequest) {
            this.cancelRequest.cancel('validate request cancelled');
        }
        this.cancelRequest = axios.CancelToken.source();

        const config: AxiosRequestConfig = {
            cancelToken: this.cancelRequest.token
        };
        const sendData = serialize(data, {booleansAsIntegers: true});
        return this.http.post<RequestResponse>(`${this.resource}/validate`, sendData, config)
    }

    update(data: RequestData, config?: AxiosRequestConfig): Promise<AxiosResponse<RequestResponse>> {
        const sendData = serialize(data, {booleansAsIntegers: true});
        return this.http.post<RequestResponse>(`${this.resource}/update`, sendData, config)
    }

    isCancelledRequest(error: any) {
        return axios.isCancel(error);
    }
}

const pricesResource = new PricesResource(httpProduct);

export default pricesResource;
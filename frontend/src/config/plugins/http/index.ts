import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios";

export const httpProduct = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_PRODUCT_API
});

const instances = [httpProduct];

export function addGlobalRequestInterceptor(
    onFulfilled?: (value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>,
    onRejected?: (error: any) => any
) {
    const ids: number[] = [];
    for (let i of instances) {
        const id = i.interceptors.request.use(onFulfilled, onRejected);
        ids.push(id);
    }
    return ids;
}

export function removeGlobalRequestInterceptor(ids: number[]) {
    ids.forEach(
        (id, index) => instances[index].interceptors.request.eject(id)
    )
}

export function addGlobalResponseInterceptor(
    onFulfilled?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
    onRejected?: (error: AxiosError) => any
) {
    const ids: number[] = [];
    for (let i of instances) {
        const id = i.interceptors.response.use(onFulfilled, onRejected);
        ids.push(id);
    }
    return ids;
}

export function removeGlobalResponseInterceptor(ids: number[]) {
    ids.forEach(
        (id, index) => instances[index].interceptors.response.eject(id)
    )
}
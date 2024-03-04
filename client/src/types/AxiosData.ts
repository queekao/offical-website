export type ResponseData<T> = {
    datas: T | null
    error: Error | null
    loading: boolean
}
export interface About {
    title: number;
    video_url: string;
    cards: any;
}
export interface Card {
    id: number
    content: string
    image: string
}


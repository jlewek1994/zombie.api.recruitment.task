import item from './item';

export default interface zombie {
    id?: number,
    name: string,
    items: Array<item>,
    creationDate: string
}
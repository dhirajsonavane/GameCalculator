export type Set = {
    item1: string,
    item2: string,
    item3: string,
    item4: string,
    item5: string,
    item6: string,
    keystone: string,
    summoner: string,
    runes: string[],
}

export type GameCalculatorType = {
    set1: Set,
    set2: Set,
    armour: number | null,
    gametime: number | null,
    rating: number | null
}

export type Items = {
    Item: string,
    Url: string
}

export enum GameCalculatorActionKind {
    UPDATE = 'UPDATE',
}

export interface GameCalculatorAction {
    type: GameCalculatorActionKind;
    payload: any;
}
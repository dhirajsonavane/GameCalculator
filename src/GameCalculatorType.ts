export type Set = {
    item1: Items,
    item2: Items,
    item3: Items,
    item4: Items,
    item5: Items,
    item6: Items,
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

export type KeyStoneType = {
    Keystone: string,
    Url: string
}

export type SummonersType = {
    Summoners: string,
    Url: string
}

export enum GameCalculatorActionKind {
    UPDATE_STATE1 = 'UPDATE_STATE1',
    UPDATE_STATE2 = 'UPDATE_STATE2',
    ARMOUR = "ARMOUR",
    RATING = "RATING",
    GAMETIME = "GAMETIME",
    KEYSTONE1 = "KEYSTONE1",
    SUMMONER1 = "SUMMONER1",
    KEYSTONE2 = "KEYSTONE2",
    SUMMONER2 = "SUMMONER2",
}

export interface GameCalculatorAction {
    type: GameCalculatorActionKind;
    payload: any;
}
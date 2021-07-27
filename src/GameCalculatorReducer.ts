import { GameCalculatorAction, GameCalculatorActionKind, GameCalculatorType } from "./GameCalculatorType";

export const GameCalculatorReducer = (state: any, action: GameCalculatorAction) => {
    const { type, payload } = action;
    switch (type) {
        case GameCalculatorActionKind.UPDATE_STATE1:
            return {
                ...state,
                set1: {
                    item1: action.payload[0],
                    item2: action.payload[1],
                    item3: action.payload[2],
                    item4: action.payload[3],
                    item5: action.payload[4],
                    item6: action.payload[5],
                }
            }
        case GameCalculatorActionKind.UPDATE_STATE2:
            return {
                ...state,
                set2: {
                    item1: action.payload[0],
                    item2: action.payload[1],
                    item3: action.payload[2],
                    item4: action.payload[3],
                    item5: action.payload[4],
                    item6: action.payload[5],
                }
            }
        case GameCalculatorActionKind.ARMOUR:
            return {
                ...state,
                armour: action.payload,
            }
        case GameCalculatorActionKind.RATING:
            return {
                ...state,
                rating: action.payload,
            }
        case GameCalculatorActionKind.GAMETIME:
            return {
                ...state,
                gametime: action.payload,
            }
        case GameCalculatorActionKind.KEYSTONE1:
            return {
                ...state,
                set1: { ...state.set1, keystone: action.payload }
            }
        case GameCalculatorActionKind.SUMMONER1:
            return {
                ...state,
                set1: { ...state.set1, summoner: action.payload }
            }
        case GameCalculatorActionKind.KEYSTONE2:
            return {
                ...state,
                set2: { ...state.set2, keystone: action.payload }
            }
        case GameCalculatorActionKind.SUMMONER2:
            return {
                ...state,
                set2: { ...state.set2, summoner: action.payload }
            }
        default:
            return state;
    }
};
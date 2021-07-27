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
        default:
            return state;
    }
};
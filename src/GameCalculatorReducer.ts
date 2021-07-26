import { GameCalculatorAction, GameCalculatorActionKind, GameCalculatorType } from "./GameCalculatorType";

export const GameCalculatorReducer = (state: GameCalculatorType, action: GameCalculatorAction) => {
    const { type, payload } = action;

    switch (type){
        case GameCalculatorActionKind.UPDATE:
            return{
                ...state,
                payload
            }
        default:
      return state;
    }
};
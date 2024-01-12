import StaticAction from "~/packages/app/actions/StaticAction";
import {times, random} from "lodash";

/**
 * this class is a single action class that returns true if user has the provided permission into the static method execute
 * otherwise, it returns false
 */
export default class GenerateRandomToken extends StaticAction {
    static execute(chars_number: number = 32): string {
        return times(chars_number, () => random(15).toString(16)).join('');
    }
}
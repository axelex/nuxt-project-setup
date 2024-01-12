import {reduce, isNull, isUndefined, isArray} from 'lodash'
import StaticAction from "~/packages/app/actions/StaticAction";

export default class ObjectToQuery extends StaticAction {
    static execute(obj?: any): string {
        var qs = reduce(obj, function (result, value, key) {
            if (!isNull(value) && !isUndefined(value)) {
                if (isArray(value)) {
                    result += reduce(value, function (result1, value1) {
                        if (!isNull(value1) && !isUndefined(value1)) {
                            result1 += key + '[]=' + value1 + '&';
                            return result1
                        } else {
                            return result1;
                        }
                    }, '')
                } else {
                    result += key + '=' + value + '&';
                }
                return result;
            } else {
                return result
            }
        }, '').slice(0, -1);
        return qs;
    }
}
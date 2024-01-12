import GetFileNameFromPath from "~/packages/app/actions/utility/GetFileNameFromPath";
import StaticAction from "~/packages/app/actions/StaticAction";

/**
 * this class is a single action class that returns true if user has the provided permission into the static method execute
 * otherwise, it returns false
 */
export default class StripFilePath extends StaticAction {
    static execute(filepath?: string): string|false {
        filepath = filepath || ''
        if(filepath) {
            return filepath.replace(GetFileNameFromPath.execute(filepath), '');
        }

        return filepath;
    }
}
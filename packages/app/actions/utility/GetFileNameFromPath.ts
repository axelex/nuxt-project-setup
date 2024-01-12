import StaticAction from "~/packages/app/actions/StaticAction";

/**
 * this class is a single action class that returns true if user has the provided permission into the static method execute
 * otherwise, it returns false
 */
export default class GetFileNameFromPath extends StaticAction {
    static execute(filepath?: string): string {
        filepath = filepath || ''
        if(filepath) {
            const index = filepath.lastIndexOf('/');
            return filepath.substring(index + 1);
        }

        return filepath;
    }
}
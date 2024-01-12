import BaseModel from "~/packages/core/models/BaseModel";

class Model extends BaseModel {
    casts() {
        return {

        };
    }

    // define any general models functionality bellow

    /**** GETTERS ****/

    /**
     * Getter example use case
     */
    // @ts-ignore
    // get exerpt(): string {
    //   if (this.description) {
    //     return this.description.substring(0, 30) + "...";
    //   }
    // }
    /**** GETTERS END ****/
    /**
     * uncomment this method in the model, if current model has different, key name, than
     * the default ('id')
     */
    // getDefaultOptions(): ModelOptions {
    //     return {
    //         identifier: 'post_id'
    //     }
    // }

}

// @ts-ignore
export default Model
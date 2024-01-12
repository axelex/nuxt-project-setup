import Base from '~/packages/core/models/Base'
import BaseCollection from '~/packages/core/models/BaseCollection'
import { Casting } from '~/packages/core/models/Casting' // do not remove this as it is loaded dynamically
import { isObject, get, set, unset } from 'lodash'

/**
 * default model Options
 * for now we only have the identifier,
 * but other options might come in handy
 * in the future
 */
const defaultOptions = {
  // model key name
  identifier: 'id',
}

class BaseModel extends Base {
  private empty: boolean = false
  /**
   * Intantiating model
   *
   * @param props
   */
  constructor(data?: object | object[] | null) {
    super(data)

    if (this.getData(data)) {
      this.empty = false
      this.setModelProperties(this.getData(data))
    } else {
      this.empty = true
      this.init()
    }
  }

  /** ACCESSORS **/

  /**
   * setting default Model Options
   * (stored the identifier (model key name) in an object because other options might be needed in the future)
   *
   * @protected
   */
  protected get _options_(): ModelOptions {
    return this.getDefaultOptions()
  }

  /**
   * Getting the identifier of instantiated model
   * default is 'id' if not specifically changed in child model class by overriding the 'getDefaultOptions' method
   */
  get _uid(): string {
    // @ts-ignore
    return this[this._options_.identifier]
  }

  /** End ACCESSORS **/


  /**
   * Define model Properties based on passed object to model class
   *
   * @param props
   */
  // @ts-ignore
  setModelProperties(props): void {
    // set property to object
    const casts = this.casts()
    for (let k in props) {
      if (k in props) {
        if (k in casts) {
          // convert property if in casts()
          // @ts-ignore
          this[k] = this.convert(casts[k], props[k])
        } else {
          // raw value for property if not in casts()
          // @ts-ignore
          this[k] = props[k]
        }
      }
    }
  }

  /**
   * used for casting properties with default values if necessary
   * Method should be overridden in the Model child class that extends the BaseModel
   */
  casts() {
    return {}
  }

  /**
   * This returns the default casting that will be used for converting Models values
   * If there is a complex conversion functionality, that doesn't exist in the default Casting Class,
   * override this method in the Model child class that extends the BaseModel, with a new created Caster (UsersCasting),
   * that extends the default Casting Class and respects the same structure (single public method is `execute` and it is static)
   */
  getCaster() {
    return Casting
  }

  /**
   * retrieve default options
   * use this method to override existent options
   */
  getDefaultOptions(): ModelOptions {
    return defaultOptions
  }

  /**
   * All values of a model class must be initialized
   * the initialization is made by the properties defined in the 'casts()' method
   */
  init() {
    const casts = this.casts()
    for (let property in casts) {
      if (property in casts) {
        // @ts-ignore
        let cast = casts[property]
        // @ts-ignore
        this[property] = this.convert(cast)
      }
    }
  }

  /**
   * This method uses Casting class to convert properties defined in the casts() method of instantiated Model
   * according to defined values
   *
   * Note that the only allowed types excepting the special types (Models and Collections), are the ones that can be associated
   * with a static method in Casting.ts
   *
   * @param value_type
   * @param value
   */
  convert(
    value_type: string | BaseModel | BaseCollection,
    value: any = null
  ): any {

    // if the type of the value is child of BaseModel, we directly instantiate the type
    // @ts-ignore
    if (value_type['prototype'] instanceof BaseModel) {
      // @ts-ignore
      let model = new value_type()

      // if a value exists, it must be of type object and we need to set the model properties on instantiated class
      if (value && isObject(value)) {
        model.setModelProperties(value)
      }

      return model
    }

    // if the type of the value is child of BaseCollection, we directly instantiate the type
    // @ts-ignore
    if (value_type['prototype'] instanceof BaseCollection) {
      // @ts-ignore
      let collection = new value_type()

      // if we have a value, we add it to the previously defined Collection
      if (value) {
        collection.add(value)
      }

      return collection
    }

    // in case the value_type is not a special type (model or collection),
    // we just use the Casting class static methods for casting properties values
    // @ts-ignore
    return this.getCaster().execute(value_type, value)
  }

  isEmpty() {
    return this.empty
  }

  getModelName() {
    return this.constructor.name;
  }

  /**
   * Use this or overwrite it, in order to control what the server gets from the model
   * @param also_exclude
   */
  getModelData(also_exclude?: string[], exlude_from_collection?: Boolean): object {
    const casts = this.casts()
    const model_data = {}

    // by default only send existent casts
    for (let k in casts) {

      let value = get(this, k)
      // console.log(k, value);

      if (value === undefined || value === null || value === '' || (value instanceof BaseCollection && value.isEmpty()) || (value instanceof BaseModel && value.isEmpty())) {
        // If any of the above conditions are true, the 'continue' statement is executed,
        // which skips the current iteration and jumps to the next iteration in the loop.
        continue;
      }

      if (value && Object.getPrototypeOf(value) instanceof BaseModel) {
        set(model_data, k, value.getModelData())
      } else if (value && Object.getPrototypeOf(value) instanceof BaseCollection) {
        let collectionArray: object[] = []
        value.forEach((model: BaseModel) => {
          // call 'model.getModelData()' and push the result into 'collectionArray' if value holds collection of models and check if thats a model and call getModelData().
          //In some instances we are passing direct objects where we should skip getModelData() as it is an object without casts props
          // TODO - remove this terneory after we find a solution for multiselect
          Object.getPrototypeOf(model) instanceof BaseModel ? collectionArray.push(model.getModelData()) : collectionArray.push(model)
        })
        set(model_data, k, collectionArray)
      } else {
        set(model_data, k, value)
      }
    }

    // getters also need to be handled in this method, if they are marked to be sent to the server
    // (the marking is made by adding them to the _getters_list property)
    if(this._getters_list) {
      for (let k in this._getters_list) {
        let getter:any = this._getters_list[k]
        // @ts-ignore
        model_data[getter] = get(this, [getter])
      }
    }

    // adds ability to exclude fields from casts
    if (also_exclude) {
      also_exclude.forEach((exclude) => {
        //checking if exclude_from_collection is false only remove from main model 
        if (!exlude_from_collection) {
          unset(model_data, exclude)
        }
        //checking if exclude_from_collection is true and if model_data key is an array and if yes removing exclude key from that array of objects as well
        if (exlude_from_collection) {
          Object.values(model_data).forEach(value => {
            if (Array.isArray(value)) {
              // If the value is an array, loop through its elements
              value.forEach(obj => unset(obj, exclude));
            }
          });
        }
      })
    }

    return model_data
  }
}

export default BaseModel

/**
 * the interface ModelOptions must stick to
 */
export interface ModelOptions {
  identifier: string
}

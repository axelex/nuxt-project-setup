import Base from '~/packages/core/models/Base'
import BaseModel from '~/packages/core/models/BaseModel'
import lodash from 'lodash'
const {
  find,
  findIndex,
  map,
  filter,
  get,
  size,
  isArray,
  isPlainObject,
  has,
  set,
  values,
  unset,
  remove
} = lodash

class BaseCollection extends Base {
  /**
   * this will hold all models
   */
  models: BaseModel[] = []
  /**
   * Data will hold and object or array of objects that will be converted in models
   *
   * @param data
   */
  constructor(data?: object | object[] | null) {
    super(data)

    if (this.getData(data)) {
      this.add(this.getData(data))
    }
  }

  /**
   * This is the method that returns the model
   * Override this in each entity that extends the BaseModel and return the correct model
   */
  model(): typeof BaseModel {
    return BaseModel
  }

  /**
   * Adds a model to this collection.
   *
   * This method returns a single model if only one was given, but will return
   * an array of all added models if an array was given.
   *
   * @param {BaseModel|Array|Object} model Adds a model instance or plain object,
   *                                   or an array of either, to this collection.
   *                                   A model instance will be created and
   *                                   returned if passed a plain object.
   *
   * @returns {BaseModel|Array} The added model or array of added models.
   */
  add(model: BaseModel[]): BaseModel[]
  add(model?: BaseModel | Partial<BaseModel> | Record<string, any>): BaseModel
  add(
    model?: BaseModel | BaseModel[] | Partial<BaseModel> | Record<string, any>
  ): BaseModel | BaseModel[] | Partial<BaseModel> | Record<string, any> | void {
    // If given an array, assume an array of models and add them all.

    if (isArray(model)) {
      // return filter(map(model as BaseModel[], this.add))
      return (model as BaseModel[]).forEach((v, k) => this.add(v))
    }

    // Objects should be converted to model instances first, then added.
    if (isPlainObject(model)) {
      return this.add(
        this.createModel(model as Partial<BaseModel> | Record<string, any>)
      )
    }

    // Make sure we don't add the same model twice.
    if (this.hasModel(model as BaseModel)) {
      return
    }

    // Add the model instance to this collection.
    this.models.push(model as BaseModel)
    this.onAdd(model as BaseModel)

    // We're assuming that the collection is not loading once a model is added.
    // Vue.set(this, 'loading', false)

    return model
  }

  /**
   * @return {Boolean} true if this collection already has the model
   */
  hasModel(model: BaseModel): boolean {
    return this.models.filter(v => v._uid == model._uid).length > 0
  }

  /**
   * Create a new model of this collection's model type.
   *
   * @param {Object} attributes
   *
   * @returns {BaseModel} A new instance of this collection's model.
   */
  createModel(attributes: Record<string, any>): Record<string, any> {
    return new (this.model())(attributes)
  }

  /**
   * Called when a model has been added to this collection.
   *
   * @param {BaseModel} model
   */
  onAdd(model: BaseModel): void { }

  /**
   * Called when a model has been added to this collection.
   *
   * @param {BaseModel} model
   */
  onRemove(model: BaseModel): void { }

  /**
   * Creates a copy of this collection. Model references are preserved so
   * changes to the models inside the clone will also affect the subject.
   *
   * @returns {BaseCollection}
   */
  clone(): BaseCollection {
    return new (this.constructor as typeof BaseCollection)(this.models)
  }

  /**
   * Returns the number of models in this collection.
   */
  size(): number {
    return size(this.models)
  }

  /**
   * @returns {boolean} `true` if the collection is empty, `false` otherwise.
   */
  isEmpty(): boolean {
    return this.size() === 0
  }

  /**
   * @returns {Object} A native representation of this collection that will
   *                   determine the contents of JSON.stringify(collection).
   */
  toJSON() {
    return JSON.parse(JSON.stringify(this.models))
  }

  /**
   * Removes a `Model` from this collection.
   *
   * @param  {BaseModel} model
   *
   * @return {BaseModel}
   */
  protected _removeModel(model: BaseModel): BaseModel | undefined {
    remove(this.models, model)
    this.onRemove(model)
    return model
  }

  /**
   * Removes the given model from this collection.
   *
   * @param  {BaseModel|Object|Array} model Model to remove, which can be a `BaseModel`
   *                                    instance, an object to filter by,
   *                                    a function to filter by, or an array
   *                                    of any of the above to remove multiple.
   *
   * @return {BaseModel|BaseModel[]} The deleted model or an array of models if a filter
   *                         or array type was given.
   *
   * @throws {Error} If the model is an invalid type.
   */
  remove(model: BaseModel): BaseModel
  remove(
    model: BaseModel[] | Partial<BaseModel> | ((model: BaseModel) => boolean)
  ): BaseModel[]
  remove(
    model:
      | BaseModel
      | BaseModel[]
      | Partial<BaseModel>
      | ((model: BaseModel) => boolean)
  ): BaseModel | BaseModel[] | undefined {
    if (!model) {
      throw new Error('Expected function, object, array, or model to remove')
    }

    // Support using a predicate to remove all models it returns true for.
    // Alternatively support an object of values to filter by.
    if (isFunction(model) || isPlainObject(model)) {
      return this.remove(filter(this.models, model))
    }

    // Support removing multiple models at the same time if an array was
    // given. A model would otherwise always be an object so this is safe.
    if (isArray(model)) {
      return filter(map<BaseModel, BaseModel>(model, this.remove))
    }

    // This is just to catch a potential bug. All models should have
    // an auto id here so this would indicate an unexpected state.
    if (!this.isModel(model)) {
      throw new Error('Model to remove is not a valid model')
    }

    return this._removeModel(model as BaseModel)
  }

  /**
   * Determines whether a given value is an instance of a model.
   *
   * @param  {*} candidate A model candidate
   *
   * @return {boolean} `true` if the given `model` is an instance of Model.
   */
  isModel(candidate: any): boolean {
    return isObject(candidate) && '_uid' in candidate
  }

  /**
   * @param {string|function|Object} where
   *
   * @return {BaseModel} The first model that matches the given criteria, or
   *                 `undefined` if none could be found.
   *
   * Ex. UserCollection.find({active: true})
   *
   * @see {@link https://lodash.com/docs/#find}
   */
  find(where: Predicate): BaseModel | undefined {
    return find<BaseModel>(this.models, where)
  }

  first(): BaseModel | undefined {
    return this.models[0]
  }

  map(callbackfn: any) {
    return map(this.models, callbackfn)
  }

  filter(callbackfn: any) {
    return filter(this.models, callbackfn)
  }

  forEach(callbackfn: any) {
    return this.models.forEach(callbackfn)
  }

  toArray() {
    return this.models
  }

  /** Accessors **/
  get length(): number {
    return this.models.length
  }

  /**
   * Making current class iterable so that when iterating over its instance, the iteration,
   * will be made directly on the models property
   */
  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        if (index < this.models.length) {
          let next_data = {
            done: false,
            value: this.models[index],
          }
          index++
          return next_data
        } else {
          return {
            done: true,
          }
        }
      },
    }
  }
}

export default BaseCollection

export type Predicate<T = boolean> =
  | ((model: BaseModel) => T)
  | string
  | Record<string, any>
  | BaseModel
  | Partial<BaseModel>

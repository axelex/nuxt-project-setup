    import lodash from 'lodash'
const { capitalize, uniqueId, has, set, get, merge } = lodash

abstract class Base {
  protected _getters_list: string[] = []
  private _rawData: any

  metadata: any

  // readonly _uid!: string
  constructor(data: object | object[] | null = null) {
    this._rawData = data
    if(this.getMetaData(data)) {
      this.setMetadata(this.getMetaData(data))
    }
    // // Define an automatic unique ID. This is primarily to distinguish
    // // between multiple instances of the same name and data.
    // Object.defineProperty(this, '_uid', {
    //     value:        uniqueId(),
    //     enumerable:   false,
    //     configurable: false,
    //     writable:     false,
    // })
  }

  /**
   * @returns {string} The class name of this instance.
   */
  get $class(): string {
    return Object.getPrototypeOf(this).constructor.name
  }

  get _uid(): string {
    return uniqueId()
  }

  /**
   * @returns {string} Default string representation.
   */
  toStringRepresentation(): string {
    return `<${this.$class} #${this._uid}>`
  }

  /**
   * @returns {string} Stringified object.
   */
  toString(): string {
    return JSON.stringify(this)
  }

  toJson(): object {
    const getters_object_values = {}
    if(this._getters_list.length) {
      this._getters_list.forEach((getter) => {
        set(getters_object_values, getter, get(this, getter))
      })
    }

    return JSON.parse(JSON.stringify(merge(getters_object_values, this)))
  }

  getRawData() {
    return this._rawData
  }

  getDataFormat() {
    return {
      data: 'data',
      metadata: 'meta'
    }
  }

  getData(data?: object | object[] | null) {
    const dataFormat = this.getDataFormat()

    if(has(data, dataFormat.data)) {
      // @ts-ignore
      return data[dataFormat.data]
    } else {
      return data
    }
  }

  getMetaData(data?: object | object[] | null) {
    data = data || this.getRawData()

    const dataFormat = this.getDataFormat()

    if(has(data, dataFormat.metadata)) {
      // @ts-ignore
      return data[dataFormat.metadata]
    } else {
      return null
    }
  }

  setMetadata(metadata: string | string[] | object | object[] | null) {
    this.metadata = metadata
  }

  getMessages() {
    return this.metadata.messages
  }
}

export default Base

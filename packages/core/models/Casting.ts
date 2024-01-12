import lodash from 'lodash'
const { isObject, isArray, round, toNumber, isFunction } = lodash

/**
 * Casting class is a class that takes care of converting values by a given type
 */
export class Casting {
  /**
   * Main public method through which the conversion is done
   *
   * @param type
   * @param value
   */
  public static execute(type: string, value: any): any {
    // @ts-ignore
    if (isFunction(this[type])) {
      // @ts-ignore
      return this[type](value)
    } else {
      console.warn(
        `The type: '${type}', sent to Casting, for conversion, doesn't have any associated method`
      )
    }

    return value
  }

  /**
   * The string method allows users to convert an exsitent value to string
   * or to initialize an empty string in case no value is passed
   *
   * @param value
   * @private
   */
  protected static string(value: any): string {
    return value ? value + '' : ''
  }

  // NOTE: Methods bellow where not tested yet

  /**
   * converting the given value to object
   *
   * @param value
   * @private
   */
  protected static object(value: any): object {
    if (value === null) {
      return {}
    }

    return isObject(value) && !isArray(value) ? value : {}
  }

  /**
   * converting the given value to an integer number
   *
   * @param value
   * @private
   */
  protected static integer(value: any): number {
    if (value === null || value === '-') {
      return value
    }
    value = round(toNumber(value), 0)
    return !isNaN(value) ? value : null
  }

  /**
   * converting the given value to float
   *
   * @param value
   * @private
   */
  protected static float(value: any): number {
    if (value === null || value === '-') {
      return value
    }
    value = toNumber(value)
    return !isNaN(value) ? value : null
  }

  /**
   * converting the given value to number
   *
   * @param value
   * @private
   */
  protected static number(value: any): number {
    if (value === null || value === '-') {
      return value
    }
    value = toNumber(value)
    return !isNaN(value) ? value : null
  }

  /**
   * converting given value to boolean
   *
   * @param value
   * @private
   */
  protected static boolean(value: any): boolean {
    return !!value
  }

  /**
   * converting given value to array
   *
   * @param value
   * @private
   */
  protected static array(value: any): any[] {
    return isArray(value) ? value : []
  }

  /**
   * converting given value to array
   *
   * @param value
   * @private
   */
  protected static uid(value: any): number {
    if(value) {
      return value
    } else {
      return Math.floor(Math.random() * Date.now());
    }
  }

  // TODO: Other common conversion types, between Models, can be added here
  //      Ex: You can see bellow an example of how casting can be used for date fields, to convert value to utc
  //      /**
  //          * converting given value to utc date
  //          *
  //          * The purpose of code bellow is just to give an example of how casting could be used
  //          * AS DISCUSSED WE WILL NOT BE USING MOMENT JS
  //          * Note: If method bellow is necessary, rewrite it using day.js
  //          *
  //          * @param value
  //          * @private
  //          */
  //      private static utc_date(value: any): string {
  //          if (isNumber(value)) {
  //              value = moment.unix(value)._d
  //          }
  //          return value instanceof Date ? value : (value ? moment(value).toDate() : null)
  //      }
}

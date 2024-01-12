/**
 * A logging wrapper for better handling errors, info or debugging messages
 * Messages will need costumizations in the future, like adding a timestamp to each message, or displaying some of them only if debugging will be on etc.
 */
class Log {
    dump(...data: any[]) {
        return console.log(data)
    }

    info(...data: any[]) {
        return console.info(data)
    }

    debug(...data: any[]) {
        return console.debug(data)
    }

    error(...data: any[]) {
        return console.error(data)
    }

    table(tabularData?: any, properties?: string[]) {
        return console.table(tabularData, properties)
    }

    trace(...data: any[]) {
        return console.trace(data)
    }

    warn(...data: any[]) {
        return console.warn(data)
    }
}

export default Log
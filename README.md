#### Optional in javascript

Sometimes you need to retrieve data that may be null. Instead of return null, return an optional value.

    function getData = function(params) {
        if (params) {
            val value = ... // retrieve data ... perhaps null ...
            return Optional.ofNullable(value)
        } else {
            // no arguments : return nothing
            return Optional.empty()
        }
    }

Now you can manipulate the optional value without worry of null.

    var mayBeValue = getData()

    mayBeValue = callFunction(mayBeValue)
    ....
    mayBeValue = anotherCallFunction(mayBeValue)

    var printed = mayBeValue.map(function(value) { return value.format() }).getOrElse("No value")

    // if getData() return a not null value printed contains the formatted value
    // if getData() return null printed contains "No value"


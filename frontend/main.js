async function getJsonFromGateway() {
    return await fetch("/TMI/v1/gateway?get=all").then(res => {return res.json()})
}

function reloadButton() {
    getJsonFromGateway().then(json => {

        updateField("hasipv6",json.signal.generic.hasIPv6)
        updateField("apn",json.signal.generic.apn)
        updateField("uptime",json.time.upTime)
        updateField("softwareversion",json.device.softwareVersion)
        updateField("serial",json.device.serial)

        updateField("5gband",json.signal["5g"].bands[0])
        updateField("5grsrp",json.signal["5g"].rsrp)
        updateField("5grsrq",json.signal["5g"].rsrq)
        updateField("5gsinr",json.signal["5g"].sinr)
        updateField("5grssi",json.signal["5g"].rssi)

        updateField("4gband",json.signal["4g"].bands[0])
        updateField("4grsrp",json.signal["4g"].rsrp)
        updateField("4grsrq",json.signal["4g"].rsrq)
        updateField("4gsinr",json.signal["4g"].sinr)
        updateField("4grssi",json.signal["4g"].rssi)
    })
}

function updateField (field,content) {
    document.getElementById(field).innerHTML = content;
}

reloadButton()
async function getJsonFromGateway() {
    return await fetch("/TMI/v1/gateway?get=all").then(res => {return res.json()})
}

async function getJsonFromWtfip(ver) {
    if (ver == "v6") {
        return await fetch("/getip").then(res => {return res.json()})
    } else if (ver == "v4") {
        return await fetch("/getv4").then(res => {return res.json()})
    }
}


function reloadButton() {
    getJsonFromGateway().then(json => {
        const fieldBindings = {
            "apn": json.signal.generic.apn,
            "uptimeformatted": formatUptime(json.time.upTime),
            "uptime": json.time.upTime,
            "softwareversion": json.device.softwareVersion,
            "serial": json.device.serial,
        
            "5gband": json.signal["5g"].bands[0],
            "5grsrp": json.signal["5g"].rsrp,
            "5grsrq": json.signal["5g"].rsrq,
            "5gsinr": json.signal["5g"].sinr,
            "5grssi": json.signal["5g"].rssi,
        
            "4gband": json.signal["4g"].bands[0],
            "4grsrp": json.signal["4g"].rsrp,
            "4grsrq": json.signal["4g"].rsrq,
            "4gsinr": json.signal["4g"].sinr,
            "4grssi": json.signal["4g"].rssi
        }

        for (key in fieldBindings) {
            document.getElementById(key).innerHTML = fieldBindings[key]
        }

        updateLastRestart()
    })
}

const sensitiveElements = ["serial","ipaddr","ipaddrv4"]

function sensitiveButton() {
    if (sensitiveShown == false ) {
        sensitiveShown = true

        for (let i = 0; i < sensitiveElements.length; i++) {
            document.getElementById(sensitiveElements[i]).style.display = ""
        }

        document.getElementById("sensitivebutton").innerHTML = "Hide Sensitive"
    } else {
        sensitiveShown = false
        
        for (let i = 0; i < sensitiveElements.length; i++) {
            document.getElementById(sensitiveElements[i]).style.display = "none"
        }        

        document.getElementById("sensitivebutton").innerHTML = "Show Sensitive"
    }
}

function formatUptime(uptime) { // This is so retarded I should never be allowed to write code ever again
    let workingUptimeMinutes = uptime / 60

    let workingUptimeHours = workingUptimeMinutes / 60
    workingUptimeHours = workingUptimeHours.toString().split('.')

    workingUptimeMinutes = Number(`.${workingUptimeHours[1]}`) * 60
    workingUptimeMinutes = workingUptimeMinutes.toString().split('.')

    workingUptimeSeconds = Number(`.${workingUptimeMinutes[1]}`) * 60
    workingUptimeSeconds = Math.round(workingUptimeSeconds)
    
    return `${workingUptimeHours[0]}h ${workingUptimeMinutes[0]}m ${workingUptimeSeconds}s`
}

async function updateLastRestart() {
    document.getElementById("lastrestart").innerHTML = await fetch("/lastrestart").then(res => {return res.text()})
}


var sensitiveShown = false

reloadButton()

getJsonFromWtfip("v6").then(res => {
    document.getElementById("ipaddr").innerHTML = res.YourFuckingIPAddress
})

getJsonFromWtfip("v4").then(res => {
    document.getElementById("ipaddrv4").innerHTML = res.YourFuckingIPAddress
})


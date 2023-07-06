let moisture = 0
datalogger.onLogFull(function () {
    radio.setGroup(77)
    radio.setTransmitSerialNumber(true)
    radio.sendString("" + control.deviceName() + "\"LOG FULL\"")
    power.lowPowerRequest()
})
input.onButtonPressed(Button.A, function () {
    basic.showString("A:" + ("" + moisture))
    basic.clearScreen()
    power.lowPowerRequest()
})
input.onButtonPressed(Button.AB, function () {
    power.lowPowerEnable(LowPowerEnable.Prevent)
    basic.showString("LOG RESET!")
    datalogger.deleteLog(datalogger.DeleteType.Full)
    control.reset()
})
input.onButtonPressed(Button.B, function () {
    basic.showString("L:" + ("" + input.lightLevel()))
    basic.showString("T:" + ("" + input.temperature()))
    basic.clearScreen()
    power.lowPowerRequest()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showString(control.deviceName())
    basic.clearScreen()
    power.lowPowerRequest()
})
power.fullPowerEvery(60000, function () {
    if (input.lightLevel() > 50) {
        radio.setGroup(77)
        radio.setTransmitSerialNumber(true)
        led.setBrightness(99)
        datalogger.includeTimestamp(FlashLogTimeStampFormat.Milliseconds)
        datalogger.setColumnTitles(
        "temp",
        "lum",
        "h2o"
        )
        moisture = pins.analogReadPin(AnalogPin.P1)
        if (true) {
            radio.sendValue(control.deviceName(), input.temperature())
            radio.sendValue(control.deviceName(), input.lightLevel())
        }
        if (moisture <= 400) {
            radio.sendValue(control.deviceName(), moisture)
            basic.showIcon(IconNames.Sad)
            basic.pause(500)
            basic.clearScreen()
            music.play(music.builtinPlayableSoundEffect(soundExpression.yawn), music.PlaybackMode.InBackground)
        } else {
            radio.sendValue(control.deviceName(), moisture)
        }
        datalogger.log(
        datalogger.createCV("temp", input.temperature()),
        datalogger.createCV("lum", input.lightLevel()),
        datalogger.createCV("h2o", moisture)
        )
    }
    power.lowPowerRequest()
})

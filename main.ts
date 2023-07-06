let moisture = 0
power.fullPowerEvery(3600000, function () {
    radio.setGroup(77)
    radio.setTransmitSerialNumber(true)
    led.setBrightness(100)
    music.setVolume(160)
    moisture = pins.analogReadPin(AnalogPin.P1)
    if (true) {
        radio.sendValue(control.deviceName(), moisture)
    }
    if (moisture <= 400) {
        basic.showIcon(IconNames.Sad)
        basic.pause(1000)
        basic.clearScreen()
        if (input.lightLevel() > 0) {
            music.play(music.builtinPlayableSoundEffect(soundExpression.yawn), music.PlaybackMode.InBackground)
        }
    }
    power.lowPowerRequest()
})

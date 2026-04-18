# [Torn Dashboard ESP32 TFT](https://bronom.github.io/Torn_Dashboard_Setup/ "Torn Dashboard ESP32 TFT")

<p align="left">
  <img src="https://github.com/user-attachments/assets/8ffd62d3-bffb-483d-878e-4e102d5eaf75"
       alt="Torn Dashboard"
       width="450"
       align="right"
       style="margin-left: 15px;" />

  A <b>hardware Torn dashboard</b> powered by an <b>ESP32</b> and a <b>SPI TFT Display (Or E-Ink)</b>.<br><br>

  The device connects to the <b>Torn API</b> and displays your in-game stats on a dedicated screen.<br><br>

  ⚠️ <b>Important:</b> The ESP32 only supports <b>2.4GHz WiFi networks</b>.<br><br>

  <h3>🚀 Features</h3>
  • Displays Torn player information on a TFT screen<br>
  • Uses the <b>Torn API</b><br>
  • Touchscreen support<br>
  • Runs on a standalone <b>ESP32 device</b><br>
  • Advanced setup with JSON for extra options<br>
  &nbsp;&nbsp;&nbsp;&nbsp;↳ WiFi list, hide battery icon (E-Ink), etc.<br><br>

  <h3>📝 Notes</h3>
  • ESP32 supports <b>2.4GHz WiFi only</b><br>
  • The wiring and hardware must be the same<br>
  • UI layout does not scale with different display sizes<br>
  &nbsp;&nbsp;&nbsp;&nbsp;↳ Adjustments may be required for other screens
</p>

<br clear="right"/>
<br>

---

# Dashboard Versions

There are different versions of the Torn Dashboard, each designed for different display types:

## 1. **2.8" TFT Version (ILI9341)**

- **Display:** 2.8" TFT Touchscreen (ILI9341)
- **Resolution:** 240x320
- **Interface:** SPI
- **Touch:** Capacitive touch support

**Feature:**
- Display -> Player Name, Id, Level, Torn Time, Refresh Timer, Notification, Money, Organized Crime (OC) Timer, Ranked War (RW), Status, Energy, Nerve, Happy, Life, Chain, Cooldown.
- Refresh Every 60 Sec.
- Press on the screen to turn off the display.
- Hold Boot button 2 sec to reset Wifi and API Key config. (Need to be reconfigured by the website.) (Flash/Install/Update Not required)
- Single press on Boot button while startup to launch touch screen safezone calibration.
- Double press on Boot button while start to launch touch screen safezone calibration reset.


## Hardware

### Required Parts
⚠️ **Important:** Please verify you got the good part. The link only redirect to the page listing not the right version or size.**.

| Part                             | Description                               | Link |
| -------------------------------- | ----------------------------------------- | ---- |
| ESP32-32D / ESP32-WROOM-DA       | Main microcontroller                      | [Aliexpress](https://www.aliexpress.com/item/1005006336964908.html "ESP32-S3 R16N8 (Wroom 1)") |
| 2.8" SPI TFT LCD Touch (ILI9341) | Display                                   | [Aliexpress](https://www.aliexpress.com/item/33015586094.html "2.8 inch with touch") |
| ESP32 Breakout Board             | Recommended for easier wiring (Optionnal) | [Aliexpress](https://www.aliexpress.com/item/1005006336964908.html "Breakout Board") |
| electrical wires                 | For connections                           | [Aliexpress](https://www.aliexpress.com/item/1005007319706057.html "ESP32-S3 R16N8 (Wroom 1)") |
| Jumper wires (Dupont wire)       | For easier testing (Optionnal)            | [Aliexpress](https://www.aliexpress.com/item/1005007319706057.html "ESP32-S3 R16N8 (Wroom 1)") |
| Black Rubber Strip 2mm x 10mm    | To stop the case sliding (Optionnal)     | [Aliexpress](https://www.aliexpress.com/item/1005003718625323.html "Black Rubber Strip 2mm x 10mm") |
⚠️ **Warning:**
 **I got the display few years ago. Because its kinda old, it may be a other chip inside (Other than ILI9341). You may encounter some issue. If its the case contact me or make a Issues in Github and let me know. I will try to make a version for your display if possible.**

3D Printed Case : Check In the file list.


## Wiring

### TFT Display (ILI9341)

| Function | ESP32 Pin | Description                      |
| -------- | --------- | -------------------------------- |
| MOSI     | 23        | SPI data to TFT                  |
| MISO     | 19        | SPI data from TFT                |
| SCLK     | 18        | SPI clock                        |
| CS       | 5         | TFT chip select                  |
| DC / A0  | 2         | Data / Command select            |
| RST      | 4         | Display reset                    |
| BL       | 32        | Backlight control (PWM optional) |


### Touch Controller (XPT2046)

| Function  | ESP32 Pin | Description            |
| --------- | --------- | ---------------------- |
| CS        | 21        | Touch chip select      |
| MOSI      | 23        | Shared SPI MOSI        |
| MISO      | 19        | Shared SPI MISO        |
| SCLK      | 18        | Shared SPI clock       |
| IRQ / PEN | 22        | Optional interrupt pin |
 
---

# 2. **4-inch TFT Version** Torn_Dashboard_ESP32_TFT_4Inch

Torn Dashboard - ESP32-S3 WROOM 1 N16R8 + TFT 4 Inch LCD Touch with ST7796 Driver

- **Display:** 4.0" TFT Touchscreen (ST7796S or similar) (Tested only with ST7796S Driver)
- **Resolution:** 480x320
- **Interface:** SPI
- **Touch:** Capacitive touch support (XPT2046)

For a larger screen, the **4-inch TFT version** offers more space for displaying stats bigger. 

**Feature:**
- Bigger version of the 2.8 Inch.
- Same Layout but bigger.
- Display -> Player Name, Id, Level, Torn Time, Refresh Timer, Notification, Money, Organized Crime (OC) Timer, Ranked War (RW), Status, Energy, Nerve, Happy, Life, Chain, Cooldown.
- Hold Boot button 2sec to reset Wifi and API Key config. (Need to be reconfigured by the website.) (Flash/Install/Update Not required)
- Single press on Boot button while startup to launch touch screen safezone calibration.
- Double press on Boot button while start to launch touch screen safezone calibration reset.

## Hardware

### Required Parts
⚠️ **Important:** Please verify you got the good part. The link only redirect to the page listing not the right version or size.**.

| Part                             | Description                               | Link |
| -------------------------------- | ----------------------------------------- | ---- |
| ESP32-S3 R16N8 (Wroom 1)         | Main microcontroller                      | [Aliexpress](https://www.aliexpress.com/item/1005007319706057.html "ESP32-S3 R16N8 (Wroom 1)") |
| 4" SPI TFT LCD Touch (ST7796S)   | Display                                   | [Aliexpress](https://www.aliexpress.com/item/32847628219.html "4 Inch SPI TFT LCD Touch (ST7796S)") |
| ESP32 Breakout Board             | Recommended for easier wiring (Optionnal) | [Aliexpress](https://www.aliexpress.com/item/1005008750977454.html "ESP32 Breakout Board") |
| electrical wires                 | For connections                           | [Aliexpress](https://www.aliexpress.com/item/1005005450270866.html "Boxed 1, 24AWG 20m x5 rolls, 1 box") |
| Jumper wires (Dupont wire)       | For easier testing (Optionnal)            | [Aliexpress](https://www.aliexpress.com/item/1005003219096948.html "3 x 40pin Ribbon Kit 10cm") |
| Black Rubber Strip 2mm x 10mm    | To stop the case sliding (Optionnal)     | [Aliexpress](https://www.aliexpress.com/item/1005003718625323.html "Black Rubber Strip 2mm x 10mm") |

3D Printed Case : Check In the file list.


## Wiring 

### TFT Display (ST7796S)

| Function    | ESP32 Pin | Notes                                             |
| ----------- | --------- | ------------------------------------------------- |
| **MOSI**    | 46        | SPI data to TFT                                   |
| **MISO**    | 19        | SPI data from TFT (used only if reading from TFT) |
| **SCLK**    | 18        | SPI clock                                         |
| **CS**      | 15        | TFT chip select                                   |
| **DC / A0** | 2         | Data/Command select                               |
| **RST**     | RST       | Reset                                             |
| **BL** (LED)| 38        | Backlight control (can use PWM if needed)         |

### Touch Controller (XPT2046)

| Function        | ESP32 Pin | Notes                                |
| --------------- | --------- | ------------------------------------ |
| **CS**          | 21        | Chip select for touch controller     |
| **MOSI** (T-DIN)| 46        | Same SPI MOSI (shared)               |
| **MISO** (T-DO) | 19        | Same SPI MISO (shared)               |
| **SCLK**        | 18        | Same SPI clock (shared)              |
| **IRQ / PEN**   | 47        | Some libraries support touch IRQ pin |

---

# 3. **E-Ink Display Version**

- **Display:** Lilygo T5 2.13" E-Ink Display
- **Resolution:** 212x104 or similar (depends on your e-ink model)
- **Interface:** SPI
- **Touch:** Not supported (E-Ink is a non-touch display)

The **E-Ink version** is designed for a low-power, always-on display where you don’t need interaction, but still want to view the player stats. 

**Feature:**
- The display is low refresh rate and monochrome.
- More Compact UI.
- Display -> Player Name, Id, Level, Energy, Nerve, Happy, Life, Chain, Money, Status, Cooldown, Torn Time, Local Time.
- Refresh Every 5 min.
- Refresh Button to force a refresh (Single press of Hold less than 3 sec) (30 Sec limit per refresh).
- Hold Boot button 10sec to reset Wifi and API Key config. (Need to be reconfigured by the website.) (Flash/Install/Update Not required)

## Hardware

### Required Parts
⚠️ **Important:** Please verify you got the good part. The link only redirect to the page listing not the right version or size.**.

| Part                                                                                              | Description                                              | Link |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ---- |
| Lilygo T5 2.13 Inch E-ink (With on board chip. Micro USB Version) (I used the GDEM0213B74 CH9102) | Main microcontroller                                     | [Aliexpress](https://www.aliexpress.com/item/32869729970.html "Lilygo T5 2.13 Inch E-ink GDEM0213B74 CH9102") |
| JST 1.25mm 2pin 603450 3.7V 1200mAh Li-Polymer Li-ion Battery                                     | Battery (Optionnal)                                      | [Aliexpress](https://www.aliexpress.com/item/1005008650516897.html "JST 1.25mm 2pin 603450") |
| M3 6mm, Screw Allen flat head screw, x2 (Pack of 50pcs)                                           | Screw with flat head to stay flush with the case         | [Aliexpress](https://www.aliexpress.com/item/1005008650516897.html "M3 50pcs, 6mm") |
| M6 Brass Heat Insert x2                                                                           | Insert to screw the back plate (Soldering iron required) | [Aliexpress](https://www.aliexpress.com/item/1005008650516897.html "Length 4mm 50pcs, M6(OD 8mm)") |

3D Printed Case : [Makerworld](https://makerworld.com/en/models/1427537-lilygo-t5-2-13-3d-printed-case#profileId-1483837 "Lilygo T5 2.13\" 3d printed case") 

Or check In the file list.

Idea : In case you didn't a 3D Printer you could make one with the box the screen come with and with some screw of glue.

---

# Flashing the board

Go to : https://bronom.github.io/Torn_Dashboard_Setup/

Take a look to the Operator note at the bottom.

1. Flash the firmware with your modele of board. (Not required if you only want to send Wifi and API Key config after a config reset)
  1. Pick your project version.
  2. Install / Update Firmware and pick the right COM port (USB).
  3. Follow the step and wait for the success message.
     
2. Once the flashing done with a yellow message on screen. Send the config info to the board.
  1. Enter your Wifi and Torn information above (SSID, Password, Torn API Key). Or use Advanced Setup for more options (Optionnal).
  2. Press Connect ESP32 and pick the right COM port (USB).
  3. Once properly connected. Press Send Config button
  4. You should see a green message on the device screen.

---

# Debug

If nothing display on the screen after the flashing. Check those : 

- Wiring is correct.
- You have the right board.
- You have the right display.
- Nothing is connected. (Look at the Serial Log Box. If there's a message about Serial already in use, that mean something is connected to the board. Close every browse tab and replug the board.)
- If you flashing the ESP32-S3 board (4inch version). Make sur you use the right usb port.

---

# License

This project is released for **personal and educational use only**.

You are free to:

* Use the project for personal purposes
* Modify the code
* Share improvements

Under the following conditions:

1. **No commercial use**
   This project may **not be sold**, bundled into commercial products, or used for any commercial activity.

2. **Attribution required**
   If you distribute or modify this project, you must **keep the original source reference** and credit the original author.

3. **Source must remain open**
   Any modified versions must **keep the source code publicly available**.

4. **Do not claim this project as your own**
   Redistribution must keep the original author credit.

If you wish to use this project commercially, please contact the author for permission.

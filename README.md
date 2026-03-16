# Torn Dashboard ESP32 TFT

A **hardware Torn dashboard** powered by an **ESP32** and a **SPI TFT Display (Or E-Ink)**.

The device connects to the **Torn API** and displays your in-game stats on a dedicated screen.

⚠️ **Important:** The ESP32 only supports **2.4GHz WiFi networks**.

---

# Features

* Displays Torn player information on a TFT screen
* Uses the **Torn API**
* Touchscreen support
* Runs on a standalone **ESP32 device**

---

# Notes

* ESP32 supports **2.4GHz WiFi only**
* The wiring and hardware must be the same.
* The UI Layout doesn't scale with different display sizes. (If using a different display size, some adjustments may be necessary.)
  
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


## Hardware

### Required Parts

| Part                             | Description                   |
| -------------------------------- | ----------------------------- |
| ESP32-32D / ESP32-WROOM-DA       | Main microcontroller          |
| 2.8" SPI TFT LCD Touch (ILI9341) | Display                       |
| ESP32 Breakout Board             | Recommended for easier wiring |
| electrical wires                 | For connections               |
| Jumper wires (Dupont wire)       | For easier testing            |

3D Printed Case : In Progess


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


## Hardware

### Required Parts

| Part                             | Description                   |
| -------------------------------- | ----------------------------- |
| ESP32-S3 R16N8 (Wroom 1)         | Main microcontroller          |
| 4" SPI TFT LCD Touch (ST7796S)   | Display                       |
| ESP32 Breakout Board             | Recommended for easier wiring |
| electrical wires                 | For connections               |
| Jumper wires (Dupont wire)       | For easier testing            |

3D Printed Case : In Progess


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

| Part                                                              | Description                   |
| ----------------------------------------------------------------- | ----------------------------- |
| Lilygo T5 2.13 Inch E-ink (With on board chip. Micro USB Version) | Main microcontroller          |

3D Printed Case : https://makerworld.com/en/models/1427537-lilygo-t5-2-13-3d-printed-case#profileId-1483837

---

# Flashing the board

Go to : https://bronom.github.io/Torn_Dashboard_Setup/

Take a look to the Operator note at the bottom.

1. Flash the firmware with your modele of board. (Not required if you only want to send Wifi and API Key config after a config reset)
  1. Pick your project version.
  2. Install / Update Firmware and pick the right COM port (USB).
  3. Follow the step and wait for the success message.
     
2. Once the flashing done with a yellow message on screen. Send the config info to the board.
  1. Enter your Wifi and Torn information above (SSID, Password, Torn API Key)
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

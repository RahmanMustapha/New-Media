import pyfirmata2


PIN = 9  # Pin 13 is used
DELAY = 2  # 1 second delay

# Adjust that the port match your system, see samples below:
# On Linux: /dev/tty.usbserial-A6008rIF, /dev/ttyACM0,
# On Windows: \\.\COM1, \\.\COM2
PORT =  pyfirmata2.Arduino.AUTODETECT

# Creates a new board
board = pyfirmata2.Arduino(PORT)
board.digital[9].mode = pyfirmata2.SERVO


# Loop for blinking the led
while True:
    board.digital[PIN].write(1)  # Set the LED pin to 1 (HIGH)
    board.pass_time(DELAY)
    board.digital[PIN].write(0)  # Set the LED pin to 0 (LOW)
    board.pass_time(DELAY)
    board.digital[PIN].write(180)
    board.pass_time(1)



if event.type == 'TWITCHCHATMESSAGE':
                    reply = message(event.message, event.channel)

                    if (event.tags.get("id") in seenBefore):
                        reply2 = message2(event.message, event.channel)
                        phase = reply2
                   
                    if (phase == reply):
                        observer.send_message(reply, CHANNEL)
                        observer.send_message("Try waving back at me with a message! Type \"Hello\" and  a number", CHANNEL)
                        

                    if (phase == reply2):
                        observer.send_message(reply2, CHANNEL)

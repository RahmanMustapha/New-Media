from twitchobserver import Observer
import time
import threading
import pyfirmata2


# change these to be, well, you

CHANNEL = 'marcdownie'
USER = 'noodly_bot'
AUTHKEY = 'oauth:co24lpz98qzykwwo047bf0b26cta9y'
phase = 0

PIN = 9  # Pin 9 is used
PORT =  pyfirmata2.Arduino.AUTODETECT
# Creates a new board
board = pyfirmata2.Arduino(PORT)
board.digital[9].mode = pyfirmata2.SERVO


if (AUTHKEY=='UNSET'):
    raise NotImplementedError("this isn't going to work, you need to set your username and authkey")

# your code goes here!
def message(text, user):

    DELAY = 1.5
    board.digital[PIN].write(0)  
    board.pass_time(DELAY)
    board.digital[PIN].write(180)
    board.pass_time(DELAY)
    board.digital[PIN].write(0)
    board.pass_time(DELAY)
    board.digital[PIN].write(180)
    board.pass_time(DELAY)
    board.digital[PIN].write(0)


    return "Hello, %s! Can you see me waving at you?" % (user) 

def message2(text, user): 
    parts = text.split()
    if (len(parts) != 2):
        return ""
    else :
        mes = parts[0]
        num = int(parts[1])
        temp = num
        
        if (num <= 10 and num > 0):
            DELAY = 1/num  
        else:
            DELAY = 1/4 
        
        while temp > 0:
          board.digital[PIN].write(0)  
          board.pass_time(DELAY)
          board.digital[PIN].write(180)
          board.pass_time(DELAY)
          board.digital[PIN].write(0)
          board.pass_time(DELAY)
          temp -= 1

        return "%s says %s! And waved %s times!" % (user, mes, num) 

# we keep a list of message IDs we've seen before just in case we see them twice
seenBefore = set()
alreadySeen = set()


print("connecting")
observer = Observer(USER, AUTHKEY)

with observer:
    print("joining")
    observer.join_channel(CHANNEL)
    print("running")
    try:
        while True:
            e = observer.get_events()
            if(len(e)>0):
                print("got %i events" % len(e))

            for event in e:
                if (hasattr(event, "tags")):
                    if (event.tags.get("id")):
                        print("ID is %s %s " % (event.tags.get("id"), seenBefore))
                        if (event.tags.get("id") in seenBefore):
                            # duplicate message
                            continue
                        else:
                            seenBefore.add(event.tags.get("id"))
                            print(event)

                if event.type == 'TWITCHCHATMESSAGE':
                    if (event.tags.get("display-name") in alreadySeen):
                        reply2 = message2(event.message, event.channel)
                        observer.send_message(reply2, CHANNEL)
                        
                    else:
                        reply = message(event.message, event.channel)
                        observer.send_message(reply, CHANNEL)
                        observer.send_message("Try waving back at me with a message! Type \"Hello\" and  a number", CHANNEL)
                        alreadySeen.add(event.tags["display-name"])

                        
     

            # never post too fast, even in response to messages that arrive. Twitch will block us.
            time.sleep(0.1)

    except KeyboardInterrupt:
        observer.leave_channel(CHANNEL)
        

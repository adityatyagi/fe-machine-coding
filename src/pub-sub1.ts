
/**
 *  Problem statement
    Showcase the working of publisher-subscriber pattern in JavaScript. This works similar to the addEventListener in JavaScript where a callback function is assigned to the event, and that callback function will be invoked when the event is fired.
    removeEventListener can be used to remove the listener.

    Similar to this create a function Event that will have three methods

    subscribe(fn): subscribes the function to the event.
    unsubscribe(fn): unsubscribes the function from the event.
    fire(data): when event is fired or published all the subscribed function should be invoked with the data.
 */

    type EventHandlerMock<T> = (arg: T) => void;

    export class EventMock<T> {

        // list of subscribers
        private listOfSubscribers: EventHandlerMock<T>[] = [];

        // subscribe
        subscribe(fn: EventHandlerMock<T>): void{
            this.listOfSubscribers.push(fn);
        }

        // remove from list of subsribers
        unsubscribe(fn: EventHandlerMock<T>): void {
            this.listOfSubscribers.filter(item => item !== fn);
        }

        // notify all subscribed handlers
        fire(arg: T, thisObj?: any): void {
            const scope = thisObj;
            this.listOfSubscribers.forEach((handler) => {
                handler.call(scope, arg);
            })
        }
    }


    // 1st observer
const eventHandler = function (item: string) {
    console.log("fired:   " + item);
  };
  
  // 2nd observer
  const eventHandler2 = function (item: string) {
    console.log("Moved: " + item);
  };
  
  const event = new EventMock<string>();
  
  // subscribe 1st observer
  event.subscribe(eventHandler);
  event.fire('event #1');
  
  // unsubscribe 1st observer
  event.unsubscribe(eventHandler);
  event.fire('event #2');
  // output: "fired: event #1"
  
  // subscribe 1st & 2nd observer
  event.subscribe(eventHandler);
  event.subscribe(eventHandler2);
  event.fire('event #3');
  // output "fired: event #3"
  // output "Moved: event #3"
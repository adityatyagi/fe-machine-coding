
/**
 *  Problem statement
    Showcase the working of publisher-subscriber pattern in JavaScript. This works similar to the addEventListener in JavaScript where a callback function is assigned to the event, and that callback function will be invoked when the event is fired.
    removeEventListener can be used to remove the listener.

    Similar to this create a function Event that will have three methods

    subscribe(fn): subscribes the function to the event.
    unsubscribe(fn): unsubscribes the function from the event.
    fire(data): when event is fired or published all the subscribed function should be invoked with the data.
 */

    // Type Definition for Handlers
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
            this.listOfSubscribers = this.listOfSubscribers.filter(item => item !== fn);
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
const fired = function (item: string) {
    console.log("fired:   " + item);
  };
  
  // 2nd observer
  const moved = function (item: string) {
    console.log("Moved: " + item);
  };
  
  const event = new EventMock<string>();
  
  // subscribe 1st observer
  event.subscribe(fired);
  event.fire('event #1');
  
  // unsubscribe 1st observer
  event.unsubscribe(fired);
  event.fire('event #2');
  
  // subscribe 1st & 2nd observer
  event.subscribe(fired);
  event.subscribe(moved);
  event.fire('event #3');
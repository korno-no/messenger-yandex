type TCallback = (...args: any[]) => void; // Accepts any arguments
type TListeners = { [event: string]: Array<TCallback> };

export default class EventBus<E extends string> {
  // Initialize listeners with TListeners type
  private listeners: TListeners = {}; 
  on(event: E, callback: TCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  off(event: E, callback: TCallback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event] = this.listeners[event]!.filter((listener) => listener !== callback);
  }

  emit(event: keyof TListeners, ...args: any[]) {    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event]!.forEach((listener) => {
      listener(...args);
    });
  }
}

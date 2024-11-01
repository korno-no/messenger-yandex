export default class EventBus<E extends string> {
  listeners: { [key in E]?: Array<(...args: unknown[]) => void> } = {};

  on(event: E, callback: (...args: unknown[]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
        this.listeners[event]!.push(callback);
  }

  off(event: E, callback: (...args: unknown[]) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event] = this.listeners[event]!.filter((listener) => listener !== callback);
  }

  emit(event: E, ...args: unknown []) {
    if (!this.listeners[event]) {
      return;
      // throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event]!.forEach((listener) => {
      listener(...args) ;
    });
  }
}

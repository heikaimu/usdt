/**
 * 事件发布与订阅
 */
export default class Event {
  constructor() {
    this.clientList = new Map();
  }

  add(target, handler) {
    let effects = this.clientList.get(target);
    if (!effects) {
      effects = new Set();
    }
    effects.add(handler);
    this.clientList.set(target, effects);
  }

  trigger(target, ...params) {
    const effects = this.clientList.get(target);
    if (!effects) {
      return;
    }

    effects.forEach(effect => {
      effect(...params);
    });
  }
}

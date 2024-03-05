function registerEventHandler(target: History) {
  return function registerTargetEventHandler(
    methodName: 'pushState' | 'replaceState',
  ) {
    const originMethod = target[methodName];
    return function eventHandler(
      ...args: [
        data: unknown,
        unused: string,
        url?: string | URL | null | undefined,
      ]
    ) {
      const event = new Event(methodName.toLowerCase());
      originMethod.apply(target, args);
      window.dispatchEvent(event);
      return originMethod;
    };
  };
}

const registerHistoryEventHandler = registerEventHandler(window.history);

window.history.pushState = registerHistoryEventHandler('pushState');
window.history.replaceState = registerHistoryEventHandler('replaceState');

export default {};

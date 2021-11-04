export const MESSAGE_EVENT_NAME_MAPS = {
  OPEN_FORM_MODAL: 'open_form_modal', // 简历模块选择
};

class Messager {
  send = (eventName: string, payload: any) => {
    document.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {
          payload,
        },
      })
    );
  };
  receive = (e: any, messageHandler: Function) => {
    if (messageHandler) {
      const payload = e?.detail?.payload;
      messageHandler(payload);
    }
  };
}

export default new Messager();

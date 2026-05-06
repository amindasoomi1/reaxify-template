import { Fragment, useSyncExternalStore } from "react";
import ConfirmModalHandler from "./ConfirmModalHandler";
import { confirmStore } from "./store";

export default function Provider() {
  const confirms = useSyncExternalStore(
    confirmStore.subscribe,
    confirmStore.get,
  );
  return (
    <Fragment>
      {confirms.map((e) => (
        <ConfirmModalHandler
          key={e.id}
          title={e.title}
          description={e.description}
          okButton={e.okButton}
          cancelButton={e.cancelButton}
          onOk={e.onOk}
          onCancel={e.onCancel}
          onExited={() => confirmStore.delete(e.id)}
        />
      ))}
    </Fragment>
  );
}

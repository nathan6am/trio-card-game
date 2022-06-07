import { useState } from "react";
import { Dialog } from "@headlessui/react";
export default function CardOptionsModal({ toggle, isOpen, commitChanges }) {
  return (
    <Dialog open={isOpen} onClose={toggle} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white">
          <div className="flex flex-col">
            <h1 className="menu-header menu-title">Customize Cards</h1>
            <div className="m-2 mb-5">
              <div className="flex flex-row items-center"></div>
              <label className="menu-label">Color(Select 3)</label>
            </div>
          </div>
        </Dialog.Panel>
      </div>

      <a
        onClick={() => {
          toggle();
        }}
      >
        close
      </a>
    </Dialog>
  );
}

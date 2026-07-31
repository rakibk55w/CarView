import { createPortal } from "react-dom";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

export default function PopupSheet({ isOpen, children }) {
  useLockBodyScroll(isOpen);

  return createPortal(
    <div className={`
        fixed
        inset-0
        z-50
        transition-opacity
        duration-300

        ${
            isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}>
        <div className="
            absolute
            inset-0
            bg-black/40
            backdrop-blur-sm"
        />

        <div className={`
            absolute
            bottom-10
            left-1/2
            
            w-[calc(100%-2rem)]
            max-w-200
            max-h-[90vh]

            -translate-x-1/2

            flex 
            flex-col 
            overflow-hidden

            rounded-xl
            shadow-2xl

            transition-transform
            duration-300

            bg-white
            text-black

            dark:bg-gray-800
            dark:text-white

            ${isOpen ? "translate-y-0" : "translate-y-full"}`}>
            <div className="
                min-h-0 
                flex-1 
                overflow-y-auto

                scrollbar-thin
                scrollbar-thumb-gray-300
                scrollbar-track-transparent

                dark:scrollbar-thumb-gray-600

                px-5
                sm:px-8">
                {children}
            </div>
        </div>
    </div>,
    document.body,
  );
}

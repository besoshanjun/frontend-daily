import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

const OverlayContext = React.createContext();

const stopPropagation = (e) => e?.stopPropagation?.();
const preventDefault = (e) => e?.preventDefault?.();

export default function Overlay({ children, renderBody }) {
  const [show, setShow] = useState(false);

  return (
    <OverlayContext.Provider
      value={{
        openOverlay: () => setShow(true),
        closeOverlay: () => setShow(false),
      }}
    >
      {ReactDOM.createPortal(
        <OverlayWrapper show={show}>{renderBody()}</OverlayWrapper>,
        document.body
      )}
      <Overlay.Opener>{children}</Overlay.Opener>
    </OverlayContext.Provider>
  );
}

function OverlayWrapper({ children, show }) {
  const ref = useRef();
  if (!show) {
    return null;
  }
  return (
    <OverlayContext.Consumer>
      {(context) => (
        <div
          className="overlay-wrapper"
          ref={ref}
          onClick={(e) => {
            stopPropagation(e);
            if (e.target === ref.current) { // 判断是否点击是wrapper，不是的话不关闭弹框
              return context?.closeOverlay?.();
            }
          }}
        >
          {children}
        </div>
      )}
    </OverlayContext.Consumer>
  );
}

Overlay.Opener = function Opener({ children, className = "" }) {
  return (
    <OverlayContext.Consumer>
      {(context) => (
        <div
          className={`overlay-opener ${className}`}
          onClick={() => {
            return context?.openOverlay?.();
          }}
        >
          {children}
        </div>
      )}
    </OverlayContext.Consumer>
  );
};

Overlay.Closer = function Closer({ children, className = "" }) {
  return (
    <OverlayContext.Consumer>
      {(context) => (
        <div
          className={`overlay-closer ${className}`}
          onClick={() => {
            return context?.closeOverlay?.();
          }}
        >
          {children}
        </div>
      )}
    </OverlayContext.Consumer>
  );
};

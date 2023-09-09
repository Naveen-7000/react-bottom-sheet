import React, { useState, useEffect, useRef } from "react";
import "./BottomSheet.css";

const BottomSheet = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] =
    useState<boolean>(false);

  const [currentHeight, setCurrentHeight] = useState<number>(50);

  let isDragging = false;
  let startY = 0;
  let startHeight = 0;

  //refs for accessing DOM elements
  const sheetContentRef = useRef<HTMLDivElement>(null);
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const dragIconRef = useRef<HTMLDivElement>(null);
  const sheetOverlayRef = useRef<HTMLDivElement>(null);
  const showModalBtnRef = useRef<HTMLButtonElement>(null);

  // methods to manipulate the element

 const showBottomSheet = () => {
    setIsBottomSheetVisible(true);
    document.body.style.overflowY = "hidden";
    updateSheetHeight(50);
  };

  const updateSheetHeight = (height: number) => {
    if (sheetContentRef.current) {
      sheetContentRef.current.style.height = `${height}vh`;
      setCurrentHeight(height);
    }
  };

  const hideBottomSheet = () => {
    setIsBottomSheetVisible(false);
    document.body.style.overflowY = "auto";
  };

  const dragStart = (e: MouseEvent) => {
    isDragging = true;
    const clientY = e.pageY;
    startY = clientY;
    if (sheetContentRef.current) {
      const newHeight = parseInt(sheetContentRef.current.style.height);
      startHeight = newHeight;
    }
    if (bottomSheetRef.current) {
      bottomSheetRef.current.classList.add("dragging");
    }
  };

  const touchDragStart = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      isDragging = true;
      const clientY = e.touches[0].pageY;
      startY = clientY;
      if (sheetContentRef.current) {
        const newHeight = parseInt(sheetContentRef.current.style.height);
        startHeight = newHeight;
      }
    }
  };

  const dragging = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientY =
      e instanceof MouseEvent ? e.pageY : (e as TouchEvent).touches[0].pageY;
    const delta = startY - clientY;
    const newHeight = startHeight + (delta / window.innerHeight) * 100;
    updateSheetHeight(newHeight);
  };

  const dragStop = () => {
    isDragging = false;
    if (bottomSheetRef.current) {
      bottomSheetRef.current.classList.remove("dragging");
    }
    if (sheetContentRef.current) {
      const sheetHeight = parseInt(sheetContentRef.current.style.height) || 0;
      sheetHeight < 40
        ? updateSheetHeight(30)
        : sheetHeight > 75
        ? updateSheetHeight(90)
        : updateSheetHeight(50);
    }
  };

  // Use useEffect to add event listeners when the component mounts
  useEffect(() => {
    const dragIconElement = dragIconRef.current;
    const sheetOverlayElement = sheetOverlayRef.current;
    const showModalBtnElement = showModalBtnRef.current;

    if (dragIconElement) {
      dragIconElement.addEventListener("mousedown", dragStart);
      dragIconElement.addEventListener("touchstart", touchDragStart, {
        passive: true,
      });
    }

    if (sheetOverlayElement) {
      sheetOverlayElement.addEventListener("click", hideBottomSheet);
    }

    if (showModalBtnElement) {
      showModalBtnElement.addEventListener("click", showBottomSheet);
    }

    document.addEventListener("mousemove", dragging);
    document.addEventListener("touchmove", dragging);

    document.addEventListener("mouseup", dragStop);
    document.addEventListener("touchend", dragStop);


    // Cleanup event listeners when the component unmounts
    return () => {
      if (dragIconElement) {
        dragIconElement.removeEventListener("mousedown", dragStart);
        dragIconElement.removeEventListener("touchstart", touchDragStart);
      }

      if (sheetOverlayElement) {
        sheetOverlayElement.removeEventListener("click", hideBottomSheet);
      }

      if (showModalBtnElement) {
        showModalBtnElement.removeEventListener("click", showBottomSheet);
      }
      document.removeEventListener("mousemove", dragging);
      document.removeEventListener("touchmove", dragging);
      document.removeEventListener("mouseup", dragStop);
      document.removeEventListener("touchend", dragStop);
    };
  }, []);


  return (
    <div>
      <button className="show-modal" ref={showModalBtnRef}>
        Open Bottom Sheet
      </button>
      <div
        className={`bottom-sheet ${isBottomSheetVisible ? "show" : ""}`}
        ref={bottomSheetRef}
      >
        <div className="sheet-overlay" ref={sheetOverlayRef} data-testid="sheet-overlay"></div>
        <div className="content" ref={sheetContentRef} data-testid="content">
          <div className="header">
            <div className="drag-icon" ref={dragIconRef}>
              <span></span>
            </div>
          </div>
          <div className="body">
            <h2>Bottom Sheet</h2>
            <div>
              <button onClick={() => updateSheetHeight(90)} disabled={currentHeight === 90}>Top</button>
              <button onClick={() => updateSheetHeight(50)} disabled={currentHeight === 50}>Middle</button>
              <button onClick={() => updateSheetHeight(30)} disabled={currentHeight === 30}>Bottom</button>
            </div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              blanditiis aut nam amet excepturi architecto accusantium
              dignissimos quae accusamus facere eum sed dolorem magni unde
              voluptatum, quisquam iusto numquam quas.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              blanditiis aut nam amet excepturi architecto accusantium
              dignissimos quae accusamus facere eum sed dolorem magni unde
              voluptatum, quisquam iusto numquam quas.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              blanditiis aut nam amet excepturi architecto accusantium
              dignissimos quae accusamus facere eum sed dolorem magni unde
              voluptatum, quisquam iusto numquam quas.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              blanditiis aut nam amet excepturi architecto accusantium
              dignissimos quae accusamus facere eum sed dolorem magni unde
              voluptatum, quisquam iusto numquam quas.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              blanditiis aut nam amet excepturi architecto accusantium
              dignissimos quae accusamus facere eum sed dolorem magni unde
              voluptatum, quisquam iusto numquam quas.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              blanditiis aut nam amet excepturi architecto accusantium
              dignissimos quae accusamus facere eum sed dolorem magni unde
              voluptatum, quisquam iusto numquam quas.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              blanditiis aut nam amet excepturi architecto accusantium
              dignissimos quae accusamus facere eum sed dolorem magni unde
              voluptatum, quisquam iusto numquam quas.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              blanditiis aut nam amet excepturi architecto accusantium
              dignissimos quae accusamus facere eum sed dolorem magni unde
              voluptatum, quisquam iusto numquam quas.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              blanditiis aut nam amet excepturi architecto accusantium
              dignissimos quae accusamus facere eum sed dolorem magni unde
              voluptatum, quisquam iusto numquam quas.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              blanditiis aut nam amet excepturi architecto accusantium
              dignissimos quae accusamus facere eum sed dolorem magni unde
              voluptatum, quisquam iusto numquam quas.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              blanditiis aut nam amet excepturi architecto accusantium
              dignissimos quae accusamus facere eum sed dolorem magni unde
              voluptatum, quisquam iusto numquam quas.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              blanditiis aut nam amet excepturi architecto accusantium
              dignissimos quae accusamus facere eum sed dolorem magni unde
              voluptatum, quisquam iusto numquam quas.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              blanditiis aut nam amet excepturi architecto accusantium
              dignissimos quae accusamus facere eum sed dolorem magni unde
              voluptatum, quisquam iusto numquam quas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;

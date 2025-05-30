import './Popup.css'

interface Props {
    open: boolean;
    ref: any;
}


export default function PopupMenu({open, ref}: Props) {

  // Close menu when clicking outside
  

  return (
    <div className="popup-share-container" ref={ref}>
      {/* <button
        onClick={toggleMenu}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Open Menu
      </button> */}

      {open && (
        <div className="popup-share">
          <ul className="p-2">
            <li className="p-2">X</li>
            <li className="p-2">Instagram</li>
            <li className="p-2">SnapChat</li>
            <li className="p-2">Facebook</li>
          </ul>
        </div>
      )}
    </div>
  );
}

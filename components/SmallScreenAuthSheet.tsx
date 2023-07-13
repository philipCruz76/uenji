import { FC } from 'react';

interface SmallScreenAuthSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const SmallScreenAuthSheet: FC<SmallScreenAuthSheetProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
      
          <div className="bg-white rounded-t-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            {/*- Your content goes here  */}

            
          </div>
        </div>
      </div>
      )}
    </>
  );
}

export default SmallScreenAuthSheet;
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
interface Iprpose{
  isOpen:boolean,
    title?:string,
    children:ReactNode,
    closeModal :()=>void
}
const Modal =({isOpen,title,children,closeModal}:Iprpose) => {
  return (
    <>
      <Transition  appear show={isOpen} as={Fragment}>
        <Dialog as="div"  className="relative z-100" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
           
          >
            <div className="fixed    inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed  inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all">
             
                <Dialog.Title
                dir='rtl'
                    as="h3"
                    className=" text-left text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>

                  <div className="mt-4">
                    {children}
                    {/* <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default Modal;
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import FilterCheckbox from "./Checkbox";

export default function FilterModal({
  show,
  handleModal,
  cuisinesList,
  setFilterByCuisine,
}) {
  const [state, setState] = useState({ selections: [] });

  function handleFilters() {
    setFilterByCuisine(state.selections);
    closeModal();
  }

  function resetFilters() {
    setState({ selections: [] });
    setFilterByCuisine([]);
    closeModal();
  }

  function closeModal() {
    handleModal(false);
  }

  function handleCheckboxChange(key) {
    let sel = state.selections;
    let find = sel.indexOf(key);
    if (find > -1) {
      sel.splice(find, 1);
    } else {
      sel.push(key);
    }

    setState({
      selections: sel,
    });
  }

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="border-b-2 border-gray-200 flex items-center justify-between"
                  >
                    <p className="text-xl font-medium leading-6 text-gray-900 mb-1">
                      Filter By Cuisine
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 cursor-pointer mb-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      onClick={closeModal}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Dialog.Title>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cuisinesList.map((cuisine, index) => (
                      <FilterCheckbox
                        key={index}
                        name={cuisine}
                        checked={state.selections.includes(cuisine)}
                        onChange={() => handleCheckboxChange(cuisine)}
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex items-center space-x-2 justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2"
                      onClick={resetFilters}
                    >
                      Clear All
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2"
                      onClick={handleFilters}
                    >
                      Apply
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

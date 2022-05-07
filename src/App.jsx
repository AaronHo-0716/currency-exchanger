import "./index.css";
import supportedCurrencies from "./rates/supported-currencies.json";
import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  SelectorIcon,
  ArrowRightIcon,
} from "@heroicons/react/solid";
import fetchRate from "./api/fetchRate";

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [selectedTargetCurrency, setSelectedTargetCurrency] = useState();
  const [exchangedMoney, setExchangedMoney] = useState(0);
  const [response, setResponse] = useState();
  const [money, setMoney] = useState();
  const [query, setQuery] = useState("");

  const filterCurrencies =
    query === ""
      ? supportedCurrencies
      : supportedCurrencies.filter(supportedCurrencies =>
          supportedCurrencies
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  useEffect(() => {
    fetchRate(selectedCurrency).then(({ rates }) => setResponse(rates));
  }, [selectedCurrency, selectedTargetCurrency, money]);

  const onSubmitHandler = () => {
    setExchangedMoney(response[selectedTargetCurrency] * money);
  };

  // const exchanged = () => {
  //   return response[selectedTargetCurrency] * selectedCurrency;
  // };

  return (
    <div className='flex justify-center items-center h-screen flex-col text-2xl'>
      <span className='p-5 text-bold text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>
        Currency Exchanger
      </span>
      <p className='text-2xl my-5'>
        Select the currency that you want to exchange
      </p>
      <div className='flex flex-row space-x-5'>
        <Combobox value={selectedCurrency} onChange={setSelectedCurrency}>
          <div className='relative mt-1'>
            <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
              <Combobox.Input
                className='w-full border-none py-2 pl-3 pr-10 text-2xl leading-5 text-gray-900 focus:ring-0'
                onChange={event => setQuery(event.target.value)}
                placeholder='Original Currency'
              />
              <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <SelectorIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {filterCurrencies.length === 0 && query !== "" ? (
                  <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                    Nothing found.
                  </div>
                ) : (
                  filterCurrencies.map(supportedCurrencies => (
                    <Combobox.Option
                      key={supportedCurrencies}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        }`
                      }
                      value={supportedCurrencies}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {supportedCurrencies}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-violet-500"
                              }`}
                            >
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
        <span className='mx-10 flex items-center text-violet-600'>
          <ArrowRightIcon className='h-5 w-5' />
        </span>
        <Combobox
          value={selectedTargetCurrency}
          onChange={setSelectedTargetCurrency}
        >
          <div className='relative mt-1'>
            <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
              <Combobox.Input
                className='w-full border-none py-2 pl-3 pr-10 text-2xl leading-5 text-gray-900 focus:ring-0'
                onChange={event => setQuery(event.target.value)}
                placeholder='Target Currency'
              />
              <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <SelectorIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {filterCurrencies.length === 0 && query !== "" ? (
                  <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                    Nothing found.
                  </div>
                ) : (
                  filterCurrencies.map(supportedCurrencies => (
                    <Combobox.Option
                      key={supportedCurrencies}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        }`
                      }
                      value={supportedCurrencies}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {supportedCurrencies}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-violet-500"
                              }`}
                            >
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
      <div>
        <input
          type='text'
          placeholder='Amount of money'
          className='mt-10 h-10 rounded-sm outline-none shadow-md p-3 ring-4 ring-violet-500'
          value={money}
          onChange={e => setMoney(e.target.value)}
        />
      </div>
      <button
        className='mt-5 text-xl text-violet-500 bg-violet-100 hover:bg-violet-200 py-3 px-7 rounded-lg'
        onClick={onSubmitHandler}
      >
        Exchange!
      </button>
      <div className='text-7xl font-extrabold mt-10'>
        {Math.round(exchangedMoney * 100) / 100}
      </div>
    </div>
  );
}

export default App;

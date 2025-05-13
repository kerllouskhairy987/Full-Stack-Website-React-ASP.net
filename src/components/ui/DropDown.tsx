import axiosInstance from '@/config/axios.config'
import { REGISTER_COUNTRIES, REGISTER_GENDER } from '@/data'
import { tokenFromLocalStorage, userIdFromLocalStorage } from '@/global'
import CustomHook from '@/hooks/CustomHook'
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
    Field,
    Label,
} from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

type Person = {
    CountryId: number
    CountryName: string
}

const people: Person[] = REGISTER_COUNTRIES;
interface IProps {
    setSelectedCountry: (value: number) => void;
}
export default function CountryDropDown({ setSelectedCountry }: IProps) {
    const [query, setQuery] = useState<string>('')
    const [selected, setSelected] = useState<Person>(people[0]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) =>
                person.CountryName.toLowerCase().includes(query.toLowerCase())
            )

    const handleSelect = (value: Person) => {
        setSelected(value)
        setSelectedCountry(value.CountryId)
        setIsOpen(false)
    }

    // Get applicant id
    const { data: applicant } = CustomHook({
        queryKey: ["user_information__"],
        url: `Applicants/GetApplicantIdByUserId/${userIdFromLocalStorage}`,
        config: {
            headers: { Authorization: `Bearer ${tokenFromLocalStorage}` }
        }
    });

    // Fetch User Profile Information
    const applicantId = applicant?.value;
    // Set default values
    useEffect(() => {
        const fetchUserData = async () => {
            if (!applicantId) return;

            try {
                const response = await axiosInstance.get(`Applicants/GetUserProfile/${applicantId}`, {
                    headers: {
                        Authorization: `Bearer ${tokenFromLocalStorage}`,
                    }
                });
                console.log(".......>>>>>>>>>>>>", response);

                const countryIdFromAPI = response?.data?.value?.countryId;
                console.log("Fetched CountryId:", countryIdFromAPI);

                const matchedCountry = people.find(p => p.CountryId === countryIdFromAPI);
                if (matchedCountry) {
                    setSelected(matchedCountry);
                    setSelectedCountry(matchedCountry.CountryId);
                }

            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        fetchUserData();
    }, [applicantId]);

    return (
        <div className="w-full">
            <Field>
                <Label>Country:</Label>
                <Combobox<Person>
                    value={selected}
                    onChange={handleSelect}
                    __demoMode
                >
                    <div className="relative rounded-md border border-gray-500 text-black overflow-hidden">
                        <ComboboxInput
                            className={clsx(
                                'w-full rounded-lg border-none dark:bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 dark:text-white',
                                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                            )}
                            displayValue={(person: Person) => person?.CountryName}
                            onChange={(event) => {
                                setQuery(event.target.value)
                                setIsOpen(true)
                            }}
                            onBlur={() => setTimeout(() => setIsOpen(false), 100)}
                        />
                        <ComboboxButton
                            onClick={() => setIsOpen((prev) => !prev)}
                            className="group absolute inset-y-0 right-0 px-2.5 bg-[#031F47!important] dark:bg-[white!important]"
                        >
                            <ChevronDownIcon className="size-4 text-white dark:text-black font-bold" />
                        </ComboboxButton>
                    </div>

                    {isOpen && (
                        <ComboboxOptions
                            anchor="bottom"
                            transition
                            className={clsx(
                                'w-(--input-width) rounded-xl border border-white/5 bg-black/90 p-1 [--anchor-gap:--spacing(1)] empty:invisible',
                                'transition duration-100 ease-in data-leave:data-closed:opacity-0 mh-[400px] overflow-y-auto'
                            )}
                        >
                            {filteredPeople.map((person) => (
                                <ComboboxOption
                                    key={person.CountryId}
                                    value={person}
                                    className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
                                >
                                    <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
                                    <div className="text-sm/6 text-white">{person.CountryName}</div>
                                </ComboboxOption>
                            ))}
                        </ComboboxOptions>
                    )}
                </Combobox>
            </Field>
        </div>
    )
}


// ** gender dropdown
interface Gender {
    gender: number;
    genderType: string;
}

const gender: Gender[] = REGISTER_GENDER;
interface IPropsGender {
    setSelectedGender: (value: number) => void;
}
export function GenderDropDown({ setSelectedGender }: IPropsGender) {
    const [query, setQuery] = useState<string>('')
    const [selected, setSelected] = useState<Gender>(gender[0]);
    const [isOpen, setIsOpen] = useState(false)

    const filteredGender =
        query === ''
            ? gender
            : gender.filter((person) =>
                person.genderType.toLowerCase().includes(query.toLowerCase())
            )

    // Get applicant id
    const { data: applicant } = CustomHook({
        queryKey: ["user_information_dropdown"],
        url: `Applicants/GetApplicantIdByUserId/${userIdFromLocalStorage}`,
        config: {
            headers: { Authorization: `Bearer ${tokenFromLocalStorage}` }
        }
    });

    // Fetch User Profile Information
    const applicantId = applicant?.value;

    useEffect(() => {
        const fetchUserData = async () => {
            if (!applicantId) return;

            try {
                const response = await axiosInstance.get(`Applicants/GetUserProfile/${applicantId}`, {
                    headers: {
                        Authorization: `Bearer ${tokenFromLocalStorage}`,
                    }
                });

                const genderFromAPI = response?.data?.value?.gender;
                console.log("Fetched Gender:", genderFromAPI);

                const matchedGender = gender.find(g => g.gender === genderFromAPI);
                console.log("Matched Gender:", matchedGender);
                if (matchedGender) {
                    setSelected(matchedGender);
                    setSelectedGender(matchedGender.gender);
                }

            } catch (error) {
                console.error("Error fetching user gender", error);
            }
        };

        fetchUserData();
    }, [applicantId]);


    return (
        <div className="w-full">
            <Field>
                <Label>Gender:</Label>
                <Combobox<Gender>
                    value={selected}
                    onChange={(value) => {
                        setSelected(value ?? gender[0])
                        if (value) {
                            setSelectedGender(value.gender)
                        }
                        setIsOpen(false)
                    }}
                    __demoMode
                >
                    <div className="relative rounded-md border border-gray-500 text-black overflow-hidden">
                        <ComboboxInput
                            className={clsx(
                                'w-full rounded-lg border-none dark:bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 dark:text-white',
                                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                            )}
                            displayValue={(person: Gender) => person?.genderType}
                            onChange={(event) => {
                                setQuery(event.target.value)
                                setIsOpen(true)
                            }}
                            onClick={() => setIsOpen(true)}
                        />
                        <ComboboxButton
                            className="group absolute inset-y-0 right-0 px-2.5 bg-[#031F47!important] dark:bg-[white!important]"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <ChevronDownIcon className="size-4 text-white dark:text-black font-bold" />
                        </ComboboxButton>
                    </div>

                    {isOpen && (
                        <ComboboxOptions
                            anchor="bottom"
                            transition
                            className={clsx(
                                'w-(--input-width) rounded-xl border border-white/5 bg-black/90 p-1 [--anchor-gap:--spacing(1)] empty:invisible',
                                'transition duration-100 ease-in data-leave:data-closed:opacity-0 max-h-[400px] overflow-y-auto'
                            )}
                        >
                            {filteredGender.map((person) => (
                                <ComboboxOption
                                    key={person.gender}
                                    value={person}
                                    className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
                                >
                                    <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
                                    <div className="text-sm/6 text-white">{person.genderType}</div>
                                </ComboboxOption>
                            ))}
                        </ComboboxOptions>
                    )}
                </Combobox>
            </Field>
        </div>
    )
}
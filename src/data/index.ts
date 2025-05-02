import { ICountry, IGender, ILoginInput, IRegisterInput } from "@/interfaces";

// ** Start Register Input
export const REGISTER_FORM: IRegisterInput[] = [
    {
        label: "National Number",
        name: "nationalNo",
        id: "nationalNo",
        placeholder: "national number",
        type: "number",
        validation: {
            required: true,
            minLength: 14,
            maxLength: 14,
        }
    },
    {
        label: "First Name",
        name: "fname",
        id: "fname",
        placeholder: "first name",
        type: "text",
        validation: {
            required: true,
        }
    },

    {
        label: "Second Name",
        name: "sname",
        id: "sname",
        placeholder: "second name",
        type: "text",
        validation: {
            required: true,
        }
    },

    {
        label: "Third Name",
        name: "tname",
        id: "tname",
        placeholder: "third name",
        type: "text",
        validation: {
            required: true,
        }
    },

    {
        label: "Last Name",
        name: "lname",
        id: "lname",
        placeholder: "last name",
        type: "text",
        validation: {
            required: true,
        }
    },

    {
        label: "Phone Number",
        name: "phonenumber",
        id: "phonenumber",
        placeholder: "phone number",
        type: "number",
        validation: {
            required: true,
            minLength: 10,
        }
    },

    {
        label: "Birth Date",
        name: "birthDate",
        id: "birthDate",
        placeholder: "birth date",
        type: "date",
        validation: {
            required: true,
        }
    },

    {
        label: "Address",
        name: "address",
        id: "address",
        placeholder: "address",
        type: "text",
        validation: {
            required: true,
        }
    },

    {
        label: "Email",
        name: "email",
        id: "email",
        placeholder: "email",
        type: "email",
        validation: {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
        }
    },

    {
        label: "Password",
        name: "password",
        id: "password",
        placeholder: "password",
        type: "password",
        validation: {
            required: true,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?])[A-Za-z\d!@#$%^&*()_\-+=<>?]{8,}$/
        }
    },

    {
        label: "Confirm Password",
        name: "confirmPassword",
        id: "confirmPassword",
        placeholder: "confirm Password",
        type: "password",
        validation: {
            required: true,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?])[A-Za-z\d!@#$%^&*()_\-+=<>?]{8,}$/
        }
    },

]

export const REGISTER_COUNTRIES: ICountry[] = [
    { CountryId: 1, CountryName: "Afghanistan" },
    { CountryId: 2, CountryName: "Albania" },
    { CountryId: 3, CountryName: "Algeria" },
    { CountryId: 4, CountryName: "Andorra" },
    { CountryId: 5, CountryName: "Angola" },
    { CountryId: 6, CountryName: "Argentina" },
    { CountryId: 7, CountryName: "Armenia" },
    { CountryId: 8, CountryName: "Australia" },
    { CountryId: 9, CountryName: "Austria" },
    { CountryId: 10, CountryName: "Azerbaijan" },
    { CountryId: 11, CountryName: "Bahamas" },
    { CountryId: 12, CountryName: "Bahrain" },
    { CountryId: 13, CountryName: "Bangladesh" },
    { CountryId: 14, CountryName: "Barbados" },
    { CountryId: 15, CountryName: "Belarus" },
    { CountryId: 16, CountryName: "Belgium" },
    { CountryId: 17, CountryName: "Belize" },
    { CountryId: 18, CountryName: "Benin" },
    { CountryId: 19, CountryName: "Bhutan" },
    { CountryId: 20, CountryName: "Bolivia" },
    { CountryId: 21, CountryName: "Bosnia and Herzegovina" },
    { CountryId: 22, CountryName: "Botswana" },
    { CountryId: 23, CountryName: "Brazil" },
    { CountryId: 24, CountryName: "Brunei" },
    { CountryId: 25, CountryName: "Bulgaria" },
    { CountryId: 26, CountryName: "Burkina Faso" },
    { CountryId: 27, CountryName: "Burundi" },
    { CountryId: 28, CountryName: "Cambodia" },
    { CountryId: 29, CountryName: "Cameroon" },
    { CountryId: 30, CountryName: "Canada" },
    { CountryId: 31, CountryName: "Cape Verde" },
    { CountryId: 32, CountryName: "Central African Republic" },
    { CountryId: 33, CountryName: "Chad" },
    { CountryId: 34, CountryName: "Chile" },
    { CountryId: 35, CountryName: "China" },
    { CountryId: 36, CountryName: "Colombia" },
    { CountryId: 37, CountryName: "Comoros" },
    { CountryId: 38, CountryName: "Congo" },
    { CountryId: 39, CountryName: "Costa Rica" },
    { CountryId: 40, CountryName: "Croatia" },
    { CountryId: 41, CountryName: "Cuba" },
    { CountryId: 42, CountryName: "Cyprus" },
    { CountryId: 43, CountryName: "Czech Republic" },
    { CountryId: 44, CountryName: "Denmark" },
    { CountryId: 45, CountryName: "Djibouti" },
    { CountryId: 46, CountryName: "Dominica" },
    { CountryId: 47, CountryName: "Dominican Republic" },
    { CountryId: 48, CountryName: "Ecuador" },
    { CountryId: 49, CountryName: "Egypt" },
    { CountryId: 50, CountryName: "El Salvador" },
    { CountryId: 51, CountryName: "Equatorial Guinea" },
    { CountryId: 52, CountryName: "Eritrea" },
    { CountryId: 53, CountryName: "Estonia" },
    { CountryId: 54, CountryName: "Eswatini" },
    { CountryId: 55, CountryName: "Ethiopia" },
    { CountryId: 56, CountryName: "Fiji" },
    { CountryId: 57, CountryName: "Finland" },
    { CountryId: 58, CountryName: "France" },
    { CountryId: 59, CountryName: "Gabon" },
    { CountryId: 60, CountryName: "Gambia" },
    { CountryId: 61, CountryName: "Georgia" },
    { CountryId: 62, CountryName: "Germany" },
    { CountryId: 63, CountryName: "Ghana" },
    { CountryId: 64, CountryName: "Greece" },
    { CountryId: 65, CountryName: "Grenada" },
    { CountryId: 66, CountryName: "Guatemala" },
    { CountryId: 67, CountryName: "Guinea" },
    { CountryId: 68, CountryName: "Guinea-Bissau" },
    { CountryId: 69, CountryName: "Guyana" },
    { CountryId: 70, CountryName: "Haiti" },
    { CountryId: 71, CountryName: "Honduras" },
    { CountryId: 72, CountryName: "Hungary" },
    { CountryId: 73, CountryName: "Iceland" },
    { CountryId: 74, CountryName: "India" },
    { CountryId: 75, CountryName: "Indonesia" },
    { CountryId: 76, CountryName: "Iran" },
    { CountryId: 77, CountryName: "Iraq" },
    { CountryId: 78, CountryName: "Ireland" },
    { CountryId: 79, CountryName: "Israel" },
    { CountryId: 80, CountryName: "Italy" },
    { CountryId: 81, CountryName: "Jamaica" },
    { CountryId: 82, CountryName: "Japan" }
];

export const REGISTER_GENDER: IGender[] = [
    { gender: 0, genderType: "Male" },
    { gender: 1, genderType: "Female" },
]
// ** End Register Input

// ** Start Login Input
export const LOGIN_FORM: ILoginInput[] = [
    {
        label: "Email",
        name: "email",
        id: "email",
        placeholder: "email",
        type: "email",
        validation: {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
        }
    },

    {
        label: "Password",
        name: "password",
        id: "password",
        placeholder: "password",
        type: "password",
        validation: {
            required: true,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?])[A-Za-z\d!@#$%^&*()_\-+=<>?]{8,}$/
        }
    },
]
// ** End Login Input

// Local Licenses Images
export const licenseImg = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqK-b1GlmIVo5FTvXrri57y1RMn0Z5dfVk9Q662qcIzfRqE8-j_CIh88Ftj-2UGRMzpgk&usqp=CAU",
    "https://shoplineimg.com/60b98856fdff28005bb32b8b/62b2dfa47d57f7000f2b1ff6/800x.jpg?",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdUEIzMOcRxYGlp_1dZqwc4xuAWNdLMsJKUg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjzlofTLjSyclHGbXKzQaH2nUTP2vb3VFVKw&s",
    "https://www.alke.com/images/stories/articles/0657/1170/agricultural-vehicles-alke.jpg",
    "https://t4.ftcdn.net/jpg/05/18/18/81/360_F_518188150_pmAWXN0f1Y3Zkl7rH5LqVYuQMXqdZ8I3.jpg",
    "https://t3.ftcdn.net/jpg/07/09/04/50/360_F_709045068_2JwDtqknRG8XqdE5ajd9oQZgAm6cvVHi.jpg"
]
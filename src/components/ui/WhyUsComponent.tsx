
interface ITitleSec {
    title: string;
    subTitle: string;
}
export const TitleSec = ({ title, subTitle }: ITitleSec) => {
    return (
        <div className="mt-10 mx-auto w-fit relative">
            <h2 className="font-bold text-5xl whitespace-nowrap text-gray-400/40 dark:text-white/70">{title}</h2>
            <h3 className="-mt-4 ml-20 text-lg  text-[#40515a] dark:text-white">{subTitle}</h3>
        </div>
    )
}

interface IContent {
    icon: string;
    title: string;
    description: string;
}


export const WhyUsCard = () => {
    const content: IContent[] = [
        {
            icon: "🕒",
            title: "Book an appointment easily",
            description: "Now you can book your driving license appointment in just a few minutes—no complications! Choose the day and time that suits you best, and get ready with ease—no lines, no hassle. All it takes is a few clicks, and we’ll handle the rest.",
        },

        {
            icon: "🧾",
            title: "Track order status",
            description: "Track your request in real time with ease! After booking your appointment, you’ll be able to check the status of your request at any time — whether it's under review, confirmed, or pending verification. All of this is available through your personal dashboard, without the need to call or visit the office yourself.",
        },

        {
            icon: "🛡️",
            title: "Safe and confidential",
            description: "Your personal information is protected with the highest security standards. All your data and booking details are kept completely private and confidential — only you can access them. We prioritize your safety and privacy at every step.",
        },

        {
            icon: "📱",
            title: "Compatible with mobile phones",
            description: "Access and use the platform seamlessly from any mobile device. Whether you're booking an appointment or tracking your request, everything is optimized for smartphones and tablets — anytime, anywhere.",
        },
    ];

    return (
        <>
            {
                content.map((ele, idx) => (
                    <div key={idx} className="relative bg-gray-300/80 p-3 pt-8 rounded-xl hover:shadow-md dark:bg-white text-black">
                        <div className="absolute top-0 right-3.5 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center border-3 border-[rgba(255, 0, 0, 0.4)] p-2"
                            style={{ boxShadow: 'inset 0 4px 6px rgba(255, 0, 0, 0.4)' }}
                        >
                            <span className="text-4xl text-[#031F47]"> {ele.icon} </span>
                        </div>
                        <h2 className="font-semibold text-xl mb-2">{ele.title}</h2>
                        <p className="text-sm line-clamp-5"> {ele.description}</p>
                    </div>
                ))
            }
        </>
    )
}
import { TitleSec, WhyUsCard } from "../ui/WhyUsComponent"

const WhyUs = () => {
    return (
        <div className="container">
            <TitleSec title="Why Us" subTitle="get to know us closer ..." />

            <div className="mx-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
                <WhyUsCard />
            </div>
        </div>
    )
}

export default WhyUs
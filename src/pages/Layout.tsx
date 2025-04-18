
import HeaderSec from "@/components/homePage/Header"
import HowItWork from "@/components/homePage/HowItWork"
import Questions from "@/components/homePage/Questions"
import Touch from "@/components/homePage/Touch"
import WhyUs from "@/components/homePage/WhyUs"


const HomePage = () => {
    return (
        <>
            <HeaderSec />
            <WhyUs />
            <HowItWork />
            <Questions />
            <Touch />
        </>
    )
}

export default HomePage

import TradingViewWidget from '../widgets/Widgets'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Hero1 from '../components/Hero1'
import Plans from '../components/Plans'
import Sliderr from '../components/Sliderr'
import PreLoader from '../components/PreLoader'
import VideoGuide from '../components/VideoGuide'
import { Suspense } from 'react'

const Home = () => {
  return (
    <>
    <Suspense fallback={<PreLoader/>}>
        <TradingViewWidget />
        <Navbar/>
        <div className='pt-[125px]'> 
        <Hero />
        <Hero1 />
        <VideoGuide />
        <Sliderr />
        <Footer />
        </div>     
    </Suspense>
    </>
  )
}

export default Home
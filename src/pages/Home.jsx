import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import CryptoPartnersCarousel from '../components/CryptoPartnersCarousel'
import Hero1 from '../components/Hero1'
import Sliderr from '../components/Sliderr'
import VideoGuide from '../components/VideoGuide'
import fincenLogo from '../assets/FinCEN.svg.png'
import fcaLogo from '../assets/fca-logo-financial-conduct-authority.png'
import secLogo from '../assets/SEC-Logo.png'
import dfsaLogo from '../assets/dfsa.png'

const TradingViewWidget = lazy(() => import('../widgets/Widgets'))
const CryptoNews = lazy(() => import('../widgets/CryptoNews'))


const Home = () => {
  return (
    <>
      <Suspense fallback={null}>
        <TradingViewWidget />
      </Suspense>
      <Navbar />
      <div className='pt-19 md:pt-10'> 
        <Hero />
        <CryptoPartnersCarousel />
        <Hero1 />
        <VideoGuide />
        <Sliderr />
        <section className='mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-0 py-12 sm:py-16'>
          <div className='rounded-3xl border border-slate-200 bg-white px-6 py-10 sm:px-10 shadow-sm'>
            <div className='mb-8 text-center'>
              <p className='text-xs font-semibold uppercase tracking-[0.3em] text-blue-600'>
                Compliance
              </p>
              <h2 className='mt-3 text-2xl sm:text-3xl font-bold text-slate-900'>
                Crypto licensing bodies
              </h2>
              <p className='mt-2 text-sm text-slate-500'>
                Key regulators and licensing authorities we align with.
              </p>
            </div>

            <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
              {[
                {
                  name: 'FinCEN',
                  region: 'US Treasury',
                  logo: fincenLogo,
                },
                {
                  name: 'FCA',
                  region: 'United Kingdom',
                  logo: fcaLogo,
                },
                {
                  name: 'SEC',
                  region: 'United States',
                  logo: secLogo,
                },
                {
                  name: 'DFSA',
                  region: 'Dubai, UAE',
                  logo: dfsaLogo,
                },
              ].map((body) => (
                <div
                  key={body.name}
                  className='group relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 px-4 py-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'
                >
                  <div className='absolute -right-10 -top-10 h-20 w-20 rounded-full bg-blue-200/30 blur-2xl' />
                  <div className='flex h-16 w-full items-center justify-center rounded-2xl bg-slate-50 p-3'>
                    <img
                      src={body.logo}
                      alt={body.name}
                      className='h-full w-full object-contain'
                      loading='lazy'
                    />
                  </div>
                  <p className='mt-4 text-sm font-semibold text-slate-900'>{body.name}</p>
                  <p className='text-xs text-slate-500'>{body.region}</p>
                  <div className='mt-3 h-1 w-10 rounded-full bg-gradient-to-r from-blue-500/60 to-purple-500/60 opacity-0 transition-opacity group-hover:opacity-100' />
                </div>
              ))}
            </div>
          </div>
        </section>
        <Suspense fallback={null}>
          <CryptoNews />
        </Suspense>
        <Footer />
      </div>     
    </>
  )
}

export default Home
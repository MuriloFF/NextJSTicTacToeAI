import Header from '../components/header'
import Footer from '../components/footer'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <> <Header /><Component {...pageProps} /><Footer /></>
}

export default MyApp

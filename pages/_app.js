import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {

  const [user, setuser] = useState({ value: null });
  const [fyersuser, setfyersuser] = useState({ value: null });

  const [key, setkey] = useState(0);
  const router = useRouter();
  const [progress, setProgress] = useState(0)

  const [globalAccessToken, setglobalAccessToken] = useState(null);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40)
    });

    router.events.on("routeChangeComplete", () => {
      setProgress(100)
    });

    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      setuser({ value: token });
      setkey(Math.random())
    }

    const fyerstoken = localStorage.getItem('fyerstoken');
    console.log(fyerstoken);
    if (fyerstoken) {
      setfyersuser({ value: fyerstoken });
      setkey(Math.random())
    }
  }, [router.query]);

  const logout = () => {
    console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    localStorage.removeItem('token');
    localStorage.removeItem('fyerstoken');
    setkey(Math.random())
    setuser({ value: null });
    setfyersuser({ value: null });
  }

  const setGlobalToken = (access_token) => {
    console.log("set access_token")
    setglobalAccessToken(access_token)
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <LoadingBar color='#f11946' progress={progress} waitingTime={400} onLoaderFinished={() => setProgress(0)} />
          <Navbar user={user} key={key} logout={logout}/>
          <Component user={user} fyersuser={fyersuser} globalAccessToken={globalAccessToken} setGlobalToken={setGlobalToken} {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  )
}

import React from "react";
import Navbar from "../Navbar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import { bookmarkd } from "../../definitions/bookmarkdTheme.jsx";
import { ThemeProvider } from "@mui/material/styles";
import Dashboard from "../Dashboard/Dashboard.jsx";
import Profile from "../Profile/Profile";
import Search from "../Search/Search";
import LoginPage from "../../non_tailwind_components/LoginPage/LoginPage.jsx";
import Recommendations from "../Recommendations/Recommendations.jsx";
import Friends from "../Friends/Friends.jsx";
import Settings from "../Settings/Settings.jsx";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy.jsx";
import TermsConditions from "../TermsConditions/TermsConditions.jsx";
import AIPowered from "../AIPowered/AIPowered.jsx";
import ContactUs from "../ContactUs/ContactUs.jsx";
import BookPage from "../BookPage/BookPage.jsx";
import Login from "../Login/Login.jsx";
import { supabase } from "../Supabase/client.js";

const CDN =
  "https://ddcqxtxffblwpqoaufri.supabase.co/storage/v1/object/public/profile/";

export const UserData = createContext();
export const ProfilePic = createContext();

function App() {
  const [userData, setUserData] = useState();
  const [token, setToken] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasProfilePic, setHasProfilePic] = useState([]);

  // console.log(CDN + token?.user?.id + "/profilePic");
  // console.log(hasProfilePic);
  useEffect(() => {
    if (token) {
      async function getUserInfo() {
        const responseRequest = await fetch(
          `https://bookmarkd-server.onrender.com/api/user?user_id=${token.user.id}`,
          {
            method: `GET`,
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (responseRequest.ok) {
          const responseData = await responseRequest.json();
          return responseData.payload;
        } else if (!responseRequest.ok) {
          console.error(`Status: ${responseRequest.status}`);
          console.error(`Text: ${await responseRequest.text()}`);
          console.error("Data not available");
          return;
        }
      }

      getUserInfo()
        .then((payload) => {
          setUserData(payload);
        })
        .catch((error) => {
          console.error(`Error fetching: ${error}`);
        });
    }

    if (token) {
      getProfilePic();
    }
  }, [token]);

  // Check if user is on mobile
  useEffect(() => {
    function handleResize() {
      const screenSize = window.innerWidth;
      if (screenSize < 550) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  async function getProfilePic() {
    const { data, error } = await supabase.storage
      .from("profile")
      .list(token.user.id + "/", {
        limit: 1,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (data[0].name == ".emptyFolderPlaceholder") {
      setHasProfilePic("../../../public/default-profile-pic.jpg");
      // console.log(CDN + token?.user?.id + data.name);
    } else if (data[0].name) {
      setHasProfilePic(CDN + token?.user?.id + "/" + data[0].name);
    } else {
      console.log(error);
    }
  }

  return (
    <UserData.Provider value={userData}>
      <ProfilePic.Provider value={hasProfilePic}>
        <ThemeProvider theme={bookmarkd}>
          <Router>
            {token && <Navbar />}
            {/* Render Navbar if token is present */}
            <div className="pb-16">
              <Routes>
                {isMobile ? (
                  <Route path="/" element={<Login setToken={setToken} />} />
                ) : (
                  <Route path="/" element={<LoginPage setToken={setToken} />} />
                )}

                {/* Redirect to login if no token */}
                {!token && (
                  <Route path="/dashboard" element={<Navigate to="/" />} />
                )}
                {!token && (
                  <Route path="/profile" element={<Navigate to="/" />} />
                )}
                {!token && (
                  <Route path="/search" element={<Navigate to="/" />} />
                )}
                {!token && (
                  <Route
                    path="/recommendations"
                    element={<Navigate to="/" />}
                  />
                )}
                {!token && (
                  <Route path="/settings" element={<Navigate to="/" />} />
                )}

                {/* Protected routes */}
                {token && (
                  <Route
                    path="/dashboard"
                    element={
                      <Dashboard
                        token={token}
                        setToken={setToken}
                        hasProfilePic={hasProfilePic}
                      />
                    }
                  />
                )}
                {token && (
                  <Route
                    path="/profile"
                    element={
                      <Profile token={token} hasProfilePic={hasProfilePic} />
                    }
                  />
                )}
                {token && <Route path="/search" element={<Search />} />}
                {token && (
                  <Route
                    path="/recommendations"
                    element={<Recommendations />}
                  />
                )}
                {token && <Route path="/friends" element={<Friends />} />}
                {token && (
                  <Route
                    path="/settings"
                    element={
                      <Settings
                        setToken={setToken}
                        token={token}
                        hasProfilePic={hasProfilePic}
                        setHasProfilePic={setHasProfilePic}
                        getProfilePic={getProfilePic}
                      />
                    }
                  />
                )}
                {token && (
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                )}
                {token && (
                  <Route
                    path="/terms-and-conditions"
                    element={<TermsConditions />}
                  />
                )}
                {token && <Route path="/contact-us" element={<ContactUs />} />}
                {token && <Route path="/ai-powered" element={<AIPowered />} />}
                {token && <Route path="/book-page" element={<BookPage />} />}
              </Routes>
            </div>
          </Router>
        </ThemeProvider>
      </ProfilePic.Provider>
    </UserData.Provider>
  );
}

export default App;

import React, {useEffect, useState} from "react";
import "./Sidebar.scss";
import {useAuth} from "../../../contexts/AuthContext";
import {IoIosArrowForward} from "react-icons/io";
import {getUserDatabase} from "../../../functions/UserData.js";
import Blob from "../../../assets/4-pages/Sidebar/Blob.svg";
import PopupModal from "../../Utility/PopupModal/PopupModal";

function Sidebar({sidebar, showSidebar}) {
    const {currentUser} = useAuth();
    const [userData, setUserData] = useState();
    const [openSignoutModal, setSignoutModal] = useState(false);
    const [userType, setUserType] = useState("none");

    useEffect(() => {
        if (currentUser) {
            getUserDatabase().then((data) => {
                setUserData(data);

                if (data.startedChallenge && (localStorage.getItem("challengerInfo") || data.invitedBy.length > 0)) {
                    setUserType("hybrid");
                } else if (data.startedChallenge) {
                    setUserType("challenger");
                } else {
                    setUserType("player");
                }
            });
        }
    }, [sidebar, currentUser]);

    function Greeting() {
        return (
            <>
                {userData ? (
                    <div className="avatar-greeting">
                        <div className="blob">
                            <img src={Blob} alt="player avatar background blob"/>
                        </div>
                        {userData.avatar ? (
                            <img
                                alt="player avatar"
                                className="avatar"
                                src={
                                    require(`../../../assets/3-avatars/avatar-${userData.avatar}.svg`)
                                        .default
                                }
                            />
                        ) : (
                            <img
                                alt="player avatar"
                                className="avatar"
                                src={require(`../../../assets/3-avatars/avatar-1.svg`).default}
                            />
                        )}
                        <div className="text">Hi {userData.name}!</div>
                    </div>
                ) : (
                    <div className="text">Hi There!</div>
                )}
            </>
        );
    }

    function Links() {
        return (
            <div className="container">
                {userType === "none" && (
                    <>
                        <a onClick={showSidebar} href="/challengerwelcome">
                            <button className="small gradient">
                                <span>Take The Challenge</span>
                            </button>
                        </a>
                        <a onClick={showSidebar} href="/actions">
                            Take Action
                        </a>
                    </>
                )}
                {userType === "player" && (
                    <>
                        <a onClick={showSidebar} href="/challengerwelcome">
                            <button className="small gradient">
                                <span>Take The Challenge</span>
                            </button>
                        </a>
                        <a onClick={showSidebar} href="/actions">
                            Take Action
                        </a>
                    </>
                )}

                {userType === "challenger" && (
                    <>
                        <a onClick={showSidebar} href="/progress">
                            My Challenge
                        </a>
                    </>
                )}
                {userType === "hybrid" && (
                    <>
                        <a onClick={showSidebar} href="/progress">
                            My Challenge
                        </a>
                        <a onClick={showSidebar} href="/actions">
                            Take Action
                        </a>
                    </>
                )}
                <>
                    <a onClick={showSidebar} href="/why8by8">
                        Why 8BY8
                    </a>
                </>
                <>
                    <a onClick={showSidebar} href='/rewards'>
                        Rewards
                    </a>
                </>
            </div>
        );
    }

    return (
        <div className="sidebar">
            <div className="top" onClick={showSidebar}>
                <IoIosArrowForward/>
            </div>

            <div className="greeting">
                <Greeting/>
            </div>

            <div className="links">
                <Links/>
            </div>

            <div className="bottom-links">
                <a onClick={showSidebar} href="/privacypolicy">
                    Privacy Policy
                </a>
                {currentUser ? (
                    <button onClick={() => setSignoutModal(true)}>Sign Out</button>
                ) : (
                    <a onClick={showSidebar} href="/signup">
                        Sign Up
                    </a>
                )}
            </div>

            {openSignoutModal && (
                <PopupModal
                    setOpenModal={setSignoutModal}
                    content={
                        <>
                            <div className="b2">Are you sure you want to sign out?</div>

                            <div className="buttons">
                                <a href="/signout">
                                    <button
                                        className="gradient small"
                                        onClick={() => {
                                            setSignoutModal(false);
                                        }}
                                    >
                                        <span>Yes, but I'll be back</span>
                                    </button>
                                </a>
                            </div>

                            <div className="buttons">
                                <button
                                    className="text-gradient small"
                                    onClick={() => {
                                        setSignoutModal(false);
                                    }}
                                >
                                    <span>No, I think I'll stay</span>
                                </button>
                            </div>
                        </>
                    }
                />
            )}
        </div>
    );
}

export default Sidebar;

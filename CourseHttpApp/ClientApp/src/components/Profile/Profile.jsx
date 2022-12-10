import React, {useContext, useEffect, useState} from "react";
import {NavLink, Route, Routes} from "react-router-dom";
import "./Profile.css";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import ProfileStats from "../ProfileStats/ProfileStats";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import LoadingSlider from "../UI/LoadingSlider/LoadingSlider";
import {DataContext} from "../../context/DataProvider";

const Profile = () => {
    const setActive = ({isActive}) => (isActive ? "item-nav-profile active-nav-item-profile" : "item-nav-profile");
    const [dataInfo, setDataInfo] = useState({});
    const [loading, setLoading] = useState(true)
    const {token} = useContext(DataContext)

    useEffect(() => {
        getInfoUser()
    }, [])

    async function getInfoUser() {
        await fetch("api/Profile", {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response
        }).then(data => {
            setDataInfo(data.value)
        }).catch((e) => {
            console.error(e)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
            {loading ? <LoadingSlider/> :
                <Routes>
                    <Route path="/*" element={
                        <div className="profile">
                            <div className="header-profile">
                                <div className="avatar-profile">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M19 6.5h-1.28l-.32-1a3 3 0 0 0-2.84-2H9.44A3 3 0 0 0 6.6 5.55l-.32 1H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3.002 3.002 0 0 0-3-3.05Zm1 11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h2a1 1 0 0 0 1-.68l.54-1.64a1 1 0 0 1 .95-.68h5.12a1 1 0 0 1 .95.68l.54 1.64a1 1 0 0 0 .9.68h2a1 1 0 0 1 1 1v8Zm-8-9a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
                                            fill="currentColor"></path>
                                    </svg>
                                </div>
                                <div className="header-info">
                                    <h1 className="header-info-name">{dataInfo.first_name}</h1>
                                    <span className="header-info-email">{dataInfo.email}</span>
                                </div>
                            </div>
                            <nav className="navigation-profile">
                                <NavLink className={setActive} to="/profile" end>Информация</NavLink>
                                <NavLink className={setActive} to="/profile/stats">Статистика</NavLink>
                            </nav>
                            <Routes>
                                <Route path="/" element={<ProfileInfo name={dataInfo.first_name}/>}/>
                                <Route path="/stats" element={<ProfileStats stats={dataInfo.stats}/>}/>
                            </Routes>
                        </div>
                    }/>
                    <Route path="/edit" element={<ProfileEdit data={dataInfo} setData={setDataInfo}/>}/>
                </Routes>
            }
        </>
    )
}

export default Profile;
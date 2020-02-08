import React, { useState } from "react";

import { useSelector } from "react-redux";

import CastList from "../CastList";
import CrewList from "../CrewList";
import SimilarList from "../SimilarList";
import TorrentList from "../TorrentList";

import "./index.css";

const Component = ({ id, setIsOpenDetail }) => {
    const [nav, setNav] = useState(0);

    const ui = useSelector(state => state.ui);

    return (
        <div className='moreDetail'>
            <div className='moreDetail-header'>
                <div
                    className={
                        nav === 0
                            ? "moreDetail-header-nav-active"
                            : "moreDetail-header-nav"
                    }
                    onClick={() => setNav(0)}
                >
                    {ui.lang === "en_US" ? "CASTING" : "출연진"}
                </div>
                <div
                    className={
                        nav === 1
                            ? "moreDetail-header-nav-active"
                            : "moreDetail-header-nav"
                    }
                    onClick={() => setNav(1)}
                >
                    {ui.lang === "en_US" ? "PRODUCER" : "제작진"}
                </div>
                <div
                    className={
                        nav === 2
                            ? "moreDetail-header-nav-active"
                            : "moreDetail-header-nav"
                    }
                    onClick={() => setNav(2)}
                >
                    {ui.lang === "en_US" ? "SIMILAR CONTENTS" : "비슷한 컨텐츠"}
                </div>
                <div
                    className={
                        nav === 3
                            ? "moreDetail-header-nav-active"
                            : "moreDetail-header-nav"
                    }
                    onClick={() => setNav(3)}
                >
                    {ui.lang === "en_US" ? "TORRENT" : "토렌트"}
                </div>
            </div>
            <div className='moreDetail-body'>
                {nav === 0 ? <CastList id={id} /> : null}
                {nav === 1 ? <CrewList id={id} /> : null}
                {nav === 2 ? (
                    <SimilarList id={id} setIsOpenDetail={setIsOpenDetail} />
                ) : null}
                {nav === 3 ? <TorrentList id={id} /> : null}
            </div>
        </div>
    );
};

export default Component;

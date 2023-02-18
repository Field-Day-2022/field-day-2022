import { useState } from 'react';
import { AiFillInfoCircle, AiFillTool } from 'react-icons/ai';
import { BiArrowFromTop, BiArrowToTop, BiExport } from 'react-icons/bi';
import { GiTurtle, GiFrog, GiSpottedBug, GiSandSnake, GiSquirrel } from 'react-icons/gi';
import { HiDocument } from 'react-icons/hi';
import Logo from './Logo';

import { useAtom } from 'jotai';
import { currentPageName } from '../utils/jotai';

export default function Sidebar() {
    const [currentPage, setCurrentPage] = useAtom(currentPageName);

    return (
        <div className="w-72 bg-white flex-col max-h-full-minus-nav divide-y overflow-auto">
            <CollapsibleSidebarSection title="Documentation">
                <SidebarElement icon={<AiFillInfoCircle />} text="About" />
            </CollapsibleSidebarSection>
            <CollapsibleSidebarSection title="Export Data">
                <SidebarElement icon={<BiExport />} text="Export to CSV" />
            </CollapsibleSidebarSection>
            <CollapsibleSidebarSection title="Critter Data">
                <SidebarElement
                    icon={<GiTurtle />}
                    text="Turtle"
                    onClickHandler={() => {
                        setCurrentPage('Turtle');
                    }}
                />
                <SidebarElement
                    icon={<Logo className="h-6" />}
                    text="Lizard"
                    onClickHandler={() => {
                        setCurrentPage('Lizard');
                    }}
                />
                <SidebarElement
                    icon={<GiSquirrel />}
                    text="Mammal"
                    onClickHandler={() => {
                        setCurrentPage('Mammal');
                    }}
                />
                <SidebarElement
                    icon={<GiSandSnake />}
                    text="Snake"
                    onClickHandler={() => {
                        setCurrentPage('Snake');
                    }}
                />
                <SidebarElement
                    icon={<GiSpottedBug />}
                    text="Arthropod"
                    onClickHandler={() => {
                        setCurrentPage('Arthropod');
                    }}
                />
                <SidebarElement
                    icon={<GiFrog />}
                    text="Amphibian"
                    onClickHandler={() => {
                        setCurrentPage('Amphibian');
                    }}
                />
            </CollapsibleSidebarSection>
            <CollapsibleSidebarSection title="Session Entries">
                <SidebarElement
                    icon={<HiDocument />}
                    text="Session"
                    onClickHandler={() => {
                        setCurrentPage('Session');
                    }}
                />
            </CollapsibleSidebarSection>
            <CollapsibleSidebarSection title="Enter Data">
                <SidebarElement icon={<HiDocument />} text="New Session" />
                <SidebarElement icon={<HiDocument />} text="New Data Entry" />
            </CollapsibleSidebarSection>
            <CollapsibleSidebarSection title="Manage Forms">
                <SidebarElement icon={<AiFillTool />} text="Form Builder" />
            </CollapsibleSidebarSection>
        </div>
    );
}

function CollapsibleSidebarSection({ title, children }) {
    const [collapsed, setCollapsed] = useState(false);

    function toggleCollapse() {
        console.log(collapsed);
        setCollapsed(!collapsed);
    }
    return (
        <div>
            <div className="flex items-center justify-between">
                <SidebarSectionHeading>{title}</SidebarSectionHeading>
                <div
                    className="text-xl cursor-pointer px-4 text-neutral-400"
                    onClick={toggleCollapse}
                >
                    {collapsed ? <BiArrowFromTop /> : <BiArrowToTop />}
                </div>
            </div>
            {!collapsed ? children : null}
        </div>
    );
}

function SidebarSectionHeading({ children }) {
    return <div className="px-4 py-3 uppercase text-xs">{children}</div>;
}

function SidebarElement({ icon, text, onClickHandler }) {
    return (
        <div
            className="px-4 py-3 flex items-center cursor-pointer hover:bg-neutral-100 hover:border-asu-gold border-transparent border-b-2 active:bg-neutral-200"
            onClick={() => onClickHandler()}
        >
            <div className="text-2xl mr-5">{icon}</div>
            {text}
        </div>
    );
}
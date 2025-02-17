import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from "react-bootstrap";
import { useHotkeys } from 'react-hotkeys-hook';
import CardContainer from '../../containers/card_container';
import HistoryContainer from '../../containers/history_container';
import SkewContainer from '../../containers/skew_container';
import AdminTableContainer from '../../containers/adminTable_container';
import RecycleBinContainer from '../../containers/recycleBin_container';
import CodebookLabelMenuContainer from '../../containers/codebookLabelMenu_container';
import SmartProgressBarContainer from '../../containers/smartProgressBar_container';
import BadgeRequiresAdjudication from './badges/BadgeRequiresAdjudication';
import BadgeIrr from './badges/BadgeIrr';
import KeyboardShortcutsModal from '../KeyboardShortcutsModal';
import { SHORTCUTS, logKeyPress } from '../../utils/keyboardShortcuts';

const ADMIN = window.ADMIN;

const Smart = ({ adminTabsAvailable, getLabels, getAdminTabsAvailable }) => {
    const [activeKey, setActiveKey] = useState(1);
    const [showShortcuts, setShowShortcuts] = useState(false);

    useEffect(() => {
        getAdminTabsAvailable();
        getLabels();
    }, [getAdminTabsAvailable, getLabels]);

    // Navigation shortcuts
    useHotkeys(SHORTCUTS.GOTO_ANNOTATE.key, (event) => {
        event.preventDefault();
        logKeyPress(SHORTCUTS.GOTO_ANNOTATE.key, SHORTCUTS.GOTO_ANNOTATE.description);
        setActiveKey(1);
    });
    useHotkeys(SHORTCUTS.GOTO_HISTORY.key, (event) => {
        event.preventDefault();
        logKeyPress(SHORTCUTS.GOTO_HISTORY.key, SHORTCUTS.GOTO_HISTORY.description);
        setActiveKey(2);
    });
    useHotkeys(SHORTCUTS.GOTO_SKEW.key, (event) => {
        event.preventDefault();
        if (ADMIN) {
            logKeyPress(SHORTCUTS.GOTO_SKEW.key, SHORTCUTS.GOTO_SKEW.description);
            setActiveKey(3);
        }
    });
    useHotkeys(SHORTCUTS.GOTO_ADMIN.key, (event) => {
        event.preventDefault();
        if (ADMIN) {
            logKeyPress(SHORTCUTS.GOTO_ADMIN.key, SHORTCUTS.GOTO_ADMIN.description);
            setActiveKey(4);
        }
    });

    // Help shortcuts
    useHotkeys(SHORTCUTS.SHOW_SHORTCUTS.key, (event) => {
        event.preventDefault();
        logKeyPress(SHORTCUTS.SHOW_SHORTCUTS.key, SHORTCUTS.SHOW_SHORTCUTS.description);
        setShowShortcuts(true);
    });
    useHotkeys(SHORTCUTS.SHOW_SHORTCUTS_ALT_2.key, (event) => {
        event.preventDefault();
        logKeyPress(SHORTCUTS.SHOW_SHORTCUTS_ALT_2.key, SHORTCUTS.SHOW_SHORTCUTS_ALT_2.description);
        setShowShortcuts(true);
    });

    const renderAdminTabSkew = () => {
        if (adminTabsAvailable) {
            return (
                <Tab eventKey={3} transition={false} title="Fix Skew" className="full card">
                    <div className="cardContent">
                        <SkewContainer />
                    </div>
                </Tab>
            );
        }
        return (
            <Tab eventKey={3} transition={false} title="Fix Skew" className="full card">
                <div className="cardContent">
                    <h2>Another admin is currently using this page. This page will become available when the admin returns to the project list page, details page, changes projects, or logs out.</h2>
                </div>
            </Tab>
        );
    };

    const renderAdminTabAdminTable = () => {
        const badges = adminTabsAvailable ? (
            <div> 
                <BadgeIrr />
                <BadgeRequiresAdjudication />
            </div>
        ) : null;

        if (adminTabsAvailable) {
            return (
                <Tab eventKey={4}
                    transition={false}
                    title={badges}
                    className="full card">
                    <div className="cardContent">
                        <AdminTableContainer />
                    </div>
                </Tab>
            );
        }
        return (
            <Tab eventKey={4} transition={false} title="Requires Adjudication" className="full card">
                <div className="cardContent">
                    <h2>Another admin is currently using this page. This page will become available when the admin returns to the project list page, details page, changes projects, or logs out.</h2>
                </div>
            </Tab>
        );
    };

    const renderAdminTabRecycle = () => {
        if (adminTabsAvailable) {
            return (
                <Tab eventKey={5} transition={false} title={<div><span id="trashCan" className="glyphicon glyphicon-trash" aria-hidden="true"></span> Discarded Data</div>} className="full card">
                    <div className="cardContent">
                        <RecycleBinContainer />
                    </div>
                </Tab>
            );
        }
        return (
            <Tab eventKey={5} transition={false} title={<div><span id="trashCan" className="glyphicon glyphicon-trash" aria-hidden="true"></span> Discarded Data</div>} className="full card">
                <div className="cardContent">
                    <h2>Another admin is currently using this page. This page will become available when the admin returns to the project list page, details page, changes projects, or logs out.</h2>
                </div>
            </Tab>
        );
    };

    return (
        <>
            <Tabs 
                activeKey={activeKey} 
                onSelect={k => setActiveKey(k)} 
                id="data_tabs" 
                mountOnEnter={true} 
                unmountOnExit={true}
            >
                <Tab eventKey={1} title="Annotate Data" className="full card" transition={false}>
                    <div className="cardContent">
                        <CodebookLabelMenuContainer />
                        <SmartProgressBarContainer />
                        <CardContainer />
                    </div>
                </Tab>
                <Tab eventKey={2} title="History" className="full card" transition={false}>
                    <div className="cardContent">
                        <HistoryContainer />
                    </div>
                </Tab>
                {ADMIN && renderAdminTabSkew()}
                {ADMIN && renderAdminTabAdminTable()}
                {ADMIN && renderAdminTabRecycle()}
            </Tabs>
            <KeyboardShortcutsModal 
                show={showShortcuts} 
                onHide={() => setShowShortcuts(false)} 
            />
        </>
    );
};

Smart.propTypes = {
    adminTabsAvailable: PropTypes.bool,
    getLabels: PropTypes.func.isRequired,
    getAdminTabsAvailable: PropTypes.func.isRequired,
};

export default Smart;

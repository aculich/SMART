import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import { useHotkeys } from "react-hotkeys-hook";

import { useLabels } from "../../hooks";
import ConfirmationModal from "./ConfirmationModal";

const DataCardLabelButtons = ({ cardData, fn, includeModal }) => {
    const [selectedLabelID, setSelectedLabelID] = useState(null);
    const { data: labels } = useLabels();

    if (!labels) return null;

    // Add hotkeys for the first 5 labels (1-5 keys)
    labels.labels.slice(0, 5).forEach((label, index) => {
        useHotkeys(`${index + 1}`, (event) => {
            event.preventDefault();
            if (includeModal) {
                setSelectedLabelID(label.pk);
            } else {
                fn({ ...cardData, selectedLabelID: label.pk });
            }
        }, [label.pk, includeModal]);
    });

    return (
        <Fragment>
            <div className="toolbar-gap" />
            {labels.labels.map((label, index) => (
                <Fragment key={label.name}>
                    <Button
                        onClick={() => {
                            if (includeModal) setSelectedLabelID(label.pk);
                            else fn({ ...cardData, selectedLabelID: label.pk });
                        }}
                        variant="primary"
                    >
                        {index < 5 ? `${index + 1}. ${label["name"]}` : label["name"]}
                    </Button>
                    <ConfirmationModal 
                        showModal={selectedLabelID === label.pk}
                        setSelectedLabelID={setSelectedLabelID}
                        fn={ () => {
                            fn({ ...cardData, selectedLabelID });
                        }}
                    />
                </Fragment>
            ))}
        </Fragment>
    );
};

export default DataCardLabelButtons;

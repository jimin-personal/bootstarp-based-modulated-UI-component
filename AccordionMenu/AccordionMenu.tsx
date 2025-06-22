import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Link from 'next/link';

interface AccordionMenuProps {
    menuContents: { header: React.ReactNode; body?: React.ReactNode }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menuRef?: React.MutableRefObject<any>;
}

const CustomCardHeader = React.memo(
    ({
        eventKey,
        headerContent,
        onClickHeader,
    }: {
        eventKey: string;
        headerContent: React.ReactNode;
        onClickHeader: () => void;
    }) => {
        const onClickHeaderDivEl = useAccordionButton(eventKey, () => {
            onClickHeader();
        });

        return (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <Link
                href="#"
                onClick={(event) => {
                    event.preventDefault();
                    onClickHeaderDivEl(event);
                }}
            >
                {headerContent}
            </Link>
        );
    },
);

const AccordionMenu: React.FC<AccordionMenuProps> = ({ menuContents, menuRef }) => {
    const [openingIdx, setOpeningIdx] = useState<number | undefined>();
    const handleClickHeader = (currentIndex: number) => {
        if (openingIdx === currentIndex) {
            setOpeningIdx(undefined);
            return;
        }
        setOpeningIdx(currentIndex);
    };

    return (
        <Accordion as="ul" className="menu" ref={menuRef}>
            {menuContents.map((content, index) => {
                if (!content.body) {
                    // eslint-disable-next-line react/no-array-index-key
                    return <li key={index}>{content.header}</li>;
                }

                return (
                    <Accordion.Item
                        eventKey={index.toString()}
                        as="li"
                        bsPrefix="menu-item-has-children"
                        className={openingIdx === index ? 'open' : ''}
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                    >
                        <CustomCardHeader
                            eventKey={index.toString()}
                            headerContent={content.header}
                            onClickHeader={() => handleClickHeader(index)}
                        />
                        <Accordion.Collapse eventKey={index.toString()} as="div" style={{ padding: 'unset' }}>
                            {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
                            <>{content.body}</>
                        </Accordion.Collapse>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
};

export default AccordionMenu;

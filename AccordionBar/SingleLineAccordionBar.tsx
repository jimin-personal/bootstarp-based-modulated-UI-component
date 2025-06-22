import React from 'react';
import { Accordion } from 'react-bootstrap';

interface SingleLineAccordionBarProps {
    children: React.ReactNode;
    header: React.ReactNode;
    defaultCondition?: 'open' | 'close';
}

const SingleLineAccordionBar: React.FC<SingleLineAccordionBarProps> = ({
    children,
    header,
    defaultCondition = 'close', // 렌더링시 열림, 닫힘 기본값 설정
}) => {
    return (
        <Accordion bsPrefix="farming__wrapper" defaultActiveKey={defaultCondition === 'open' ? '0' : undefined}>
            <Accordion.Item eventKey="0" bsPrefix="farming__item">
                <Accordion.Header as="div" bsPrefix="farming__item-header">
                    <div className="farming__content-title" style={{ marginBottom: 0, width: '100%' }}>
                        <h4 className="positionR">{header}</h4>
                        <h4 className="color--theme-color">
                            <i className="fa fa-arrow-down" />
                        </h4>
                    </div>
                </Accordion.Header>
                <Accordion.Body bsPrefix="farming__item-body" style={{ display: 'block' }}>
                    {children}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default SingleLineAccordionBar;

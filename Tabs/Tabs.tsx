import React, { useState } from 'react';
import { Nav, Row, Tab } from 'react-bootstrap';

interface TabsProps {
    tabOptions: {
        key: string;
        tabTitle: string;
        tabContent: React.ReactNode;
    }[];
    rightSideComponent?: React.ReactNode;
    defaultKey?: string;
    onSelect?: (eventKey: string | null) => void;
}
/* <Props 설명>
 * tabOptions: 탭의 key값, 탭에 표시될 제목(이름), 탭 내부에 표시될 리액트 컴포넌트(또는 tsx 코드) 를 배열 형태로 (interface 참고)
 * rightSideComponent: 탭이 표시되는 오른쪽 사이드에 표시될 요소 (현재는 Select box 로 되어 있음.)
 * (사용 예시: nfts.tsx 39행 참고)
 * */

const Tabs: React.FC<TabsProps> = ({ tabOptions, rightSideComponent, defaultKey, onSelect }) => {
    const [activeKey, setActiveKey] = useState<string>(defaultKey ?? tabOptions[0].key);

    return (
        <Tab.Container defaultActiveKey={activeKey} activeKey={activeKey} onSelect={onSelect}>
            <Row className="tabDropdown mb-5 d" style={{ display: 'grid', gridTemplateColumns: 'auto auto' }}>
                <Nav className="faq__tab nav nav-pills justify-content-lg-start" id="pills-tab">
                    {tabOptions.map((option) => {
                        return (
                            <Nav.Item key={option.key}>
                                <Nav.Link eventKey={option.key} onClick={() => setActiveKey(option.key)}>
                                    {option.tabTitle}
                                </Nav.Link>
                            </Nav.Item>
                        );
                    })}
                </Nav>
                {rightSideComponent}
            </Row>
            <Row>
                <Tab.Content className="tab-content faq__content vh50container pb-5" id="pills-tabContent">
                    {tabOptions.map((option) => {
                        return (
                            <Tab.Pane eventKey={option.key} key={option.key}>
                                {option.tabContent}
                            </Tab.Pane>
                        );
                    })}
                </Tab.Content>
            </Row>
        </Tab.Container>
    );
};

export default React.memo(Tabs);

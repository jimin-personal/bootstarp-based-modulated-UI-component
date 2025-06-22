import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

interface CustomSelectProps {
    classes?: {
        wrapper?: string;
        button?: string;
    };
    buttonInlineStyles?: React.CSSProperties;
    options: { key: string; label: string; value: string }[];
    selectedValue: string;
    onChange: (value: string) => void;
}

/*
 * SelectBox를 분리해놓은 컴포넌트
 * <Props 설명>
 * - classes : Object 형태로 Select를 감싸고 있는 최상단의 div요소에 넣을 클래스를 추가 할 수 있음(bootstrap class 이용)
 * - buttonInlineStyles: 직접적인 css property를 담아서 넘길 수 있음 드롭다운 버튼에 적용됨
 * - options: Select 박스의 옵션들에 대한 배열값 key, label(직접적으로 표시될 옵션 이름), value 값을 넣을 수 있음
 * - selectedValue: 현재 선택값. 대체로 해당컴포넌트가 속해있는 부모컴포넌트에서 state값을 받아서 사용함
 * - onChange: 부모 컴포넌트에서 옵션 값이 변했을 때 이루어질 작용이 포함된 함수 useCallback으로 감싸서 props로 전달해줌.
 * */

const CustomSelect: React.FC<CustomSelectProps> = ({
    classes,
    buttonInlineStyles,
    options,
    selectedValue,
    onChange,
}) => {
    const handleChangeSelectInput = (event: never) => {
        const { value } = (event as MouseEvent).target as HTMLOptionElement;
        onChange(value);
    };

    return (
        <div className={`${classes?.wrapper}`}>
            {(options.length > 1 && (
                <Dropdown as="div" id="status-select" bsPrefix="form-floating">
                    <Dropdown.Toggle
                        bsPrefix="custom-select select text-start"
                        variant="none"
                        value={selectedValue}
                        className={classes?.button}
                        style={{ minWidth: '170px', ...buttonInlineStyles }}
                    >
                        {options.find(({ value }) => value === selectedValue)?.label}
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                        {options.map(({ key, label, value }) => {
                            return (
                                <Dropdown.Item
                                    as="button"
                                    className="optionItem"
                                    value={value}
                                    eventKey={key}
                                    onClick={handleChangeSelectInput}
                                    key={key}
                                >
                                    {label}
                                </Dropdown.Item>
                            );
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            )) || (
                <div className="optionItem color--theme-color" style={{ minWidth: '140px', ...buttonInlineStyles }}>
                    {options[0].label}
                </div>
            )}
        </div>
    );
};

export default React.memo(CustomSelect);

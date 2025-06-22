import React, { useEffect, useRef, useState } from 'react';

const padNumber = (num: number, length: number) => {
    return String(num).padStart(length, '0');
};

const DayCountDownTimer: React.FC<{
    remainingTimeByMillisecond: number;
    separator?: 'colons' | 'character';
    onFinishCountDown?: () => Promise<void>;
}> = ({ separator = 'colons', remainingTimeByMillisecond, onFinishCountDown }) => {
    const tempDay = remainingTimeByMillisecond > 0 ? Math.floor(remainingTimeByMillisecond / (1000 * 60 * 60) / 24) : 0;
    const tempHour =
        remainingTimeByMillisecond > 0 ? Math.floor((remainingTimeByMillisecond / (1000 * 60 * 60)) % 24) : 0;
    const tempMin = remainingTimeByMillisecond > 0 ? Math.floor((remainingTimeByMillisecond / (1000 * 60)) % 60) : 0;
    const tempSec = remainingTimeByMillisecond > 0 ? Math.floor((remainingTimeByMillisecond / 1000) % 60) : 0;

    const initialTime = useRef(remainingTimeByMillisecond);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const interval = useRef<any>(null);

    const [day, setDay] = useState(padNumber(tempDay, 2));
    const [hour, setHour] = useState(padNumber(tempHour, 2));
    const [min, setMin] = useState(padNumber(tempMin, 2));
    const [sec, setSec] = useState(padNumber(tempSec, 2));

    useEffect(() => {
        setDay(padNumber(tempDay, 2));
        setHour(padNumber(tempHour, 2));
        setMin(padNumber(tempMin, 2));
        setSec(padNumber(tempSec, 2));
        initialTime.current = remainingTimeByMillisecond;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [remainingTimeByMillisecond]);

    useEffect(() => {
        interval.current = setInterval(() => {
            // 1초에 1000ms씩 빼다가
            if (initialTime.current > 1000) {
                initialTime.current -= 1000;
            }
            // 1초이하일때 음수가되는것을 방지하기위해 남아있는 수만큼 빼주기 (0으로만들기)
            if (initialTime.current <= 1000) {
                initialTime.current -= initialTime.current;
            }

            setDay(padNumber(parseInt(`${Math.floor(initialTime.current / (1000 * 60 * 60) / 24)}`, 10), 2));
            setHour(padNumber(parseInt(`${Math.floor((initialTime.current / (1000 * 60 * 60)) % 24)}`, 10), 2));
            setMin(padNumber(parseInt(`${Math.floor((initialTime.current / (1000 * 60)) % 60)}`, 10), 2));
            setSec(padNumber(parseInt(`${Math.floor((initialTime.current / 1000) % 60)}`, 10), 2));
        }, 1000);
        return () => clearInterval(interval.current);
    }, []);

    useEffect(() => {
        if (initialTime.current <= 0) {
            // 카운트다운이 끝났을때 작동하는 함수를 안전하게 작동시키기 위해 500ms 이후에 실행
            setTimeout(() => {
                clearInterval(interval.current);
                void onFinishCountDown?.();
            }, 500);
        }
        // eslint-disable-next-line
    }, [sec]);

    if (separator === 'colons') {
        return (
            <>
                {day} : {hour} : {min} : {sec}
            </>
        );
    }

    if (separator === 'character') {
        return (
            <>
                {day}d {hour}h {min}m {sec}s
            </>
        );
    }

    return null;
};

export default React.memo(DayCountDownTimer);

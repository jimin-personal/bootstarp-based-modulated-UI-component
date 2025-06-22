import React, { useEffect, useRef, useState } from 'react';

const padNumber = (num: number, length: number) => {
    return String(num).padStart(length, '0');
};

const HourCountDownTimer: React.FC<{ remainingTimeByMillisecond: number; separator?: 'colons' | 'character' }> = ({
    separator = 'colons',
    remainingTimeByMillisecond,
}) => {
    const tempHour = remainingTimeByMillisecond > 0 ? Math.floor(remainingTimeByMillisecond / (1000 * 60 * 60)) : 0;
    const tempMin = remainingTimeByMillisecond > 0 ? Math.floor((remainingTimeByMillisecond / (1000 * 60)) % 60) : 0;
    const tempSec = remainingTimeByMillisecond > 0 ? Math.floor((remainingTimeByMillisecond / 1000) % 60) : 0;

    const initialTime = useRef(remainingTimeByMillisecond < 0 ? 0 : remainingTimeByMillisecond);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const interval = useRef<any>(null);

    const [hour, setHour] = useState(padNumber(tempHour, 2));
    const [min, setMin] = useState(padNumber(tempMin, 2));
    const [sec, setSec] = useState(padNumber(tempSec, 2));

    useEffect(() => {
        setHour(padNumber(tempHour, 2));
        setMin(padNumber(tempMin, 2));
        setSec(padNumber(tempSec, 2));
        initialTime.current = remainingTimeByMillisecond;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [remainingTimeByMillisecond]);

    useEffect(() => {
        interval.current = setInterval(() => {
            initialTime.current -= 1000;

            if (initialTime.current < 0) {
                setHour(padNumber(0, 2));
                setMin(padNumber(0, 2));
                setSec(padNumber(0, 2));
                clearInterval(interval.current);
                return;
            }
            setHour(padNumber(parseInt(`${Math.floor(initialTime.current / (1000 * 60 * 60))}`, 10), 2));
            setMin(padNumber(parseInt(`${Math.floor((initialTime.current / (1000 * 60)) % 60)}`, 10), 2));
            setSec(padNumber(parseInt(`${Math.floor((initialTime.current / 1000) % 60)}`, 10), 2));
        }, 1000);
        return () => clearInterval(interval.current);
    }, [remainingTimeByMillisecond]);

    useEffect(() => {
        if (initialTime.current <= 0) {
            clearInterval(interval.current);
        }
    }, [sec]);

    if (separator === 'colons') {
        return (
            <>
                {hour} : {min} : {sec}
            </>
        );
    }

    if (separator === 'character') {
        return (
            <>
                {hour}h {min}m {sec}s
            </>
        );
    }

    return null;
};

export default React.memo(HourCountDownTimer);
